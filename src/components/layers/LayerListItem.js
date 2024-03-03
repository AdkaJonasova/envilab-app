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
    <div key={`layer-list-item-container-${layer.layerId}`}>
      <ListItem
        key={`layer-list-item-${layer.layerId}`}
        sx={{ pl: paddingSize }}
      >
        <ListItemText
          key={`layer-list-item-name-${layer.layerId}`}
          primary={layer.geoLayer.name}
        />
        <IconButton
          key={`layer-list-item-edit-${layer.layerId}`}
          size="small"
          color="beigeBrown"
        >
          <Edit />
        </IconButton>
        <Switch
          key={`layer-list-item-switch-${layer.layerId}`}
          edge="end"
          size="small"
          color="beigeBrown"
          onChange={() => handleLayerStateSwitch(layer)}
          checked={layer.isActive}
        />
      </ListItem>
      <Divider key={`layer-list-divider-${layer.layerId}`} />
    </div>
  );
}

LayerListItem.propTypes = {
  layer: PropTypes.object,
  handleLayerStateSwitch: PropTypes.func,
};
