import { useContext, useEffect, useRef } from "react";
import { Draw } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";

const ReactDrawInteraction = ({ variant, onDrawEnd }) => {
  const { map } = useContext(MapContext);
  const drawInteractionRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const source = new VectorSource({ wrapX: false });
    const layer = new VectorLayer({ source: source });

    const draw = new Draw({
      type: variant,
    });

    map.addLayer(layer);
    map.addInteraction(draw);

    drawInteractionRef.current = draw;

    draw.on("drawend", (event) => {
      const feature = event.feature;
      onDrawEnd(feature);
    });

    return () => {
      map.removeLayer(layer);
      map.removeInteraction(drawInteractionRef.current);
    };
  }, [variant, onDrawEnd]);
  return null;
};

export default ReactDrawInteraction;
