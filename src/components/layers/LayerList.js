import * as React from "react";
import { List, ListSubheader, Typography } from "@mui/material";
import LayerListItem from "./LayerListItem";
import PropTypes from "prop-types";
import { activateLayer, deactivateLayer } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
import { useTranslation } from "react-i18next";

export default function LayerList({ layers, refetch }) {
  const { t } = useTranslation();

  //#region Methods
  function handleLayerStateSwitch(layer) {
    if (layer.isActive) {
      deactivateLayer(userId, layer.layerId).then(() => {
        refetch();
      });
    } else {
      activateLayer(userId, layer.layerId).then(() => {
        refetch();
      });
    }
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
      <Typography variant="body3">
        {t("layerViewSidebar.layerList.noLayers")}
      </Typography>
    );
  }
  //#endregion

  return (
    <List
      key={"layer-list"}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      dense
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
