import {
  Box,
  Grid,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { drawOptions } from "../../utils/data";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const DrawInteractionSelect = ({ drawInteractionType, onDrawTypeChange }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div>
      <Grid container alignItems={"center"}>
        <Grid item xs={6}>
          <Box
            border={1}
            height={20}
            p={1}
            sx={{
              backgroundColor: theme.palette.lightGreen.main,
              borderColor: theme.palette.lightGreen.main,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          >
            <Typography
              variant="body1"
              color={theme.palette.lightGreen.contrastText}
            >
              {t("selectView.drawOptionsLabel")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Select
            id="draw-interaction-type-select"
            value={drawInteractionType}
            onChange={(e) => onDrawTypeChange(e)}
            size="small"
            fullWidth
            height={20}
            sx={{
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.lightGreen.main,
              },
              "& .MuiSelect-icon": {
                color: theme.palette.darkGreen.main,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.lightGreen.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.lightGreen.main,
              },
            }}
          >
            {drawOptions.map((option) => {
              return (
                <MenuItem
                  key={`draw-interaction-type-select-item-${option.code}`}
                  value={option.code}
                >
                  {t(option.label)}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </div>
  );
};

export default DrawInteractionSelect;

DrawInteractionSelect.propTypes = {
  drawInteractionType: PropTypes.string,
  onDrawTypeChange: PropTypes.func,
};
