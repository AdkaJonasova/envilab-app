import logging

from shapely.geometry import shape
import geopandas as gpd
import os

from src.utils.ConfigReader import load_config


class FileService:
    """
        A class used for manipulation with file system.
        Attributes
        ----------
        logger : Logger
            instance used for information and error logging
        output_folder : str
            path to the folder, where files containing data for custom areas are stored
        """
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        config = load_config(section="geoserver_areas")
        self.output_folder = config["output_folder"]

    def write_geojson_to_geopackage(self, geojson: dict, layer_name: str, file_name: str):
        """Converts data in GeoJSON format to Geopackage format and stores it in the given file.
        Parameters
        ----------
        geojson : dict
            geospatial data in GeoJSON format
        layer_name : str
            name of the layer that represents given data
        file_name: str
            name of the file to store a layer with the layer_name in
        """
        features = geojson.get("features", [])
        geometries = [shape(feature['geometry']) for feature in features]
        crs = geojson.get('crs', None)

        gdf = gpd.GeoDataFrame(geometry=geometries, crs=crs)
        file_path = os.path.join(self.output_folder, file_name)
        gdf.to_file(file_path, layer=layer_name, driver='GPKG')

    def delete_geopackage_file(self, file_name):
        """Deletes a file with the given file_name.
        Parameters
        ----------
        file_name : str
            name of the file that should be deleted
        """
        file_path = f"{os.path.join(self.output_folder, file_name)}.gpkg"
        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            self.logger.error(f"Unable to delete file {file_name}.gpkg, because the file does not exist.")
