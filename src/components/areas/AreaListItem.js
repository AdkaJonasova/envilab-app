import { ExpandLess, ExpandMore, ZoomIn, ZoomOut } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";

import PropTypes from "prop-types";

const AreaListItem = ({
  area,
  hierarchyLevel,
  isExpandable,
  handleZoomToArea,
  handleUnzoomArea,
  handleExpandCollapse,
  isExpanded,
}) => {
  let paddingSize = isExpandable ? hierarchyLevel * 2 : hierarchyLevel * 2 + 4;

  //#region Methods
  const addUnzoomArea = (area) => {
    if (area.isActive) {
      return (
        <IconButton
          key={`area-list-item-unzoom-${area.name}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleUnzoomArea(area)}
        >
          <ZoomOut />
        </IconButton>
      );
    }
    return null;
  };

  const addExpandCollapseItem = (area) => {
    return (
      <IconButton
        key={`area-list-item-expand-${area.name}`}
        size="small"
        onClick={() => handleExpandCollapse(area)}
      >
        {isExpanded(area) ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    );
  };

  const addAreaCustomIcon = (area) => {
    if (area.isCustom) {
      return <LockPersonIcon color="darkGreen" />;
    }
  };
  //#endregion

  return (
    <div>
      <ListItem key={`area-list-item-${area.name}`} sx={{ pl: paddingSize }}>
        {isExpandable ? addExpandCollapseItem(area) : ""}
        <ListItemText key={`area-list-item-name-${area.name}`}>
          <Typography
            variant="body1"
            fontWeight={area.isActive ? "bold" : "normal"}
          >
            {area.title}
          </Typography>
        </ListItemText>
        {addAreaCustomIcon(area)}
        {addUnzoomArea(area)}
        <IconButton
          key={`area-list-item-zoom-into-${area.name}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleZoomToArea(area)}
        >
          <ZoomIn />
        </IconButton>
      </ListItem>
      <Divider key={`area-list-item-divider-${area.name}`} />
    </div>
  );
};

export default AreaListItem;

AreaListItem.propTypes = {
  area: PropTypes.object,
  hierarchyLevel: PropTypes.number,
  isExpandable: PropTypes.bool,
  handleZoomToArea: PropTypes.func,
  handleUnzoomArea: PropTypes.func,
  handleExpandCollapse: PropTypes.func,
  isExpanded: PropTypes.func,
};
