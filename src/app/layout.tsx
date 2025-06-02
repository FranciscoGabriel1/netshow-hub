import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Netshow Hub',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
