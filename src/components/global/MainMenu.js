import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import YardIcon from "@mui/icons-material/Yard";
import { Button, Toolbar } from "@mui/material";
import {
  mainMenuHeight,
  pageName,
  settingsPath,
  viewPages,
} from "../../utils/data";
import LanguageSelector from "./LanguageSelector";

const MainMenu = () => {
  const [subMenu, setSubMenu] = React.useState(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  //#region Methods

  const handleOpenSubMenu = (event) => {
    setSubMenu(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenu(null);
  };

  const navigateViewAction = (path) => {
    handleCloseSubMenu();
    navigate(path);
  };

  const navigateAction = (path) => {
    navigate(path);
  };

  //#endregion

  return (
    <AppBar
      sx={{ height: `${mainMenuHeight}px` }}
      position="static"
      color="darkGreen"
    >
      <Toolbar variant="dense">
        <YardIcon size="large" edge="start" sx={{ mr: 1 }} />
        <Typography variant="pageTitle" component="div" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>

        <div>
          <Button
            color="inherit"
            onClick={handleOpenSubMenu}
            sx={{ marginRight: 5 }}
          >
            <Typography variant="menuItem">{t("menu.views")}</Typography>
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
                key={`menu-view-item-${page.pageKey}`}
                onClick={() => {
                  navigateViewAction(page.pagePath);
                }}
              >
                <Typography
                  key={`menu-view-item-name-${page.pageKey}`}
                  variant="menuItem"
                >
                  {t(page.pageName)}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <Button
          sx={{ marginRight: 1 }}
          color="inherit"
          onClick={() => navigateAction(settingsPath)}
        >
          <Typography variant="menuItem">{t("menu.settings")}</Typography>
        </Button>
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
