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
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';

import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/components/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <Home></Home></Protected> ,
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
    element: <NavBar> <OrderSuccessPage> </OrderSuccessPage> </NavBar>,
  },
  {
    path: "/orders",
    element: <UserOrdersPage></UserOrdersPage>,
    // we will add page later, right now using component directly
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,

  },
  {
    path: "*",   // wild card
    element: <NavBar><PageNotFound> </PageNotFound> </NavBar>,
  },
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if(user){

      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);  // user.id

  return (

    <div className="App">
      
     <RouterProvider router={router} />

    </div>
  );
}

export default App;
