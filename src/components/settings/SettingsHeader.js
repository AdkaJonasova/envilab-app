import { Button, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar";
import { settingsResetBtn, settingsSaveBtn } from "../../utils/data";

export default function SettingsHeader({ title, annotation, setFilter }) {
  return (
    <div>
      <Typography variant="h3" padding={2} fontWeight={"bold"}>
        {title}
      </Typography>
      <Typography variant="h2">{annotation}</Typography>
      <Grid container>
        <Grid item xs={8}>
          <SearchBar setFilter={setFilter} />
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-end"} padding={1.5}>
          <Button color="mainGreen" variant="contained" size="small">
            {settingsResetBtn}
          </Button>
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-start"} padding={1.5}>
          <Button color="mainGreen" variant="contained" size="small">
            {settingsSaveBtn}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

SettingsHeader.propTypes = {
  title: PropTypes.string,
  annotation: PropTypes.string,
  setFilter: PropTypes.func,
};
