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
  handleUseArea,
  handleExpandCollapse,
  isUsed,
  isExpanded,
}) {
  let paddingSize = isExpandable ? hierarchyLevel * 2 : hierarchyLevel * 2 + 4;

  function addEditButton(area) {
    if (area.isCustom) {
      return (
        <IconButton
          key={`area-list-item-edit-${area.areaId}`}
          size="small"
          color="beigeBrown"
        >
          <Edit />
        </IconButton>
      );
    }
    return null;
  }

  function addExpandCollapseItem(area) {
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

  return (
    <div>
      <ListItem key={`area-list-item-${area.areaId}`} sx={{ pl: paddingSize }}>
        {isExpandable ? addExpandCollapseItem(area) : ""}
        <ListItemText
          key={`area-list-item-name-${area.areaId}`}
          primary={area.geoArea.name}
        />
        {addEditButton(area)}
        <Switch
          id={`area-list-item-switch-${area.areaId}`}
          edge="end"
          size="small"
          color="beigeBrown"
          onChange={() => handleUseArea(area)}
          checked={isUsed(area)}
        />
      </ListItem>
      <Divider key={`area-list-item-divider-${area.areaId}`} />
    </div>
  );
}

AreaListItem.propTypes = {
  area: PropTypes.object,
  hierarchyLevel: PropTypes.number,
  isExpandable: PropTypes.bool,
  handleUseArea: PropTypes.func,
  handleExpandCollapse: PropTypes.func,
  isUsed: PropTypes.func,
  isExpanded: PropTypes.func,
};
