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
    console.log("-- maping layers to cards");
    let layerCards = data.map((layer) => {
      return (
        <LayerCard
          layer={layer}
          addLayerToMap={addLayerToMap}
          removeLayerFromMap={removeLayerFromMap}
        />
      );
    });
    return layerCards;
  } else if (type === "areas") {
    console.log("-- maping areas to cards");
    let areaCards = data.map((area) => {
      return <AreaCard area={area} />;
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

  const [filteredData, setFilteredData] = useState(
    filterDataByName(getDataByType(barType), filter)
  );

  useEffect(() => {
    console.log(
      "--- I am in useEffect with filter=" + filter + " and barType=" + barType
    );
    setFilteredData(filterDataByName(getDataByType(barType), filter));
  }, [barType, filter]);

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
