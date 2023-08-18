import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PageName, SettingsButton, ViewsButton } from '../utils/data';

export default function MainMenu() {
  return (
    <Box sx={{ flexGrow: 1 }} color="primary">
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
        <Typography
            letterSpacing={2}
            variant="h6" 
            component="div" 
            align="left" 
            sx={{ flexGrow: 1 }}
            color="secondary"
        >
            {PageName}
        </Typography>
        <Button color="secondary">{ViewsButton}</Button>
        <Button color="secondary">{SettingsButton}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
