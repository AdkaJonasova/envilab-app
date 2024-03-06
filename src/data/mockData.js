import { Projection } from "ol/proj";
import { LayerTypes } from "../utils/enums";

// ----------------------------------------------------------- Mock user data -----------------------------------------------------------
export const userId = 1;

// ----------------------------------------------------------- Mock layer data -----------------------------------------------------------
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

const testLayer1 = {
  layerId: 3,
  name: "Test layer 1",
};
const testLayer2 = {
  layerId: 4,
  name: "Test layer 2",
};
const testLayer3 = {
  layerId: 5,
  name: "Test layer 3",
};
const testLayer4 = {
  layerId: 6,
  name: "Test layer 4",
};
const testLayer5 = {
  layerId: 7,
  name: "Test layer 5",
};
const testLayer6 = {
  layerId: 8,
  name: "Test layer 6",
};
const testLayer7 = {
  layerId: 9,
  name: "Test layer 7",
};
const testLayer8 = {
  layerId: 10,
  name: "Test layer 8",
};

const staticImageLayer1 = {
  layerId: 11,
  name: "Cartoon image layer",
  source: "https://imgs.xkcd.com/comics/online_communities.png",
  extent: [0, 0, 1024, 968],
  type: LayerTypes.Image,
};

const staticImageLayer2 = {
  layerId: 12,
  name: "Image projection layer",
  source:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/British_National_Grid.svg/2000px-British_National_Grid.svg.png",
  extent: [0, 0, 700000, 1300000],
  type: LayerTypes.Image,
};

export const mockLayers = [
  pointLayer,
  usaStatesLayer,
  vegetationLayer,
  testLayer1,
  testLayer2,
  testLayer3,
  testLayer4,
  testLayer5,
  testLayer6,
  testLayer7,
  testLayer8,
  staticImageLayer1,
  staticImageLayer2,
];

export const extent = [0, 0, 1024, 968];

export const projection = new Projection({
  code: "xkcd-image",
  units: "pixels",
  extent: extent,
});

// ----------------------------------------------------------- Mock area data -----------------------------------------------------------
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
  source: "czechRepublic.json",
  isEditable: false,
  subAreas: [subArea1],
};

const area2 = {
  areaId: 1,
  name: "Slovakia",
  source: "slovakia.json",
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

// ----------------------------------------------------------- Mock table data window data -----------------------------------------------------------
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

// ----------------------------------------------------------- Mock text data window data -----------------------------------------------------------

export const header = "Test header";
export const subheader = "This is a test subheader";
export const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// ----------------------------------------------------------- Mock line graph data window data -----------------------------------------------------------
export const lineGraphLabels = ["2000", "2005", "2010", "2015", "2020"];
export const lineGraphData1 = [5, 10, 8, 6, 15];
export const lineGraphTitle = "Test graph title";
export const lineGraphTestDataName1 = "Test data name";
