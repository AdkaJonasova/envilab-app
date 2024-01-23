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
import {
  createLayerByType,
  removeLayersWithId,
} from "../utils/customFunctions";
import { useLayers } from "../hooks/layerHooks";
import { favoriteMockLayers, mockLayers, userId } from "../data/mockData";
import Loading from "../components/global/Loading";

const LayerViewPage = () => {
  const fullScreenControl = new FullScreenControl();
  const zoomControl = new Zoom({});

  const [displayLayers, setDisplayLayers] = useState([]);
  const [pageInitialized, setPageInitialized] = useState(false);

  const [map, setMap] = useState(null);
  const mapTargetElement = useRef();

  const { data: layerInfos, isFetched: areLayerInfosReady } = useLayers(userId);

  useEffect(() => {
    if (areLayerInfosReady) {
      let favoriteLayers = getFavoriteLayers(layerInfos);
      setDisplayLayers(favoriteLayers);

      const newMap = new Map({
        target: mapTargetElement.current,
        layers: getInitActiveLayers(layerInfos),
        controls: [fullScreenControl, zoomControl],
        view: new View({
          center: [0, 0],
          zoom: 2,
          minZoom: 0,
          maxZoom: 28,
        }),
      });
      setMap(newMap);
      setPageInitialized(true);
      return () => newMap.setTarget(null);
    }
  }, [areLayerInfosReady]);

  if (!pageInitialized) {
    return <Loading />;
  }

  function getInitActiveLayers(layers) {
    let initLayers = [new TileLayer({ source: new OSM() })];
    let activeLayerIds = layers
      .filter((l) => l.isActive === true)
      .map((l) => l.layerID);
    let layersToActivate = favoriteMockLayers.filter(
      (l) => activeLayerIds.indexOf(l.layerId) !== -1
    );
    layersToActivate.forEach((l) => initLayers.push(createLayerByType(l)));
    return initLayers;
  }

  function getFavoriteLayers(layers) {
    let favoriteLayerIds = layers
      .filter((l) => l.isFavorite === true)
      .map((l) => l.layerID);
    return mockLayers.filter((l) => favoriteLayerIds.indexOf(l.layerId) !== -1);
  }

  function addLayerToMap(layer) {
    map.addLayer(layer);
  }

  function removeLayerFromMap(layer) {
    removeLayersWithId(map, layer.layerId);
  }

  return (
    <div>
      <Grid container spacing={2} marginTop={1} marginBottom={1}>
        <Grid item xs={3}>
          <Sidebar
            addLayerToMap={addLayerToMap}
            removeLayerFromMap={removeLayerFromMap}
            layers={displayLayers}
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
};

export default LayerViewPage;
