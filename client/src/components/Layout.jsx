import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import DisclaimerModal from './DisclaimerModal';
import WhatsAppFloat from './WhatsAppFloat';
import CookieBanner from './CookieBanner';

export default function Layout() {
  return (
    <>
      <DisclaimerModal />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
      <ScrollRestoration />
    </>
  );
}
