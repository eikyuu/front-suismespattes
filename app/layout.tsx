import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import ContentNavigation from '../components/content-navigation';
import Headband from '../components/headband';
import AuthProvider from '../@core/context/AuthProvider';
import Provider from '../@core/lib/provider';
import Footer from '../components/footer';

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
        <Provider>
        <AuthProvider>
          <Headband />
          <ContentNavigation />
          <main>
            {children}
          </main>
          <Analytics />
          <Footer />
          <Toaster />
        </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
