import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { Box, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ setFilter }) => {
  const theme = useTheme();

  return (
    <Box padding={1}>
      <OutlinedInput
        type="search"
        size="small"
        fullWidth
        onInput={(e) => {
          setFilter(e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.lightGreen.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.darkGreen.main,
          },
        }}
      ></OutlinedInput>
    </Box>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  setFilter: PropTypes.func,
};
