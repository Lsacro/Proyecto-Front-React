import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FormField } from "../Commons/FormField";
import { ButtonPrimaryForm } from "../Commons/ButtonPrimaryForm";
import { HeaderForm } from "../Commons/HeaderForm";
import { FooterForm } from "../Commons/FooterForm";
import { useState } from "react";

function LoginForm({
  onLogin,
  onLoginWithGoogle,
  onResetPassword,
  errorMessage,
  setErrorMessage,
}) {
  const [isResetMode, setIsResetMode] = useState(false); // Asegúrate de definir este estado

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const resetValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (isResetMode) {
      onResetPassword(values.email).finally(() => setSubmitting(false));
    } else {
      onLogin(values.email, values.password).finally(() =>
        setSubmitting(false)
      );
    }
  };

  return (
    <section className="flex min-h-screen justify-center bg-gray-100 font-sans dark:bg-gray-900 antialiased">
      <div className="container rounded my-auto max-w-md border-2 border-gray-200 p-3 dark:border-gray-700 bg-white dark:bg-gray-900 antialiased">
        <div className="my-6 text-center">
          <HeaderForm
            title={isResetMode ? "Reset Password" : "Login"}
            paragraph={
              isResetMode
                ? "Enter your email to reset your password"
                : "Login to access your account"
            }
          />
        </div>
        <div className="m-6">
          <Formik
            initialValues={initialValues}
            validationSchema={
              isResetMode ? resetValidationSchema : validationSchema
            }
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mb-4">
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <FormField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                  label="Email Address"
                />

                {!isResetMode && (
                  <FormField
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    label="Password"
                  />
                )}
                <ButtonPrimaryForm
                  text={isResetMode ? "Reset Password" : "Login"}
                  type="submit"
                  disabled={isSubmitting}
                />

                {!isResetMode && (
                  <p
                    className="m-4 text-center font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                    onClick={() => setIsResetMode(true)}
                  >
                    Forgot Password?
                  </p>
                )}

                {isResetMode && (
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="/"
                    onClick={() => setIsResetMode(false)}
                  >
                    Back to Login
                  </a>
                )}

                {!isResetMode && (
                  <FooterForm
                    message="Don't have an account yet?"
                    linkText="Register"
                    to="register"
                  />
                )}
              </Form>
            )}
          </Formik>

          {!isResetMode && (
            <div className="mb-6">
              <button
                onClick={onLoginWithGoogle}
                type="button"
                className="transition-colors duration-300 ease-in-out w-full rounded bg-white pt-2 pb-3 text-indigo-500 border border-indigo-300 hover:bg-indigo-400 hover:text-white focus:outline-none"
              >
                Login with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { LoginForm };
