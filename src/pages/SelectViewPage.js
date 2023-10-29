import React from "react";
import { useEffect, useRef, useState } from "react";

import Map from "ol/Map.js";
import FullScreenControl from "ol/control/FullScreen";
import { Zoom } from "ol/control";
import { OSM } from "ol/source.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

const SelectViewPage = () => {
  const fullScreenControl = new FullScreenControl();
  const zoomControl = new Zoom({});

  const mapTargetElement = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
      controls: [fullScreenControl, zoomControl],
      view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 0,
        maxZoom: 28,
      }),
    });

    map.setTarget(mapTargetElement.current || "");
    setMap(map);
    return () => map.setTarget("");
  }, []);

  return (
    <div
      ref={mapTargetElement}
      className="map"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    ></div>
  );
};

export default SelectViewPage;
