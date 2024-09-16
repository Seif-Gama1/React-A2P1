import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export function AuthProtectedRoute({ children }) {
  const { valueObj } = useContext(AppContext);
  const { user } = valueObj;
  if (user) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
}

export function UserProtectedRoute({ children }) {
  const { valueObj } = useContext(AppContext);
  const { user } = valueObj;

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth" />;
  }
}