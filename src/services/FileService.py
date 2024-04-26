from shapely.geometry import shape
import geopandas as gpd
import os

from src.utils.ConfigReader import load_config


class FileService:
    def __init__(self):
        config = load_config(section="geoserver_areas")
        self.output_folder = config["output_folder"]

    def write_geojson_to_geopackage(self, geojson: dict, layer_name: str, file_name: str):
        features = geojson.get("features", [])
        geometries = [shape(feature['geometry']) for feature in features]
        crs = geojson.get('crs', None)

        gdf = gpd.GeoDataFrame(geometry=geometries, crs=crs)
        file_path = os.path.join(self.output_folder, file_name)
        gdf.to_file(file_path, layer=layer_name, driver='GPKG')
