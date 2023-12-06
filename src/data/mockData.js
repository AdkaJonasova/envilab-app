import { LayerTypes } from "../utils/enums";

// Mock layer data
const pointLayer = {
  layerId: 0,
  name: "Point layer",
  source:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
  description:
    "This layer is showing where the eartquake has been this year so far.",
  type: LayerTypes.Vector,
};

const usaStatesLayer = {
  layerId: 1,
  name: "USA states layer",
  source: "https://ahocevar.com/geoserver/wms",
  description: "This layer shows states of the USA with their borders",
  type: LayerTypes.Tile,
};

const vegetationLayer = {
  layerId: 2,
  name: "Vegetation layer",
  source: "https://openlayers.org/data/vector/ecoregions.json",
  description:
    "This layer shows different kinds of vegetation types on the earth",
  type: LayerTypes.Vector,
};

export const mockLayers = [pointLayer, usaStatesLayer, vegetationLayer];
export let favoriteMockLayers = [pointLayer];

// Mock area data
const subArea1 = {
  areaId: 10,
  name: "Jihomoravsky kraj",
  source: "",
  isEditable: false,
  subAreas: [],
};

const area1 = {
  areaId: 0,
  name: "Czech republic",
  source: "",
  isEditable: false,
  subAreas: [subArea1],
};

const area2 = {
  areaId: 1,
  name: "Slovakia",
  source: "",
  isEditable: false,
  subAreas: [],
};

const customArea1 = {
  areaId: 2,
  name: "Custom area 1",
  source: "",
  isEditable: true,
  subAreas: [],
};

export const mockAreas = [area1, area2, customArea1];

// Mock point data
const point1 = {
  x: 12.23654,
  y: 25.23647,
};

const point2 = {
  x: 85.7596,
  y: -56.58336,
};

const point3 = {
  x: 14.45681,
  y: -36.4587,
};

export let points = [point1, point2, point3];

// mock table data window data
const alaska = {
  name: "Alaska",
  population: 7335830,
  area: 1723337,
};

const texas = {
  name: "Texas",
  population: 30029572,
  area: 695662,
};

const california = {
  name: "California",
  population: 39029342,
  area: 423967,
};

const montana = {
  name: "Montana",
  population: 1122867,
  area: 3800831,
};

const newMexico = {
  name: "New Mexico",
  population: 2113344,
  area: 314917,
};

export const states = [alaska, texas, california, montana, newMexico];
export const statesHeaders = ["State name", "Population", "Area"];
