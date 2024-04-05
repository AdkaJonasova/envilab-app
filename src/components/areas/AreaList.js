import React from "react";
import List from "@mui/material/List";
import { Button, Collapse, Grid, Typography } from "@mui/material";
import AreaListItem from "./AreaListItem";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { activateArea, deactivateArea } from "../../hooks/areaHooks";
import { userId } from "../../data/mockData";
import { getZoomedToAreas } from "../../utils/customFunctions";
import { useDispatch, useSelector } from "react-redux";
import { collapseAreaSection } from "../../redux/slices/AreaSectionsSlice";

export default function AreaList({ areas, refetch }) {
  const collapsedAreas = useSelector((state) => state.collapsedAreaSections);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  //#region Methods
  const zoomToArea = async (area) => {
    let zoomedToAreas = getZoomedToAreas(areas);
    for (let i = 0; i < zoomedToAreas.length; i++) {
      const zoomedAreaId = zoomedToAreas[i];
      deactivateArea(userId, zoomedAreaId);
    }
    await activateArea(userId, area.areaId);
  };

  const handleZoomToArea = (area) => {
    zoomToArea(area).then(() => refetch());
  };

  const handleUnzoomArea = (area) => {
    deactivateArea(userId, area.areaId).then(() => refetch());
  };

  const handleExpandCollapse = (area) => {
    dispatch(collapseAreaSection(area.areaId));
  };

  const isAreaExpanded = (area) => {
    return !collapsedAreas.includes(area.areaId);
  };

  const getAreaItem = (area, level) => {
    if (area.geoArea.subAreas.length === 0) {
      return (
        <AreaListItem
          key={`area-list-item-component-${area.areaId}`}
          area={area}
          hierarchyLevel={level}
          isExpandable={false}
          handleZoomToArea={handleZoomToArea}
          handleUnzoomArea={handleUnzoomArea}
          handleExpandCollapse={handleExpandCollapse}
          isExpanded={isAreaExpanded}
        />
      );
    } else {
      return (
        <div key={`area-list-item-outer-container-${area.areaId}`}>
          <AreaListItem
            key={`area-list-item-component-${area.areaId}`}
            area={area}
            hierarchyLevel={level}
            isExpandable={true}
            handleZoomToArea={handleZoomToArea}
            handleUnzoomArea={handleUnzoomArea}
            handleExpandCollapse={handleExpandCollapse}
            isExpanded={isAreaExpanded}
          />
          <Collapse
            key={`area-list-item-collapsable-${area.areaId}`}
            in={isAreaExpanded(area)}
            timeout={"auto"}
            unmountOnExit
          >
            <List disablePadding>
              {area.geoArea.subAreas.map((subArea) =>
                getAreaItem(subArea, level + 1)
              )}
            </List>
          </Collapse>
        </div>
      );
    }
  };

  const getEmptyListText = () => {
    return (
      <Typography variant="information">
        {t("layerViewSidebar.areaList.noAreas")}
      </Typography>
    );
  };
  //#endregion

  return (
    <div>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={6}>
          <Button variant="outlined" color="darkGreen" size="small" fullWidth>
            {t("layerViewSidebar.areaList.createSet")}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="darkGreen" size="small" fullWidth>
            {t("layerViewSidebar.areaList.chooseSet")}
          </Button>
        </Grid>
      </Grid>
      <List sx={{ width: "100%", bgcolor: "background.paper" }} dense>
        {areas.length === 0
          ? getEmptyListText()
          : areas.map((area) => getAreaItem(area, 0))}
      </List>
    </div>
  );
}

AreaList.propTypes = {
  areas: PropTypes.array,
  refetch: PropTypes.func,
};
