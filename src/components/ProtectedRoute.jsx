import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const authUser = useSelector((state) => state.auth.user);

  // Not logged in
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  // Role-based protection
  if (requiredRole && authUser.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
