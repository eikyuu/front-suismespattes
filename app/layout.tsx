import './globals.scss';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Banner from '../composants/banner';
import ContentNavigation from '../composants/contentNavigation';
import Footer from '../composants/footer';
import Headband from '../composants/headband';

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
        <header>
          <Headband />
          <ContentNavigation />
        </header>
        <Banner />
        {children}
        <Analytics />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
