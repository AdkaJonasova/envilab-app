import { Edit } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material";
import PropTypes from "prop-types";

export default function LayerListItem({ layer, handleLayerStateSwitch }) {
  let paddingSize = 4;
  return (
    <div>
      <ListItem
        key={`layer-list-item-${layer.layerId}`}
        sx={{ pl: paddingSize }}
      >
        <ListItemText
          key={`layer-list-text-label-${layer.layerId}`}
          primary={layer.geoLayer.name}
        />
        <IconButton
          key={`layer-list-icon-btn-${layer.layerId}`}
          size="small"
          color="sideBrown"
        >
          <Edit />
        </IconButton>
        <Switch
          key={`layer-list-switch-btn-${layer.layerId}`}
          edge="end"
          size="small"
          color="sideBrown"
          onChange={() => handleLayerStateSwitch(layer)}
          checked={layer.isActive}
        />
      </ListItem>
      <Divider />
    </div>
  );
}

LayerListItem.propTypes = {
  layer: PropTypes.object,
  handleLayerStateSwitch: PropTypes.func,
};
