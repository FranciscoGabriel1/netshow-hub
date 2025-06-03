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
import { useTheme } from '@mui/material/styles';
import { JSX, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHeaderStyles } from './styles';
import { menus } from '@/app/shared/mocks/header';

export const Header = (): JSX.Element => {
  const classes = useHeaderStyles();
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
    <Box className={classes.headerWrapper}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" className={classes.hamburger} onClick={handleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Box className={classes.logoBox}>
            <Box className={classes.logoIcon} />
            <Typography variant="h6" fontWeight={700} color={theme.palette.common.white}>
              Logo
            </Typography>
          </Box>
          <Box className={classes.menuContainer}>
            <Box className={classes.menuBox}>
              {menus.map((menu, idx) => (
                menu.submenu ? (
                  <Box key={menu.label} className={classes.menuItemBox}>
                    <Button
                      color="inherit"
                      onClick={e => handleMenuOpen(e, idx)}
                      className={classes.menuButton}
                      endIcon={<KeyboardArrowDownIcon className={classes.arrowIcon} />}
                    >
                      {menu.label}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenuIdx === idx}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      MenuListProps={{ className: classes.menuList }}
                      disableScrollLock
                    >
                      {menu.submenu.map(item => (
                        <MenuItem key={item} onClick={handleMenuClose} className={classes.menuListItem}>
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={menu.label}
                    color="inherit"
                    className={classes.menuButton}
                  >
                    {menu.label}
                  </Button>
                )
              ))}
            </Box>
          </Box>
          <Box className={classes.rightIcons}>
            <IconButton color="inherit">
              <SearchIcon className={classes.iconWhite} />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon className={classes.iconWhite} />
            </IconButton>
          </Box>
        </Toolbar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawer(false)}
          classes={{ paper: classes.drawerPaper }}
        >
          <Box className={classes.drawerLogo}>
            <Box className={classes.logoIcon} />
            <Typography variant="h6" fontWeight={700} color={theme.palette.common.white}>
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
                        className={classes.arrowIcon}
                        style={{
                          transform: mobileSubmenuIdx === idx ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s"
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
}
