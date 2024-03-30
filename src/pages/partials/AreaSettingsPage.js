import { useEffect, useState } from "react";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { useTranslation } from "react-i18next";
import { changeFavoriteAreas, useAreas } from "../../hooks/areaHooks";
import { userId } from "../../data/mockData";
import Loading from "../../components/global/Loading";
import { Close } from "@mui/icons-material";
import { Collapse, IconButton, List, Snackbar } from "@mui/material";
import AreaSettingsItem from "../../components/settings/AreaSettingsItem";
import { filterAreasByName } from "../../utils/customFunctions";

const AreaSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // const [filteredAreas, setFilteredAreas] = useState([]);
  const [changedAreas, setChangedAreas] = useState([]);
  const [expandedAreas, setExpandedAreas] = useState([]);

  const { t } = useTranslation();
  const {
    data: areas,
    isFetched: areaAreasReady,
    isRefetching: areAreasRefetching,
    refetch: refetchAreas,
  } = useAreas(userId);

  //#region Helper methods

  if (!areaAreasReady || areAreasRefetching) {
    return <Loading />;
  }

  function handleSave() {
    changeFavoriteAreas(userId, changedAreas).then(() => refetchAreas());
    setChangedAreas([]);
    setSnackbarOpen(true);
  }

  function handleReset() {
    setChangedAreas([]);
  }

  function removeFromChanged(index, newChangedAreas) {
    newChangedAreas.splice(index, 1);
  }

  function addToChanged(area, newChangedAreas) {
    let changedArea = {
      identificator: area.areaId,
      value: !area.isFavorite,
    };
    newChangedAreas.push(changedArea);
  }

  function handleStarClickHierarchically(
    area,
    newChangedAreas,
    parentIsFavorite,
    useParent
  ) {
    // child area should have the same value as parent
    if (useParent) {
      let areaChangedIndex = newChangedAreas.findIndex(
        (a) => a.identificator === area.areaId
      );

      // child area is changed and the changed value is not equal to parent value -> remove from changed
      if (areaChangedIndex !== -1 && !area.isFavorite !== parentIsFavorite) {
        removeFromChanged(areaChangedIndex, newChangedAreas);

        // child area is not changes and the original value is not equal to parent value -> add to changed
      } else if (area.isFavorite !== parentIsFavorite) {
        addToChanged(area, newChangedAreas);
      }

      // change the value only based on the area itself
    } else {
      let areaChangedIndex = newChangedAreas.findIndex(
        (a) => a.identificator === area.areaId
      );
      if (areaChangedIndex !== -1) {
        removeFromChanged(areaChangedIndex, newChangedAreas);
        area.geoArea.subAreas.forEach((subArea) =>
          handleStarClickHierarchically(
            subArea,
            newChangedAreas,
            area.isFavorite,
            true
          )
        );
      } else {
        addToChanged(area, newChangedAreas);
        area.geoArea.subAreas.forEach((subArea) =>
          handleStarClickHierarchically(
            subArea,
            newChangedAreas,
            !area.isFavorite,
            true
          )
        );
      }
    }
  }

  function handleStarClick(area) {
    let newChangedAreas = [...changedAreas];
    handleStarClickHierarchically(
      area,
      newChangedAreas,
      area.isFavorite,
      false
    );
    setChangedAreas(newChangedAreas);
  }

  function isMarkedFavorite(area) {
    return (
      changedAreas.find((a) => a.identificator === area.areaId)?.value ??
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
        {filterAreasByName(areas, filter).map((area) => getAreaItem(area, 0))}
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
