import React, { useState, useEffect } from "react";

import { Box, Grid } from "@mui/material";
import SelectViewMap from "../components/mapComponents/SelectViewMap";
import {
  betweenElementsMargin,
  drawOptions,
  pageTopMargin,
} from "../utils/data";
import SelectViewHeader from "../components/selectView/SelectViewHeader";
import { getSelectViewMapHeight } from "../utils/customFunctions";
import { getCoordsObjectForDrawType } from "../utils/decisionCriteriaHandlers";

const SelectViewPage = () => {
  const [points, setPoints] = useState([]);
  const [drawType, setDrawType] = useState(drawOptions[0].code);
  const [mapHeight, setMapHeight] = useState(
    getSelectViewMapHeight(window.innerHeight)
  );

  useEffect(() => {
    const handleResize = () => {
      setMapHeight(getSelectViewMapHeight(window.innerHeight));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrawTypeChange = (event) => {
    const newValue = event.target.value;
    setDrawType(newValue);
  };

  const handleDrawEnd = (feature) => {
    const geometry = feature.getGeometry();
    const coordsObject = getCoordsObjectForDrawType(geometry);
  };

  return (
    <div>
      <Box sx={{ marginTop: `${pageTopMargin}px`, marginX: 2, padding: 0 }}>
        <SelectViewHeader
          drawType={drawType}
          handleDrawTypeChange={handleDrawTypeChange}
        />
        <SelectViewMap
          height={mapHeight}
          marginBottom={betweenElementsMargin}
          drawType={drawType}
          handleDrawEnd={handleDrawEnd}
        />
      </Box>
    </div>
  );
};

export default SelectViewPage;
