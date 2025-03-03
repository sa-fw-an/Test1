import { createHashRouter } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import AboutUs from '@/pages/About/AboutUs';
import Mission from '@/pages/About/Mission';
import Leadership from '@/pages/About/Leadership';
import ContactUs from '@/pages/About/ContactUs';
import FAQs from '@/pages/About/FAQs';
import TrySugar from '@/pages/TrySugar';
import JoinDevelopment from '@/pages/JoinDevelopment';
import Volunteer from '@/pages/Volunteer';
import Donate from '@/pages/Donate';
import Products from '@/pages/Products';
import NewsPage from '@/pages/NewsPage';
import NewsDetailPage from '@/pages/NewsDetailPage';

const router = createHashRouter([
  { path: `/`, element: <MainPage /> },
  { path: `/about-us`, element: <AboutUs /> },
  { path: `/mission`, element: <Mission /> },
  { path: `/leadership`, element: <Leadership /> },
  { path: `/contact-us`, element: <ContactUs /> },
  { path: `/faqs`, element: <FAQs /> },
  { path: `/news`, element: <NewsPage /> },
  { path: `/news/:slug`, element: <NewsDetailPage /> },
  { path: `/try-sugar`, element: <TrySugar /> },
  { path: `/join-development`, element: <JoinDevelopment /> },
  { path: `/volunteer`, element: <Volunteer /> },
  { path: `/donate`, element: <Donate /> },
  { path: `/products`, element: <Products /> },
]);

export default router;
