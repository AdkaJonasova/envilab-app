import React, { useState, useEffect } from "react";

import { Box, IconButton, Snackbar } from "@mui/material";
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
import { MapProjections } from "../utils/enums";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const SelectViewPage = () => {
  const [drawType, setDrawType] = useState(drawOptions[0].code);
  const [mapHeight, setMapHeight] = useState(
    getSelectViewMapHeight(window.innerHeight)
  );
  const [savePopupOpened, setSavePopupOpened] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const selectedFeatures = useSelector(selectFeatures);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    createCustomArea(userId, name, MapProjections.EPSG3857, geojsonObject).then(
      (r) => {
        setSavePopupOpened(false);
        dispatch(addArea({ area: r.data }));
        dispatch(clearFeatures());
        setSnackbarOpen(true);
      }
    );
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t("settings.snackbarText")}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default SelectViewPage;
