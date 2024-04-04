import React, { useState } from "react";
import {
  Button,
  Collapse,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import LayerListItem from "./LayerListItem";
import PropTypes from "prop-types";
import { activateLayer, deactivateLayer } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
import { useTranslation } from "react-i18next";

export default function LayerList({
  layers,
  refetch,
  handleEditLayer,
  handleDisplayLayerInfo,
}) {
  const [opened, setOpened] = useState(
    layers.map((layerGroup) => layerGroup.name)
  );
  const { t } = useTranslation();

  //#region Methods
  const handleLayerStateSwitch = (layer) => {
    if (layer.isActive) {
      deactivateLayer(userId, layer.name).then(() => {
        refetch();
      });
    } else {
      activateLayer(userId, layer.name).then(() => {
        refetch();
      });
    }
  };

  const handleExpandCollapse = (layerGroup) => {
    let newOpened = [...opened];
    const layerGroupIndex = newOpened.indexOf(layerGroup.name);
    if (layerGroupIndex !== -1) {
      newOpened.splice(layerGroupIndex, 1);
    } else {
      newOpened.push(layerGroup.name);
    }
    setOpened(newOpened);
  };

  const isSectionExpanded = (layerGroup) => {
    return opened.indexOf(layerGroup.name) !== -1;
  };

  const getLayerItem = (layer) => {
    return (
      <LayerListItem
        key={`layer-list-item-component-${layer.name}`}
        layer={layer}
        handleLayerStateSwitch={handleLayerStateSwitch}
        handleEditLayer={handleEditLayer}
        handleDisplayLayerInfo={handleDisplayLayerInfo}
      />
    );
  };

  const getEmptyListText = () => {
    return (
      <Typography variant="information">
        {t("layerViewSidebar.layerList.noLayers")}
      </Typography>
    );
  };
  //#endregion

  if (layers.length === 0) {
    return getEmptyListText();
  }

  return (
    <List
      id={"layer-list"}
      sx={{ width: "100%", bgcolor: "background.paper" }}
      dense
    >
      {layers.map((layerGroup) => {
        return (
          <div key={`layer-list-section-${layerGroup.name}`}>
            <Button
              key={`layer-list-section-btn-${layerGroup.name}`}
              fullWidth
              style={{ textTransform: "none" }}
              onClick={() => handleExpandCollapse(layerGroup)}
            >
              <ListSubheader key={`layer-list-section-head-${layerGroup.name}`}>
                {layerGroup.title}
              </ListSubheader>
            </Button>
            <Collapse
              key={`layer-list-section-collapse-${layerGroup.name}`}
              in={isSectionExpanded(layerGroup)}
              timeout="auto"
              unmountOnExit
            >
              {layerGroup.layers.map((layer) => getLayerItem(layer))}
            </Collapse>
          </div>
        );
      })}
    </List>
  );
}

LayerList.propTypes = {
  layers: PropTypes.array,
  refetch: PropTypes.func,
  handleEditLayer: PropTypes.func,
  handleDisplayLayerInfo: PropTypes.func,
};
