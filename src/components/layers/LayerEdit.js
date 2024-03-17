import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";

const LayerEdit = ({ layer, handleGoBack }) => {
  const [opacity, setOpacity] = useState(90);
  const { t } = useTranslation();

  const handleOpacityChange = (newValue) => {
    setOpacity(newValue);
  };

  return (
    <div>
      <Grid container marginTop={1} marginBottom={2}>
        <Grid item xs={2}>
          <IconButton color="darkGreen" onClick={() => handleGoBack()}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h2">{layer.geoLayer.name}</Typography>
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
    </div>
  );
};

export default LayerEdit;

LayerEdit.propTypes = {
  layer: PropTypes.object,
  handleGoBack: PropTypes.func,
};
