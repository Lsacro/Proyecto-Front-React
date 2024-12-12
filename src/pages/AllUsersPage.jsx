//Pagina para mostrar todo los usuarios registrados (solo la puede ver el admin)

import { useState, useEffect } from "react";
import { Navbar } from "../components/Commons/Navbar";
import { UserList } from "../components/Users/UserList";
import {
  getUsers,
  getFlatsByUserId,
  updateUser,
  getUserByUid,
  getUserById,
  deleteUser,
} from "../services/firebase";
import { useAuth } from "../context/authContext";

function AllUsersPage() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Obtener los usuarios
        const usersData = await getUsers();
        console.log("Usuarios obtenidos:", usersData); // Log para verificar los usuarios recuperados

        // Obtener la cantidad de flats para cada usuario
        const usersWithFlats = await Promise.all(
          usersData.map(async (user) => {
            try {
              const userFlats = await getFlatsByUserId(user.uid);
              console.log(`Flats del usuario ${user.uid}:`, userFlats); // Log para verificar flats recuperados
              return { ...user, flatsCount: userFlats.length }; // Añadir la cantidad de flats
            } catch (error) {
              console.error(
                `Error obteniendo flats para el usuario ${user.uid}:`,
                error
              );
              return { ...user, flatsCount: 0 }; // En caso de error, asignar 0 flats
            }
          })
        );

        console.log("Usuarios con cantidad de flats:", usersWithFlats); // Log para verificar el estado final
        setUsers(usersWithFlats);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const toggleDropdown = (uid) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [uid]: !prevStates[uid],
    }));
  };

  const handleToggleRole = async (userId, currentRole, userUid) => {
    // Validar si el usuario logueado intenta cambiar el role
    if (userUid === currentUser.uid) {
      alert("No puedes cambiar tu propia rol.");
      return; // Detener la ejecución si los UIDs coinciden
    }
    try {
      console.log(
        `Iniciando proceso de cambio de rol para el usuario: ${userId}`
      );

      // Verificar si el usuario existe en la base de datos
      console.log("Buscando usuario en la base de datos...");
      const user = await getUserById(userId);

      if (!user) {
        console.error(`El usuario ${userId} no existe en la base de datos`);
        return;
      }

      console.log("Usuario encontrado:", user);

      // Alternar el rol actual
      const newRole = currentRole === "admin" ? "user" : "admin";

      // Actualizar el usuario en la base de datos
      console.log("Actualizando usuario en la base de datos...");
      await updateUser(userId, { userRole: newRole });
      console.log(
        `Usuario ${userId} actualizado a ${newRole} en la base de datos`
      );

      // Actualizar el estado de users en el componente
      console.log("Actualizando estado de users en el componente...");
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, userRole: newRole } : u
        )
      );
      console.log(`Rol del usuario ${userId} actualizado a ${newRole}`);
    } catch (error) {
      console.error(`Error al cambiar el rol del usuario ${userId}:`, error);
    }
  };

  const handleDeleteUser = async (userId, userUid) => {
    // Validar si el usuario logueado intenta eliminarse a sí mismo
    if (userUid === currentUser.uid) {
      alert("No puedes eliminar tu propia cuenta.");
      return; // Detener la ejecución si los UIDs coinciden
    }
    try {
      // 1. Llamar a la función para eliminar el usuario de Firestore
      await deleteUser(userId);

      // 2. Actualizar el estado local de los usuarios
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));

      console.log(`Usuario con ID ${userId} eliminado exitosamente.`);
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("Hubo un error al eliminar el usuario.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-wrap justify-center gap-4 mt-28 mr-4 ml-4 mb-16 overflow-hidden">
        <UserList
          users={users}
          dropdownStates={dropdownStates}
          onToggleDropdown={toggleDropdown}
          onToggleRole={handleToggleRole}
          onDeleteUser={handleDeleteUser}
        />
      </section>
    </>
  );
}

export { AllUsersPage };
