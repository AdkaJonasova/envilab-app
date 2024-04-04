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
import { filterLayersByName } from "../../utils/customFunctions";

const LayerSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [changedLayers, setChangedLayers] = useState([]);
  const [firstHalfLayers, setFirstHalfLayers] = useState([]);
  const [secondHalfLayers, setSecondHalfLayers] = useState([]);

  const { t } = useTranslation();
  const {
    data: layers,
    isFetched: areLayersReady,
    isRefetching: areLayersRefetching,
    refetch: refetchLayers,
  } = useLayers(userId);

  useEffect(() => {
    if (areLayersReady) {
      const filtered = filterLayersByName(layers, filter);
      const midpoint = Math.ceil(filtered.length / 2);
      setFirstHalfLayers(filtered.slice(0, midpoint));
      setSecondHalfLayers(filtered.slice(midpoint));
    }
  }, [filter, layers]);

  if (!areLayersReady || areLayersRefetching) {
    return <Loading />;
  }

  //#region Helper methods

  async function SaveAll() {
    changedLayers.forEach((l) => {
      l.isFavorite
        ? addFavoriteLayer(userId, l.name)
        : removeFavoriteLayer(userId, l.name);
    });
  }

  function handleSave() {
    SaveAll().then(() => refetchLayers());
    setChangedLayers([]);
    setSnackbarOpen(true);
  }

  function handleReset() {
    setChangedLayers([]);
  }

  function addToChanged(layer, newChangedLayers) {
    let changedLayer = { ...layer };
    changedLayer.isFavorite = !layer.isFavorite;
    newChangedLayers.push(changedLayer);
  }

  function removeFromChanged(index, newChangedLayers) {
    newChangedLayers.splice(index, 1);
  }

  function handleStarClick(layer) {
    let newChangedLayers = [...changedLayers];
    let layerChangedIndex = changedLayers.findIndex(
      (l) => l.name === layer.name
    );
    if (layerChangedIndex !== -1) {
      removeFromChanged(layerChangedIndex, newChangedLayers);
    } else {
      addToChanged(layer, newChangedLayers);
    }
    setChangedLayers(newChangedLayers);
  }

  function isMarkedFavorite(layer) {
    return (
      changedLayers.find((l) => l.name === layer.name)?.isFavorite ??
      layer.isFavorite
    );
  }

  function getLayerItem(layer) {
    return (
      <LayerSettingsItem
        key={`layer-settings-item-component-${layer.name}`}
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
