import { ExpandLess, ExpandMore, ZoomIn, ZoomOut } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

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
          key={`area-list-item-unzoom-${area.areaId}`}
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
        key={`area-list-item-expand-${area.areaId}`}
        size="small"
        onClick={() => handleExpandCollapse(area)}
      >
        {isExpanded(area) ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    );
  };
  //#endregion

  return (
    <div>
      <ListItem key={`area-list-item-${area.areaId}`} sx={{ pl: paddingSize }}>
        {isExpandable ? addExpandCollapseItem(area) : ""}
        <ListItemText key={`area-list-item-name-${area.areaId}`}>
          <Typography
            variant="body1"
            fontWeight={area.isActive ? "bold" : "normal"}
          >
            {area.geoArea.name}
          </Typography>
        </ListItemText>
        {addUnzoomArea(area)}
        <IconButton
          key={`area-list-item-zoom-into-${area.areaId}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleZoomToArea(area)}
        >
          <ZoomIn />
        </IconButton>
      </ListItem>
      <Divider key={`area-list-item-divider-${area.areaId}`} />
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
