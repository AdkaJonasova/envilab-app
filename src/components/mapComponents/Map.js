import React, { useEffect, useRef, useState } from "react";

import { Map } from "ol";
import { OSM } from "ol/source.js";
import { Zoom, FullScreen } from "ol/control";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

import { favoriteMockLayers } from "../../data/mockData";
import { createLayerByType } from "../../utils/customFunctions";

import PropTypes from "prop-types";

export default function ReactMap({ layers }) {
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

  function getMapLayers(layerInfos) {
    let initLayers = [new TileLayer({ source: new OSM() })];
    let activeLayerIds = layerInfos
      .filter((l) => l.isActive === true)
      .map((l) => l.layerID);
    let layersToActivate = favoriteMockLayers.filter(
      (l) => activeLayerIds.indexOf(l.layerId) !== -1
    );
    layersToActivate.forEach((l) => initLayers.push(createLayerByType(l)));
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
};
