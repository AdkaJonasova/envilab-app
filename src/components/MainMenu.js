import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import YardIcon from '@mui/icons-material/Yard';
import { mainMenuSettings, mainMenuViews, pageName, subMenuLayer, subMenuSelect } from '../utils/data';
import { Button, Toolbar } from '@mui/material';

export default function MainMenu() {
    
  const [subMenu, setSubMenu] = React.useState(null);

  const handleOpenSubMenu = (event) => {
    setSubMenu(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenu(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <YardIcon size="large" edge="start" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>

          <div>
            <Button color="inherit" onClick={handleOpenSubMenu} sx={{marginRight: 5}}>
              {mainMenuViews}
            </Button>

            <Menu
              id="menu-appbar"
              anchorEl={subMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={Boolean(subMenu)}
              onClose={handleCloseSubMenu}
              >
                <MenuItem onClick={handleCloseSubMenu}>{subMenuLayer}</MenuItem>
                <MenuItem onClick={handleCloseSubMenu}>{subMenuSelect}</MenuItem>
              </Menu>
          </div>
          <Button color="inherit">
            {mainMenuSettings}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}