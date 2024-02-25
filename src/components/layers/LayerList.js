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

export default function LayerList({ layers, refetch }) {
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

  if (layers.length === 0) {
    return getEmptyListText();
  }

  return (
    <List
      key={"layer-list"}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      dense
    >
      <Button
        fullWidth
        style={{ textTransform: "none" }}
        onClick={handleExpandCollapse}
      >
        <ListSubheader>Test subheader</ListSubheader>
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {layers.map((layer) => getLayerItem(layer))}
      </Collapse>
    </List>
  );
}

LayerList.propTypes = {
  layers: PropTypes.array,
  refetch: PropTypes.func,
};
