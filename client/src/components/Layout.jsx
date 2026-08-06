import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import DisclaimerModal from './DisclaimerModal';
import WhatsAppFloat from './WhatsAppFloat';
import CookieBanner from './CookieBanner';
import ScrollToTop from './ScrollToTop';
import BackToTop from './BackToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <DisclaimerModal />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
