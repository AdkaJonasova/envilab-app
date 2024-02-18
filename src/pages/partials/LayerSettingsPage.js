import { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
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
  const [changedLayers, setChangedLayers] = useState([]);

  const { t } = useTranslation();
  const { data: layers, isFetched: areLayersReady } = useLayers(userId);

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
  }

  function handleReset() {
    let newChangedLayers = [];
    setChangedLayers(newChangedLayers);
  }

  function handleStarClick(layer) {
    let changedLayer = layer;
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
    </div>
  );
};

export default LayerSettingsPage;
