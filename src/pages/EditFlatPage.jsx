import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuth } from "../context/authContext";
import { getFlatById, updateFlat } from "../services/firebase";
import { FlatForm } from "../components/Flats/FlatForm";

function EditFlatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    const fetchFlatData = async () => {
      try {
        const flatData = await getFlatById(id);
        if (flatData) {
          const availableDate = new Date(flatData.availableDate);
          const formattedDate = !isNaN(availableDate.getTime())
            ? availableDate.toISOString().split("T")[0]
            : "";

          setInitialValues({
            city: flatData.city,
            streetName: flatData.streetName,
            streetNumber: flatData.streetNumber,
            areaSize: flatData.areaSize,
            yearBuilt: flatData.yearBuilt,
            hasAC: flatData.hasAC,
            rentPrice: flatData.rentPrice,
            availableDate: formattedDate,
          });
          setImageUrl(flatData.imageUrl);
        } else {
          console.error("Flat not found");
        }
      } catch (error) {
        console.error("Error fetching flat data:", error);
      }
    };

    fetchFlatData();
  }, [id, navigate]);

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

      const updatedFlatData = {
        ...values,
        imageUrl: finalImageUrl,
        updatedAt: new Date(),
      };

      await updateFlat(id, updatedFlatData);
      console.log("Flat updated successfully");

      setShowSuccessMessage(true);

      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      console.error("Error updating flat: ", error);
    }

    setSubmitting(false);
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <FlatForm
      initialValues={initialValues}
      imageUrl={imageUrl}
      showSuccessMessage={showSuccessMessage}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      titleButton="Update flat"
    />
  );
}

export { EditFlatPage };
