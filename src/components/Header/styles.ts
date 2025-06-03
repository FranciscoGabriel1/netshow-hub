import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useHeaderStyles = makeStyles((theme: Theme) => ({
  headerWrapper: {
    borderBottom: 'none',
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2, 2, 0, 2),
    background: theme.palette.background.paper,
    overflow: 'hidden',
  },
  appBar: {
    background: theme.palette.background.default,
    boxShadow: 'none',
  },
  toolbar: {
    minHeight: 56,
    [theme.breakpoints.up('md')]: {
      minHeight: 80,
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(3),
    minWidth: 140,
  },
  logoIcon: {
    width: 28,
    height: 28,
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
  },
  menuContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBox: {
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.common.white,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  arrowIcon: {
    fontSize: 20,
    color: theme.palette.common.white,
  },
  menuList: {
    background: theme.palette.background.paper,
  },
  menuListItem: {
    color: theme.palette.text.primary,
  },
  menuItemBox: {
    display: 'flex',
    alignItems: 'center',
  },
  rightIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    minWidth: 80,
    justifyContent: 'flex-end',
  },
  iconWhite: {
    color: theme.palette.common.white,
  },
  hamburger: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    marginRight: theme.spacing(1),
  },
  drawerPaper: {
    width: 260,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  drawerLogo: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
}));
