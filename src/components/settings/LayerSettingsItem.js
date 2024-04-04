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
    <div key={`settings-layer-item-container-${layer.name}`}>
      <ListItem key={`settings-layer-item-${layer.name}`}>
        <ListItemText
          key={`settings-layer-item-name-${layer.name}`}
          primary={layer.title}
        ></ListItemText>
        <IconButton
          key={`settings-layer-item-icon-${layer.name}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleStarClick(layer)}
        >
          {getStarForLayer(layer)}
        </IconButton>
      </ListItem>
      <Divider key={`settings-layer-item-divider-${layer.name}`} />
    </div>
  );
}

LayerSettingsItem.propTypes = {
  layer: PropTypes.object,
  isMarkedFavorite: PropTypes.func,
  handleStarClick: PropTypes.func,
};
