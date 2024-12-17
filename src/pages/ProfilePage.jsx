import { ButtonPrimaryForm } from "../components/Commons/ButtonPrimaryForm";
import { FooterForm } from "../components/Commons/FooterForm";
import { HeaderForm } from "../components/Commons/HeaderForm";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "../components/Commons/FormField";
import { useAuth } from "../context/authContext";
import axiosBase from "../assets/utils";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  birthDate: Yup.date().required("Date is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  userRole: Yup.string().required("Role is required"),
});

function ProfilePage() {
  const { currentUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    currentUser?.profileImage ||
      "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png"
  );
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      console.log("user: ", currentUser);
      const date = new Date(currentUser.birthDate);

      // Formatear la fecha al formato yyyy-mm-dd
      const formattedDate = date.toISOString().split("T")[0];
      setInitialValues({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        birthDate: formattedDate || "",
        email: currentUser.email || "",
        userRole: currentUser.isAdmin ? "Admin" : "User",
      });
    }
  }, [currentUser, imageUrl]);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 font-sans">
      <div className="container rounded my-auto max-w-md border-2 border-gray-200 bg-white p-3">
        <HeaderForm title="Profile" paragraph="View or edit your profile" />
        <div className="m-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={async (values, { setSubmitting }) => {
              await axiosBase.put(`/user/${currentUser.id}`, values);
              setSubmitting(false);
              setIsEditMode(false);
            }}
          >
            {({ values, setFieldValue }) => (
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
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => setImageUrl(e.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <img
                      id="image-user"
                      src={imageUrl}
                      alt="Profile"
                      className=" max-w-48 max-h-32 rounded-smw-full aspect-square object-cover rounded-full border-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <FormField
                    name="firstName"
                    type="text"
                    placeholder="Your Name"
                    label="Name"
                    disabled={!isEditMode}
                  />
                  <FormField
                    name="lastName"
                    type="text"
                    placeholder="Your Last name"
                    label="Last name"
                    disabled={!isEditMode}
                  />
                </div>

                <div className="flex gap-2">
                  <FormField
                    name="birthDate"
                    type="date"
                    label="Date"
                    disabled={!isEditMode}
                  />
                  <FormField
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    label="Email Address"
                    disabled
                  />
                </div>

                <FormField name="userRole" as="select" disabled={!isEditMode}>
                  <option value="user">User</option>
                </FormField>

                {isEditMode && (
                  <ButtonPrimaryForm text="Save Changes" type="submit" />
                )}
                <ButtonPrimaryForm
                  text="Edit Profile"
                  type="button"
                  onClick={() => setIsEditMode(!isEditMode)}
                />
              </Form>
            )}
          </Formik>
          {!isEditMode && (
            <FooterForm
              message="Do you want to change your data?"
              linkText="Home"
              to="/"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { ProfilePage };
