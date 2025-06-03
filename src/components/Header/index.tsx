import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { menus } from '@/app/shared/mocks/header';

export const Header = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSubmenuIdx, setMobileSubmenuIdx] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, idx: number) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuIdx(idx);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuIdx(null);
  };

  const handleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
    setMobileSubmenuIdx(null);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'background.default',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, md: 80 },
            px: { md: 6 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            sx={{
              display: { md: 'none' },
              mr: 1,
            }}
            onClick={handleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 140, mr: 3 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                background: theme.palette.common.white,
                borderRadius: 1,
                mr: 1,
              }}
            />
            <Typography variant="h6" fontWeight={700} color="common.white">
              Logo
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {menus.map((menu, idx) => (
                menu.submenu ? (
                  <Box key={menu.label} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      color="inherit"
                      onClick={e => handleMenuOpen(e, idx)}
                      sx={{
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'common.white',
                        pl: 2,
                        pr: 2,
                      }}
                      endIcon={
                        <KeyboardArrowDownIcon sx={{ fontSize: 20, color: 'common.white' }} />
                      }
                    >
                      {menu.label}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenuIdx === idx}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      MenuListProps={{
                        sx: { background: 'background.paper' },
                      }}
                      disableScrollLock
                    >
                      {menu.submenu.map(item => (
                        <MenuItem
                          key={item}
                          onClick={handleMenuClose}
                          sx={{ color: 'text.primary' }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={menu.label}
                    color="inherit"
                    sx={{
                      textTransform: 'none',
                      fontSize: 16,
                      fontWeight: 400,
                      color: 'common.white',
                      pl: 2,
                      pr: 2,
                    }}
                  >
                    {menu.label}
                  </Button>
                )
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 80, justifyContent: 'flex-end' }}>
            <IconButton color="inherit">
              <SearchIcon sx={{ color: 'common.white' }} />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon sx={{ color: 'common.white' }} />
            </IconButton>
          </Box>
        </Toolbar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawer(false)}
          PaperProps={{
            sx: {
              width: 260,
              background: 'background.default',
              color: 'text.primary',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 0 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                background: theme.palette.common.white,
                borderRadius: 1,
                mr: 1,
              }}
            />
            <Typography variant="h6" fontWeight={700} color="common.white">
              Logo
            </Typography>
          </Box>
          <List>
            {menus.map((menu, idx) => (
              <Box key={menu.label}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() =>
                    menu.submenu
                      ? setMobileSubmenuIdx(mobileSubmenuIdx === idx ? null : idx)
                      : setDrawerOpen(false)
                  }>
                    <ListItemText primary={menu.label} primaryTypographyProps={{ fontSize: 16, color: theme.palette.common.white }} />
                    {menu.submenu && (
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 20,
                          color: 'common.white',
                          transform: mobileSubmenuIdx === idx ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
                {menu.submenu && mobileSubmenuIdx === idx && (
                  <List sx={{ pl: 3 }}>
                    {menu.submenu.map(sub => (
                      <ListItem key={sub} disablePadding>
                        <ListItemButton onClick={() => setDrawerOpen(false)}>
                          <ListItemText primary={sub} primaryTypographyProps={{ fontSize: 15, color: theme.palette.common.white }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </Box>
  );
};
