import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { settingsTabs } from "../utils/data";
import { useNavigate } from "react-router-dom";

export default function SideMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const navigate = useNavigate();

  const handleListItemClick = (_event, tab) => {
    setSelectedIndex(tab.tabId);
    navigate(tab.navigation);
  };

  function getSideMenuItem(tab) {
    return (
      <div key={`side-menu-list-item${tab.tabId}`}>
        <ListItemButton
          selected={selectedIndex === tab.tabId}
          onClick={(event) => handleListItemClick(event, tab)}
        >
          <ListItemIcon>{tab.icon}</ListItemIcon>
          <ListItemText primary={tab.tabName} />
        </ListItemButton>
        <Divider />
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: ".paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {settingsTabs.map((tab) => getSideMenuItem(tab))}
      </List>
    </Box>
  );
}
