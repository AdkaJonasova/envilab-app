import { Slider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {
  layerCustomizationHeader,
  layerCustomizationOpacity,
} from "../../utils/data";

export default function LayerCustomizator({ layer }) {
  return (
    <div id="layer-customization">
      <Typography variant="h3">{layerCustomizationHeader}</Typography>
      <Typography variant="h4">{layerCustomizationOpacity}</Typography>
      <Slider defaultValue={100} valueLabelDisplay="on" color="mainBrown" />
    </div>
  );
}

LayerCustomizator.propTypes = {
  layer: PropTypes.object,
};
