import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Main from './layouts/Main';
import Home from './pages/Home';
import ToOrderCards from './pages/ToOrderCards';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';

const router = createBrowserRouter([{
  path: '/',
  element: <Main />,
  children:[{
    index:true,
    element:<Home/>
  },{
    path:"orderCards",
    element:<ToOrderCards/>
  },{
    path:"register",
    element:<Register/>
  },{
    path:"login",
    element:<Login/>
  },{
    path:"product/:id",
    element:<ProductDetails/>
  }]
}])
const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
