import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const ErrorWindow = ({ errorMessage }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Grid container>
        <Grid item xs={12} container justifyContent={"center"}>
          <Typography variant="error">
            {t("errorWindow.errorMessage")}
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent={"center"}>
          <Typography variant="information">{errorMessage}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ErrorWindow;

ErrorWindow.propTypes = {
  errorMessage: PropTypes.string,
};
