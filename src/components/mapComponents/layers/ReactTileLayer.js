// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import TileLayer from "ol/layer/Tile";

const ReactTileLayer = ({ source, name, id, zIndex = 0, opacity }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let transformedOpacity = opacity / 100;
    console.log("Transformed opacity for layer " + name + ": ", opacity);
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
  }, [map]);

  return null;
};

export default ReactTileLayer;
