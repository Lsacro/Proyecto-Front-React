import { useState } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"; // Importa las funciones de Firebase Storage
import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/Users/UserForm";
import axiosBase from "../assets/utils";
import { useAuth } from "../context/authContext";
import { getAuth } from "firebase/auth";

function RegisterPage() {
  const navigate = useNavigate();
  const { handleAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
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
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    favouriteFlats: [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Subir la imagen a Firebase Storage, si hay imagen
      let finalImageUrl;
      if (imageFile) {
        const storageRef = ref(
          storage,
          `users/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef); // Obtener la URL de la imagen subida
        console.log("URL DE LA IMAGEN: ", finalImageUrl);
      }

      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        birthDate: values.birthDate,
      };

      if (finalImageUrl) {
        body.profileImage = finalImageUrl;
      }
      const response = await axiosBase.post("/api/auth/register", body);

      const { user, token } = response.data;

      // Guardar usuario y token en el contexto
      handleAuth(user, token);

      // Redirigir al usuario a la página principal después de registrarse
      navigate("/home");
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <UserForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        errorMessage={errorMessage}
      />
    </>
  );
}

export { RegisterPage };
