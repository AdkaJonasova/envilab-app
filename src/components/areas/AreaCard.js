import { Button, Grid, Paper, Typography } from "@mui/material";
import { areaCardEdit, areaCardUse } from "../../utils/data";
import PropTypes from "prop-types";

function addEditButton(isEditable) {
  if (isEditable) {
    return (
      <Button size="small" variant="contained" color="sideBrown">
        {areaCardEdit}
      </Button>
    );
  }
  return null;
}

export default function AreaCard({ area }) {
  return (
    <Paper
      key={area.areaId}
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2} color="sideBrown">
        <Grid item xs={8}>
          <Typography variant="subtitle">{area.name}</Typography>
        </Grid>
        <Grid item xs={3} container direction="column" spacing={2}>
          <Grid item>
            <Button size="small" variant="contained" color="sideBrown">
              {areaCardUse}
            </Button>
          </Grid>
          <Grid item>{addEditButton(area.isEditable)}</Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

AreaCard.propTypes = {
  area: {
    areaId: PropTypes.number,
    name: PropTypes.string,
    source: PropTypes.string,
    isEditable: PropTypes.bool,
  },
};
