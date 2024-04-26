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
import NewAreaSavePopup from "../components/selectView/NewAreaSavePopup";
import { useDispatch, useSelector } from "react-redux";
import { clearFeatures, selectFeatures } from "../redux/slices/SelectViewSlice";
import { createCustomArea } from "../hooks/areaHooks";
import { userId } from "../data/mockData";
import { addArea } from "../redux/slices/AreasSlice";

const SelectViewPage = () => {
  const [savePopupOpened, setSavePopupOpened] = useState(false);
  const [drawType, setDrawType] = useState(drawOptions[0].code);
  const [mapHeight, setMapHeight] = useState(
    getSelectViewMapHeight(window.innerHeight)
  );

  const selectedFeatures = useSelector(selectFeatures);
  const dispatch = useDispatch();

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

  const handleSavePopupOpen = () => {
    setSavePopupOpened(true);
  };

  const handleSavePopupCancel = () => {
    setSavePopupOpened(false);
  };

  const handleAreaSave = (name) => {
    const geojsonObject = {
      type: "FeatureCollection",
      features: selectedFeatures,
    };
    createCustomArea(userId, name, "EPSG:3857", geojsonObject).then((r) => {
      setSavePopupOpened(false);
      dispatch(addArea({ area: r.data }));
      dispatch(clearFeatures());
    });
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
