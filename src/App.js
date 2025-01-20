import React from 'react';
import { useRoutes } from 'react-router-dom';  // useRoutes'ı buradan alıyoruz
import Login from './Components/Login';
import Home from './Components/Home';
import Layout from './Components/Layout';
import Shop from './Components/Shop';
import CartComponent from './Components/CartComponent';
import { useSelector } from 'react-redux';
import NotFoundPage from './Components/NotFoundPage';


export default function App() {

  const user = useSelector(state => state.auth.user);

  let element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "CartComponent",
          element: <CartComponent />,
        },
        { path: "Shop", element: <Shop/> },
        { path: "*", element: <NotFoundPage/> },
      ],
    },
    { path: "Login", element: <Login /> },
  ]);

  return element;
}