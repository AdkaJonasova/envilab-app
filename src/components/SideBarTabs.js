import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export default function SideBarTabs({ currValue, setCurrValue }) {
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setCurrValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", borderRadius: "28" }}>
      <Tabs
        value={currValue}
        onChange={handleChange}
        centered
        variant="fullWidth"
      >
        <Tab value="layers" label="Layers" />
        <Tab value="areas" label="Areas" />
      </Tabs>
    </Box>
  );
}

SideBarTabs.propTypes = {
  currValue: PropTypes.string,
  setCurrValue: PropTypes.func,
};
