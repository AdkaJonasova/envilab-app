import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import { Alert, Collapse, Snackbar, Typography } from "@mui/material";
import AreaListItem from "./AreaListItem";
import { userId } from "../../data/mockData";
import { activateArea, deactivateArea } from "../../hooks/areaHooks";
import { collapseAreaSection } from "../../redux/slices/AreaListSectionsSlice";
import {
  changeAreaActiveState,
  selectActiveAreas,
  selectFavoriteAreasByTitle,
} from "../../redux/slices/AreasSlice";

const AreaList = ({ filter }) => {
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const areas = useSelector((state) =>
    selectFavoriteAreasByTitle(state, filter)
  );
  const zoomedAreas = useSelector((state) => selectActiveAreas(state));
  const collapsedAreas = useSelector((state) => state.collapsedAreaSections);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  //#region Methods

  const handleExpandCollapse = (area) => {
    dispatch(collapseAreaSection(area.name));
  };

  const isAreaExpanded = (area) => {
    return !collapsedAreas.includes(area.name);
  };

  const handleZoomToArea = (area) => {
    zoomedAreas.forEach((area) => {
      deactivateArea(userId, area.name);
    });
    activateArea(userId, area.name);

    dispatch(changeAreaActiveState({ areaName: area.name, activate: true }));
  };

  const handleUnzoomArea = (area) => {
    deactivateArea(userId, area.name)
      .then((_r) => {
        dispatch(
          changeAreaActiveState({ areaName: area.name, activate: false })
        );
      })
      .catch((_e) => {
        setErrorSnackbarOpen(true);
      });
  };

  const getAreaItem = (area, level) => {
    if (area.subAreas.length === 0) {
      return (
        <AreaListItem
          key={`area-list-item-component-${area.name}`}
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
        <div key={`area-list-item-outer-container-${area.name}`}>
          <AreaListItem
            key={`area-list-item-component-${area.name}`}
            area={area}
            hierarchyLevel={level}
            isExpandable={true}
            handleZoomToArea={handleZoomToArea}
            handleUnzoomArea={handleUnzoomArea}
            handleExpandCollapse={handleExpandCollapse}
            isExpanded={isAreaExpanded}
          />
          <Collapse
            key={`area-list-item-collapsable-${area.name}`}
            in={isAreaExpanded(area)}
            timeout={"auto"}
            unmountOnExit
          >
            <List disablePadding>
              {area.subAreas.map((subArea) => getAreaItem(subArea, level + 1))}
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
      <List sx={{ width: "100%", bgcolor: "background.paper" }} dense>
        {areas.length === 0
          ? getEmptyListText()
          : areas.map((area) => getAreaItem(area, 0))}
      </List>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {t("errorSnackbar.errorUnzoom")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AreaList;

AreaList.propTypes = {
  filter: PropTypes.string,
};
