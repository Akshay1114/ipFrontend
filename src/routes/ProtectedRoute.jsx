import React,{useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ProtectedRoute = ({ children }) => {

const dispatch = useDispatch();
  useEffect(() => {
    console.log('ProtectedRoute')
    const handleStorageChange = () => {
      const storedToken = sessionStorage.getItem("token");
      if (!storedToken) {
        dispatch(logout()); 
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.auth.token);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
