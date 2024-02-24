import React, { useState } from "react";
import { Box } from "@mui/material";
import SideBarTabs from "./SideBarTabs";
import SearchBar from "./global/SearchBar";
import AreaList from "./areas/AreaList";
import LayerList from "./layers/LayerList";
import { getSidebarDataByTypeAndFilter } from "../utils/customFunctions";
import { SidebarTypes } from "../utils/enums";
import PropTypes from "prop-types";

export default function Sidebar({ layers, areas, refetchLayers }) {
  const [barType, setBarType] = useState(SidebarTypes.Layers);
  const [filter, setFilter] = useState("");

  function getCardsByType(data, type) {
    if (type === SidebarTypes.Layers) {
      return <LayerList layers={data} refetch={refetchLayers} />;
    } else if (type === SidebarTypes.Areas) {
      return <AreaList areas={data} />;
    }
  }

  return (
    <Box
      sx={{
        height: 640,
        overflowY: "auto",
      }}
    >
      <SideBarTabs selectedTab={barType} setSelectedTab={setBarType} />
      <SearchBar setFilter={setFilter} />
      {getCardsByType(
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
};
