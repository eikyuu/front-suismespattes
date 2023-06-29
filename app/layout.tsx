import Banner from '../ui/atoms/banner/banner';
import ContentNavigation from '../ui/molecules/contentNavigation/contentNavigation';
import Footer from '../ui/molecules/footer/footer';
import './globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Au fil des pattes',
  description: 'Des promenades sur mesure pour satisfaire tous les toutous!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ContentNavigation />
        <Banner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
