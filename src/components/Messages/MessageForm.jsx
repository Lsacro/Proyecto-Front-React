// Componente para enviar el mensaje

import { useAuth } from "../../context/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";

function MessageForm({ flatId }) {
  const { currentUser, addMessages } = useAuth();

  const storeData = localStorage.getItem("userDetails");
  const senderId = JSON.parse(storeData);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .required("Message is required")
        .min(1, "Message cannot be empty"),
    }),
    onSubmit: (values) => {
      if (!values.message.trim()) {
        console.log("mensaje vacío");
        return;
      }
      const storeData = localStorage.getItem("userDetails");
      const senderId = JSON.parse(storeData);
      addMessages(values.message, flatId, senderId.id);
      formik.resetForm();
      alert("Message sent successfully!");
      console.log("Submitted message:", values.message);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex mb-3"> </div>
      {
        <>
          <input
            type="text"
            className="form-input flex-1 border border-gray-300 rounded-l-md px-3 py-2 placeholder-gray-500 w-[300px]"
            placeholder="Type your message"
            aria-label="Type your message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            className="btn btn-outline-secondary border border-gray-300 rounded-r-md bg-white px-4 py-2 text-gray-700"
            type="submit"
            id="button-addon2"
          >
            Send
          </button>
        </>
      }

      {formik.touched.message && formik.errors.message ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
      ) : null}
    </form>
  );
}

export { MessageForm };
