import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { extent } from "../../../data/mockData";
import { transformExtent } from "ol/proj";
import { get as getProjection } from "ol/proj";

const GeoJsonReactArea = ({ areaSource, areaSourceId }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    // import(`../../../data/areas/${areaSource}`).then((data) => {
    //   const source = new VectorSource({
    //     features: new GeoJSON().readFeatures(data.default, {
    //       featureProjection: "EPSG:4326",
    //     }),
    //   });
    //   const feature = source.getFeatures()[areaSourceId];
    //   const polygon = feature.getGeometry();
    //   map.getView().fit(polygon, { padding: [170, 50, 30, 150] });
    // });
    const usaExtent4326 = [
      -179.15055799999996, 18.909858704999976, 179.77340700000013,
      72.68750000000006,
    ];
    const alabamaExtent = [
      -88.4732322636003, 30.2233395394591, -84.8890842716471, 35.0080345439918,
    ];

    const southDakotaExtent = [
      -104.313330207997, 42.39802160129079, -96.28758932146249,
      46.05682039645526,
    ];

    const extent3857 = transformExtent(
      southDakotaExtent,
      "EPSG:4326",
      "EPSG:3857"
    );
    map
      .getView()
      .fit(extent3857, { size: map.getSize(), padding: [10, 10, 10, 10] });

    return () => {
      if (map) {
        map.getView().setCenter([0, 0]);
        map.getView().setZoom(2);
      }
    };
  }, [map]);

  return null;
};

export default GeoJsonReactArea;
