import { Box } from "@mui/material";
import LayerCard from "./layers/LayerCard";
import { mockAreas, mockLayers } from "../data/mockData";
import React, { useState, useEffect } from "react";
import SideBarTabs from "./SideBarTabs";
import AreaCard from "./areas/AreaCard";

let layerCards = mockLayers.map((mockLayer) => {
  return LayerCard(mockLayer);
});

let areaCards = mockAreas.map((mockArea) => {
  return AreaCard(mockArea);
});

function getSideBarContent(sideBarType) {
  if (sideBarType === "layers") {
    return layerCards;
  } else if (sideBarType === "areas") {
    return areaCards;
  }
}

export default function Sidebar() {
  const [barType, setBarType] = useState("layers");

  return (
    <Box
      sx={{
        height: 640,
        overflowY: "auto",
      }}
    >
      <SideBarTabs currValue={barType} setCurrValue={setBarType} />
      {getSideBarContent(barType)}
    </Box>
  );
}
