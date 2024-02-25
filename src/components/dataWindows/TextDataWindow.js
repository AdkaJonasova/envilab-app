import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function TextDataWindow({ header, subheader, text }) {
  return (
    <div className="text-data-window">
      <Box
        alignContent={"center"}
        padding={1}
        marginY={1}
        border={1}
        borderRadius={2}
        borderColor={"mainGreen.main"}
      >
        <Typography variant="h3">{header}</Typography>
        <Typography variant="h4">{subheader}</Typography>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </div>
  );
}

TextDataWindow.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  text: PropTypes.string,
};
