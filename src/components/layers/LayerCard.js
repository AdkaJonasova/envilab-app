import { Button, Grid, Paper, Typography } from "@mui/material";
import {
  layerCardAdd,
  layerCardCustomize,
  layerCardRemove,
} from "../../utils/data";
import { useState } from "react";
import PropTypes from "prop-types";
import { createLayerByType } from "../../utils/customFunctions";

export default function LayerCard(layer, addLayerToMap, removeLayerFromMap) {
  const [buttonText, setButtonText] = useState(layerCardAdd);

  function handleAddRemove(layer) {
    setButtonText(buttonText === layerCardAdd ? layerCardRemove : layerCardAdd);
    buttonText === layerCardAdd
      ? addLayerToMap(createLayerByType(layer))
      : removeLayerFromMap(layer);
  }

  return (
    <Paper
      key={layer.layerId}
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2} color="sideBrown">
        <Grid item xs={8}>
          <Typography variant="subtitle">{layer.name}</Typography>
        </Grid>
        <Grid item xs={3} container direction="column" spacing={2}>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="sideBrown"
              onClick={(e) => handleAddRemove(layer)}
            >
              {buttonText}
            </Button>
          </Grid>
          <Grid item>
            <Button size="small" variant="contained" color="sideBrown">
              {layerCardCustomize}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

LayerCard.propTypes = {
  layer: PropTypes.object,
  addLayerToMap: PropTypes.func,
  removeLayerFromMap: PropTypes.func,
};
