import * as React from "react";
import { List } from "@mui/material";
import LayerListItem from "./LayerListItem";
import { createLayerByType } from "../../utils/customFunctions";
import PropTypes from "prop-types";

export default function LayerList({
  layers,
  addLayerToMap,
  removeLayerFromMap,
}) {
  const [activaLayerIds, setActiveLayerIds] = React.useState([]);

  //#region Methods
  function isLayerActive(layer) {
    return activaLayerIds.indexOf(layer.layerId) !== -1;
  }

  function handleActivateLayer(layer) {
    const currentIndex = activaLayerIds.indexOf(layer.layerId);
    const newActiveLayers = [...activaLayerIds];

    if (currentIndex === -1) {
      newActiveLayers.push(layer.layerId);
      addLayerToMap(createLayerByType(layer));
    } else {
      newActiveLayers.splice(currentIndex, 1);
      removeLayerFromMap(layer);
    }

    setActiveLayerIds(newActiveLayers);
  }

  function getLayerItem(layer) {
    return (
      <LayerListItem
        layer={layer}
        handleActivateLayer={handleActivateLayer}
        isActive={isLayerActive}
      />
    );
  }
  //#endregion

  return (
    <List
      key={"layer-list"}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {layers.map((layer) => getLayerItem(layer))}
    </List>
  );
}

LayerList.propTypes = {
  layers: PropTypes.array,
  addLayerToMap: PropTypes.func,
  removeLayerFromMap: PropTypes.func,
};
