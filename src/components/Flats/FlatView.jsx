import { Link } from "react-router-dom";

function FlatView({ flat, isOwner }) {
  const {
    id,
    imageUrl,
    city,
    streetName,
    streetNumber,
    areaSize,
    yearBuilt,
    availableDate,
    hasAC,
    rentPrice,
    ownerName,
    ownerEmail,
  } = flat;

  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <picture>
        {imageUrl && (
          <img
            className="w-full rounded-t-lg"
            src={imageUrl}
            alt={`Piso en ${city}`}
          />
        )}
      </picture>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {city && streetName && streetNumber
            ? `${city}, ${streetName}, ${streetNumber}`
            : `Ciudad, Calle, número`}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {areaSize && `El inmueble tiene un área de ${areaSize}m²`}
          {yearBuilt && `, construida en el año ${yearBuilt}`}.
          {availableDate && ` Disponible hasta ${availableDate}`}
          Aire acondicionado: {hasAC ? "Sí" : "No"}
          {rentPrice && ` $${rentPrice}`}
        </p>
        <p>id del flat: {id}</p>
        <p>nombre del dueño:{ownerName}</p>
        <p>Email del dueño{ownerEmail}</p>
        {isOwner && (
          <div className="flex justify-between">
            <Link
              to={`/edit/${id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit flat
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
          </div>
        )}
      </div>
    </article>
  );
}

export { FlatView };
