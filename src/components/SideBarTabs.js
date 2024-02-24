import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SidebarTypes } from "../utils/enums";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function SideBarTabs({ selectedTab, setSelectedTab }) {
  const { t } = useTranslation();

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
        <Tab
          value={SidebarTypes.Layers}
          label={t("layerViewSidebar.tabs.layerTab")}
        />
        <Tab
          value={SidebarTypes.Areas}
          label={t("layerViewSidebar.tabs.areaTab")}
        />
      </Tabs>
    </Box>
  );
}

SideBarTabs.propTypes = {
  currValue: PropTypes.string,
  setCurrValue: PropTypes.func,
};
