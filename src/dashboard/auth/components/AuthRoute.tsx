import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hook";

interface AuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const { user, loading, getUser, logout } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <React.Fragment>Carregando</React.Fragment>;
  }

  if (user) {
    return (
      <React.Fragment>
        <button onClick={() => logout()}>Logout</button>
        {children}
      </React.Fragment>
    );
  }

  return <Navigate to="/admin/auth/login" />;
};

export default AuthRoute;
