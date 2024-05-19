import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close, ArrowBack } from "@mui/icons-material";
import { setOpacityForLayer } from "../../hooks/layerHooks";
import { userId } from "../../data/mockData";
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
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  //#region Methods

  const handleGoBack = () => {
    dispatch(
      changeSidebarType({ type: SidebarTypes.Layers, selectedLayer: undefined })
    );
  };

  const handleSaveEditedLayer = () => {
    setOpacityForLayer(userId, layer.name, opacity)
      .then((_r) => {
        dispatch(
          changeLayerOpacity({ layerName: layer.name, opacity: opacity })
        );
        setSnackbarOpen(true);
      })
      .catch((_e) => {
        setErrorSnackbarOpen(true);
      });
  };

  const handleOpacityChange = (newValue) => {
    setOpacity(newValue);
  };

  //#endregion

  return (
    <div>
      <Grid container marginTop={1} marginBottom={2}>
        <Grid item xs={2}>
          <Tooltip title={t("layerViewSidebar.layerEdit.backTooltip")}>
            <IconButton color="darkGreen" onClick={() => handleGoBack()}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
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
        key="success-snackbar"
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
      <Snackbar
        key="error-snackbar"
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {t("errorSnackbar.errorEditLayer")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LayerEdit;

LayerEdit.propTypes = {
  layerName: PropTypes.string,
};
