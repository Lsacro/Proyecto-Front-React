//Componente para listar los usuarios del sistema

import { HeartIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function UserList({
  users,
  dropdownStates,
  onToggleDropdown,
  onToggleRole,
  onDeleteUser,
}) {
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
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={
                user.profilePicture ||
                "https://flowbite.com/docs/images/people/profile-picture-4.jpg"
              }
              alt={`${user.name} image`}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.name} {user.lastname}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.date || "N/A"}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              UID: {user.uid}
            </span>
            <ul className="flex gap-4">
              <li className="flex flex-col justify-center items-center mt-4">
                <HomeIcon className="w-6 h-6" />

                <span>{user.flatsCount}</span>
              </li>
              <li className="flex flex-col justify-center items-center mt-4">
                <UserIcon className="w-6 h-6" />
                <span>{user.userRole}</span>
              </li>
              <li className="flex flex-col justify-center items-center mt-4">
                <HeartIcon className="w-6 h-6" />
                <span>{user.favorites?.length || 0}</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export { UserList };
