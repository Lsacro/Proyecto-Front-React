import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { NewFlatPage } from "./pages/NewFlatPage";
import { UpdateProfilePage } from "./pages/UpdateProfilePage";
import { EditFlatPage } from "./pages/EditFlatPage";
import { FlatDetailsPage } from "./pages/FlatDetailsPage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { MyFlatsPage } from "./pages/MyFlatsPage";
import { AllUsersPage } from "./pages/AllUsersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ResetPasswordForm } from "./pages/ResetPasswordForm";
import { PrivateRoute } from "./components/Commons/PrivateRoute";
import { PublicRoute } from "./components/Commons/PublicRoute";
import { AdminRoute } from "./components/Commons/AdminRoute";
import { AdminEditUser } from "./pages/AdminEditUser";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-flat" element={<NewFlatPage />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
        <Route path="/edit/:id" element={<EditFlatPage />} />
        <Route path="/flats/:id" element={<FlatDetailsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/my-flats" element={<MyFlatsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Route>
      {/* Ruta admin */}
      <Route element={<AdminRoute />}>
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="/admin-edit/:id" element={<AdminEditUser />} />
      </Route>

      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
