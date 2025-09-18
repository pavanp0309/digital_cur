// src/routes/PublicRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null; // or a spinner

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
