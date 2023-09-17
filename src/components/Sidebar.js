import { Box } from "@mui/material";
import LayerCard from "./LayerCard";

export default function Sidebar() {
  return (
    <Box
      sx={{
        height: 640,
        backgroundColor: "beige",
        overflowY: "auto",
      }}>
        <LayerCard />
        <LayerCard />
        <LayerCard />
        <LayerCard />
        <LayerCard />
        <LayerCard />
    </Box>
  );
}