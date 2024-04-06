import React, { useState } from "react";
import { Box } from "@mui/material";
import SideBarTabs from "./SideBarTabs";
import SearchBar from "./global/SearchBar";
import AreaList from "./areas/AreaList";
import LayerList from "./layers/LayerList";
import { SidebarTypes } from "../utils/enums";
import PropTypes from "prop-types";
import LayerEdit from "./layers/LayerEdit";
import LayerInfo from "./layers/LayerInfo";
import { useSelector } from "react-redux";

export default function Sidebar({ height, marginBottom }) {
  const sidebar = useSelector((state) => state.sidebar);

  const [filter, setFilter] = useState("");

  const getSidebarContentByType = () => {
    switch (sidebar.type) {
      case SidebarTypes.Layers:
        return <LayerList filter={filter} />;
      case SidebarTypes.Areas:
        return <AreaList filter={filter} />;
      case SidebarTypes.LayersEdit:
        return <LayerEdit layerName={sidebar.selectedLayer} />;
      case SidebarTypes.LayersInfo:
        return <LayerInfo layerName={sidebar.selectedLayer} />;
    }
  };

  const getSidebarHead = () => {
    if (
      sidebar.type !== SidebarTypes.LayersEdit &&
      sidebar.type !== SidebarTypes.LayersInfo
    ) {
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
      {getSidebarHead()}
      {getSidebarContentByType()}
    </Box>
  );
}

Sidebar.propTypes = {
  areas: PropTypes.array,
  refetchAreas: PropTypes.func,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
};
