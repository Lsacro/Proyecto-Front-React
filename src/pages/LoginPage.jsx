import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LoginForm } from "../components/Users/LoginForm";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import axiosBase from "../assets/utils";

function LoginPage() {
  const navigate = useNavigate();
  const { currentUser, handleAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  // Redirige si ya hay un usuario autenticado
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  // Manejo del inicio de sesión con correo y contraseña
  const handleLogin = async (email, password) => {
    try {
      const response = await axiosBase.post("/api/auth/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Guardar usuario y token en el contexto
      handleAuth(user, token);

      alert("Welcome");

      // Redirigir al usuario
      navigate("/home");
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("Incorrect Credentials");
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  // Manejo del inicio de sesión con Google
  const handleLoginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      const { data } = await axiosBase.post("/api/auth/login-google", {
        email: user.email,
        password: user.uid,
        firstName: user.displayName,
        lastName: " ",
        birthDate: eighteenYearsAgo,
        profileImage: user.photoURL,
      });

      // Guardar usuario y token en el contexto
      handleAuth(data.user, data.token);

      alert("Welcome " + data.user.firstName);
      // Redirigir al usuario
      navigate("/home");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setErrorMessage("Error logging in with Google: " + error.message);
    }
  };

  // Manejo del restablecimiento de contraseña
  const handleResetPassword = async (email) => {
    setErrorMessage(""); // Limpiar mensaje de error
    try {
      await axiosBase.post("/api/auth/forgot-password", { email });
      setErrorMessage("We sent you an email. Check your inbox.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("No user found with this email.");
      } else {
        setErrorMessage("Error sending password reset email.");
      }
    }
  };

  return (
    <LoginForm
      onLogin={handleLogin}
      onLoginWithGoogle={handleLoginWithGoogle}
      onResetPassword={handleResetPassword}
      errorMessage={errorMessage}
    />
  );
}

export { LoginPage };
