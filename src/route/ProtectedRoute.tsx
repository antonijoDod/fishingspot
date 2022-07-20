import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const value = useAuth();

  if (value?.userInfo === undefined || !value?.userInfo.jwt) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
