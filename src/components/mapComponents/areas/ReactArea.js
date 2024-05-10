import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import { transformExtent } from "ol/proj";
import PropTypes from "prop-types";
import { MapProjections } from "../../../utils/enums";

const ReactArea = ({ area }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const minX = area.extent.minx;
    const maxx = area.extent.maxx;
    const miny = area.extent.miny;
    const maxy = area.extent.maxy;

    const areaExtent = [minX, miny, maxx, maxy];
    const extent3857 = transformExtent(
      areaExtent,
      area.projection,
      MapProjections.EPSG3857
    );

    map
      .getView()
      .fit(extent3857, { size: map.getSize(), padding: [20, 20, 20, 20] });

    return () => {
      if (map) {
        map.getView().setCenter([0, 0]);
        map.getView().setZoom(2);
      }
    };
  }, [map]);

  return null;
};

export default ReactArea;

ReactArea.propTypes = {
  area: PropTypes.object,
};
