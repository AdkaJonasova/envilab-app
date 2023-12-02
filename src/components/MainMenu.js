import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import YardIcon from "@mui/icons-material/Yard";
import { useNavigate } from "react-router-dom";
import {
  mainMenuSettings,
  mainMenuViews,
  pageName,
  settingsPath,
  viewPages,
} from "../utils/data";
import { Button, Toolbar } from "@mui/material";

export default function MainMenu() {
  const [subMenu, setSubMenu] = React.useState(null);

  const handleOpenSubMenu = (event) => {
    setSubMenu(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenu(null);
  };

  const navigate = useNavigate();

  const navigateViewAction = (path) => {
    handleCloseSubMenu();
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="mainGreen">
        <Toolbar variant="dense">
          <YardIcon size="large" edge="start" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>

          <div>
            <Button
              color="inherit"
              onClick={handleOpenSubMenu}
              sx={{ marginRight: 5 }}
            >
              {mainMenuViews}
            </Button>

            <Menu
              id="menu-appbar"
              anchorEl={subMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(subMenu)}
              onClose={handleCloseSubMenu}
            >
              {viewPages.map((page) => (
                <MenuItem
                  key={page.pageName}
                  onClick={() => {
                    navigateViewAction(page.pagePath);
                  }}
                >
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Button color="inherit" onClick={navigate(settingsPath)}>
            {mainMenuSettings}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
