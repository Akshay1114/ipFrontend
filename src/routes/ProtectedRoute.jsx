import React,{useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = useSelector((state) => state.auth.role);
const dispatch = useDispatch();
  useEffect(() => {
    console.log('ProtectedRoute')
    const handleStorageChange = () => {
      const storedToken = sessionStorage.getItem("token");
      if (!storedToken || !allowedRoles.includes(role)) {
        console.log('logout')
        dispatch(logout()); 
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.auth.token);
  
  if (!isAuthenticated || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // if (!allowedRoles.includes(role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  // return <Outlet />;
return children;
};

export default ProtectedRoute;
