// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import { useContext, useEffect } from "react";
import TileLayer from "ol/layer/Tile";
import MapContext from "../MapContext";

const ReactTileLayer = ({ source, name, id, zIndex = 0, opacity }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let transformedOpacity = opacity / 100;
    let tileLayer = new TileLayer({
      source: source,
      zIndex: zIndex,
      opacity: transformedOpacity,
      name: name,
      id: id,
    });
    map.addLayer(tileLayer);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, opacity, zIndex]);

  return null;
};

export default ReactTileLayer;
