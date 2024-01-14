import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SidebarTypes } from "../utils/enums";
import { AreasTab, LayersTab } from "../utils/data";
import PropTypes from "prop-types";

export default function SideBarTabs({ selectedTab, setSelectedTab }) {
  const handleChangeTab = (_event, newSelectedTab) => {
    setSelectedTab(newSelectedTab);
  };

  return (
    <Box sx={{ width: "100%", borderRadius: "28" }}>
      <Tabs
        value={selectedTab}
        onChange={handleChangeTab}
        centered
        variant="fullWidth"
      >
        <Tab value={SidebarTypes.Layers} label={LayersTab} />
        <Tab value={SidebarTypes.Areas} label={AreasTab} />
      </Tabs>
    </Box>
  );
}

SideBarTabs.propTypes = {
  currValue: PropTypes.string,
  setCurrValue: PropTypes.func,
};
