import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { settingsTabs } from "../utils/data";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { getTabIdByType } from "../utils/customFilteringFunctions";

const SideMenu = ({ tab }) => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(
    getTabIdByType(tab)
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleListItemClick = (_event, tab) => {
    setSelectedItemIndex(tab.tabId);
    navigate(tab.navigation);
  };

  const getSideMenuItem = (tab) => {
    return (
      <div key={`side-menu-list-item${tab.tabId}`}>
        <ListItemButton
          selected={selectedItemIndex === tab.tabId}
          onClick={(event) => handleListItemClick(event, tab)}
        >
          <ListItemIcon>{tab.icon}</ListItemIcon>
          <ListItemText primary={t(tab.tabName)} />
        </ListItemButton>
        <Divider />
      </div>
    );
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: ".paper" }}>
      <List component="nav">
        {settingsTabs.map((tab) => getSideMenuItem(tab))}
      </List>
    </Box>
  );
};

export default SideMenu;

SideMenu.propTypes = {
  tab: PropTypes.string,
};
