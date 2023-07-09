import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin, text }) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && user.uid !== process.env.REACT_APP_ADMIN_UID)) {
    return (
      <>
        <Navigate to="/" replace />
        {window.confirm(text)}
      </>
    );
  }

  return children;
}
