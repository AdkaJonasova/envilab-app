import React from "react";
import { useEffect, useRef, useState } from "react";

import Map from "ol/Map.js";
import FullScreenControl from "ol/control/FullScreen";
import { Zoom } from "ol/control";
import { OSM } from "ol/source.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

import Sidebar from "../components/Sidebar";
import { Grid } from "@mui/material";
import { removeLayersWithId } from "../utils/customFunctions";
import TableDataWindow from "../components/dataWindows/TableDataWindow";
import { states, statesHeaders } from "../data/mockData";

const LayerViewPage = () => {
  const fullScreenControl = new FullScreenControl();
  const zoomControl = new Zoom({});

  const mapTargetElement = useRef();
  const [map, setMap] = useState(null);
  const [showTableWindow, setShowTableWindow] = useState(false);

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

  function addLayerToMap(layer) {
    map.addLayer(layer);
  }

  function removeLayerFromMap(layer) {
    removeLayersWithId(map, layer.layerId);
  }

  function getPageContent() {
    if (showTableWindow) {
      return (
        <div>
          <Grid
            container
            spacing={2}
            marginTop={1}
            marginBottom={1}
            paddingX={2}
          >
            <Grid item xs={3}>
              <Sidebar
                addLayerToMap={addLayerToMap}
                removeLayerFromMap={removeLayerFromMap}
                setShowTableWindow={setShowTableWindow}
              />
            </Grid>
            <Grid item xs={6}>
              <div
                ref={mapTargetElement}
                className="map"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              ></div>
            </Grid>
            <Grid item xs={3}>
              <TableDataWindow headers={statesHeaders} data={states} />
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <Grid container spacing={2} marginTop={1} marginBottom={1}>
            <Grid item xs={3}>
              <Sidebar
                addLayerToMap={addLayerToMap}
                removeLayerFromMap={removeLayerFromMap}
                setShowTableWindow={setShowTableWindow}
              />
            </Grid>
            <Grid item xs={9}>
              <div
                ref={mapTargetElement}
                className="map"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              ></div>
            </Grid>
          </Grid>
        </div>
      );
    }
  }

  return getPageContent();
};

export default LayerViewPage;
