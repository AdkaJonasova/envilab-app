import { Box } from "@mui/material";
import LayerCard from "./LayerCard";
import { mockLayers } from "../data/mockData";
import React, { useState, useEffect } from "react";
import SideBarTabs from "./SideBarTabs";

let layerCards = mockLayers.map((mockLayer) => {
  return LayerCard(mockLayer);
});

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
      {layerCards}
    </Box>
  );
}
