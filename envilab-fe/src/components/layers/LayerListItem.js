import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Edit } from "@mui/icons-material";
import {
  Alert,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Snackbar,
  Switch,
  Tooltip,
} from "@mui/material";
import { changeLayerActiveState } from "../../redux/slices/LayersSlice";
import { activateLayer, deactivateLayer } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
import { changeSidebarType } from "../../redux/slices/SidebarSlice";
import { SidebarTypes } from "../../utils/enums";
import { useState } from "react";

const LayerListItem = ({ layer }) => {
  let paddingSize = 4;

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  //#region Methods

  const handleLayerStateSwitch = (layer) => {
    const isActive = layer.isActive;
    if (isActive) {
      deactivateLayer(userId, layer.name)
        .then((_r) => {
          dispatch(changeLayerActiveState({ layerName: layer.name }));
        })
        .catch((_e) => {
          setErrorSnackbarOpen(true);
        });
    } else {
      activateLayer(userId, layer.name)
        .then((_r) => {
          dispatch(changeLayerActiveState({ layerName: layer.name }));
        })
        .catch((_e) => {
          setErrorSnackbarOpen(true);
        });
    }
  };

  const handleEditLayer = (layer) => {
    dispatch(
      changeSidebarType({
        type: SidebarTypes.LayersEdit,
        selectedLayer: layer.name,
      })
    );
  };

  const handleDisplayLayerInfo = (layer) => {
    dispatch(
      changeSidebarType({
        type: SidebarTypes.LayersInfo,
        selectedLayer: layer.name,
      })
    );
  };

  //#endregion

  return (
    <div key={`layer-list-item-container-${layer.name}`}>
      <ListItem key={`layer-list-item-${layer.name}`} sx={{ pl: paddingSize }}>
        <Tooltip title={t("layerViewSidebar.layerList.layerDetailTooltip")}>
          <ListItemText
            key={`layer-list-item-name-${layer.name}`}
            primary={layer.title}
            onClick={() => handleDisplayLayerInfo(layer)}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title={t("layerViewSidebar.layerList.editLayerTooltip")}>
          <IconButton
            key={`layer-list-item-edit-${layer.name}`}
            size="small"
            color="beigeBrown"
            onClick={() => handleEditLayer(layer)}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            layer.isActive
              ? t("layerViewSidebar.layerList.removeLayerTooltip")
              : t("layerViewSidebar.layerList.addLayerTooltip")
          }
        >
          <Switch
            key={`layer-list-item-switch-${layer.name}`}
            edge="end"
            size="small"
            color="beigeBrown"
            onChange={() => handleLayerStateSwitch(layer)}
            checked={layer.isActive}
          />
        </Tooltip>
      </ListItem>
      <Divider key={`layer-list-divider-${layer.name}`} />
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
          {t("errorSnackbar.errorLayerActive")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LayerListItem;

LayerListItem.propTypes = {
  layer: PropTypes.object,
};
