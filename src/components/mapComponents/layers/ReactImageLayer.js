import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import ImageLayer from "ol/layer/Image";

const ReactImageLayer = ({ source, name = "", id = -1 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let imageLayer = new ImageLayer({
      source: source,
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
