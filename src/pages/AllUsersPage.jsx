import { useState, useEffect } from "react";
import { Navbar } from "../components/Commons/Navbar.jsx";
import { UserList } from "../components/Users/UserList.jsx";
import { FIlterUsers } from "../components/Commons/FilterUsers.jsx";
import axios from "axios";

function AllUsersPage() {
  const [users, setUsers] = useState([]); // Datos originales
  const [filteredUsers, setFilteredUsers] = useState([]); // Datos filtrados
  const [dropdownStates, setDropdownStates] = useState({}); // Estado de los dropdowns
  const [filterOptions, setFilterOptions] = useState({
    sortOption: "",
    search: "",
    ageRange: "",
    flatsCount: "",
    favoritesCount: "",
  });

  // Obtener todos los usuarios al cargar la página
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getAllUsers();
  }, []);

  // Actualizar los filtros
  const handleFilterChange = (filters) => {
    setFilterOptions(filters);
  };

  // Lógica de filtrado y ordenamiento
  // Lógica de filtrado y ordenamiento
  useEffect(() => {
    let updatedUsers = [...users];

    // Filtro por búsqueda
    if (filterOptions.search) {
      updatedUsers = updatedUsers.filter((user) =>
        user.Nombre.toLowerCase().includes(filterOptions.search.toLowerCase())
      );
    }

    // Filtro por rango de edad
    if (filterOptions.ageRange) {
      const [minAge, maxAge] = filterOptions.ageRange.split("-").map(Number);
      updatedUsers = updatedUsers.filter((user) => {
        const age = calculateAge(user.FechaNacimiento);
        return age >= minAge && (maxAge ? age <= maxAge : true); // Se maneja el caso de "50+".
      });
    }

    // Filtro por número de flats
    if (filterOptions.flatsCount) {
      const minFlats = parseInt(filterOptions.flatsCount, 10);
      updatedUsers = updatedUsers.filter((user) => {
        const flatsCount = user.flats?.length || 0;
        return flatsCount >= minFlats;
      });
    }

    // Filtro por número de favoritos
    if (filterOptions.favoritesCount) {
      const minFavorites = parseInt(filterOptions.favoritesCount, 10);
      updatedUsers = updatedUsers.filter((user) => {
        const favoritesCount = user.favorites?.length || 0;
        return favoritesCount >= minFavorites;
      });
    }

    // Ordenamiento
    if (filterOptions.sortOption === "A-Z") {
      updatedUsers.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    } else if (filterOptions.sortOption === "Z-A") {
      updatedUsers.sort((a, b) => b.Nombre.localeCompare(a.Nombre));
    } else if (filterOptions.sortOption === "age_desc") {
      updatedUsers.sort(
        (a, b) =>
          calculateAge(b.FechaNacimiento) - calculateAge(a.FechaNacimiento)
      );
    } else if (filterOptions.sortOption === "age_asc") {
      updatedUsers.sort(
        (a, b) =>
          calculateAge(a.FechaNacimiento) - calculateAge(b.FechaNacimiento)
      );
    }

    setFilteredUsers(updatedUsers);
  }, [filterOptions, users]);

  // Calcular edad desde FechaNacimiento
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Manejo de dropdowns
  const handleToggleDropdown = (userId) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  // Manejar cambio de rol
  const handleToggleRole = async (id, currentRole, uid) => {
    try {
      const newRole = currentRole === "Admin" ? "User" : "Admin";
      await axios.put(`http://localhost:8080/users/${id}/role`, {
        role: newRole,
      });
      setUsers((prevState) =>
        prevState.map((user) =>
          user.id === id ? { ...user, userRole: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  // Manejar eliminación de usuario
  const handleDeleteUser = async (id, firstName) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      alert(`User ${firstName}  deleted successfully`);
      const response = await axios.get("http://localhost:8080/user");
      setUsers(response.data); //setUsers((prevState) => prevState.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Navbar />
      <FIlterUsers onFilterChange={handleFilterChange} />
      <section className="flex flex-wrap justify-center gap-4 mt-28 mr-4 ml-4 mb-16 overflow-hidden">
        <UserList
          users={filteredUsers}
          dropdownStates={dropdownStates}
          onToggleDropdown={handleToggleDropdown}
          onToggleRole={handleToggleRole}
          onDeleteUser={handleDeleteUser}
        />
      </section>
    </>
  );
}

export { AllUsersPage };
