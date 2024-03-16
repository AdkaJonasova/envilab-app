import { Star, StarBorder } from "@mui/icons-material";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

export default function LayerSettingsItem({
  layer,
  isMarkedFavorite,
  handleStarClick,
}) {
  function getStarForLayer(layer) {
    return isMarkedFavorite(layer) ? <Star /> : <StarBorder />;
  }

  return (
    <div key={`settings-layer-item-container-${layer.layerId}`}>
      <ListItem key={`settings-layer-item-${layer.layerId}`}>
        <ListItemText
          key={`settings-layer-item-name-${layer.layerId}`}
          primary={layer.geoLayer.name}
        ></ListItemText>
        <IconButton
          key={`settings-layer-item-icon-${layer.layerId}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleStarClick(layer)}
        >
          {getStarForLayer(layer)}
        </IconButton>
      </ListItem>
      <Divider key={`settings-layer-item-divider-${layer.layerId}`} />
    </div>
  );
}

LayerSettingsItem.propTypes = {
  layer: PropTypes.object,
  isMarkedFavorite: PropTypes.func,
  handleStarClick: PropTypes.func,
};
