import { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { layerSettingsAnnotation, layerSettingsTitle } from "../../utils/data";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { favoriteMockLayers, mockLayers } from "../../data/mockData";

const LayerSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [layers, setLayers] = useState(mockLayers);
  const [favoriteLayers, setFavoriteLayers] = useState(mockLayers);

  function addLayerToFavorites(layer) {
    let newFavoriteLayers = [...favoriteLayers];
    newFavoriteLayers.push(layer);
    setFavoriteLayers(newFavoriteLayers);
  }

  function removeLayerFromFavorites(layer) {
    let newFavoriteLayers = [...favoriteLayers];
    let index = newFavoriteLayers.indexOf(layer);
    if (index !== -1) {
      newFavoriteLayers.splice(index, 1);
    }
    setFavoriteLayers(newFavoriteLayers);
  }

  function handleStarClick(layer) {
    if (favoriteLayers.indexOf(layer) !== -1) {
      removeLayerFromFavorites(layer);
    } else {
      addLayerToFavorites(layer);
    }
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
            {favoriteLayers.indexOf(layer) !== -1 ? <Star /> : <StarBorder />}
          </IconButton>
          <ListItemText
            id={`settings-list-text-label-${layer.layerId}`}
            primary={layer.name}
          ></ListItemText>
        </ListItem>
        <Divider />
      </div>
    );
  }

  return (
    <div>
      <SettingsHeader
        title={layerSettingsTitle}
        annotation={layerSettingsAnnotation}
        setFilter={setFilter}
      />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {layers.map((layer) => getLayerItem(layer))}
      </List>
    </div>
  );
};

export default LayerSettingsPage;