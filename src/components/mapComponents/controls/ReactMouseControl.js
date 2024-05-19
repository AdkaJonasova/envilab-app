import { useContext, useEffect } from "react";
import { MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate";
import MapContext from "../MapContext";
import { MapProjections } from "../../../utils/enums";

const ReactMouseControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let mouseControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: MapProjections.EPSG4326,
      className: "mouse-position",
    });
    map.controls.push(mouseControl);
    return () => map.controls.remove(mouseControl);
  }, [map]);

  return null;
};

export default ReactMouseControl;
