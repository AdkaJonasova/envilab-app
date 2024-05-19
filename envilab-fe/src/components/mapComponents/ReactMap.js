// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified if necessary

import React, { useRef, useState, useEffect } from "react";
import { Map, View } from "ol";
import MapContext from "./MapContext";
import { MapProjections } from "../../utils/enums";

const ReactMap = ({ children, height, marginBottom }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    let options = {
      view: new View({
        projection: MapProjections.EPSG3857,
        center: [0, 0],
        zoom: 2,
      }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <MapContext.Provider value={{ map }}>
      <div
        ref={mapRef}
        className="ol-map"
        style={{
          width: "100%",
          height: `${height}px`,
          marginBottom: `${marginBottom}px`,
        }}
      >
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default ReactMap;
