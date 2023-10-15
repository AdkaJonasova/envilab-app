// Mock layer data
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

// Mock area data
const area1 = {
  areaId: 0,
  name: "Czech republic",
  source: "",
  isEditable: false,
};

const area2 = {
  areaId: 1,
  name: "Slovakia",
  source: "",
  isEditable: false,
};

const customArea1 = {
  areaId: 2,
  name: "Custom area 1",
  source: "",
  isEditable: true,
};

export const mockAreas = [area1, area2, customArea1];
