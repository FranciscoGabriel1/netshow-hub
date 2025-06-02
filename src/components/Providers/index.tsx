'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme';
import { Header } from '@/components/Header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
