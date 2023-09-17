import { Fill, Stroke, Style } from 'ol/style';

export const styles = 
{  
    'geoJsonLayerStyle': new Style({
        stroke: new Stroke({
            color: 'yellow',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)',
        }),
    }),
};

export const geoJsonLayer = 
{
    'type': 'Feature',
    'geometry': {
        'type': 'Polygon',
        'coordinates': [
            [
                [-5e6, 6e6],
                [-3e6, 6e6],
                [-3e6, 8e6],
                [-5e6, 8e6],
                [-5e6, 6e6],
              ],
            ],
    },
};

export const earthquakesGeojson = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
export const geojsonExample = 'https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits.json';
export const geojsonExample2 = 'https://openlayers.org/data/vector/ecoregions.json';
export const geotiffExample = 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/TCI.tif';
export const geotiffExample2 = 'https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif';