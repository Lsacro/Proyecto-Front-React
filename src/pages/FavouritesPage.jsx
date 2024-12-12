import { useEffect, useState } from "react";
import { Navbar } from "../components/Commons/Navbar.jsx";
import { FlatItem } from "../components/Flats/FlatItem.jsx";
import { useAuth } from "../context/authContext.jsx";
import { getFavoriteIdsOfUser, getFlatsByIds } from "../services/firebase.js";
import { deleteFlat, removeFlatFromFavorites } from "../services/firebase.js";
import { AlertFavorites } from "../components/Commons/AlertFavorites.jsx";
import { SkeletonCard } from "../components/Commons/SkeletonCard.jsx";
import { MessageAlert } from "../components/Commons/MessageAlert.jsx";

function FavouritesPage() {
  const { userDetails } = useAuth();
  const [favoritesFlats, setFavoritesFlats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [confirmationMessage, setConfirmationMessage] = useState(null); // Estado para los mensajes de confirmación

  useEffect(() => {
    const fetchFavoritesOfUser = async () => {
      try {
        setLoading(true); // Inicia la carga
        if (userDetails && userDetails.id) {
          const favoriteIds = await getFavoriteIdsOfUser(userDetails.id);
          if (favoriteIds.length > 0) {
            const flatsDetails = await getFlatsByIds(favoriteIds);
            setFavoritesFlats(flatsDetails);
          } else {
            setFavoritesFlats([]);
          }
        }
      } catch (error) {
        setError("Error fetching favorite flats");
        console.error("Error fetching favorite flats:", error);
      } finally {
        setTimeout(() => {
          setLoading(false); // Finaliza la carga
        }, 1000);
      }
    };

    fetchFavoritesOfUser();
  }, [userDetails]);

  const handleDeleteFlat = async (flatId) => {
    try {
      // Eliminar flat de la base de datos
      // await deleteFlat(flatId);
      // Eliminar flat de los favoritos del usuario
      await removeFlatFromFavorites(userDetails.id, flatId);
      // Actualizar la lista de flats favoritos en el estado
      setFavoritesFlats(favoritesFlats.filter((flat) => flat.id !== flatId));
      // Mostrar mensaje de confirmación
      setConfirmationMessage("Flat removed from favorites successfully!");
    } catch (error) {
      console.error("Error removing flat from favorites:", error);
      setError("Error removing flat from favorites");
    } finally {
      // El mensaje de confirmación desaparece después de 2 segundos
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 1000); // Cambiado a 2 segundos (2000 ms)
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-wrap justify-center gap-4 mt-24 mr-4 ml-4 mb-16">
        {loading && (
          <section className="flex flex-wrap justify-center gap-6 mt-24 mr-4 ml-4 mb-16">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </section>
        )}{" "}
        {/* Indicador de carga */}
        {error && <p>{error}</p>} {/* Mostrar mensaje de error */}
        {confirmationMessage && (
          <MessageAlert /> // Componente de confirmación
        )}
        {/* Mostrar mensaje de confirmación */}
        {!loading && favoritesFlats.length > 0
          ? favoritesFlats.map((flat) => (
              <FlatItem
                key={flat.id}
                id={flat.id}
                imageUrl={flat.imageUrl}
                city={flat.city}
                streetName={flat.streetName}
                streetNumber={flat.streetNumber}
                areaSize={flat.areaSize}
                yearBuilt={flat.yearBuilt}
                hasAC={flat.hasAC}
                rentPrice={flat.rentPrice}
                availableDate={flat.availableDate}
                ownerName={flat.ownerName}
                ownerEmail={flat.ownerEmail}
                isFavorite={true}
                onDelete={handleDeleteFlat}
                displayFavoriteIcon="hidden"
                displayPencilIcon="hidden"
                displayTrashIcon="Block"
                displayHomeIcon="hidden"
              />
            ))
          : !loading && <AlertFavorites />}
      </section>
    </>
  );
}

export { FavouritesPage };
