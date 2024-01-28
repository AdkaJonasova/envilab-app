import React from "react";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import { Grid } from "@mui/material";
import { useLayers } from "../hooks/layerHooks";
import { useAreas } from "../hooks/areaHooks";
import { mockAreas, mockLayers, userId } from "../data/mockData";
import Loading from "../components/global/Loading";
import ReactMap from "../components/mapComponents/Map";

const LayerViewPage = () => {
  const { data: layerInfos, isFetched: areLayerInfosReady } = useLayers(userId);
  const { data: areaInfos, isFetched: areAreasInfosReady } = useAreas(userId);

  const [displayLayers, setDisplayLayers] = useState([]);
  const [displayAreas, setDisplayAreas] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (areLayerInfosReady && areAreasInfosReady) {
      setDisplayLayers(getFavoriteLayers(layerInfos));
      setDisplayAreas(getFavoriteAreas(areaInfos));
      setInitialized(true);
    }
  }, [areLayerInfosReady, areAreasInfosReady]);

  if (!initialized) {
    return <Loading />;
  }

  function getFavoriteLayers(layers) {
    let favoriteLayerIds = layers
      .filter((l) => l.isFavorite === true)
      .map((l) => l.layerID);
    let res = mockLayers.filter(
      (l) => favoriteLayerIds.indexOf(l.layerId) !== -1
    );
    return res;
  }

  function getFavoriteAreas(areas) {
    let favoriteAreasIds = areas
      .filter((a) => a.isFavorite === true)
      .map((a) => a.areaID);
    let res = mockAreas.filter(
      (a) => favoriteAreasIds.indexOf(a.areaId) !== -1
    );
    return res;
  }

  function addLayerToMap(layer) {
    // map.addLayer(layer);
  }

  function removeLayerFromMap(layer) {
    // removeLayersWithId(map, layer.layerId);
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
          <ReactMap layers={layerInfos} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LayerViewPage;
