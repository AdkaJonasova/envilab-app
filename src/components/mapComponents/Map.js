import React, { useEffect, useRef, useState } from "react";

import { Map } from "ol";
import { OSM } from "ol/source.js";
import { Zoom, FullScreen } from "ol/control";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

import { createLayerByType } from "../../utils/customFunctions";

import PropTypes from "prop-types";

export default function ReactMap2({ layers, areas }) {
  const [map, setMap] = useState(null);
  const mapTargetElement = useRef();

  const fullScreenControl = new FullScreen();
  const zoomControl = new Zoom({});

  useEffect(() => {
    let initLayers = getMapLayers(layers);
    const newMap = new Map({
      target: mapTargetElement.current,
      layers: initLayers,
      controls: [fullScreenControl, zoomControl],
      view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 0,
        maxZoom: 28,
      }),
    });

    setMap(newMap);
    return () => newMap.setTarget(null);
  }, []);

  function getMapLayers(layers) {
    let initLayers = [new TileLayer({ source: new OSM() })];
    let activeLayers = layers.filter(
      (l) => l.isActive === true && l.geoLayer.source !== undefined
    );
    activeLayers.forEach((l) => initLayers.push(createLayerByType(l.geoLayer)));
    return initLayers;
  }

  return (
    <div
      ref={mapTargetElement}
      className="map-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    ></div>
  );
}

ReactMap.propTypes = {
  layers: PropTypes.array,
  areas: PropTypes.array,
};
