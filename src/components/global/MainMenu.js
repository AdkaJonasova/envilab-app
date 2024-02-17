import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import YardIcon from "@mui/icons-material/Yard";
import { Button, Toolbar } from "@mui/material";
import { pageName, settingsPath, viewPages } from "../../utils/data";
import LanguageSelector from "./LanguageSelector";
import { t } from "i18next";

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

  const navigateAction = (path) => {
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
              {t("menu.views")}
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
                  key={page.pageKey}
                  onClick={() => {
                    navigateViewAction(page.pagePath);
                  }}
                >
                  <Typography textAlign="center">{t(page.pageName)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Button
            sx={{ marginRight: 5 }}
            color="inherit"
            onClick={() => navigateAction(settingsPath)}
          >
            {t("menu.settings")}
          </Button>
          <LanguageSelector />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
