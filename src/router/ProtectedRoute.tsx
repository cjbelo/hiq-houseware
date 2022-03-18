import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../state/store";
import { getIsAuthenticated } from "../pages/Login/Login.slice";

export const ProtectedRoute: FC = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
