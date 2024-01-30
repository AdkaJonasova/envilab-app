import * as React from "react";
import { List, Typography } from "@mui/material";
import LayerListItem from "./LayerListItem";
import PropTypes from "prop-types";
import { noFavoriteLayers } from "../../utils/data";

export default function LayerList({ layers }) {
  //#region Methods
  function isLayerActive(layer) {
    return layer.isActive === true;
  }

  function handleActivateLayer(layer) {}

  function getLayerItem(layer) {
    return (
      <LayerListItem
        layer={layer}
        handleActivateLayer={handleActivateLayer}
        isActive={isLayerActive}
      />
    );
  }

  function getEmptyListText() {
    return <Typography variant="body2">{noFavoriteLayers}</Typography>;
  }
  //#endregion

  return (
    <List
      key={"layer-list"}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {layers.length === 0
        ? getEmptyListText()
        : layers.map((layer) => getLayerItem(layer))}
    </List>
  );
}

LayerList.propTypes = {
  layers: PropTypes.array,
};
