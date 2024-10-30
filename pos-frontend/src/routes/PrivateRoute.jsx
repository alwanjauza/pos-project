import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/auth";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/verify"); // This should now include the cookie with the token
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
