import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  // Recupera los detalles del usuario desde el localStorage
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  // Verifica si el rol del usuario es "admin"
  return userDetails?.userRole === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
}

export { AdminRoute };
