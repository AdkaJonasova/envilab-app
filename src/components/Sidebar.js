import { Box } from "@mui/material";
import { favoriteMockLayers, mockAreas } from "../data/mockData";
import React, { useState, useEffect, useMemo } from "react";
import SideBarTabs from "./SideBarTabs";
import SearchBar from "./SearchBar";
import { filterDataByName } from "../utils/customFunctions";
import PropTypes from "prop-types";
import AreaList from "./areas/AreaList";
import LayerList from "./layers/LayerList";

export default function Sidebar({
  addLayerToMap,
  removeLayerFromMap,
  setShowTableWindow,
}) {
  const [barType, setBarType] = useState("layers");
  const [filter, setFilter] = useState("");

  const [filteredData, setFilteredData] = useState(
    filterDataByName(getDataByType(barType), filter)
  );

  useMemo(() => {
    let dataByType = getDataByType(barType);
    let filteredData = filterDataByName(dataByType, filter);
    setFilteredData(filteredData);
  }, [barType, filter]);

  function getCardsByType(data, type, addLayerToMap, removeLayerFromMap) {
    if (type === "layers") {
      return (
        <LayerList
          layers={data}
          addLayerToMap={addLayerToMap}
          removeLayerFromMap={removeLayerFromMap}
          setShowTableWindow={setShowTableWindow}
        />
      );
    } else if (type === "areas") {
      return <AreaList areas={data} />;
    }
  }

  function getDataByType(sideBarType) {
    if (sideBarType === "layers") {
      return favoriteMockLayers;
    } else if (sideBarType === "areas") {
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
      <SideBarTabs currValue={barType} setCurrValue={setBarType} />
      <SearchBar setFilter={setFilter} />
      {getCardsByType(filteredData, barType, addLayerToMap, removeLayerFromMap)}
    </Box>
  );
}

Sidebar.propTypes = {
  addLayerToMap: PropTypes.func,
  removeLayerFromMap: PropTypes.func,
  setShowTableWindow: PropTypes.func,
};
