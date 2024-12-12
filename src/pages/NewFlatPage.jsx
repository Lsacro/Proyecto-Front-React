import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuth } from "../context/authContext";
import { createFlat } from "../services/firebase";
import { FlatForm } from "../components/Flats/FlatForm";

function NewFlatPage() {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.uid : null;
  const userName = currentUser ? currentUser.displayName : "Anonymous";
  const userEmail = currentUser ? currentUser.email : null;

  useEffect(() => {
    const loadDefaultImage = async () => {
      const storage = getStorage();
      const defaultImageRef = ref(storage, "default-images/default-flat.png");
      const defaultImageUrl = "/images/flat.png";
      try {
        setImageUrl(defaultImageUrl);
      } catch (error) {
        const url = await getDownloadURL(defaultImageRef);
        setImageUrl(url);
        console.error("Error loading default image:", error);
      }
    };

    loadDefaultImage();
  }, []);

  const handleImageChange = (file) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const storage = getStorage();

      let finalImageUrl = imageUrl;
      if (imageFile) {
        const storageRef = ref(
          storage,
          `flats/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const flatData = {
        ...values,
        imageUrl: finalImageUrl,
        createdAt: new Date(),
        userId,
        ownerName: userName,
        ownerEmail: userEmail,
      };

      const flatId = await createFlat(flatData);
      console.log("Flat created successfully with ID:", flatId);

      setShowSuccessMessage(true);

      navigate("/home");
    } catch (error) {
      console.error("Error adding flat: ", error);
    }

    setSubmitting(false);
  };

  return (
    <FlatForm
      initialValues={{
        city: "",
        streetName: "",
        streetNumber: "",
        areaSize: "",
        yearBuilt: "",
        hasAC: false,
        rentPrice: "",
        availableDate: "",
      }}
      imageUrl={imageUrl}
      showSuccessMessage={showSuccessMessage}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      titleButton="Create Flat"
    />
  );
}

export { NewFlatPage };
