import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LoginForm } from "../components/Users/LoginForm";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { createUser, getUserByEmail } from "../services/firebase";

function LoginPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setErrorMessage("The password is incorrect.");
      } else {
        setErrorMessage("Incorrect Credentials");
      }
    }
  };

  // Manejo del inicio de sesión con Google
  const handleLoginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Comprobar si el usuario ya está en el cache (localStorage)
      const cachedUser = localStorage.getItem(`user_${user.uid}`);
      if (!cachedUser) {
        // Si no está en cache, verificar en Firestore si el usuario ya existe
        const userByEmail = await getUserByEmail(user.email);

        // Si el usuario no existe en Firestore, crearlo
        if (userByEmail.length === 0) {
          const newUser = {
            name: user.displayName,
            lastname: "",
            date: "",
            email: user.email,
            userRole: "user",
            favorites: [],
            uid: user.uid,
            profileImage: user.photoURL,
          };

          // Crear el usuario en Firestore
          await createUser(newUser);

          // Guardar los datos del usuario en localStorage para futuras consultas
          localStorage.setItem(`user_${user.uid}`, JSON.stringify(newUser));
        } else {
          // Si el usuario ya existe en Firestore, cachearlo
          localStorage.setItem(
            `user_${user.uid}`,
            JSON.stringify(userByEmail[0])
          );
        }
      }

      // Redirigir a la página principal después del login exitoso
      navigate("/my-flats");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setErrorMessage("Error logging in with Google: " + error.message);
    }
  };

  // Manejo del restablecimiento de contraseña
  const handleResetPassword = async (email) => {
    setErrorMessage(""); // Limpiar mensaje de error
    try {
      await sendPasswordResetEmail(auth, email);
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
