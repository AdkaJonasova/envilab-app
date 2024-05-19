// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import { useContext, useEffect } from "react";
import VectorLayer from "ol/layer/Vector";
import MapContext from "../MapContext";

const ReactVectorLayer = ({ source, name, id, zIndex = 0, opacity }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let transformedOpacity = opacity / 100;
    let vectorLayer = new VectorLayer({
      source: source,
      zIndex: zIndex,
      opacity: transformedOpacity,
      name: name,
      id: id,
    });
    map.addLayer(vectorLayer);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
};

export default ReactVectorLayer;
