import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Commons/Navbar";
import { FlatView } from "../components/Flats/FlatView";
import { MessageForm } from "../components/Messages/MessageForm";
import { MessageList } from "../components/Messages/MessageList";
import { useAuth } from "../context/authContext";
import axios from "axios";

function FlatDetailsPage() {
  const { currentUser } = useAuth();
  const [flat, setFlat] = useState(null); // Datos del flat
  const [isOwner, setIsOwner] = useState(false); // Verificar si el usuario es propietario
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores
  const { id } = useParams(); // ID del flat desde la URL
  const [messages, setMessages] = useState([]); // Almacenar los mensajes

  useEffect(() => {
    const getFlatData = async () => {
      try {
        setLoading(true); // Activar el estado de carga
        const flatResponse = await axios.get(
          `http://localhost:8080/flats/${id}`
        );
        setFlat(flatResponse.data); // Guardar los datos del flat en el estado
        setIsOwner(flatResponse.data.ownerId === currentUser?.id); // Comparar IDs para determinar propiedad

        // Cargar los mensajes del flat
        const messagesResponse = await axios.get(
          `http://localhost:8080/flats/${id}/messages`
        );
        setMessages(messagesResponse.data); // Guardar los mensajes en el estado
        console.log("response flat new data ", messagesResponse.data);
      } catch (err) {
        console.error("Error al obtener el flat:", err);
        setError("Error al cargar los datos del flat."); // Mensaje de error
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    getFlatData();
  }, [id, currentUser]); // Dependencias del useEffect

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 mt-28 mr-4 ml-4 mb-16">
        {loading ? (
          <p>Cargando...</p> // Mostrar indicador de carga
        ) : error ? (
          <p>{error}</p> // Mostrar mensaje de error
        ) : (
          flat && (
            <>
              <FlatView flat={flat} isOwner={isOwner} />
              <MessageList flat={messages} />{" "}
              {/* Pasamos los mensajes correctamente */}
              <MessageForm flatId={flat._id} />{" "}
              {/* Pasamos solo el ID del flat */}
            </>
          )
        )}
      </section>
    </>
  );
}

export { FlatDetailsPage };
