import * as React from "react";
import { List, Typography } from "@mui/material";
import LayerListItem from "./LayerListItem";
import PropTypes from "prop-types";
import { activateLayer, deactivateLayer } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
import { useTranslation } from "react-i18next";

export default function LayerList({ layers, refetch }) {
  const { t } = useTranslation();

  //#region Methods
  function handleLayerStateSwitch(layer) {
    console.log("--- I am in handle switch");
    if (layer.isActive) {
      console.log("Deactivate");
      deactivateLayer(userId, layer.layerId);
    } else {
      console.log("Activate");
      activateLayer(userId, layer.layerId);
    }
    refetch();
  }

  function getLayerItem(layer) {
    return (
      <LayerListItem
        layer={layer}
        handleLayerStateSwitch={handleLayerStateSwitch}
      />
    );
  }

  function getEmptyListText() {
    return (
      <Typography variant="body2">
        {t("layerViewSidebar.layerList.noLayers")}
      </Typography>
    );
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
  refetch: PropTypes.func,
};
