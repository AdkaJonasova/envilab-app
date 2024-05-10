import { Edit } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { changeLayerActiveState } from "../../redux/slices/LayersSlice";
import { activateLayer, deactivateLayer } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
import { changeSidebarType } from "../../redux/slices/SidebarSlice";
import { SidebarTypes } from "../../utils/enums";

const LayerListItem = ({ layer }) => {
  let paddingSize = 4;

  const dispatch = useDispatch();

  //#region Methods

  const handleLayerStateSwitch = (layer) => {
    const isActive = layer.isActive;
    dispatch(changeLayerActiveState({ layerName: layer.name }));
    isActive
      ? deactivateLayer(userId, layer.name)
      : activateLayer(userId, layer.name);
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
        <ListItemText
          key={`layer-list-item-name-${layer.name}`}
          primary={layer.title}
          onClick={() => handleDisplayLayerInfo(layer)}
          sx={{ cursor: "pointer" }}
        />
        <IconButton
          key={`layer-list-item-edit-${layer.name}`}
          size="small"
          color="beigeBrown"
          onClick={() => handleEditLayer(layer)}
        >
          <Edit />
        </IconButton>
        <Switch
          key={`layer-list-item-switch-${layer.name}`}
          edge="end"
          size="small"
          color="beigeBrown"
          onChange={() => handleLayerStateSwitch(layer)}
          checked={layer.isActive}
        />
      </ListItem>
      <Divider key={`layer-list-divider-${layer.name}`} />
    </div>
  );
};

export default LayerListItem;

LayerListItem.propTypes = {
  layer: PropTypes.object,
};
