import * as React from "react";
import { Edit } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material";
import PropTypes from "prop-types";
import { createLayerByType } from "../../utils/customFunctions";

export default function LayerList({
  layers,
  addLayerToMap,
  removeLayerFromMap,
}) {
  const [checked, setChecked] = React.useState([]);

  function isLayerChecked(layer) {
    return checked.indexOf(layer.layerId) !== -1;
  }

  function handleToggle(event, layer) {
    const currentIndex = checked.indexOf(layer.layerId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(layer.layerId);
      addLayerToMap(createLayerByType(layer));
    } else {
      newChecked.splice(currentIndex, 1);
      removeLayerFromMap(layer);
    }

    setChecked(newChecked);
  }

  function getLayerItem(layer) {
    let paddingSize = 4;
    return (
      <div>
        <ListItem
          id={`switch-list-item-${layer.layerId}`}
          sx={{ pl: paddingSize }}
        >
          <ListItemText
            id={`switch-list-text-label-${layer.layerId}`}
            primary={layer.name}
          />
          <IconButton size="small" color="sideBrown">
            <Edit />
          </IconButton>
          <Switch
            edge="end"
            size="small"
            color="sideBrown"
            onChange={(e) => handleToggle(e, layer)}
            checked={isLayerChecked(layer)}
          />
        </ListItem>
        <Divider />
      </div>
    );
  }
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {layers.map((layer) => getLayerItem(layer))}
    </List>
  );
}

LayerList.propTypes = {
  layers: PropTypes.array,
  addLayerToMap: PropTypes.func,
  removeLayerFromMap: PropTypes.func,
};
