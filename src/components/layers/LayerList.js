import * as React from "react";
import { List } from "@mui/material";
import PropTypes from "prop-types";
import { createLayerByType } from "../../utils/customFunctions";
import LayerListItem from "./LayerListItem";
import { useEffect } from "react";

export default function LayerList({
  layers,
  addLayerToMap,
  removeLayerFromMap,
  setShowTableWindow,
}) {
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    if (checked.indexOf(1) !== -1) {
      setShowTableWindow(true);
    } else {
      setShowTableWindow(false);
    }
  }, [checked]);

  function isLayerChecked(layer) {
    return checked.indexOf(layer.layerId) !== -1;
  }

  function handleToggle(layer) {
    const currentIndex = checked.indexOf(layer.layerId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(layer.layerId);
      addLayerToMap(createLayerByType(layer));
    } else {
      newChecked.splice(currentIndex, 1);
      removeLayerFromMap(layer);
    }

    setChecked(newChecked);
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
