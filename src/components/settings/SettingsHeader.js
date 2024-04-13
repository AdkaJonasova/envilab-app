import { Button, Grid, Typography } from "@mui/material";
import SearchBar from "../global/SearchBar";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const SettingsHeader = ({
  title,
  annotation,
  setFilter,
  handleSettingsSave,
  handleSettingsReset,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="annotation">{annotation}</Typography>
      <Grid container>
        <Grid item xs={8}>
          <SearchBar setFilter={setFilter} />
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-end"} padding={1.5}>
          <Button
            fullWidth
            color="darkGreen"
            variant="outlined"
            size="small"
            onClick={() => handleSettingsReset()}
          >
            {t("settings.reset")}
          </Button>
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-start"} padding={1.5}>
          <Button
            fullWidth
            color="darkGreen"
            variant="outlined"
            size="small"
            onClick={() => handleSettingsSave()}
          >
            {t("settings.save")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsHeader;

SettingsHeader.propTypes = {
  title: PropTypes.string,
  annotation: PropTypes.string,
  setFilter: PropTypes.func,
  handleSettingsSave: PropTypes.func,
  handleSettingsReset: PropTypes.func,
};
