import { Button, Grid, Paper, Typography } from "@mui/material";
import { layerCardAdd, layerCardCustomize } from "../../utils/data";

export default function LayerCard(layer) {
  function addLayerToMap(source) {
    console.log("layer to map");
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
              onClick={addLayerToMap(layer.source)}
            >
              {layerCardAdd}
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
  layer: {
    layerId: Number,
    name: String,
    source: String,
    description: String,
    type: String,
  },
};
