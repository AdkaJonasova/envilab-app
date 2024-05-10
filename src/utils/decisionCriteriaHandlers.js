import { LayerTypes } from "./enums";
import TileWMS from "ol/source/TileWMS.js";
import ReactTileLayer from "../components/mapComponents/layers/ReactTileLayer";

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
          key={`map-layer-${layer.name}`}
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
