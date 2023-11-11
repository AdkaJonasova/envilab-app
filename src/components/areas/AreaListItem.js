import { Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material";
import PropTypes from "prop-types";

export default function AreaListItem({
  area,
  hierarchyLevel,
  isExpandable,
  handleToggle,
  handleExpandCollapse,
  isChecked,
  isOpened,
}) {
  let paddingSize = isExpandable ? hierarchyLevel * 2 : hierarchyLevel * 2 + 4;

  function addEditButton(isEditable) {
    if (isEditable) {
      return (
        <IconButton size="small" color="sideBrown">
          <Edit />
        </IconButton>
      );
    }
    return null;
  }

  function addExpandCollapseItem(area) {
    return (
      <IconButton size="small" onClick={handleExpandCollapse(area)}>
        {isOpened(area) ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    );
  }

  return (
    <div>
      <ListItem id={`switch-list-item-${area.areaId}`} sx={{ pl: paddingSize }}>
        {isExpandable ? addExpandCollapseItem(area) : ""}
        <ListItemText
          id={`switch-list-text-label-${area.areaId}`}
          primary={area.name}
        />
        {addEditButton(area.isEditable)}
        <Switch
          edge="end"
          size="small"
          color="sideBrown"
          onChange={handleToggle(area)}
          checked={isChecked(area)}
        />
      </ListItem>
      <Divider />
    </div>
  );
}

AreaListItem.propTypes = {
  area: PropTypes.object,
  hierarchyLevel: PropTypes.number,
  isExpandable: PropTypes.bool,
  handleToggle: PropTypes.func,
  handleExpandCollapse: PropTypes.func,
  isChecked: PropTypes.func,
  isOpened: PropTypes.func,
};
