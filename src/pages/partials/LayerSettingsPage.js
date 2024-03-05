import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { Grid, IconButton, List, Snackbar } from "@mui/material";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { userId } from "../../data/mockData";
import { useTranslation } from "react-i18next";
import {
  addFavoriteLayer,
  removeFavoriteLayer,
  useLayers,
} from "../../hooks/layerHooks";
import Loading from "../../components/global/Loading";
import LayerSettingsItem from "../../components/settings/LayerSettingsItem";

const LayerSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [changedLayers, setChangedLayers] = useState([]);

  const [firstHalfLayers, setFirstHalfLayers] = useState([]);
  const [secondHalfLayers, setSecondHalfLayers] = useState([]);

  const { t } = useTranslation();
  const { data: layers, isFetched: areLayersReady } = useLayers(userId);

  useEffect(() => {
    if (areLayersReady) {
      const midpoint = Math.ceil(layers.length / 2);
      setFirstHalfLayers(layers.slice(0, midpoint));
      setSecondHalfLayers(layers.slice(midpoint));
    }
  }, [areLayersReady]);

  if (!areLayersReady) {
    return <Loading />;
  }

  //#region Helper methods

  function handleSave() {
    changedLayers.forEach((l) => {
      l.isFavorite
        ? addFavoriteLayer(userId, l.layerId)
        : removeFavoriteLayer(userId, l.layerId);
    });
    setSnackbarOpen(true);
  }

  function handleReset() {
    setChangedLayers([]);
  }

  function handleStarClick(layer) {
    let layerChangedIndex = changedLayers.findIndex(
      (l) => l.layerId === layer.layerId
    );
    if (layerChangedIndex !== -1) {
      const newChangedLayers = [...changedLayers];
      newChangedLayers.splice(layerChangedIndex, 1);
      setChangedLayers(newChangedLayers);
    } else {
      let changedLayer = { ...layer };
      changedLayer.isFavorite = !layer.isFavorite;

      let newChangedLayers = [...changedLayers];
      newChangedLayers.push(changedLayer);
      setChangedLayers(newChangedLayers);
    }
  }

  function isMarkedFavorite(layer) {
    return (
      changedLayers.find((l) => l.layerId === layer.layerId)?.isFavorite ??
      layer.isFavorite
    );
  }

  function getLayerItem(layer) {
    return (
      <LayerSettingsItem
        key={`layer-settings-item-component-${layer.layerId}`}
        layer={layer}
        isMarkedFavorite={isMarkedFavorite}
        handleStarClick={handleStarClick}
      />
    );
  }

  //#endregion

  return (
    <div>
      <SettingsHeader
        title={t("settings.layers.title")}
        annotation={t("settings.layers.annotation")}
        setFilter={setFilter}
        handleSettingsSave={handleSave}
        handleSettingsReset={handleReset}
      />
      <Grid container>
        <Grid item xs={6}>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {firstHalfLayers.map((layer) => getLayerItem(layer))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {secondHalfLayers.map((layer) => getLayerItem(layer))}
          </List>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t("settings.snackbarText")}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default LayerSettingsPage;
