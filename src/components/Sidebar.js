import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SideBarTabs from "./SideBarTabs";
import SearchBar from "./global/SearchBar";
import AreaList from "./areas/AreaList";
import LayerList from "./layers/LayerList";
import { mockAreas } from "../data/mockData";
import { filterDataByName, filterLayersByName } from "../utils/customFunctions";
import { SidebarTypes } from "../utils/enums";
import PropTypes from "prop-types";

export default function Sidebar({ addLayerToMap, removeLayerFromMap, layers }) {
  const [barType, setBarType] = useState(SidebarTypes.Layers);
  const [filter, setFilter] = useState("");

  const [filteredData, setFilteredData] = useState(layers);

  useEffect(() => {
    let dataByType = getDataByType(barType);
    let newFilteredData = filterLayersByName(dataByType, filter);
    setFilteredData(newFilteredData);
  }, [barType, filter]);

  function getCardsByType(data, type, addLayerToMap, removeLayerFromMap) {
    if (type === SidebarTypes.Layers) {
      return (
        <LayerList
          layers={data}
          addLayerToMap={addLayerToMap}
          removeLayerFromMap={removeLayerFromMap}
        />
      );
    } else if (type === SidebarTypes.Areas) {
      return <AreaList areas={data} />;
    }
  }

  function getDataByType(sideBarType) {
    if (sideBarType === SidebarTypes.Layers) {
      return layers;
    } else if (sideBarType === SidebarTypes.Areas) {
      return mockAreas;
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
      {getCardsByType(filteredData, barType, addLayerToMap, removeLayerFromMap)}
    </Box>
  );
}

Sidebar.propTypes = {
  addLayerToMap: PropTypes.func,
  removeLayerFromMap: PropTypes.func,
  layers: PropTypes.array,
};
