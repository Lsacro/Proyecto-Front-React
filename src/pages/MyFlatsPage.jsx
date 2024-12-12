import { useState, useEffect } from "react";

import { deleteFlat, getFlatsByUserId } from "../services/firebase.js";
import { Navbar } from "../components/Commons/Navbar.jsx";
import { FlatList } from "../components/Flats/FlatList.jsx";
import { useAuth } from "../context/authContext.jsx";

function MyFlatsPage() {
  const { currentUser } = useAuth();
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    const fetchUserFlats = async () => {
      if (currentUser) {
        try {
          const userFlats = await getFlatsByUserId(currentUser.uid);
          setFlats(userFlats);
        } catch (error) {
          console.error("Error al obtener los flats del usuario:", error);
        }
      }
    };

    fetchUserFlats();
  }, [currentUser]);

  const handleDeleteFlat = async (flatId) => {
    try {
      await deleteFlat(flatId); // Elimina el flat de Firestore
      setFlats(flats.filter((flat) => flat.id !== flatId)); // Actualiza el estado filtrando el flat eliminado
    } catch (error) {
      console.error("Error al eliminar el flat:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-wrap justify-center gap-4 mt-24 mr-4 ml-4 mb-16">
        <FlatList flats={flats} onDeleteFlat={handleDeleteFlat} />
      </section>
    </>
  );
}

export { MyFlatsPage };
