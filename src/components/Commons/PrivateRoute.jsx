import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function PrivateRoute() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export { PrivateRoute };
