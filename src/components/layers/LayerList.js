import React from "react";
import {
  Button,
  Collapse,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import LayerListItem from "./LayerListItem";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { collapseLayerSection } from "../../redux/slices/LayerListSectionsSlice";
import { selectFavoriteLayersByTitle } from "../../redux/slices/LayersSlice";

const LayerList = ({ filter }) => {
  const layerGroups = useSelector((state) =>
    selectFavoriteLayersByTitle(state, filter)
  );
  const collapsedSections = useSelector(
    (state) => state.collapsedLayerSections
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  //#region Methods

  const handleExpandCollapse = (layerGroup) => {
    dispatch(collapseLayerSection(layerGroup.name));
  };

  const isSectionExpanded = (layerGroup) => {
    return !collapsedSections.includes(layerGroup.name);
  };

  const getLayerItem = (layer) => {
    return (
      <LayerListItem
        key={`layer-list-item-component-${layer.name}`}
        layer={layer}
      />
    );
  };

  //#endregion

  if (layerGroups.length === 0) {
    return (
      <Typography variant="information">
        {t("layerViewSidebar.layerList.noLayers")}
      </Typography>
    );
  }

  return (
    <List
      id={"layer-list"}
      sx={{ width: "100%", bgcolor: "background.paper" }}
      dense
    >
      {layerGroups.map((layerGroup) => {
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
};

export default LayerList;

LayerList.propTypes = {
  filter: PropTypes.string,
};
