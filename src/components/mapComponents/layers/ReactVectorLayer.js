// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";

const ReactVectorLayer = ({ source, name, id, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let vectorLayer = new VectorLayer({
      source: source,
      name: name,
      id: id,
    });
    vectorLayer.setZIndex(zIndex);
    vectorLayer.setOpacity(0.5);
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
