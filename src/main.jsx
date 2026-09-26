import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './CartContext.jsx'; 
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Product from './Product.jsx';
import Cart from './Cart.jsx';
import About from './About.jsx';
import './Main.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "product/pehla-khat/:id", element: <Product /> },
      { path: "cart", element: <Cart /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);
