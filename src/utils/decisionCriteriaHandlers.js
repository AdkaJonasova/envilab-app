import { LayerTypes } from "./enums";
import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";
import TileWMS from "ol/source/TileWMS.js";
import ReactVectorLayer from "../components/mapComponents/layers/ReactVectorLayer";
import ReactTileLayer from "../components/mapComponents/layers/ReactTileLayer";
import ReactImageLayer from "../components/mapComponents/layers/ReactImageLayer";
import { Projection } from "ol/proj";
import Static from "ol/source/ImageStatic";
import { transformProjections } from "./mapFunctions";

export function createLayerByType(layer) {
  const layerType = layer.geoLayer.type;
  switch (layerType) {
    case LayerTypes.Vector:
      return (
        <ReactVectorLayer
          source={
            new VectorSource({
              url: layer.geoLayer.source,
              format: new GeoJSON(),
            })
          }
          name={layer.geoLayer.name}
          id={layer.layerId}
        />
      );
    case LayerTypes.Tile:
      return (
        <ReactTileLayer
          source={
            new TileWMS({
              url: layer.geoLayer.source,
              params: { LAYERS: "topp:states", TILED: true },
              serverType: "geoserver",
              transition: 0,
            })
          }
          name={layer.geoLayer.name}
          id={layer.layerId}
        />
      );
    case LayerTypes.Image:
      return (
        <ReactImageLayer
          source={
            new Static({
              projection: new Projection({
                code: "xkcd-image",
                units: "pixels",
                extent: layer.geoLayer.extent,
              }),
              url: layer.geoLayer.source,
              imageExtent: layer.geoLayer.extent,
            })
          }
          name={layer.geoLayer.name}
          id={layer.layerId}
        />
      );
  }
}

export function getCoordsObjectForDrawType(geometry) {
  const drawType = geometry.getType();

  let coordinates = [];
  let drawCoords;
  let transformedCoords;
  let newCoordPair;
  let radius = 0;

  switch (drawType) {
    case "Point":
      drawCoords = geometry.getCoordinates();
      transformedCoords = transformProjections(
        drawCoords,
        "EPSG:3857",
        "EPSG:4326"
      );
      newCoordPair = {
        x: transformedCoords[0],
        y: transformedCoords[1],
      };
      coordinates.push(newCoordPair);
      break;
    case "LineString":
      drawCoords = geometry.getCoordinates();
      drawCoords.forEach((coord) => {
        transformedCoords = transformProjections(
          coord,
          "EPSG:3857",
          "EPSG:4326"
        );
        newCoordPair = {
          x: transformedCoords[0],
          y: transformedCoords[1],
        };
        coordinates.push(newCoordPair);
      });
      break;
    case "Polygon":
      drawCoords = geometry.getCoordinates()[0];
      drawCoords.forEach((coord) => {
        transformedCoords = transformProjections(
          coord,
          "EPSG:3857",
          "EPSG:4326"
        );
        const newCoordPair = {
          x: transformedCoords[0],
          y: transformedCoords[1],
        };
        coordinates.push(newCoordPair);
      });
      break;
    case "Circle":
      drawCoords = geometry.getCenter();
      radius = geometry.getRadius();
      transformedCoords = transformProjections(
        drawCoords,
        "EPSG:3857",
        "EPSG:4326"
      );
      newCoordPair = {
        x: transformedCoords[0],
        y: transformedCoords[1],
      };
      coordinates.push(newCoordPair);
  }
  let result = {
    radius: radius,
    coordinates: coordinates,
  };
  return result;
}
