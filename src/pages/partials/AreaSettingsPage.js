import { useState } from "react";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { useTranslation } from "react-i18next";
import { changeFavoriteAreas } from "../../hooks/areaHooks";
import { userId } from "../../data/mockData";
import Loading from "../../components/global/Loading";
import { Close } from "@mui/icons-material";
import { Collapse, IconButton, List, Snackbar } from "@mui/material";
import AreaSettingsItem from "../../components/settings/AreaSettingsItem";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAreasFavoriteState,
  selectAreasByTitle,
  selectAreasError,
  selectAreasStatus,
} from "../../redux/slices/AreasSlice";
import {
  clearChanges,
  markArea,
  selectChangedAreas,
  selectCollapsedAreas,
} from "../../redux/slices/AreaSettingsSlice";
import { FetchStates } from "../../utils/enums";
import ErrorWindow from "../../components/global/ErrorWindow";
import { collapseAreaSection } from "../../redux/slices/AreaListSectionsSlice";

const AreaSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const areas = useSelector((state) => selectAreasByTitle(state, filter));
  const areasStatus = useSelector(selectAreasStatus);
  const areasError = useSelector(selectAreasError);

  const collapsedAreas = useSelector(selectCollapsedAreas);
  const changedAreas = useSelector(selectChangedAreas);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (areasStatus === FetchStates.Idle || areasStatus === FetchStates.Loading) {
    return <Loading />;
  }

  if (areasStatus === FetchStates.Failed) {
    return <ErrorWindow errorMessage={areasError} />;
  }

  //#region Helper methods

  const handleSave = () => {
    dispatch(changeAreasFavoriteState({ changes: changedAreas }));
    changeFavoriteAreas(userId, changedAreas);
    dispatch(clearChanges());
    setSnackbarOpen(true);
  };

  const handleReset = () => {
    dispatch(clearChanges());
  };

  const handleStarClick = (area) => {
    dispatch(markArea({ area: area }));
  };

  const isMarkedFavorite = (area) => {
    return (
      changedAreas.find((a) => a.identificator === area.areaId)?.value ??
      area.isFavorite
    );
  };

  const handleExpandCollapse = (area) => {
    dispatch(collapseAreaSection({ areaId: area.areaId }));
  };

  const isExpanded = (area) => {
    return !collapsedAreas.includes(area.areaId);
  };

  const getAreaItem = (area, level) => {
    if (area.geoArea.subAreas.length === 0) {
      return (
        <AreaSettingsItem
          key={`settings-area-item-component-${area.areaId}`}
          area={area}
          hierarchyLevel={level}
          isExpandable={false}
          isExpanded={isExpanded}
          isMarkedFavorite={isMarkedFavorite}
          handleExpandCollapse={handleExpandCollapse}
          handleStarClick={handleStarClick}
        />
      );
    } else {
      return (
        <div key={`settings-area-item-exp-container-${area.areaId}`}>
          <AreaSettingsItem
            key={`settings-area-item-component-${area.areaId}`}
            area={area}
            hierarchyLevel={level}
            isExpandable={true}
            isExpanded={isExpanded}
            isMarkedFavorite={isMarkedFavorite}
            handleExpandCollapse={handleExpandCollapse}
            handleStarClick={handleStarClick}
          />
          <Collapse
            key={`settings-area-item-collapsable-${area.areaId}`}
            in={isExpanded(area)}
            timeout={"auto"}
            unmountOnExit
          >
            <List dense disablePadding>
              {area.geoArea.subAreas.map((subArea) =>
                getAreaItem(subArea, level + 1)
              )}
            </List>
          </Collapse>
        </div>
      );
    }
  };

  //#endregion

  return (
    <div>
      <SettingsHeader
        title={t("settings.areas.title")}
        annotation={t("settings.areas.annotation")}
        setFilter={setFilter}
        handleSettingsSave={handleSave}
        handleSettingsReset={handleReset}
      />
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {areas.map((area) => getAreaItem(area, 0))}
      </List>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t("settings.snackbarText")}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default AreaSettingsPage;
