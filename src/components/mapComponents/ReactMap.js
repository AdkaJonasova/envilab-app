// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import React, { useRef, useState, useEffect } from "react";
import MapContext from "./MapContext";
import { Map, View } from "ol";

const ReactMap = ({ children, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    let options = {
      view: new View({ center, zoom: 2 }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div
        ref={mapRef}
        className="ol-map"
        style={{
          width: "100%",
          height: "calc(100vh - 60px)",
        }}
      >
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default ReactMap;
