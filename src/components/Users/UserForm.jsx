// Componente para registrar el usuario o para actualizar el perfil
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "../Commons/FormField";
import { ButtonPrimaryForm } from "../Commons/ButtonPrimaryForm";
import { HeaderForm } from "../Commons/HeaderForm";
import { FooterForm } from "../Commons/FooterForm";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters long"),
  date: Yup.date()
    .required("Date is required")
    .test("age", "You must be between 18 and 120 years old", function (value) {
      const currentDate = new Date();
      const birthDate = new Date(value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 120;
    }),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function UserForm({ initialValues, onSubmit, imageUrl, handleImageChange }) {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 font-sans">
      <div className="container rounded my-auto max-w-md border-2 border-gray-200 bg-white p-3">
        <HeaderForm
          title="Create account"
          paragraph="Login to access your account"
        />
        <div className="m-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="mb-4">
              <div className="relative flex items-center justify-center gap-1 mb-4">
                <label
                  htmlFor="image-input"
                  className="absolute top-0 right-0 flex gap-1 rounded text-indigo-500 duration-100 ease-in-out hover:text-indigo-600 focus:outline-none cursor-pointer"
                >
                  <span>Edit image</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </label>
                <div className="flex justify-center items-center gap-6">
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <img
                    id="image-user"
                    src={imageUrl}
                    alt="Profile"
                    className="w-32 rounded-full"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <FormField
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  label="Name"
                />
                <FormField
                  name="lastname"
                  type="text"
                  placeholder="Your Last name"
                  label="Last name"
                />
              </div>

              <div className="flex gap-2">
                <FormField name="date" type="date" label="Date" />
                <FormField
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  label="Email Address"
                />
              </div>

              <FormField
                name="password"
                type="password"
                placeholder="Your password"
                label="Password"
              />
              <FormField
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                label="Confirm Password"
              />

              <ButtonPrimaryForm text="Sign up" type="submit" />
            </Form>
          </Formik>
          <FooterForm
            message="Already have an account?"
            linkText="Login"
            to="/"
          />
        </div>
      </div>
    </div>
  );
}

export { UserForm };
