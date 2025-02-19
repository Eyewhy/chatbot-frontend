import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/authProvider";


const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/" />;
  return <Outlet />;
};

const AdminRoute = () => {
  const user = useAuth();
  if (!user.organization) return <Navigate to="/admin/join" />;
  return <Outlet />;
};
export { PrivateRoute, AdminRoute } ;