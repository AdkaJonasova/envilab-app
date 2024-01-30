import React from "react";
import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import Sidebar from "../components/Sidebar";
import Loading from "../components/global/Loading";
import ReactMap from "../components/mapComponents/Map";
import { useFavoriteLayers } from "../hooks/layerHooks";
import { useFavoriteAreas } from "../hooks/areaHooks";
import { userId } from "../data/mockData";

const LayerViewPage = () => {
  const { data: layers, isFetched: areLayersReady } = useFavoriteLayers(userId);
  const { data: areaInfos, isFetched: areAreasInfosReady } =
    useFavoriteAreas(userId);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (areLayersReady && areAreasInfosReady) {
      setInitialized(true);
    }
  }, [areLayersReady, areAreasInfosReady]);

  if (!initialized) {
    return <Loading />;
  }

  return (
    <div>
      <Grid container spacing={2} marginTop={1} marginBottom={1}>
        <Grid item xs={3}>
          <Sidebar layers={layers} />
        </Grid>
        <Grid item xs={9}>
          <ReactMap layers={layers} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LayerViewPage;
