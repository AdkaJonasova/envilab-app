const pointLayer = {
  layerId: 0,
  name: "Point layer",
  source:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
  description:
    "This layer is showing where the eartquake has been this year so far.",
  type: "vector",
};

const usaStatesLayer = {
  layerId: 1,
  name: "USA states layer",
  source: "https://ahocevar.com/geoserver/wms",
  description: "This layer show states of the USA with their borders",
  type: "tile",
};

const vegetationLayer = {
  layerId: 2,
  name: "Vegetation layer",
  source: "https://openlayers.org/data/vector/ecoregions.json",
  description:
    "This layer shows different kinds of vegetation types on the earth",
  type: "vector",
};

export const mockLayers = [pointLayer, usaStatesLayer, vegetationLayer];
