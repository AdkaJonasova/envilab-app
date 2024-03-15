import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DrawInteractionSelect from "./DrawIteractionSelect";
import PropTypes from "prop-types";
import {
  selectViewHeaderHeight,
  selectViewHeaderPadding,
} from "../../utils/data";

const SelectViewHeader = ({
  drawType,
  handleDrawTypeChange,
  openSaveAreaPopup,
}) => {
  const { t } = useTranslation();

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
          <Grid item xs={1} container justifyContent={"flex-end"} paddingX={1}>
            <Button
              fullWidth
              color="darkGreen"
              variant="outlined"
              size="small"
              onClick={() => openSaveAreaPopup(true)}
            >
              {t("selectView.saveBtn")}
            </Button>
          </Grid>
          <Grid item xs={1} container justifyContent={"flex-end"} paddingX={1}>
            <Button fullWidth color="darkGreen" variant="outlined" size="small">
              {t("selectView.importBtn")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

SelectViewHeader.propTypes = {
  drawType: PropTypes.string,
  handleDrawTypeChange: PropTypes.func,
  openSaveAreaPopup: PropTypes.func,
};

export default SelectViewHeader;
