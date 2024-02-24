// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import TileLayer from "ol/layer/Tile";

const ReactTileLayer = ({ source, name = "", id = -1, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let tileLayer = new TileLayer({
      source: source,
      zIndex: zIndex,
      name: name,
      id: id,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  return null;
};
export default ReactTileLayer;
