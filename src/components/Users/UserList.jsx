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
        console.log(response.data);
        setFlatsCount(response.data);
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
          <div className="flex flex-col items-center pb-10 mt-6">
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
                  {
                    flatsCount.filter((flat) => flat.ownerId._id === user.id)
                      .length
                  }
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
                to={`/admin-edit/${user.id}`}
                className={`cursor-pointer z-10 hover:text-blue-500 hover:scale-110 transition-transform`}
              >
                <PencilIcon className="w-8 h-8 " />
              </Link>
            </div>

            <button
              className="cursor-pointer z-10 "
              onClick={() => onDeleteUser(user.id, user.firstName)}
            >
              <TrashIcon className="w-8 h-8 text-back-500 hover:text-red-600 hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export { UserList };
