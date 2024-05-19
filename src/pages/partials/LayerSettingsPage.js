import { useState } from "react";
import { Close } from "@mui/icons-material";
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListSubheader,
  Snackbar,
} from "@mui/material";
import SettingsHeader from "../../components/settings/SettingsHeader";
import { userId } from "../../data/mockData";
import { useTranslation } from "react-i18next";
import { changeFavoriteLayers } from "../../hooks/layerHooks";
import Loading from "../../components/global/Loading";
import LayerSettingsItem from "../../components/settings/LayerSettingsItem";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLayerFavorites,
  selectLayersByTitle,
  selectLayersError,
  selectLayersStatus,
} from "../../redux/slices/LayersSlice";
import { FetchStates } from "../../utils/enums";
import ErrorWindow from "../../components/global/ErrorWindow";
import {
  clearChanges,
  markLayer,
  selectChangedLayers,
  selectCollapsedSections,
  collapseLayerSettingsSection,
} from "../../redux/slices/LayerSettingsSlice";

const LayerSettingsPage = () => {
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const layerGroups = useSelector((state) =>
    selectLayersByTitle(state, filter)
  );
  const layersStatus = useSelector(selectLayersStatus);
  const layersError = useSelector(selectLayersError);

  const collapsedSections = useSelector(selectCollapsedSections);
  const changedLayers = useSelector(selectChangedLayers);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (
    layersStatus === FetchStates.Idle ||
    layersStatus === FetchStates.Loading
  ) {
    return <Loading />;
  }

  if (layersStatus === FetchStates.Failed) {
    return <ErrorWindow errorMessage={layersError} />;
  }

  //#region Methods

  const handleExpandCollapse = (layerGroup) => {
    dispatch(collapseLayerSettingsSection({ sectionName: layerGroup.name }));
  };

  const isSectionExpanded = (layerGroup) => {
    return !collapsedSections.includes(layerGroup.name);
  };

  const handleSave = () => {
    dispatch(changeLayerFavorites({ changes: changedLayers }));
    changeFavoriteLayers(userId, changedLayers);
    dispatch(clearChanges());
    setSnackbarOpen(true);
  };

  const handleReset = () => {
    dispatch(clearChanges());
  };

  const handleAddAllToFavorite = () => {
    layerGroups.forEach((group) => {
      group.layers.forEach((layer) => {
        dispatch(markLayer({ layer: layer, value: true }));
      });
    });
  };

  const handleRemoveAllFromFavorite = () => {
    layerGroups.forEach((group) => {
      group.layers.forEach((layer) => {
        dispatch(markLayer({ layer: layer, value: false }));
      });
    });
  };

  const handleStarClick = (layer) => {
    dispatch(markLayer({ layer: layer, value: !isMarkedFavorite(layer) }));
  };

  const isMarkedFavorite = (layer) => {
    let isMarked =
      changedLayers.find((l) => l.name === layer.name)?.value ??
      layer.isFavorite;
    return isMarked;
  };

  const getLayerItem = (layer) => {
    return (
      <LayerSettingsItem
        key={`layer-settings-item-component-${layer.name}`}
        layer={layer}
        isMarkedFavorite={isMarkedFavorite}
        handleStarClick={handleStarClick}
      />
    );
  };

  //#endregion

  return (
    <div>
      <SettingsHeader
        title={t("settings.layers.title")}
        annotation={t("settings.layers.annotation")}
        setFilter={setFilter}
        starTooltip={t("settings.layers.starTooltip")}
        starBorderTooltip={t("settings.layers.starBorderTooltip")}
        handleSettingsSave={handleSave}
        handleSettingsReset={handleReset}
        handleAddAllToFavorite={handleAddAllToFavorite}
        handleRemoveAllFromFavorite={handleRemoveAllFromFavorite}
      />

      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {layerGroups.map((group) => {
          return (
            <div key={`settings-layer-section-${group.name}`}>
              <Button
                key={`settings-layer-section-btn-${group.name}`}
                fullWidth
                style={{ textTransform: "none" }}
                onClick={() => handleExpandCollapse(group)}
              >
                <ListSubheader key={`settings-layersection-head-${group.name}`}>
                  {group.title}
                </ListSubheader>
              </Button>
              <Collapse
                key={`settings-layersection-collapse-${group.name}`}
                in={isSectionExpanded(group)}
                timeout="auto"
                unmountOnExit
              >
                {group.layers.map((layer) => getLayerItem(layer))}
              </Collapse>
            </div>
          );
        })}
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

export default LayerSettingsPage;
