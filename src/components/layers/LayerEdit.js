import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { setOpacityForLayer } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebarType } from "../../redux/slices/SidebarSlice";
import { SidebarTypes } from "../../utils/enums";
import {
  changeLayerOpacity,
  selectLayerByName,
} from "../../redux/slices/LayersSlice";

const LayerEdit = ({ layerName }) => {
  const layer = useSelector((state) => selectLayerByName(state, layerName));

  const [opacity, setOpacity] = useState(layer.opacity);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  //#region Methods

  const handleGoBack = () => {
    dispatch(
      changeSidebarType({ type: SidebarTypes.Layers, selectedLayer: undefined })
    );
  };

  const handleSaveEditedLayer = () => {
    console.log("Layer: ", layer.title);
    dispatch(changeLayerOpacity({ layerName: layer.name, opacity: opacity }));
    setOpacityForLayer(userId, layer.name, opacity);
    setSnackbarOpen(true);
  };

  const handleOpacityChange = (newValue) => {
    setOpacity(newValue);
  };

  //#endregion

  return (
    <div>
      <Grid container marginTop={1} marginBottom={2}>
        <Grid item xs={2}>
          <IconButton color="darkGreen" onClick={() => handleGoBack()}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h2">{layer.title}</Typography>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <Box>
        <Typography variant="h3">
          {t("layerViewSidebar.layerEdit.opacity")}
        </Typography>
        <Slider
          min={0}
          max={100}
          step={10}
          valueLabelDisplay="auto"
          value={opacity}
          onChange={(_event, newValue) => handleOpacityChange(newValue)}
          size="small"
          sx={{
            margin: 2,
            width: "90%",
          }}
        />
        <Button
          variant="outlined"
          color="darkGreen"
          fullWidth
          onClick={() => handleSaveEditedLayer()}
          sx={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {t("layerViewSidebar.layerEdit.saveBtn")}
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t("layerViewSidebar.layerEdit.snackbarTextSuccess")}
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

export default LayerEdit;

LayerEdit.propTypes = {
  layerName: PropTypes.string,
};
