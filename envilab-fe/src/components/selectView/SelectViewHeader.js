import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Box,
  ButtonGroup,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Delete, Save, Undo } from "@mui/icons-material";
import DrawInteractionSelect from "./DrawIteractionSelect";
import {
  selectViewHeaderHeight,
  selectViewHeaderPadding,
} from "../../utils/data";
import {
  clearFeatures,
  removeLastFeature,
  selectFeatures,
} from "../../redux/slices/SelectViewSlice";

const SelectViewHeader = ({
  drawType,
  handleDrawTypeChange,
  openSaveAreaPopup,
}) => {
  const selectedFeatures = useSelector(selectFeatures);

  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //#region Methods

  const handleDeleteSelection = () => {
    dispatch(clearFeatures());
  };

  const handleUndoSelection = () => {
    dispatch(removeLastFeature());
  };

  const featuresAreEmpty = () => {
    return selectedFeatures.length === 0;
  };

  //#endregion

  return (
    <div>
      <Box
        height={selectViewHeaderHeight}
        sx={{ paddingY: `${selectViewHeaderPadding}px` }}
      >
        <Typography variant="annotation">{t("selectView.subtitle")}</Typography>
        <Grid container direction="row" sx={{ marginY: "5px" }}>
          <Grid item xs={4}>
            <DrawInteractionSelect
              drawInteractionType={drawType}
              onDrawTypeChange={handleDrawTypeChange}
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={2} container justifyContent={"flex-end"} paddingX={1}>
            <ButtonGroup variant="contained" size="small">
              <Tooltip title={t("selectView.undoTooltip")}>
                <span>
                  <IconButton
                    color="beigeBrown"
                    variant="outlined"
                    disabled={featuresAreEmpty()}
                    onClick={() => handleUndoSelection()}
                    size="small"
                    sx={{
                      borderRight: `1px solid ${theme.palette.lightGreen.main}`,
                      borderRadius: 0,
                    }}
                  >
                    <Undo />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={t("selectView.deleteTooltip")}>
                <span>
                  <IconButton
                    color="errorRed"
                    variant="outlined"
                    disabled={featuresAreEmpty()}
                    onClick={() => handleDeleteSelection()}
                    size="small"
                    sx={{
                      borderRight: `1px solid ${theme.palette.lightGreen.main}`,
                      borderRadius: 0,
                    }}
                  >
                    <Delete />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={t("selectView.saveTooltip")}>
                <span>
                  <IconButton
                    color="darkGreen"
                    variant="outlined"
                    disabled={featuresAreEmpty()}
                    onClick={() => openSaveAreaPopup(true)}
                    size="small"
                  >
                    <Save />
                  </IconButton>
                </span>
              </Tooltip>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SelectViewHeader;

SelectViewHeader.propTypes = {
  drawType: PropTypes.string,
  handleDrawTypeChange: PropTypes.func,
  openSaveAreaPopup: PropTypes.func,
};
