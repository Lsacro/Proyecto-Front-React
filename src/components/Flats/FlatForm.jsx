import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "../Commons/FormField";
import { ButtonPrimaryForm } from "../Commons/ButtonPrimaryForm";
import { HeaderForm } from "../Commons/HeaderForm";
import { FooterForm } from "../Commons/FooterForm";

const validationSchema = Yup.object({
  city: Yup.string().required("City is required"),
  streetName: Yup.string().required("Street name is required"),
  streetNumber: Yup.number()
    .required("Street number is required")
    .positive("Must be a positive number"),
  areaSize: Yup.number()
    .required("Area size is required")
    .positive("Must be a positive number"),
  yearBuilt: Yup.number()
    .required("Year built is required")
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  hasAC: Yup.boolean(),
  rentPrice: Yup.number()
    .required("Rent price is required")
    .positive("Must be a positive number"),
  availableDate: Yup.date()
    .required("Available date is required")
    .test("is-future", "Available date must be in the future", (value) => {
      return value && new Date(value) > new Date();
    }),
});

function FlatForm({
  initialValues,
  imageUrl,
  showSuccessMessage,
  handleImageChange,
  handleSubmit,
  titleButton,
}) {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 font-sans">
      <div className="container rounded my-auto max-w-md border-2 border-gray-200 bg-white p-3">
        <HeaderForm
          title="Create flat"
          description="Add a new flat to your listings"
        />
        <div className="m-6">
          {showSuccessMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
              Flat created successfully! Redirecting...
            </div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="mb-4">
                <div className="relative mb-4">
                  <div className="flex justify-center items-center gap-1">
                    <input
                      type="file"
                      id="image-input"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                    <img
                      id="image-user"
                      src={imageUrl}
                      alt="Flat"
                      className="w-full h-60 rounded mb-1"
                    />
                  </div>
                  <label
                    htmlFor="image-input"
                    className="absolute top-1 right-1 w-[100px] rounded bg-indigo-500 p-2 text-white duration-100 ease-in-out hover:bg-indigo-600 focus:outline-none text-center cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 mx-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </label>
                </div>

                <div className="flex gap-2">
                  <FormField
                    name="city"
                    type="text"
                    placeholder="Your city"
                    label="City"
                  />
                  <FormField
                    name="streetName"
                    type="text"
                    placeholder="Your street name"
                    label="Street Name"
                  />
                </div>

                <div className="flex gap-2">
                  <FormField
                    name="streetNumber"
                    type="number"
                    placeholder="Your number"
                    label="Street number"
                  />
                  <FormField
                    name="areaSize"
                    type="number"
                    placeholder="Your Area size"
                    label="Area size"
                  />
                </div>

                <div className="flex gap-2">
                  <FormField
                    name="yearBuilt"
                    type="number"
                    placeholder="Year built"
                    label="Year built"
                  />
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="hasAC"
                      className="flex items-center cursor-pointer"
                    >
                      Has AC:
                      <input
                        id="hasAC"
                        type="checkbox"
                        name="hasAC"
                        className="sr-only peer"
                        onChange={(e) =>
                          setFieldValue("hasAC", e.target.checked)
                        }
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 mx-2"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <FormField
                    name="rentPrice"
                    type="number"
                    placeholder="Your rent"
                    label="Rent price"
                  />
                  <FormField
                    name="availableDate"
                    type="date"
                    label="Available Date"
                  />
                </div>

                <ButtonPrimaryForm text={titleButton} type="submit" />
              </Form>
            )}
          </Formik>
          <FooterForm
            message="Back to listings"
            linkText="View Listings"
            to="/home"
          />
        </div>
      </div>
    </div>
  );
}

export { FlatForm };
