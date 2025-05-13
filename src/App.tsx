import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage/HomePage'
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import './App.css'
import { configStore } from './Store/store';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Reports from './pages/Reports/Reports';
import Guides from './pages/Guides/Guides';
import Governmentals from './pages/Governmentals/Governmentals';
import AboutUs from './pages/AboutUs/AboutUs';
import Packages from './pages/Packages/Packages';
import Articles from './pages/Articles/Articles';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';
import ShowPDF from './pages/ShowPDF/ShowPDF';
import ArticleItem from './pages/Articles/Article';
import { useLayoutEffect } from 'react';
import VerifyEmail from './pages/Auth/VerifyEmail';
import ThankYou from './pages/ThankYou/ThankYou';
import Subscribe from './pages/Subscribe/Subscribe';

function App() {
  useLayoutEffect(() => {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];

    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      localStorage.setItem("searchGuide","");
    localStorage.setItem("searchReport","");
    }
  }, []);
  const router = createBrowserRouter([
    {path:'/login', element:<Login />},
    {path:'/register', element:<Register />},
    {path: '/forgot-password', element: <ForgotPassword />},
    {path: '/reset-password/:token', element: <ResetPassword />},
    {path: '/viewPdf/:pdfName/:kind/:name/:details', element: <ShowPDF/>},
    {path: '/verifyEmail/:token', element: <VerifyEmail/>},
    
    {path: '/', element: <Layout />, children: [
      {path: '/', element: <HomePage />},
      {path: '/search', element: <Reports/>},
      {path: '/guides', element: <Guides/>},
      {path: '/governmentals', element: <Governmentals/>},
      {path: '/aboutUs', element: <AboutUs />},
      {path: '/packages', element: <Packages />},
      {path: '/articles', element: <Articles />},
      {path: '/privacyPolicy', element: <PrivacyPolicy />},
      {path: '/termsAndConditions', element: <TermsAndConditions />},
      {path: 'Article/:articleId/:articleName',element: <ArticleItem />},
      {path: '/thankYou', element: <ThankYou />},
      {path: '/subscribe/:email', element: <Subscribe />},
    ]},
  ]);
  return (
    <Provider store={configStore}>
    <RouterProvider router={router} />
    </Provider>
  )
}

export default App
