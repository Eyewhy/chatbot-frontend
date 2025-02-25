import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/authProvider";
import { websiteVersion } from "../App";


const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

const AdminRoute = () => {
  const user = useAuth();
  if (!user.organization) return <Navigate to="/admin/join" />;
  return <Outlet />;
};

const WebsiteRoute = () => {
  if (websiteVersion === 'chatbot') return <Navigate to="/login" />;
  return <Outlet />;
}

export { PrivateRoute, AdminRoute, WebsiteRoute } ;