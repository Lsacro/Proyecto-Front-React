import { Field, ErrorMessage } from "formik";

function FormField({
  type = "text",
  id,
  name,
  placeholder,
  label,
  as = "input",
  children,
  className = "",
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      {as === "select" ? (
        <Field
          as="select"
          name={name}
          id={id}
          {...props}
          className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-indigo-300 dark:focus:ring-indigo-600"
        >
          {children}
        </Field>
      ) : (
        <Field
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-indigo-300 dark:focus:ring-indigo-600"
          {...props}
        />
      )}
      <ErrorMessage
        name={name}
        component="p"
        className="mt-1 text-xs text-red-500"
      />
    </div>
  );
}

export { FormField };
