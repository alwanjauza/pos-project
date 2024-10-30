import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/auth/login-page";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../pages/dashboard/dashboard";
import ProductsPage from "../pages/dashboard/products-page";

const RouterManagement = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/products'
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
};

export default RouterManagement;
