import {
  Button,
  Grid,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import {
  layerCardAdd,
  layerCardCustomize,
  layerCardRemove,
} from "../../utils/data";
import { useState } from "react";
import PropTypes from "prop-types";
import { createLayerByType } from "../../utils/customFunctions";
import EditIcon from "@mui/icons-material/Edit";
import { Edit } from "@mui/icons-material";

export default function LayerCard({
  layer,
  addLayerToMap,
  removeLayerFromMap,
}) {
  const [isActive, setIsActive] = useState(false);

  function handleAddRemove(event, layer) {
    setIsActive(event.target.checked);
    isActive
      ? removeLayerFromMap(layer)
      : addLayerToMap(createLayerByType(layer));
  }

  return (
    <Paper
      key={layer.layerId}
      sx={{
        p: 1,
        margin: "auto",
        flexGrow: 1,
        verticalAlign: "baseline",
      }}
    >
      <Grid container spacing={1} color="sideBrown">
        <Grid item xs={8}>
          <Typography variant="subtitle">{layer.name}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Switch
            color="sideBrown"
            size="small"
            checked={isActive}
            onChange={(e) => handleAddRemove(e, layer)}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton color="sideBrown" size="small">
            <Edit />
          </IconButton>
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
