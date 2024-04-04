import { useContext, useEffect, useRef } from "react";
import { Draw } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import { drawInteractionStyle, drawnFeatureStyle } from "../../../utils/data";

const ReactDrawInteraction = ({ variant, onDrawEnd }) => {
  const { map } = useContext(MapContext);
  const drawLayerRef = useRef(null);
  const drawInteractionRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const source = new VectorSource({ wrapX: false });
    drawLayerRef.current = new VectorLayer({
      source: source,
      style: drawnFeatureStyle,
    });

    const draw = new Draw({
      type: variant,
      style: drawInteractionStyle,
    });

    map.addLayer(drawLayerRef.current);
    map.addInteraction(draw);

    drawInteractionRef.current = draw;

    draw.on("drawend", (event) => {
      const feature = event.feature;
      const source = drawLayerRef.current.getSource();
      source.addFeature(feature);
      onDrawEnd(feature);
    });

    return () => {
      map.removeLayer(drawLayerRef.current);
      map.removeInteraction(drawInteractionRef.current);
    };
  }, [variant, onDrawEnd, map]);
  return null;
};

export default ReactDrawInteraction;
