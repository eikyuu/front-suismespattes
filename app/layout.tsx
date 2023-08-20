import Banner from '../ui/atoms/banner/banner';
import ContentNavigation from '../ui/molecules/contentNavigation/contentNavigation';
import Footer from '../ui/molecules/footer/footer';
import './globals.scss';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

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
