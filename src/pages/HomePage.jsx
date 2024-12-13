import { useState, useEffect } from "react";
import { Navbar } from "../components/Commons/Navbar.jsx";
import { FlatItem } from "../components/Flats/FlatItem.jsx";
import { getFavoriteIdsOfUser } from "../services/firebase";
import { useAuth } from "../context/authContext";
import { SkeletonHeader } from "../components/Commons/SkeletonHeader.jsx";
import { SkeletonCard } from "../components/Commons/SkeletonCard.jsx";
import { FilterHome } from "../components/Commons/FilterHome.jsx";
import axiosBase from "../assets/utils.js";

function HomePage() {
  const { currentUser } = useAuth();
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, forceUpdate] = useState();
  const [error, setError] = useState(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [userId, setUserId] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    sortOption: null,
    areaRange: null,
    priceRange: null,
  });

  useEffect(() => {
    // Monitorea los cambios en userDetails
    if (currentUser) {
      setUserId(currentUser.id);
      setLoadingUserDetails(false); // Detenemos la carga del usuario si se tiene el ID
      // Extrae solo los campos necesarios
      const { isAdmin, id, email } = currentUser;

      // Guardar solo esos campos en localStorage
      const userDataToStore = { isAdmin, id, email };
      localStorage.setItem("userDetails", JSON.stringify(userDataToStore));
    } else if (currentUser === null) {
      console.log("Esperando a que userDetails esté disponible...");
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchFlats = async () => {
      setLoading(true);
      try {
        const { data: flatsList } = await axiosBase.get("/flats", {
          params: {
            sortOption: filterOptions.sortOption,
          },
        });
        console.log("Flats obtenidos en HomePage:", flatsList);

        if (flatsList.length > 0) {
          const updatedFlatsList = flatsList.map((flat) => ({
            ...flat,
            isFavorite: currentUser?.favouriteFlats.includes(flat._id),
          }));
          setFlats(updatedFlatsList);
        } else {
          setFlats([]);
          console.log("No se encontraron flats.");
        }
      } catch (error) {
        setError("Error al obtener los pisos.");
        console.error("Error al obtener los pisos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!loadingUserDetails && currentUser) {
      fetchFlats();
    }
  }, [loadingUserDetails, currentUser, filterOptions]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        try {
          console.log("Obteniendo favoritos para el usuario con ID:", userId);
          const fetchedFavoriteIds = await getFavoriteIdsOfUser(userId);
          console.log("IDs de favoritos obtenidos:", fetchedFavoriteIds);
          setFavoriteIds(fetchedFavoriteIds);
        } catch (error) {
          console.error("Error al obtener los favoritos:", error);
        }
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const handleFavoriteToggle = async (flatId) => {
    if (!userId) {
      console.error("El ID del uusuario vno está disponible.");
      return;
    }
    try {
      const isFavorite = currentUser.favouriteFlats.includes(flatId);
      await axiosBase.post("/user/change-favorite", {
        idUser: userId,
        idFlat: flatId,
      });

      // Actualiza el estado del flat para reflejar el cambio
      const flatsAux = [...flats];
      setFlats([
        ...flatsAux.map((flat) =>
          flat._id === flatId ? { ...flat, isFavorite: !isFavorite } : flat
        ),
      ]);
      forceUpdate({});
    } catch (error) {
      console.error("Error al cambiar el estado de favorito:", error);
    }
  };

  const handleFilterChange = (filters) => {
    console.log("Filtros recibidos desde FilterHome:", filters); // Depuración
    setFilterOptions({
      sortOption: filters.sortOption || null,
      // areaRange: filters.areaRange || null,
      // priceRange: filters.priceRange || null,
      // search: filters.search || null, // Asegúrate de que el valor search esté siendo actualizado
    });
  };

  // Comprobamos si se sigue cargando
  if (loading || loadingUserDetails) {
    console.log("Mostrando estado de carga...");
    return (
      <>
        <SkeletonHeader />
        <section className="flex flex-wrap justify-center gap-6 mt-24 mr-4 ml-4 mb-16">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </section>
      </>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <FilterHome onFilterChange={handleFilterChange} />
      <section className="flex flex-wrap justify-center gap-4 mt-12 mr-4 ml-4 mb-16">
        {flats.length > 0 ? (
          flats.map((flat) => (
            <FlatItem
              key={flat._id}
              {...flat}
              onFavoriteToggle={() => handleFavoriteToggle(flat._id)}
              displayFavoriteIcon="block"
              displayPencilIcon="hidden"
              displayTrashIcon="hidden"
              displayHomeIcon="hidden"
            />
          ))
        ) : (
          <div className="no-flats">No hay pisos disponibles</div>
        )}
      </section>
    </>
  );
}

export { HomePage };
