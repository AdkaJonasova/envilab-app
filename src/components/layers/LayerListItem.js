import { Edit } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material";
import PropTypes from "prop-types";

export default function LayerListItem({
  layer,
  handleLayerStateSwitch,
  handleEditLayer,
  handleDisplayLayerInfo,
}) {
  let paddingSize = 4;
  return (
    <div key={`layer-list-item-container-${layer.name}`}>
      <ListItem key={`layer-list-item-${layer.name}`} sx={{ pl: paddingSize }}>
        <ListItemText
          key={`layer-list-item-name-${layer.name}`}
          primary={layer.title}
          onClick={() => handleDisplayLayerInfo(layer)}
          sx={{ cursor: "pointer" }}
        />
        <IconButton
          key={`layer-list-item-edit-${layer.name}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleEditLayer(layer)}
        >
          <Edit />
        </IconButton>
        <Switch
          key={`layer-list-item-switch-${layer.name}`}
          edge="end"
          size="small"
          color="beigeBrown"
          onChange={() => handleLayerStateSwitch(layer)}
          checked={layer.isActive}
        />
      </ListItem>
      <Divider key={`layer-list-divider-${layer.name}`} />
    </div>
  );
}

LayerListItem.propTypes = {
  layer: PropTypes.object,
  handleLayerStateSwitch: PropTypes.func,
  handleEditLayer: PropTypes.func,
  handleDisplayLayerInfo: PropTypes.func,
};
