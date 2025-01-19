import {
    createBrowserRouter
  } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ErrorPage from "../pages/errorPage";
import Navbar from "../common/Navbar";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "./PrivateRoute";
import Sidebar from "../common/Sidebar";



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
    ],
    
    },
    {
      element:<Sidebar/>,
      errorElement: <ErrorPage />,
      children: [
      {
        path: "/dashboard",
        element: 
        <ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
    }
    ],
    
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  export default router