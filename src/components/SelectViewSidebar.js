import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {
  selectViewAreaName,
  selectViewSaveBtnText,
  selectViewSelectedPoints,
  selectViewSidebarTitle,
} from "../utils/data";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function SelectViewSidebar({ points }) {
  return (
    <Box>
      <Typography variant="h3">{selectViewSidebarTitle}</Typography>
      <Typography variant="h4">{selectViewAreaName}</Typography>
      <TextField
        id="area-name-input"
        fullWidth
        variant="outlined"
        size="small"
      ></TextField>
      <Divider sx={{ marginBottom: 1, marginTop: 2 }} />
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
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {points.map((point) => (
          <ListItem id="list-point-item">
            <ListItemText variant="body1">{point.x}</ListItemText>
            <ListItemText variant="body1">{point.y}</ListItemText>
            <IconButton edge="end" size="small" color="error">
              <ClearIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button fullWidth variant="outlined" color="sideGreen">
        {selectViewSaveBtnText}
      </Button>
    </Box>
  );
}

SelectViewSidebar.propTypes = {
  points: PropTypes.array,
};
