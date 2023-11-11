import { Edit } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material";
import PropTypes from "prop-types";

export default function LayerListItem({ layer, handleToggle, isChecked }) {
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
          onChange={() => handleToggle(layer)}
          checked={isChecked(layer)}
        />
      </ListItem>
      <Divider />
    </div>
  );
}

LayerListItem.propTypes = {
  layer: PropTypes.object,
  handleToggle: PropTypes.func,
  isChecked: PropTypes.func,
};
