// components/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or a loader

  return isAuthenticated ? children : <Navigate to="/session/login" />;
};

export default PrivateRoute;
