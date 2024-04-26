import { useContext, useEffect, useRef } from "react";
import { Draw } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import { drawInteractionStyle, drawnFeatureStyle } from "../../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeature,
  selectFeatures,
} from "../../../redux/slices/SelectViewSlice";
import GeoJSON from "ol/format/GeoJSON.js";

const ReactDrawInteraction = ({ variant }) => {
  const { map } = useContext(MapContext);
  const drawLayerRef = useRef(null);
  const drawInteractionRef = useRef(null);

  const activeFeatures = useSelector(selectFeatures);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!map) return;

    const geojsonObject = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "EPSG:3857",
        },
      },
      features: activeFeatures,
    };

    const source = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
      wrapX: false,
    });

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
      dispatch(addFeature({ feature: geojsonStr }));
    });

    return () => {
      map.removeLayer(drawLayerRef.current);
      map.removeInteraction(drawInteractionRef.current);
    };
  }, [variant, map, activeFeatures]);
  return null;
};

export default ReactDrawInteraction;
