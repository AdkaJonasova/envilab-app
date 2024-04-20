import { useContext, useEffect, useRef } from "react";
import { Draw } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import { drawInteractionStyle, drawnFeatureStyle } from "../../../utils/data";
import { useDispatch } from "react-redux";
import { addFeature } from "../../../redux/slices/SelectViewSlice";
import GeoJSON from "ol/format/GeoJSON.js";

const ReactDrawInteraction = ({ variant, onDrawEnd }) => {
  const { map } = useContext(MapContext);
  const drawLayerRef = useRef(null);
  const drawInteractionRef = useRef(null);

  const dispatch = useDispatch();

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
      var writer = new GeoJSON();
      var geojsonStr = writer.writeFeatureObject(feature);

      console.log("Feature: ", geojsonStr);
      dispatch(addFeature({ feature: geojsonStr }));
      // const source = drawLayerRef.current.getSource();
      // source.addFeature(feature);
      // let features = source.getFeatures();
      // console.log("Features: ", features);
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
