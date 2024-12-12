import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function PublicRoute() {
  const { currentUser } = useAuth();

  return !currentUser ? <Outlet /> : <Navigate to="/home" />;
}

export { PublicRoute };
