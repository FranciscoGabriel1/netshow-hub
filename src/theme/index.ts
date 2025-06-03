import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#8B5CF6' },
        secondary: { main: '#00D7FF' },
    },
    typography: {
        fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
    },
});
