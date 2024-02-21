import { useEffect, useState } from "react";
import { Star, StarBorder, Close } from "@mui/icons-material";
import {
  Divider,
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

  const { t } = useTranslation();
  const { data: layers, isFetched: areLayersReady } = useLayers(userId);

  useEffect(() => {
    console.log("Something changed");
  }, [changedLayers]);

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
      <div>
        <ListItem id={`settings-list-item-${layer.layerId}`}>
          <IconButton
            size="small"
            color="sideBrown"
            onClick={() => handleStarClick(layer)}
          >
            {getStarForLayer(layer)}
          </IconButton>
          <ListItemText
            id={`settings-list-text-label-${layer.layerId}`}
            primary={layer.geoLayer.name}
          ></ListItemText>
        </ListItem>
        <Divider />
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
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {layers.map((layer) => getLayerItem(layer))}
      </List>
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
