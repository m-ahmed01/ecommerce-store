import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Home></Home>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
]);


function App() {
  return (
    <div className="App">

     {/* <SignupPage> </SignupPage> */}

     <RouterProvider router={router} />

    </div>
  );
}

export default App;
