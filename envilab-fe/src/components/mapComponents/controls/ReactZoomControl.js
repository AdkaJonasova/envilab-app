import React, { useContext, useEffect } from "react";
import { Zoom } from "ol/control";
import MapContext from "../MapContext";

const ReactZoomControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let zoomControl = new Zoom({});
    map.controls.push(zoomControl);
    return () => map.controls.remove(zoomControl);
  }, [map]);

  return null;
};

export default ReactZoomControl;
