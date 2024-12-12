import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"; // Importa las funciones de Firebase Storage
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/firebase"; // Función que guarda el usuario en Firestore
import { UserForm } from "../components/Users/UserForm";

function RegisterPage() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("/images/profile.jpg");
  const [imageFile, setImageFile] = useState(null); // Almacena el archivo de imagen

  // Manejar la selección de la imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Guardamos el archivo de imagen
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result); // Previsualización de la imagen
      reader.readAsDataURL(file);
    }
  };

  const auth = getAuth();
  const storage = getStorage(); // Instancia de Firebase Storage

  const initialValues = {
    name: "",
    lastname: "",
    date: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "user",
    favorites: [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Crear el usuario con email y contraseña
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Subir la imagen a Firebase Storage, si hay imagen
      let finalImageUrl = imageUrl;
      if (imageFile) {
        const storageRef = ref(
          storage,
          `users/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef); // Obtener la URL de la imagen subida
      }

      // Actualizar el perfil del usuario en Firebase Authentication (sin almacenar la imagen aquí)
      await updateProfile(user, {
        displayName: `${values.name} ${values.lastname}`, // Solo almacenamos el nombre completo
      });

      // Guardar el usuario en Firestore
      await createUser({
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        userRole: values.userRole,
        favorites: values.favorites,
        uid: user.uid,
        profileImage: finalImageUrl,
        date: values.date,
      });

      // Redirigir al usuario a la página principal después de registrarse
      navigate("/home");
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UserForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      imageUrl={imageUrl}
      handleImageChange={handleImageChange}
    />
  );
}

export { RegisterPage };
