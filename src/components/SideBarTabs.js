import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SidebarTypes } from "../utils/enums";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebarType } from "../redux/slices/SidebarSlice";

const SideBarTabs = () => {
  const sidebar = useSelector((state) => state.sidebar);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChangeTab = (newSelectedTab) => {
    dispatch(
      changeSidebarType({ type: newSelectedTab, selectedLayer: undefined })
    );
  };

  return (
    <Box sx={{ width: "100%", borderRadius: "28" }}>
      <Tabs
        value={sidebar.type}
        onChange={(_event, newValue) => handleChangeTab(newValue)}
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
};

export default SideBarTabs;
