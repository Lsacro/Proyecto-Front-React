//Componente menu de navegacion para toda la app
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarLinks } from "./NavbarLinks";
// import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../context/authContext";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";

function Navbar({ onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const localStoreData = localStorage.getItem("userDetails");
  const userData = JSON.parse(localStoreData);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Cierra la sesión del usuario
      await logout();

      // Elimina todos los elementos guardados en el localStorage
      localStorage.clear();

      // Redirige al usuario a la página de inicio
      navigate("/");
    } catch (error) {
      console.log("Error en la sesión", error);
    }
  };

  const storeData = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(storeData);

  const defaultProfileSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#E5E7EB" />
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-6 2.67-6 6h12c0-3.33-2.67-6-6-6z" fill="#9CA3AF" />
  </svg>
`;

  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse hover:scale-110 transition-transform"
        >
          <BuildingOffice2Icon className="w-8 h-8 text-gray-800 dark:text-white" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Finder Flat
          </span>
        </Link>
        <div className="flex gap-2 justify-center items-center px-1 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {<span> {userDetails.firstName + " " + userDetails.lastName} </span>}
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={
              currentUser.profileImage ||
              `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                defaultProfileSVG
              )}`
            }
            alt="profile-photo"
          />

          <button
            onClick={handleLogout}
            type="button"
            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            title="Logout"
          >
            <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
          </button>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:gap-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <NavbarLinks to="/home" name="Home" />
            <NavbarLinks to="/new-flat" name="New Flat" />
            {/* <NavbarLinks to="/update-profile" name="Update Profile" /> */}
            <NavbarLinks to="/my-flats" name="My Flats" />
            <NavbarLinks to="/favourites" name="Favorites" />
            {userData.isAdmin ? (
              <NavbarLinks to="/all-users" name="Users" />
            ) : null}
            <NavbarLinks to="/profile" name="Profile" />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
