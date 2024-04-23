import React, { useState, useEffect } from "react";

import { Box } from "@mui/material";
import SelectViewMap from "../components/mapComponents/SelectViewMap";
import {
  betweenElementsMargin,
  drawOptions,
  pageTopMargin,
} from "../utils/data";
import SelectViewHeader from "../components/selectView/SelectViewHeader";
import { getSelectViewMapHeight } from "../utils/customLayoutFunctions";
import { getCoordsObjectForDrawType } from "../utils/decisionCriteriaHandlers";
import NewAreaSavePopup from "../components/selectView/NewAreaSavePopup";
import { useSelector } from "react-redux";
import { selectFeatures } from "../redux/slices/SelectViewSlice";
import { createCustomArea } from "../hooks/areaHooks";
import { userId } from "../data/mockData";

const SelectViewPage = () => {
  const [savePopupOpened, setSavePopupOpened] = useState(false);
  const [drawType, setDrawType] = useState(drawOptions[0].code);
  const [mapHeight, setMapHeight] = useState(
    getSelectViewMapHeight(window.innerHeight)
  );

  const selectedFeatures = useSelector(selectFeatures);

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

  const handleSavePopupOpen = () => {
    setSavePopupOpened(true);
  };

  const handleSavePopupCancel = () => {
    setSavePopupOpened(false);
  };

  const handleAreaSave = (name) => {
    const f = selectedFeatures;
    console.log(f);
    const geojsonObject = {
      type: "FeatureCollection",
      features: f,
    };
    createCustomArea(userId, name, geojsonObject);
    setSavePopupOpened(false);
  };

  return (
    <div>
      <Box sx={{ marginTop: `${pageTopMargin}px`, marginX: 2, padding: 0 }}>
        <SelectViewHeader
          drawType={drawType}
          handleDrawTypeChange={handleDrawTypeChange}
          openSaveAreaPopup={handleSavePopupOpen}
        />
        <SelectViewMap
          height={mapHeight}
          marginBottom={betweenElementsMargin}
          drawType={drawType}
          handleDrawEnd={handleDrawEnd}
        />
        <NewAreaSavePopup
          opened={savePopupOpened}
          handleSaveArea={handleAreaSave}
          handleClose={handleSavePopupCancel}
        />
      </Box>
    </div>
  );
};

export default SelectViewPage;
