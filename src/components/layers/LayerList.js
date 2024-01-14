import * as React from "react";
import { useEffect } from "react";
import { List } from "@mui/material";
import LayerListItem from "./LayerListItem";
import { createLayerByType } from "../../utils/customFunctions";
import { useActiveLayers } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
import Loading from "../global/Loading";
import PropTypes from "prop-types";

export default function LayerList({
  layers,
  addLayerToMap,
  removeLayerFromMap,
}) {
  const [initialized, setInitialized] = React.useState(false);
  const [activaLayerIds, setActiveLayerIds] = React.useState([]);
  const { data: activeLayers } = useActiveLayers(userId);

  useEffect(() => {
    if (activeLayers) {
      var newActiveLayerIds = activeLayers.map((layer) => layer[0]);
      setActiveLayerIds(newActiveLayerIds);

      addActiveLayersToMap();
      setInitialized(true);
    }
  }, [activeLayers]);

  //#region Methods
  function addActiveLayersToMap() {
    var newActiveLayers = layers.filter(
      (layer) => activaLayerIds.indexOf(layer.layerId) !== -1
    );
    newActiveLayers.forEach((layer) => {
      addLayerToMap(createLayerByType(layer));
    });
  }

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

  if (!initialized) {
    return <Loading />;
  }

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
