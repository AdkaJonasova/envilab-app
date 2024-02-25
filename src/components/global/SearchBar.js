import { Box, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

export default function SearchBar({ setFilter }) {
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
      ></OutlinedInput>
    </Box>
  );
}

SearchBar.propTypes = {
  setFilter: PropTypes.func,
};
