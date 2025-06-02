import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF0054' },     
    secondary: { main: '#00D7FF' },   
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
  },
});
