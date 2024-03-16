import { useContext, useEffect } from "react";
import { MousePosition } from "ol/control";
import MapContext from "../MapContext";
import { createStringXY } from "ol/coordinate";

const ReactMouseControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let mouseControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: "EPSG:4326",
      className: "mouse-position",
    });
    map.controls.push(mouseControl);
    return () => map.controls.remove(mouseControl);
  }, [map]);

  return null;
};

export default ReactMouseControl;
