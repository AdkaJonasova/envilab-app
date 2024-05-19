import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
