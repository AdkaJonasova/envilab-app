import { useState } from "react";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { useTranslation } from "react-i18next";
import {
  addFavoriteArea,
  removeFavoriteArea,
  useAreas,
} from "../../hooks/areaHooks";

const AreaSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [changesAreas, setChangedAreas] = useState([]);

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
  }

  function handleReset() {
    let newChangedAreas = [];
    setChangedAreas(newChangedAreas);
  }

  function handleStarClick(area) {
    let changedArea = area;
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

  function getAreaItem(area) {
    return (
      <div>
        <ListItem id={`settings-list-item-${area.areaId}`}>
          <IconButton
            size="small"
            color="sideBrown"
            onClick={() => handleStarClick(area)}
          >
            {getStarForArea(area)}
          </IconButton>
          <ListItemText
            id={`settings-list-text-label-${area.areaId}`}
            primary={area.geoArea.name}
          ></ListItemText>
        </ListItem>
        <Divider />
      </div>
    );
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
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {areas.map((area) => getAreaItem(area))}
      </List>
    </div>
  );
};

export default AreaSettingsPage;
