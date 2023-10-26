import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";

// import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
// import TopBar from './pages/TopBarTitle';
import NavBar from './features/navbar/Navbar';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';

import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/components/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';

import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
// react alerts
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// react alerts
const options = {
  timeout: 4000,
  position: positions.BOTTOM_CENTER,
};

// routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <Home></Home></Protected> ,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin> <AdminHome></AdminHome></ProtectedAdmin> ,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage> </ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage> </ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage> </ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage> </ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected> <CartPage></CartPage> </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><NavBar> <Checkout></Checkout> </NavBar> </Protected> ,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/order-success/:id",
    element: <Protected> <NavBar> <OrderSuccessPage> </OrderSuccessPage> </NavBar> </Protected>,
  },
  {
    path: "/orders",
    element: <Protected> <UserOrdersPage></UserOrdersPage> </Protected>,
    // we will add page later, right now using component directly
  },
  {
    path: "/profile",
    element: <Protected> <UserProfilePage></UserProfilePage> </Protected>,

  },
  {
    path: "/logout",
    element: <Logout></Logout>,

  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,

  },
  {
    path: "*",   // wild card
    element: <NavBar><PageNotFound> </PageNotFound> </NavBar>,
  },
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(()=>{
    dispatch(checkAuthAsync());
  },[dispatch]);

  useEffect(() => {

    if(user){

      dispatch(fetchItemsByUserIdAsync()); // we can get req.user by token on backend as no need in frontEnd
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);  // user.id

  return (
<>
    <div className="App">

      { userChecked &&  <Provider template={AlertTemplate} {...options}>

     <RouterProvider router={router} />
     </Provider> }
     {/* Link must be inside the provider */}
    </div>
    </>
  );
}

export default App;
