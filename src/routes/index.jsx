import {
    createBrowserRouter
  } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "../components/naviagtion/Navbar";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";

import Sidebar from "../components/naviagtion/SideBar";
import  ProtectedRoute  from "./ProtectedRoute";
import SleepDataUi from "../pages/SleepDataUi";

import AddNewUser from "../pages/AddNewUser";

import AdminDashboard from "../components/AdminDashboard";
import Schedule from "../pages/Schedule";
import ResetPass from "../pages/ResetPass";
import SendNotification from "../pages/SendNotification";

import FlightSchedule from "../pages/FlightSchedule";
import GetData from "../components/employee/GetData";

// import HealthInsights from "../components/admin/HealthInsights";
import HealthInsights from "../components/HealthInsights";
import ConnectBit from "../components/fitBit/ConnectBit";
import DisplaySleep from "../components/fitBit/DisplaySleep";
import Callback from "../components/fitBit/Callback";






const router = createBrowserRouter([
    {
      element:<Navbar/>,
      errorElement: <ErrorPage />,
      children: [
    //   {
    //     path: "/",
    //     element: <App />,
    // },

    // {
    //   path: "/login",
    //   element: <Login/>,
    //   errorElement: <ErrorPage />,
    // },
    {
      path: "/sleepData",
      element: 
      <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard/>
      </ProtectedRoute>
      ,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: 
      <ProtectedRoute allowedRoles={["admin", "employee"]}>
      <Dashboard />
     </ProtectedRoute>
  },
    {
      path: "/schedule",
      element: 
      <ProtectedRoute allowedRoles={["admin", "employee"]}>
      <Schedule/>
     </ProtectedRoute>
  },
    {
      path: "/health-insights",
      element: 
      <ProtectedRoute allowedRoles={["admin", "employee"]}>
      {/* <Schedule/> */}
      <HealthInsights/>
     </ProtectedRoute>
  },
    {
      path: "/sendNotification",
      element: 
      <ProtectedRoute allowedRoles={["admin", "employee"]}>
      <SendNotification/>
     </ProtectedRoute>
  },
    {
      path: "/HealthInsights",
      element:
      <ProtectedRoute allowedRoles={["admin",'employee']}>
      {/* <HealthInsights/> */}
      <HealthInsights/>
      </ProtectedRoute>
    },
    {
      path: "/addnewuser",
      element: <AddNewUser/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/reset-password",
      element: <ResetPass/>,
      errorElement: <ErrorPage />,
    },

    {
      path: "/flight-schedule",
      element: <FlightSchedule/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/generate-schedule",
      element: <SleepDataUi/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/fitbit",
      element: <ConnectBit/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/callback",
      element: <Callback/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/display-sleep",
      element: <DisplaySleep/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/test",
      element: <GetData/>,
      errorElement: <ErrorPage />,
    },

    ],
    
    },
    {
      element:<Navbar/>,
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
    {
      path: "/login",
      element: <Login/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <Login/>,
      errorElement: <ErrorPage />,
    },
  ]);

  export default router