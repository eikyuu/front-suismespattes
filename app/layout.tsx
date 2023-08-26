import './globals.scss';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Banner from './components/Banner';
import ContentNavigation from './components/ContentNavigation';
import Footer from './components/Footer';
import Headband from './components/Headband';
import AuthProvider from '../@core/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Au fil des pattes',
  description: 'Des promenades sur mesure pour satisfaire tous les toutous!',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <body suppressHydrationWarning={true} className={inter.className}>
        <AuthProvider>
          <header>
            <Headband />
            <ContentNavigation />
          </header>
          <Banner />
          {children}
          <Analytics />
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
