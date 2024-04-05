import React, { useState } from "react";
import { Box } from "@mui/material";
import SideBarTabs from "./SideBarTabs";
import SearchBar from "./global/SearchBar";
import AreaList from "./areas/AreaList";
import LayerList from "./layers/LayerList";
import { getSidebarDataByTypeAndFilter } from "../utils/customFunctions";
import { SidebarTypes } from "../utils/enums";
import PropTypes from "prop-types";
import LayerEdit from "./layers/LayerEdit";
import LayerInfo from "./layers/LayerInfo";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebarType } from "../redux/slices/SidebarSlice";

export default function Sidebar({
  layers,
  areas,
  refetchLayers,
  refetchAreas,
  height,
  marginBottom,
}) {
  const sidebar = useSelector((state) => state.sidebar);

  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  const handleEditLayer = (layer) => {
    dispatch(
      changeSidebarType({ type: SidebarTypes.LayersEdit, selectedLayer: layer })
    );
  };

  const handleDisplayLayerInfo = (layer) => {
    dispatch(
      changeSidebarType({ type: SidebarTypes.LayersInfo, selectedLayer: layer })
    );
  };

  const handleGoBack = () => {
    dispatch(
      changeSidebarType({ type: SidebarTypes.Layers, selectedLayer: undefined })
    );
  };

  const getSidebarContentByType = (data, type) => {
    switch (type) {
      case SidebarTypes.Layers:
        return (
          <LayerList
            layers={data}
            refetch={refetchLayers}
            handleEditLayer={handleEditLayer}
            handleDisplayLayerInfo={handleDisplayLayerInfo}
          />
        );
      case SidebarTypes.Areas:
        return <AreaList areas={data} refetch={refetchAreas} />;
      case SidebarTypes.LayersEdit:
        return (
          <LayerEdit
            layer={sidebar.selectedLayer}
            handleGoBack={handleGoBack}
          />
        );
      case SidebarTypes.LayersInfo:
        return (
          <LayerInfo
            layer={sidebar.selectedLayer}
            handleGoBack={handleGoBack}
          />
        );
    }
  };

  const getSidebarHead = (type) => {
    if (type !== SidebarTypes.LayersEdit && type !== SidebarTypes.LayersInfo) {
      return (
        <div>
          <SideBarTabs />
          <SearchBar setFilter={setFilter} />
        </div>
      );
    }
  };

  return (
    <Box
      height={height}
      overflow={"auto"}
      sx={{ marginBottom: `${marginBottom}px` }}
    >
      {getSidebarHead(sidebar.type)}
      {getSidebarContentByType(
        getSidebarDataByTypeAndFilter(layers, areas, sidebar.type, filter),
        sidebar.type
      )}
    </Box>
  );
}

Sidebar.propTypes = {
  layers: PropTypes.array,
  areas: PropTypes.array,
  refetchLayers: PropTypes.func,
  refetchAreas: PropTypes.func,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
};
