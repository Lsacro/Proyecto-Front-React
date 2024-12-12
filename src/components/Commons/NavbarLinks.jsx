import { Link } from "react-router-dom";

function NavbarLinks({ to, name }) {
  return (
    <li>
      <Link
        to={to}
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        aria-current="page"
      >
        {name}
      </Link>
    </li>
  );
}
export { NavbarLinks };
