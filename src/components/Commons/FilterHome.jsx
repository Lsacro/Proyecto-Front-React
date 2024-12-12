import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "./FormField";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  //sortOption: Yup.string().required("Sort option is required"),
  search: Yup.string(), // Permite que el campo de búsqueda esté vacío
  areaRange: Yup.string(),
  priceRange: Yup.string(),
});

function FilterHome({ onFilterChange, initialValues }) {
  // Asegúrate de que initialValues no sea undefined o null
  const safeInitialValues = initialValues || {
    sortOption: "",
    search: "",
    areaRange: "",
    priceRange: "",
  };

  return (
    <section className="flex justify-center items-center mt-14">
      <Formik
        initialValues={safeInitialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log("Valores del formulario:", values); // Depuración
          const filtersToApply = {
            sortOption: values.sortOption || null,
            search: values.search.trim() !== "" ? values.search.trim() : null,
            areaRange: values.areaRange !== "" ? values.areaRange : null,
            priceRange: values.priceRange !== "" ? values.priceRange : null,
          };
          console.log("Filtros aplicados:", filtersToApply);
          onFilterChange(filtersToApply); // Envía los valores seleccionados a HomePage
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex gap-2 mx-3">
              {/* Opción de orden */}
              <FormField
                as="select"
                name="sortOption"
                id="sortOption"
                label="Sort by"
                error={touched.sortOption && errors.sortOption}
              >
                <option value="">Select option</option>
                <option value="city_asc">City a-z</option>
                <option value="city_desc">City z-a</option>
                <option value="price_asc">Price min-max</option>
                <option value="price_desc">Price max-min</option>
                <option value="area_asc">Area min-max</option>
                <option value="area_desc">Area max-min</option>
              </FormField>

              {/* Campo de búsqueda */}
              <FormField
                as="input"
                type="text"
                name="search"
                id="search"
                label="Search"
                placeholder="Search term"
                error={touched.search && errors.search}
              />

              {/* Rango de área */}
              <FormField
                as="select"
                name="areaRange"
                id="areaRange"
                label="Area range"
                error={touched.areaRange && errors.areaRange}
              >
                <option value="">Select area range</option>
                <option value="0-100">0-100 m²</option>
                <option value="100-200">100-200 m²</option>
                <option value="200-300">200-300 m²</option>
              </FormField>

              {/* Rango de precio */}
              <FormField
                as="select"
                name="priceRange"
                id="priceRange"
                label="Price range"
                error={touched.priceRange && errors.priceRange}
              >
                <option value="">Select price range</option>
                <option value="0-100">0-100 USD</option>
                <option value="100-500">100-500 USD</option>
                <option value="500-1000">500-1000 USD</option>
              </FormField>
            </div>

            {/* Botón de aplicar */}
            <div className="flex justify-center mt-4">
              <button type="submit" className="btn-primary">
                Apply
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export { FilterHome };
