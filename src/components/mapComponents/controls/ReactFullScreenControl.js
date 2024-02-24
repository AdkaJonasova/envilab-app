// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import React, { useContext, useEffect, useState } from "react";
import { FullScreen } from "ol/control";
import MapContext from "../MapContext";

const ReactFullScreenControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({});
    map.controls.push(fullScreenControl);
    return () => map.controls.remove(fullScreenControl);
  }, [map]);

  return null;
};

export default ReactFullScreenControl;
