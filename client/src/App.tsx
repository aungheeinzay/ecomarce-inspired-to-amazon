import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Main from './layouts/Main';
import Home from './pages/Home';
import ToOrderCards from './pages/ToOrderCards';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import ForgetPasswordEmail from './pages/ForgetPasswordEmail';

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
  },{
    path:"profile",
    element:<Profile/>
  },
  {
    path:"forget_password/:token",
    element:<ForgetPassword/>
  },
  {
    path:'forgetPassword',
    element:<ForgetPasswordEmail/>
  }
]
}])
const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
