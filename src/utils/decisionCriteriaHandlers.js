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

export function createVectorLayerFromFeatures(features) {
  if (features.length > 0) {
    const geojsonObject = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "EPSG:4326",
        },
      },
      features: features,
    };
    console.log("Before features: ", features);
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
    });

    return (
      <ReactVectorLayer
        source={vectorSource}
        opacity={100}
        id={"selectViewLayer"}
        name={"Select view layer"}
      />
    );
  }
}

export function createLayerByType(layer) {
  switch (layer.type) {
    case LayerTypes.Vector:
    // return (
    //   <ReactVectorLayer
    //     source={
    //       new VectorSource({
    //         url:
    //           "http://localhost:9000/geoserver/wfs" +
    //           "?service=WFS" +
    //           "&version=1.1.0" +
    //           "&request=GetFeature" +
    //           `&typename=${layer.name}` +
    //           "&outputFormat=application/json",
    //         format: new GeoJSON({
    //           featureProjection: layer.projection,
    //           extractGeometryName: true,
    //         }),
    //       })
    //     }
    //     name={layer.title}
    //     id={layer.name}
    //     opacity={layer.opacity}
    //   />
    // );
    case LayerTypes.Raster:
      return (
        <ReactTileLayer
          source={
            new TileWMS({
              url: "http://localhost:9000/geoserver/wms",
              params: {
                LAYERS: layer.name,
                TILED: true,
              },
              serverType: "geoserver",
              crossOrigin: "anonymous",
              projection: layer.projection,
              tileLoadFunction: function (tile, src) {
                tile.getImage().src = src;
                tile.getImage().crossOrigin = "anonymous";
                tile.getImage().headers = {
                  Authorization: "Basic " + btoa("admin:geoserver"),
                };
              },
            })
          }
          name={layer.title}
          id={layer.name}
          opacity={layer.opacity}
        />
      );
    case LayerTypes.Image:
      console.log("--Image layer");
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
