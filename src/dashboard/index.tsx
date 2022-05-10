import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./auth";
import AuthRoute from "./auth/components/AuthRoute";
import AuthProvider from "./auth/context";
import Home from "./home";

export const Dashboard = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
};

export default Dashboard;
