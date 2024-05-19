import { transform } from "ol/proj";
import ReactTileLayer from "../components/mapComponents/layers/ReactTileLayer";
import { TileWMS } from "ol/source";

export function transformProjections(data, source, target) {
  return transform(data, source, target);
}

export function createTileLayer(layer) {
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
}
