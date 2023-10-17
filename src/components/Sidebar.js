import { Box } from "@mui/material";
import LayerCard from "./layers/LayerCard";
import { mockAreas, mockLayers } from "../data/mockData";
import React, { useState, useEffect } from "react";
import SideBarTabs from "./SideBarTabs";
import AreaCard from "./areas/AreaCard";
import SearchBar from "./SearchBar";
import { filterDataByName } from "../utils/customFunctions";
import PropTypes from "prop-types";

function getCardsByType(data, type, addLayerToMap, removeLayerFromMap) {
  if (type === "layers") {
    let layerCards = data.map((layer) => {
      return LayerCard(layer, addLayerToMap, removeLayerFromMap);
    });
    return layerCards;
  } else if (type === "areas") {
    let areaCards = data.map((area) => {
      return AreaCard(area);
    });
    return areaCards;
  }
}

function getDataByType(sideBarType) {
  if (sideBarType === "layers") {
    return mockLayers;
  } else if (sideBarType === "areas") {
    return mockAreas;
  }
}

export default function Sidebar({ addLayerToMap, removeLayerFromMap }) {
  const [barType, setBarType] = useState("layers");
  const [filter, setFilter] = useState("");
  const filteredData = filterDataByName(getDataByType(barType), filter);

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
};
