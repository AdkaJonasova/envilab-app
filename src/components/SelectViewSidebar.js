import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  sViewSidebarNewPointBtnText,
  selectViewAreaName,
  selectViewSaveBtnText,
  selectViewSelectedPoints,
  selectViewSidebarTitle,
} from "../utils/data";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function SelectViewSidebar({ points }) {
  return (
    <Box>
      <Typography variant="h3">{selectViewSidebarTitle}</Typography>
      <Divider />
      <Typography variant="h4">{selectViewAreaName}</Typography>
      <TextField
        id="area-name-input"
        fullWidth
        variant="outlined"
        size="small"
      ></TextField>
      <Divider />
      <Grid container spacing={1} marginRight={1}>
        <Grid item xs={11}>
          <Typography variant="h4">{selectViewSelectedPoints}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton color="sideBrown" size="small">
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
      {points.map((point) => (
        <Box display={"flex"}>
          <Grid container spacing={1} marginX={1} marginY={1}>
            <Grid item xs={5}>
              <Typography variant="body1">X: {point.x}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1">Y: {point.y}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton color="error" size="small">
                <CancelIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button fullWidth variant="outlined" color="sideGreen">
        {selectViewSaveBtnText}
      </Button>
    </Box>
  );
}

SelectViewSidebar.propTypes = {
  points: PropTypes.array,
};
