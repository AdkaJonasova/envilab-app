import * as React from "react";
import { List } from "@mui/material";
import PropTypes from "prop-types";
import { createLayerByType } from "../../utils/customFunctions";
import LayerListItem from "./LayerListItem";
import { useEffect } from "react";
import { useActiveLayers } from "../../hooks/layerHooks";
import Loading from "../global/Loading";

export default function LayerList({
  layers,
  addLayerToMap,
  removeLayerFromMap,
  setShowTableWindow,
}) {
  const [initialized, setInitialized] = React.useState(false);
  const [activeIds, setActiveIds] = React.useState([]);
  const { data: activeLayers } = useActiveLayers();

  useEffect(() => {
    if (activeLayers) {
      var newActiveIds = activeLayers.map((aLayer) => aLayer[0]);
      setActiveIds(newActiveIds);

      addActiveToMap();
      setInitialized(true);
    }
  }, [activeLayers]);

  function addActiveToMap() {
    var newActiveLayers = layers.filter(
      (layer) => activeIds.indexOf(layer.layerId) !== -1
    );
    newActiveLayers.forEach((layer) => {
      addLayerToMap(createLayerByType(layer));
    });
  }

  function isLayerChecked(layer) {
    return activeIds.indexOf(layer.layerId) !== -1;
  }

  function handleToggle(layer) {
    const currentIndex = activeIds.indexOf(layer.layerId);
    const newChecked = [...activeIds];

    if (currentIndex === -1) {
      newChecked.push(layer.layerId);
      addLayerToMap(createLayerByType(layer));
    } else {
      newChecked.splice(currentIndex, 1);
      removeLayerFromMap(layer);
    }

    setActiveIds(newChecked);
  }

  function getLayerItem(layer) {
    return (
      <LayerListItem
        layer={layer}
        handleToggle={handleToggle}
        isChecked={isLayerChecked}
      />
    );
  }

  if (!initialized) {
    return <Loading />;
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {layers.map((layer) => getLayerItem(layer))}
    </List>
  );
}

LayerList.propTypes = {
  layers: PropTypes.array,
  addLayerToMap: PropTypes.func,
  removeLayerFromMap: PropTypes.func,
  setShowTableWindow: PropTypes.func,
};
