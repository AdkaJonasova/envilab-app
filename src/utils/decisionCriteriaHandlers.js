import { LayerTypes } from "./enums";
import { ImageStatic, ImageWMS, Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";
import TileWMS from "ol/source/TileWMS.js";
import ReactVectorLayer from "../components/mapComponents/layers/ReactVectorLayer";
import ReactTileLayer from "../components/mapComponents/layers/ReactTileLayer";
import ReactImageLayer from "../components/mapComponents/layers/ReactImageLayer";
import { Projection, transformExtent } from "ol/proj";
import Static from "ol/source/ImageStatic";
import ImageSource from "ol/source/Image";

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
