import { ExpandLess, ExpandMore, Star, StarBorder } from "@mui/icons-material";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const AreaSettingsItem = ({
  area,
  hierarchyLevel,
  isExpandable,
  isExpanded,
  isMarkedFavorite,
  handleExpandCollapse,
  handleStarClick,
}) => {
  let paddingSize = isExpandable ? hierarchyLevel * 2 : hierarchyLevel * 2 + 4;

  const getStarForArea = (area) => {
    return isMarkedFavorite(area) ? <Star /> : <StarBorder />;
  };

  const addExpandCollapseItem = (area) => {
    if (isExpandable) {
      return (
        <IconButton
          key={`area-list-item-expand-${area.areaId}`}
          size="small"
          onClick={() => handleExpandCollapse(area)}
        >
          {isExpanded(area) ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      );
    }
    return null;
  };

  return (
    <div key={`settings-area-item-container-${area.areaId}`}>
      <ListItem
        key={`settings-area-item-${area.areaId}`}
        sx={{ pl: paddingSize }}
      >
        {addExpandCollapseItem(area)}
        <ListItemText
          key={`settings-area-item-name-${area.areaId}`}
          primary={area.geoArea.name}
        ></ListItemText>
        <IconButton
          key={`settings-area-item-icon-${area.areaId}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleStarClick(area)}
          sx={{ marginLeft: 2 }}
        >
          {getStarForArea(area)}
        </IconButton>
      </ListItem>
      <Divider key={`settings-area-item-divider-${area.areaId}`} />
    </div>
  );
};

export default AreaSettingsItem;

AreaSettingsItem.propTypes = {
  area: PropTypes.object,
  hierarchyLevel: PropTypes.number,
  isExpandable: PropTypes.bool,
  isExpanded: PropTypes.func,
  isMarkedFavorite: PropTypes.func,
  handleExpandCollapse: PropTypes.func,
  handleStarClick: PropTypes.func,
};
