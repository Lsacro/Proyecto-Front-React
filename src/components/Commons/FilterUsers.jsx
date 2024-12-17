import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "./FormField";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  search: Yup.string(),
  ageRange: Yup.string(),
  flatsCount: Yup.string(),
  favoritesCount: Yup.string(),
  sortOption: Yup.string(),
});

function FIlterUsers({ onFilterChange, initialValues }) {
  const safeInitialValues = initialValues || {
    sortOption: "",
    search: "",
    ageRange: "",
    flatsCount: "",
    favoritesCount: "",
  };

  return (
    <section className="flex justify-center items-center mt-14">
      <Formik
        initialValues={safeInitialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          const filtersToApply = {
            sortOption: values.sortOption || null,
            search: values.search.trim() !== "" ? values.search.trim() : null,
            ageRange: values.ageRange || null,
            flatsCount: values.flatsCount || null,
            favoritesCount: values.favoritesCount || null,
          };
          onFilterChange(filtersToApply); // Envía los valores al componente padre
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex gap-2 mx-3">
              {/* Ordenar por */}
              <FormField
                as="select"
                name="sortOption"
                id="sortOption"
                label="Sort by"
                error={touched.sortOption && errors.sortOption}
                placeholder="Select an option"
              >
                <option value="">Select sort option</option>
                <option value="A-Z">Alphabetical (A-Z)</option>
                <option value="Z-A">Alphabetical (Z-A)</option>
                <option value="age_desc">Age (Highest to Lowest)</option>
                <option value="age_asc">Age (Lowest to Highest)</option>
              </FormField>

              {/* Buscar */}
              <FormField
                as="input"
                type="text"
                name="search"
                id="search"
                label="Search"
                placeholder="Search term"
                error={touched.search && errors.search}
              />

              {/* Filtro de Edad */}
              <FormField
                as="select"
                name="ageRange"
                id="ageRange"
                label="Age range"
                error={touched.ageRange && errors.ageRange}
              >
                <option value="">Select age range</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-50">36-50</option>
                <option value="50+">50+</option>
              </FormField>

              {/* Número de flats */}
              <FormField
                as="select"
                name="flatsCount"
                id="flatsCount"
                label="Number of flats"
                error={touched.flatsCount && errors.flatsCount}
              >
                <option value="">Select flats count</option>
                <option value="1">1+</option>
                <option value="5">5+</option>
                <option value="10">10+</option>
              </FormField>

              {/* Número de favoritos */}
              <FormField
                as="select"
                name="favoritesCount"
                id="favoritesCount"
                label="Favorites count"
                error={touched.favoritesCount && errors.favoritesCount}
              >
                <option value="">Select favorites count</option>
                <option value="1">1+</option>
                <option value="10">10+</option>
                <option value="20">20+</option>
              </FormField>

              {/* Botón de aplicar */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center w-15 h-12 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Apply
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export { FIlterUsers };
