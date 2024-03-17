import * as React from "react";
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

export default function LayerList({ layers, refetch, handleEditLayer }) {
  const [open, setOpen] = React.useState(true);
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

  function handleExpandCollapse() {
    setOpen(!open);
  }

  function getLayerItem(layer) {
    return (
      <LayerListItem
        key={`layer-list-item-component-${layer.layerId}`}
        layer={layer}
        handleLayerStateSwitch={handleLayerStateSwitch}
        handleEditLayer={handleEditLayer}
      />
    );
  }

  function getEmptyListText() {
    return (
      <Typography variant="information">
        {t("layerViewSidebar.layerList.noLayers")}
      </Typography>
    );
  }
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
      <Button
        key={`layer-list-section-btn-0`}
        fullWidth
        style={{ textTransform: "none" }}
        onClick={handleExpandCollapse}
      >
        <ListSubheader key={`layer-list-section-0`}>
          Test subheader
        </ListSubheader>
      </Button>
      <Collapse
        key={`layer-list-section-collapse-0`}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        {layers.map((layer) => getLayerItem(layer))}
      </Collapse>
    </List>
  );
}

LayerList.propTypes = {
  layers: PropTypes.array,
  refetch: PropTypes.func,
  handleEditLayer: PropTypes.func,
};
