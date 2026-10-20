import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './CartContext.jsx';
import { ToastProvider } from './Toast.jsx';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Kaifiyat from './Kaifiyat.jsx';
import PehlaKhat from './PehlaKhat.jsx';
import PageStripe from './PageStripe.jsx';
import Product from './Product.jsx';
import Cart from './Cart.jsx';
import About from './About.jsx';
import Missing from './Missing.jsx';
import './Main.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "pehla-khat", element: <><PageStripe /><PehlaKhat /></> },
      { path: "kaifiyat", element: <><PageStripe /><Kaifiyat /></> },
      { path: "about", element: <About /> },
      { path: "product/:collection/:id", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "missing", element: <Missing />},
      { path: "*", element: <Missing /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </ToastProvider>
);
