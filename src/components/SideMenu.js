import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { settingsTabs } from "../utils/data";

export default function SideMenu() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const navigate = useNavigate();

  const handleListItemClick = (_event, tab) => {
    setSelectedItemIndex(tab.tabId);
    navigate(tab.navigation);
  };

  function getSideMenuItem(tab) {
    return (
      <div key={`side-menu-list-item${tab.tabId}`}>
        <ListItemButton
          selected={selectedItemIndex === tab.tabId}
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
      <List component="nav">
        {settingsTabs.map((tab) => getSideMenuItem(tab))}
      </List>
    </Box>
  );
}
