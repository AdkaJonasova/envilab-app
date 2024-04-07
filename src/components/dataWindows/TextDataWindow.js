import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectTextInfo } from "../../redux/slices/LayoutSlice";

export default function TextDataWindow({ header, subheader, text }) {
  const layoutInfo = useSelector(selectTextInfo);

  const theme = useTheme();

  return (
    <Box
      alignContent={"center"}
      border={1}
      borderRadius={2}
      borderColor={theme.palette.informationGrey.main}
      height={layoutInfo.height}
      overflow={"auto"}
      paddingX={1}
      sx={{ marginBottom: `${layoutInfo.bottomMargin}px` }}
    >
      <Typography variant="h2">{header}</Typography>
      <Typography variant="h3">{subheader}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
}

TextDataWindow.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  text: PropTypes.string,
};
