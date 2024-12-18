//Componente para listar los usuarios del sistema

import { HeartIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/solid";

function UserList({
  users,
  dropdownStates,
  onToggleDropdown,
  onToggleRole,
  onDeleteUser,
}) {
  const [flatsCount, setFlatsCount] = useState([]);

  useEffect(() => {
    const flatsCounter = async () => {
      try {
        const response = await axios.get("http://localhost:8080/flats");
        setFlatsCount(response.data.map((flat) => flat.ownerId));
      } catch (error) {
        console.log(error);
      }
    };
    flatsCounter();
  }, []);

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="relative flex flex-col items-end px-4 pt-4">
            <button
              id={`dropdownButton-${user.uid}`}
              onClick={() => onToggleDropdown(user.uid)}
              className="w-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id={`dropdown-${user.uid}`}
              className={`z-10 ${
                dropdownStates[user.uid] ? "block" : "hidden"
              } absolute top-14 right-[-60px] mt-1 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2"
                aria-labelledby={`dropdownButton-${user.uid}`}
              >
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    View Profile
                  </Link>
                </li>
                <li
                  onClick={() => onToggleRole(user.id, user.userRole, user.uid)}
                  className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Change role
                </li>
                <li
                  onClick={() => onDeleteUser(user.id, user.uid)}
                  className="cursor-pointer block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 object-cover rounded-full shadow-lg"
              src={
                user.image ||
                "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png"
              }
              alt={`${user.Nombre} image`}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.Nombre} {user.Apellido}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.Email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(user.FechaNacimiento).toLocaleDateString() || "N/A"}
            </span>

            <ul className="flex gap-4">
              <li className="flex flex-col justify-center items-center mt-4">
                <HomeIcon className="w-6 h-6" />

                <span>
                  {flatsCount.filter((flat) => flat._id === user.id).length}
                </span>
              </li>
              <li className="flex flex-col justify-center items-center mt-4">
                <UserIcon className="w-6 h-6" />
                <span>{user.Administrador === "Si" ? "Admin" : "User"}</span>
              </li>
              <li className="flex flex-col justify-center items-center mt-4">
                <HeartIcon className="w-6 h-6" />
                <span>{user.flats?.length || 0}</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center mb-5  gap-4">
            <div className="flex gap-4 items-center ">
              <Link
                to={`/edit/`}
                className={`cursor-pointer z-10 hover:text-blue-500 hover:scale-110 transition-transform`}
              >
                <PencilIcon className="w-8 h-8 " />
              </Link>
            </div>

            <button className="cursor-pointer z-10 ">
              <TrashIcon className="w-8 h-8 text-back-500 hover:text-red-600 hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export { UserList };
