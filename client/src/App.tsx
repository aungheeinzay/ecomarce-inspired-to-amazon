
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
import ProductFilter from './pages/ProductFilter';
import IsLogin from './pages/IsLogin';
import IsAdmin from './pages/admin/IsAdmin';
import ProductCreate from './pages/admin/ProductCreate';
import Pannel from './pages/admin/Pannel';
import ProductUpdate from './pages/admin/ProductUpdate';
import ManageProduct from './pages/admin/ManageProduct';
import AdminChart from './components/adminChart/AdminChart';
import OrderTable from './components/admintable/OrderTable';
import ConformOrder from './pages/order/ConformOrder';
import Canceled from './pages/order/Canceled';


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
    path:"product/single/:id",
    element:<ProductDetails/>
  },{
    path:"profile",
    element:<IsLogin><Profile/></IsLogin>,
  },{
    path:"admin",
    element:<IsAdmin>
      <Pannel/>
    </IsAdmin>,
    children:[
      {
        path:"createPorduct",
        element:<ProductCreate/>
      },
      {
        path:'product/:id',
        element:<ProductUpdate/>
      },
      {
        path:"manageProduct",
        element:<ManageProduct/>
      },
      {
        path:"chartBoard",
        element:<AdminChart/>
      },
      {
        path:"order",
        element:<OrderTable/>
      }
    ]
  },
  {
    path:"forget_password/:token",
    element:<IsLogin><ForgetPassword/></IsLogin>
  },
  {
    path:'forgetPassword',
    element:<IsLogin><ForgetPasswordEmail/></IsLogin>
  },
  {
    path:'products/filter',
    element:<ProductFilter/>
  },
  {
    path:'order_success',
    element:<ConformOrder/>
  },
  {
    path:"order_cancel",
    element:<Canceled/>
  }
]
}])
const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
