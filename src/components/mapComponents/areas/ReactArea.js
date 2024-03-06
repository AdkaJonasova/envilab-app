import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";

const GeoJsonReactArea = ({ areaSource }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    import(`../../../data/areas/${areaSource}`).then((data) => {
      const source = new VectorSource({
        features: new GeoJSON().readFeatures(data.default, {
          featureProjection: "EPSG:3857",
        }),
      });
      const feature = source.getFeatures()[0];
      const polygon = feature.getGeometry();
      map.getView().fit(polygon, { padding: [170, 50, 30, 150] });
    });
  }, [map]);

  return null;
};

export default GeoJsonReactArea;
