import { Link } from "react-router-dom";

function FooterForm({ message, linkText, to }) {
  return (
    <p className="text-center text-sm text-gray-400">
      {message} &nbsp;
      <Link
        to={to}
        className="font-semibold text-indigo-500 focus:text-indigo-600 focus:underline focus:outline-none"
      >
        {linkText}
      </Link>
      .
    </p>
  );
}

export { FooterForm };
