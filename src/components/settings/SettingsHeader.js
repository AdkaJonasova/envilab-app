import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import SearchBar from "../global/SearchBar";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Replay, Save } from "@mui/icons-material";

const SettingsHeader = ({
  title,
  annotation,
  setFilter,
  handleSettingsSave,
  handleSettingsReset,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="annotation">{annotation}</Typography>
      <Grid container>
        <Grid item xs={8}>
          <SearchBar setFilter={setFilter} />
        </Grid>
        <Grid item xs={2}>
          <ButtonGroup variant="contained" size="small">
            <IconButton
              color="beigeBrown"
              variant="outlined"
              onClick={() => handleSettingsReset()}
              size="small"
              sx={{
                borderRight: `1px solid ${theme.palette.lightGreen.main}`,
                borderRadius: 0,
              }}
            >
              <Replay />
            </IconButton>
            <IconButton
              color="darkGreen"
              variant="outlined"
              onClick={() => handleSettingsSave(true)}
              size="small"
            >
              <Save />
            </IconButton>
          </ButtonGroup>
        </Grid>
        <Grid
          item
          xs={1.5}
          container
          justifyContent={"flex-start"}
          paddingY={1.5}
          paddingX={0.5}
        >
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
        <Grid
          item
          xs={1.5}
          container
          justifyContent={"flex-end"}
          paddingY={1.5}
          paddingX={0.5}
        >
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
        <Grid
          item
          xs={1.5}
          container
          justifyContent={"flex-start"}
          paddingY={1.5}
          paddingX={0.5}
        >
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
