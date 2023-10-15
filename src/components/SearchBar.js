import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

export default function SearchBar({ setFilter }) {
  return (
    <form>
      <Box
        marginY={2}
        marginX={2}
        sx={{
          backgroundColor: "red",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => {
            setFilter(e.target.value);
          }}
          label="Enter name"
          variant="outlined"
          placeholder="Search"
          size="small"
        />
        <IconButton
          type="submit"
          aria-label="search"
          sx={{ justifyContent: "right", backgroundColor: "blue" }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
}

SearchBar.propTypes = {
  setFilter: PropTypes.func,
};
