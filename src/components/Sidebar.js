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

export default function Sidebar({
  layers,
  areas,
  refetchLayers,
  refetchAreas,
  height,
  marginBottom,
}) {
  const [barType, setBarType] = useState(
    localStorage.getItem("activeSidebarTab") ?? SidebarTypes.Layers
  );
  const [filter, setFilter] = useState("");
  const [selectedLayer, setSelectedLayer] = useState(null);

  const handleEditLayer = (layer) => {
    setBarType(SidebarTypes.LayersEdit);
    setSelectedLayer(layer);
  };

  const handleGoBack = () => {
    const newBarType =
      localStorage.getItem("activeSidebarTab") ?? SidebarTypes.Layers;
    setBarType(newBarType);
    setSelectedLayer(null);
  };

  const getSidebarContentByType = (data, type) => {
    if (type === SidebarTypes.Layers) {
      return (
        <LayerList
          layers={data}
          refetch={refetchLayers}
          handleEditLayer={handleEditLayer}
        />
      );
    } else if (type === SidebarTypes.Areas) {
      return <AreaList areas={data} refetch={refetchAreas} />;
    } else if (type === SidebarTypes.LayersEdit) {
      return <LayerEdit layer={selectedLayer} handleGoBack={handleGoBack} />;
    }
  };

  const getSidebarHead = (type) => {
    if (type !== SidebarTypes.LayersEdit) {
      return (
        <div>
          <SideBarTabs selectedTab={barType} setSelectedTab={setBarType} />
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
      {getSidebarHead(barType)}
      {getSidebarContentByType(
        getSidebarDataByTypeAndFilter(layers, areas, barType, filter),
        barType
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
