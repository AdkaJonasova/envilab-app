import { useState } from "react";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { useTranslation } from "react-i18next";
import {
  addFavoriteArea,
  removeFavoriteArea,
  useAreas,
} from "../../hooks/areaHooks";
import { userId } from "../../data/mockData";
import Loading from "../../components/global/Loading";
import { Close } from "@mui/icons-material";
import { Collapse, IconButton, List, Snackbar } from "@mui/material";
import AreaSettingsItem from "../../components/settings/AreaSettingsItem";

const AreaSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [changesAreas, setChangedAreas] = useState([]);
  const [expandedAreas, setExpandedAreas] = useState([]);

  const { t } = useTranslation();
  const { data: areas, isFetched: areaAreasReady } = useAreas(userId);

  if (!areaAreasReady) {
    return <Loading />;
  }

  //#region Helper methods

  function handleSave() {
    changesAreas.forEach((a) => {
      a.isFavorite
        ? addFavoriteArea(userId, a.areaId)
        : removeFavoriteArea(userId, a.areaId);
    });
    setSnackbarOpen(true);
  }

  function handleReset() {
    setChangedAreas([]);
  }

  function handleStarClick(area) {
    let changedArea = { ...area };
    changedArea.isFavorite = !area.isFavorite;

    let newChangedAreas = [...changesAreas];
    newChangedAreas.push(changedArea);

    changedArea.geoArea.subAreas.forEach((subArea) => {
      let changedSubArea = { ...subArea };
      changedSubArea.isFavorite = !subArea.isFavorite;
      newChangedAreas.push(changedSubArea);
    });
    setChangedAreas(newChangedAreas);
  }

  function isMarkedFavorite(area) {
    return (
      changesAreas.find((a) => a.areaId === area.areaId)?.isFavorite ??
      area.isFavorite
    );
  }

  function handleExpandCollapse(area) {
    const currentIndex = expandedAreas.indexOf(area.areaId);
    const newExpanded = [...expandedAreas];

    if (currentIndex === -1) {
      newExpanded.push(area.areaId);
    } else {
      newExpanded.splice(currentIndex, 1);
    }

    setExpandedAreas(newExpanded);
  }

  function isExpanded(area) {
    return expandedAreas.indexOf(area.areaId) !== -1;
  }

  function getAreaItem(area, level) {
    if (area.geoArea.subAreas.length === 0) {
      return (
        <AreaSettingsItem
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
            in={expandedAreas.indexOf(area.areaId) !== -1}
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
  }

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
