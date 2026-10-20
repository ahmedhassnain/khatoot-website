import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { ToastViewport } from './Toast.jsx';

export default function Layout() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />   
      <Footer />
      <ToastViewport />
    </>
  );
}