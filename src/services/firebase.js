// CRUD  C --> Create | R --> Read | U --> Update | D --> Delete
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  arrayUnion,
  arrayRemove,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Nombres de las colecciones en Firestore
const collectionName = "users";
const collectionFlats = "flats";

// Referencias a las colecciones en Firestore
const usersCollectionRef = collection(db, collectionName);
const flatsCollectionRef = collection(db, collectionFlats);

// >>>>>> Funciones CRUD para la colección de usuarios

// Obtener todos los usuarios
export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  await addDoc(usersCollectionRef, user);
};

// Obtener un usuario por su ID
export const getUserById = async (id) => {
  const userRef = doc(db, collectionName, id);
  const user = await getDoc(userRef);
  return user.exists() ? { id: user.id, ...user.data() } : null;
};

// Obtener un usuario por su uid
export const getUserByUid = async (uid) => {
  const queryData = query(usersCollectionRef, where("uid", "==", uid));
  const querySnapShot = await getDocs(queryData);
  const userUid = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userUid;
};

// Obtener un usuario por su nombre
export const getUserByName = async (name) => {
  const queryData = query(usersCollectionRef, where("name", "==", name));
  const querySnapShot = await getDocs(queryData);
  const users = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

// Actualizar los datos de un usuario
export const updateUser = async (id, updatedUserData) => {
  const userRef = doc(db, collectionName, id);
  await updateDoc(userRef, updatedUserData);
};

// Eliminar un usuario por su ID
export const deleteUser = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};

// >>>>>> Funciones CRUD para la colección de flats

// Obtener todos los flats
/* export const getFlats = async () => {
  const data = await getDocs(flatsCollectionRef);
  const flats = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return flats;
};
 */
// Crear un nuevo flat
export const createFlat = async (flat) => {
  const docRef = await addDoc(flatsCollectionRef, flat);
  return docRef.id;
};

// Obtener un flat por su ID
export const getFlatById = async (id) => {
  const flatRef = doc(db, collectionFlats, id);
  const flat = await getDoc(flatRef);
  return flat.exists() ? { id: flat.id, ...flat.data() } : null;
};

// Obtener flats por el ID del propietario (userId)
export const getFlatsByUserId = async (userId) => {
  const queryData = query(flatsCollectionRef, where("userId", "==", userId));
  const querySnapShot = await getDocs(queryData);
  const flats = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return flats;
};

// Actualizar los datos de un flat
export const updateFlat = async (id, updatedFlatData) => {
  const flatRef = doc(db, collectionFlats, id);
  await updateDoc(flatRef, updatedFlatData);
};

// Eliminar un flat por su ID
export const deleteFlat = async (id) => {
  await deleteDoc(doc(db, collectionFlats, id));
};

// Añadir un flat a los favoritos de un usuario
export const addFlatToFavorites = async (userId, flatId) => {
  const userRef = doc(db, collectionName, userId);
  await updateDoc(userRef, {
    favorites: arrayUnion(flatId),
  });
};

// Eliminar un flat de los favoritos de un usuario
export const removeFlatFromFavorites = async (userId, flatId) => {
  const userRef = doc(db, collectionName, userId);
  await updateDoc(userRef, {
    favorites: arrayRemove(flatId),
  });
};

// Obtener los IDs de favoritos de un usuario
export const getFavoriteIdsOfUser = async (userId) => {
  try {
    // Referencia al documento del usuario
    const userRef = doc(db, "users", userId);

    // Obtiene el documento del usuario
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Obtiene la propiedad 'favorites' del documento
      const userData = userDoc.data();
      const favoriteIds = userData.favorites || [];

      return favoriteIds;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return [];
  }
};

// Obtener detalles de los flats por una lista de IDs
export const getFlatsByIds = async (flatIds) => {
  try {
    const flatsPromises = flatIds.map((id) => getFlatById(id));
    const flats = await Promise.all(flatsPromises);
    return flats.filter((flat) => flat !== null); // Filtra los flats que no se encuentran
  } catch (error) {
    console.error("Error retrieving flats by IDs:", error);
    return [];
  }
};

export const getUserByEmail = async (email) => {
  const queryData = query(usersCollectionRef, where("email", "==", email));
  const querySnapShot = await getDocs(queryData);
  const users = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

// Obtener todos los flats con posibilidad de filtros y ordenamiento
export const getFlats = async (
  sortOption = null,
  areaRange = null,
  priceRange = null,
  search = null
) => {
  let flatsQuery = flatsCollectionRef;

  try {
    // Ejecutamos la consulta inicial sin aplicar filtros de búsqueda
    const data = await getDocs(flatsQuery);
    let flats = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Si hay una búsqueda de ciudad, aplicamos el filtro en el cliente
    if (search && search.trim() !== "") {
      const searchTerm = search.trim().toLowerCase(); // Aseguramos que el término de búsqueda esté en minúsculas
      console.log("Aplicando filtro en el cliente para la ciudad:", searchTerm);

      // Filtramos los flats donde la ciudad, convertida en minúsculas, coincida con el término de búsqueda
      flats = flats.filter((flat) =>
        flat.city.toLowerCase().includes(searchTerm)
      );
    }

    // Aplicar filtros de rango de precio en el cliente
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      flats = flats.filter(
        (flat) => flat.rentPrice >= minPrice && flat.rentPrice <= maxPrice
      );
    }

    // Aplicar filtros de rango de área en el cliente
    if (areaRange) {
      const [minArea, maxArea] = areaRange.split("-").map(Number);
      flats = flats.filter(
        (flat) => flat.areaSize >= minArea && flat.areaSize <= maxArea
      );
    }

    // Ordenamiento de los resultados después de aplicar los filtros
    if (sortOption) {
      if (sortOption.includes("city")) {
        flats = flats.sort((a, b) =>
          sortOption === "city_asc"
            ? a.city.localeCompare(b.city)
            : b.city.localeCompare(a.city)
        );
      } else if (sortOption.includes("price")) {
        flats = flats.sort((a, b) =>
          sortOption === "price_asc"
            ? a.rentPrice - b.rentPrice
            : b.rentPrice - a.rentPrice
        );
      } else if (sortOption.includes("area")) {
        flats = flats.sort((a, b) =>
          sortOption === "area_asc"
            ? a.areaSize - b.areaSize
            : b.areaSize - a.areaSize
        );
      }
    }

    console.log("Flats obtenidos después de aplicar todos los filtros:", flats);
    return flats;
  } catch (error) {
    console.error("Error al obtener los flats:", error);
    return [];
  }
};
