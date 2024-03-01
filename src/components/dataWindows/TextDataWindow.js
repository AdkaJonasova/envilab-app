import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { height } from "@mui/system";
import PropTypes from "prop-types";

export default function TextDataWindow({
  header,
  subheader,
  text,
  height,
  marginBottom,
}) {
  const theme = useTheme();

  return (
    <Box
      alignContent={"center"}
      border={1}
      borderRadius={2}
      borderColor={theme.palette.informationGrey.main}
      maxHeight={height}
      overflow={"auto"}
      paddingX={1}
      sx={{ marginBottom: `${marginBottom}px` }}
    >
      <Typography variant="h3">{header}</Typography>
      <Typography variant="h4">{subheader}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
}

TextDataWindow.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  text: PropTypes.string,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
};
