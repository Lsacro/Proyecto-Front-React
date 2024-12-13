import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosBase from "../assets/utils";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axiosBase.put(
        `/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al restablecer la contraseña."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Restablecer Contraseña</h2>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Restablecer</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export { ResetPasswordForm };
