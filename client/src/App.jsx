import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import WhoWeServe from './pages/WhoWeServe';
import Experience from './pages/Experience';
import PracticeAreas from './pages/PracticeAreas';
import PracticeAreaDetail from './pages/PracticeAreaDetail';
import Knowledge from './pages/Knowledge';
import Article from './pages/Article';
import FaqPage from './pages/FaqPage';
import Resources from './pages/Resources';
import Glossary from './pages/Glossary';
import Speaking from './pages/Speaking';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import { CookiePolicy, Disclaimer, PrivacyPolicy, TermsOfUse } from './pages/Legal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'who-we-serve', element: <WhoWeServe /> },
      { path: 'experience', element: <Experience /> },
      { path: 'practice-areas', element: <PracticeAreas /> },
      { path: 'practice-areas/:slug', element: <PracticeAreaDetail /> },
      { path: 'knowledge', element: <Knowledge /> },
      { path: 'knowledge/faq', element: <FaqPage /> },
      { path: 'knowledge/resources', element: <Resources /> },
      { path: 'knowledge/glossary', element: <Glossary /> },
      { path: 'knowledge/:slug', element: <Article /> },
      { path: 'speaking', element: <Speaking /> },
      { path: 'internships', element: <Internships /> },
      { path: 'contact', element: <Contact /> },
      { path: 'disclaimer', element: <Disclaimer /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-of-use', element: <TermsOfUse /> },
      { path: 'cookie-policy', element: <CookiePolicy /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
