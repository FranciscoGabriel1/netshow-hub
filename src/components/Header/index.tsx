import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function Header() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Netshow Hub
        </Typography>
        {/* Aqui podem entrar menus, search, avatar, etc */}
      </Toolbar>
    </AppBar>
  );
}
