import { ExpandLess, ExpandMore, Star, StarBorder } from "@mui/icons-material";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  collapseAreaSettingsArea,
  markArea,
  selectChangedAreas,
} from "../../redux/slices/AreaSettingsSlice";

const AreaSettingsItem = ({
  area,
  hierarchyLevel,
  isExpandable,
  isExpanded,
}) => {
  const changedAreas = useSelector(selectChangedAreas);
  const dispatch = useDispatch();

  let paddingSize = isExpandable ? hierarchyLevel * 2 : hierarchyLevel * 2 + 4;

  const getStarForArea = (area) => {
    const isMarkedFavorite =
      changedAreas.find((a) => a.identificator === area.areaId)?.value ??
      area.isFavorite;
    return isMarkedFavorite ? <Star /> : <StarBorder />;
  };

  const handleExpandCollapse = (area) => {
    dispatch(collapseAreaSettingsArea({ areaId: area.areaId }));
  };

  const handleStarClick = (area) => {
    dispatch(markArea({ area: area }));
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
};
