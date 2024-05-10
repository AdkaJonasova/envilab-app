import logging

from shapely.geometry import shape
import geopandas as gpd
import os

from src.utils.ConfigReader import load_config


class FileService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        config = load_config(section="geoserver_areas")
        self.output_folder = config["output_folder"]

    def write_geojson_to_geopackage(self, geojson: dict, layer_name: str, file_name: str):
        features = geojson.get("features", [])
        geometries = [shape(feature['geometry']) for feature in features]
        crs = geojson.get('crs', None)

        gdf = gpd.GeoDataFrame(geometry=geometries, crs=crs)
        file_path = os.path.join(self.output_folder, file_name)
        gdf.to_file(file_path, layer=layer_name, driver='GPKG')

    def delete_geopackage_file(self, file_name):
        file_path = f"{os.path.join(self.output_folder, file_name)}.gpkg"
        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            self.logger.error(f"Unable to delete file {file_name}.gpkg, because the file does not exist.")
