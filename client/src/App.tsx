import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Main from './layouts/Main';
import Home from './pages/Home';

const router = createBrowserRouter([{
  path: '/',
  element: <Main />,
  children:[{
    index:true,
    element:<Home/>
  }]
}])
const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
