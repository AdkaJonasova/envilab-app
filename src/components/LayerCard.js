import { Button, Grid, Paper, Typography } from "@mui/material";
import { layerCardAdd, layerCardCustomize } from "../utils/data";

export default function LayerCard() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="subtitle">Layer name</Typography>
        </Grid>
        <Grid item xs={4} container direction="column" spacing={2}>
          <Grid item>
            <Button color="inherit">{layerCardAdd}</Button>
          </Grid>
          <Grid item>
            <Button color="inherit">{layerCardCustomize}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

}