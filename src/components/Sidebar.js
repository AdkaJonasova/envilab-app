import { Box } from "@mui/material";
import LayerCard from "./LayerCard";
import { mockLayers } from "../data/mockData";
import React from "react";

let layerCards = mockLayers.map((mockLayer) => {
  return LayerCard(mockLayer);
});

export default function Sidebar() {
  return (
    <Box
      sx={{
        height: 640,
        backgroundColor: "beige",
        overflowY: "auto",
      }}
    >
      {layerCards}
    </Box>
  );
}
