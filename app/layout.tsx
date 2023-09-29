import './globals.scss';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import ContentNavigation from './components/ContentNavigation';
import Footer from './components/Footer';
import Headband from './components/Headband';
import AuthProvider from '../@core/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Suismespattes.com : une plateforme pour voyager avec ton chien !',
  description: 'Suis mes pattes, une plateforme collaborative gratuite pour voyager avec ton chien ! Trouve ta destination idéale. Que ce soit pour une sortie en forêt, en ville ou à la campagne, nous avons ce qu’il te faut.',
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.webp" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning={true} className={inter.className + ' font-sans leading-relaxed'}>
        <AuthProvider>
          <Headband />
          <ContentNavigation />
          {children}
          <Analytics />
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
