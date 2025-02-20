import {
    createBrowserRouter
  } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "../components/naviagtion/Navbar";
import Dashboard from "../pages/Dashboard";
// import { ProtectedRoute } from "./PrivateRoute";
import SignUp from "../pages/SignUp";

import Sidebar from "../components/naviagtion/SideBar";
import  ProtectedRoute  from "./ProtectedRoute";
import SleepDataUi from "../pages/SleepDataUi";



const router = createBrowserRouter([
    {
      element:<Navbar/>,
      errorElement: <ErrorPage />,
      children: [
      {
        path: "/",
        element: <App />,
    },

    {
      path: "/login",
      element: <Login/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/sleepData",
      element: 
      <ProtectedRoute>
      <SleepDataUi/>
      </ProtectedRoute>
      ,
      errorElement: <ErrorPage />,
    },
    ],
    
    },
    {
      element:<Sidebar/>,
      errorElement: <ErrorPage />,
      children: [
      {
        path: "/dashboard",
        element: 
        // <ProtectedRoute>
        <Dashboard />
        // </ProtectedRoute>
    }
    ],
    
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  export default router