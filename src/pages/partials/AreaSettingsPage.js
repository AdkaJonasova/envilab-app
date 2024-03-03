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
import {
  Close,
  ExpandLess,
  ExpandMore,
  Star,
  StarBorder,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";

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
    setChangedAreas(newChangedAreas);
  }

  function getStarForArea(area) {
    const isFavorite =
      changesAreas.find((a) => a.areaId === area.areaId)?.isFavorite ??
      area.isFavorite;

    return isFavorite ? <Star /> : <StarBorder />;
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

  function getAreaItem(area) {
    if (area.geoArea.subAreas.length === 0) {
      return (
        <div key={`settings-area-item-container-${area.areaId}`}>
          <ListItem key={`settings-area-item-${area.areaId}`}>
            <IconButton
              key={`settings-area-item-icon-${area.areaId}`}
              size="small"
              color="beigeBrown"
              onClick={() => handleStarClick(area)}
            >
              {getStarForArea(area)}
            </IconButton>
            <ListItemText
              key={`settings-area-item-name-${area.areaId}`}
              primary={area.geoArea.name}
            ></ListItemText>
          </ListItem>
          <Divider key={`settings-area-item-divider-${area.areaId}`} />
        </div>
      );
    } else {
      return (
        <div key={`settings-area-item-container-${area.areaId}`}>
          <ListItem key={`settings-area-item-${area.areaId}`}>
            <IconButton
              key={`settings-area-item-icon-${area.areaId}`}
              size="small"
              color="beigeBrown"
              onClick={() => handleStarClick(area)}
            >
              {getStarForArea(area)}
            </IconButton>
            <ListItemText
              key={`settings-area-item-name-${area.areaId}`}
              primary={area.geoArea.name}
            ></ListItemText>
            <IconButton
              key={`area-list-item-expand-${area.areaId}`}
              size="small"
              onClick={() => handleExpandCollapse(area)}
            >
              {isExpanded(area) ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Divider key={`settings-area-item-divider-${area.areaId}`} />
          <Collapse
            key={`settings-area-item-collapsable-${area.areaId}`}
            in={expandedAreas.indexOf(area.areaId) !== -1}
            timeout={"auto"}
            unmountOnExit
          >
            <List dense disablePadding>
              {area.geoArea.subAreas.map((subArea) => getAreaItem(subArea))}
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
        {areas.map((area) => getAreaItem(area))}
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
