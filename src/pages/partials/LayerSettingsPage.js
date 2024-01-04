import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { layerSettingsAnnotation, layerSettingsTitle } from "../../utils/data";
import { useState } from "react";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { favoriteMockLayers, mockLayers } from "../../data/mockData";
import { Star, StarBorder } from "@mui/icons-material";

const LayerSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [layers, setLayers] = useState(mockLayers);
  const [favoriteLayers, setFavoriteLayers] = useState(favoriteMockLayers);

  function addLayerToFavorites(layer) {
    let newFavorite = [...favoriteLayers];
    newFavorite.push(layer);
    setFavoriteLayers(newFavorite);
  }

  function removeLayerFromFavorites(layer) {
    let newFavorite = [...favoriteLayers];
    let index = newFavorite.indexOf(layer);
    if (index !== -1) {
      newFavorite.splice(index, 1);
    }
    setFavoriteLayers(newFavorite);
  }

  function handleStartClick(layer) {
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
            onClick={() => handleStartClick(layer)}
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
