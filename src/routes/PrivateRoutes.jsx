import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

const ProtectedRoute = ({children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    // While loading, render a placeholder or spinner
    return <div><Spin/></div>;
  }

  // if not logged not 
  if(!user){
    return <Navigate to={'/login'} replace/>
  }

  // Once loaded, redirect if no user
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
