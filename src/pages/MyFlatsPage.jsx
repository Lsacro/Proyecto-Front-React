import { useState, useEffect } from "react";

import { deleteFlat, getFlatsByUserId } from "../services/firebase.js";
import { Navbar } from "../components/Commons/Navbar.jsx";
import { FlatList } from "../components/Flats/FlatList.jsx";
import { useAuth } from "../context/authContext.jsx";
import axiosBase from "../assets/utils.js";

function MyFlatsPage() {
  const { currentUser } = useAuth();
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    const fetchUserFlats = async () => {
      if (currentUser) {
        try {
          const { data: userFlats } = await axiosBase.get("/flats/me");
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
      console.log("Eliminando flat con ID:", flatId);
      await axiosBase.delete(`/flats/${flatId}`);
      const flatsAux = [...flats];
      setFlats(flatsAux.filter((flat) => flat._id !== flatId)); // Actualiza el estado filtrando el flat eliminado
    } catch (error) {
      console.error("Error al eliminar el flat:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-wrap justify-center gap-4 mt-24 mr-4 ml-4 mb-16">
        <FlatList flats={flats} onDeleteFlat={(id) => handleDeleteFlat(id)} />
      </section>
    </>
  );
}

export { MyFlatsPage };
