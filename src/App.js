import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Header from "./components/header/Header";
import Main from './components/main/Main';
import View from './components/view/View';
import Products from './components/products/Products/Products';
import Product from './components/products/Product/Product';
import Footer from './components/footer/Footer';
import Animation from './components/animation/Animation';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Main/>
        <Footer/>
      </>
    ),
  },
  {
    path: "/view",
    element: (
      <>
        <Header />
        <View/>
        <Footer/>
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <Products/>
        <Footer/>
      </>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <Header />
        <Product />
        <Footer/>
      </>
    ),
  },
  {
    path: "/animation",
    element: (
      <>
        <Header />
        <Animation />
        <Footer/>
      </>
    ),
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
