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

  const handleAddAllToFavorite = () => {
    areas.forEach((area) => {
      dispatch(markArea({ area: area, value: true }));
    });
  };

  const handleRemoveAllFromFavorite = () => {
    areas.forEach((area) => {
      dispatch(markArea({ area: area, value: false }));
    });
  };

  const isExpanded = (area) => {
    return !collapsedAreas.includes(area.name);
  };

  const getAreaItem = (area, level) => {
    if (area.subAreas.length === 0) {
      return (
        <AreaSettingsItem
          key={`settings-area-item-component-${area.name}`}
          area={area}
          hierarchyLevel={level}
          isExpandable={false}
          isExpanded={isExpanded}
        />
      );
    } else {
      return (
        <div key={`settings-area-item-exp-container-${area.name}`}>
          <AreaSettingsItem
            key={`settings-area-item-component-${area.name}`}
            area={area}
            hierarchyLevel={level}
            isExpandable={true}
            isExpanded={isExpanded}
          />
          <Collapse
            key={`settings-area-item-collapsable-${area.name}`}
            in={isExpanded(area)}
            timeout={"auto"}
            unmountOnExit
          >
            <List dense disablePadding>
              {area.subAreas.map((subArea) => getAreaItem(subArea, level + 1))}
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
        starTooltip={t("settings.areas.starTooltip")}
        starBorderTooltip={t("settings.areas.starBorderTooltip")}
        handleSettingsSave={handleSave}
        handleSettingsReset={handleReset}
        handleAddAllToFavorite={handleAddAllToFavorite}
        handleRemoveAllFromFavorite={handleRemoveAllFromFavorite}
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
