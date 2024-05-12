import {
  ExpandLess,
  ExpandMore,
  LockPerson,
  Star,
  StarBorder,
} from "@mui/icons-material";
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

  //#region Methods

  const isMarkedFavorite = (area) => {
    return (
      changedAreas.find((a) => a.identificator === area.name)?.value ??
      area.isFavorite
    );
  };

  const getStarForArea = (area) => {
    return isMarkedFavorite(area) ? <Star /> : <StarBorder />;
  };

  const handleExpandCollapse = (area) => {
    dispatch(collapseAreaSettingsArea({ areaName: area.name }));
  };

  const handleStarClick = (area) => {
    dispatch(markArea({ area: area, value: !isMarkedFavorite(area) }));
  };

  const addExpandCollapseItem = (area) => {
    if (isExpandable) {
      return (
        <IconButton
          key={`area-list-item-expand-${area.name}`}
          size="small"
          onClick={() => handleExpandCollapse(area)}
        >
          {isExpanded(area) ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      );
    }
    return null;
  };

  const addCustomAreaItem = (area) => {
    if (area.isCustom) {
      return <LockPerson color="darkGreen" />;
    }
  };

  //#endregion

  return (
    <div key={`settings-area-item-container-${area.name}`}>
      <ListItem
        key={`settings-area-item-${area.name}`}
        sx={{ pl: paddingSize }}
      >
        {addExpandCollapseItem(area)}
        <ListItemText
          key={`settings-area-item-name-${area.name}`}
          primary={area.title}
        ></ListItemText>
        <IconButton
          key={`settings-area-item-icon-${area.name}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleStarClick(area)}
          sx={{ marginLeft: 2 }}
        >
          {addCustomAreaItem(area)}
          {getStarForArea(area)}
        </IconButton>
      </ListItem>
      <Divider key={`settings-area-item-divider-${area.name}`} />
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
