import { Link } from "react-router-dom";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/solid";

function FlatItem({
  _id,
  imageUrl,
  city,
  streetName,
  streetNumber,
  areaSize,
  yearBuilt,
  hasAC,
  rentPrice,
  availableDate,
  ownerId,
  ownerName,
  ownerEmail,
  isFavorite,
  onFavoriteToggle,
  displayFavoriteIcon,
  displayPencilIcon,
  displayTrashIcon,
  displayHomeIcon,
  onDelete,
}) {
  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <picture>
        {imageUrl ? (
          <img
            className="w-full rounded-t-lg"
            src={imageUrl || "fallback-image-url.jpg"}
            alt={`Piso en ${city}`}
            onError={(e) => {
              e.target.src = "fallback-image-url.jpg";
            }}
          />
        ) : (
          <img
            className="w-full rounded-t-lg"
            src="/images/flat.png"
            alt={`Piso en ${city}`}
          />
        )}
      </picture>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {city && streetName && streetNumber
            ? `${city}, ${streetName}, ${streetNumber}`
            : "Ciudad, Calle, número"}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {areaSize && `El inmueble tiene un área de ${areaSize}m²`}
          {yearBuilt && `, construida en el año ${yearBuilt}`}.
          {availableDate && ` Disponible hasta ${availableDate}`}
          <br />
          Aire acondicionado: {hasAC ? "Sí" : "No"}
          {rentPrice && ` $${rentPrice}`}
        </p>
        {ownerId && (
          <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              {ownerId.firstName} - {ownerId.lastName}
            </p>
          </div>
        )}
        <div className="flex justify-between">
          <Link
            to={`/flat/${_id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View flat
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <div className="flex gap-4">
            <button
              onClick={onFavoriteToggle}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className={`cursor-pointer z-10 ${displayFavoriteIcon}`}
            >
              {isFavorite ? (
                <HeartSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartOutline className="h-6 w-6 text-gray-900" />
              )}
            </button>
            <Link
              to="/new-flat"
              className={`cursor-pointer z-10 ${displayHomeIcon}`}
            >
              <HomeIcon className="w-6 h-6 text-indigo-500" />
            </Link>
            <Link
              to={`/edit/${_id}`}
              className={`cursor-pointer z-10 ${displayPencilIcon}`}
            >
              <PencilIcon className="w-6 h-6 " />
            </Link>

            <button
              onClick={() => onDelete(_id)}
              className={`cursor-pointer z-10 ${displayTrashIcon}`}
            >
              <TrashIcon className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export { FlatItem };
