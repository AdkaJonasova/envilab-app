import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { settingsTabs } from "../utils/data";

export default function SideMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (_event, tab) => {
    setSelectedIndex(tab.tabId);
  };

  function getSideMenuItem(tab) {
    return (
      <div>
        <ListItemButton
          id={tab.tabId}
          selected={selectedIndex === tab.tabId}
          background
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
