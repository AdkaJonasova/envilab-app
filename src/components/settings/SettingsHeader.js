import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  ButtonGroup,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Replay, Save, Star, StarBorder } from "@mui/icons-material";
import SearchBar from "../global/SearchBar";

const SettingsHeader = ({
  title,
  annotation,
  setFilter,
  starTooltip,
  starBorderTooltip,
  handleSettingsSave,
  handleSettingsReset,
  handleAddAllToFavorite,
  handleRemoveAllFromFavorite,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="annotation">{annotation}</Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={10}>
          <SearchBar setFilter={setFilter} />
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-end"} paddingX={2}>
          <ButtonGroup variant="contained" size="small">
            <Tooltip title={starBorderTooltip}>
              <IconButton
                color="beigeBrown"
                variant="outlined"
                onClick={() => handleRemoveAllFromFavorite()}
                size="small"
                sx={{
                  borderRight: `1px solid ${theme.palette.lightGreen.main}`,
                  borderRadius: 0,
                }}
              >
                <StarBorder />
              </IconButton>
            </Tooltip>
            <Tooltip title={starTooltip}>
              <IconButton
                color="beigeBrown"
                variant="outlined"
                onClick={() => handleAddAllToFavorite()}
                size="small"
                sx={{
                  borderRight: `1px solid ${theme.palette.lightGreen.main}`,
                  borderRadius: 0,
                }}
              >
                <Star />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("settings.resetTooltip")}>
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
            </Tooltip>
            <Tooltip title={t("settings.saveTooltip")}>
              <IconButton
                color="darkGreen"
                variant="outlined"
                onClick={() => handleSettingsSave()}
                size="small"
              >
                <Save />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
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
  starTooltip: PropTypes.string,
  starBorderTooltip: PropTypes.string,
  handleSettingsSave: PropTypes.func,
  handleSettingsReset: PropTypes.func,
  handleAddAllToFavorite: PropTypes.func,
  handleRemoveAllFromFavorite: PropTypes.func,
};
