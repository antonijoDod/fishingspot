import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
