import { useEffect, useState } from "react";
import { Star, StarBorder, Close } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { userId } from "../../data/mockData";
import { useTranslation } from "react-i18next";
import {
  addFavoriteLayer,
  removeFavoriteLayer,
  useLayers,
} from "../../hooks/layerHooks";
import Loading from "../../components/global/Loading";

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
    let changedLayer = { ...layer };
    changedLayer.isFavorite = !layer.isFavorite;

    let newChangedLayers = [...changedLayers];
    newChangedLayers.push(changedLayer);
    setChangedLayers(newChangedLayers);
  }

  function getStarForLayer(layer) {
    const isFavorite =
      changedLayers.find((l) => l.layerId === layer.layerId)?.isFavorite ??
      layer.isFavorite;

    return isFavorite ? <Star /> : <StarBorder />;
  }

  function getLayerItem(layer) {
    return (
      <div key={`settings-layer-item-container-${layer.layerId}`}>
        <ListItem key={`settings-layer-item-${layer.layerId}`}>
          <IconButton
            key={`settings-layer-item-icon-${layer.layerId}`}
            size="small"
            color="sideBrown"
            onClick={() => handleStarClick(layer)}
          >
            {getStarForLayer(layer)}
          </IconButton>
          <ListItemText
            key={`settings-layer-item-name-${layer.layerId}`}
            primary={layer.geoLayer.name}
          ></ListItemText>
        </ListItem>
        <Divider key={`settings-layer-item-divider-${layer.layerId}`} />
      </div>
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
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {firstHalfLayers.map((layer) => getLayerItem(layer))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
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
