import { useContext, useEffect } from "react";
import ImageLayer from "ol/layer/Image";
import MapContext from "../MapContext";

const ReactImageLayer = ({ source, name, id, zIndex = 0, opacity }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let transformedOpacity = opacity / 100;
    let imageLayer = new ImageLayer({
      source: source,
      opacity: transformedOpacity,
      zIndex: zIndex,
      name: name,
      id: id,
    });
    map.addLayer(imageLayer);
    return () => {
      if (map) {
        map.removeLayer(imageLayer);
      }
    };
  }, [map]);

  return null;
};
export default ReactImageLayer;
