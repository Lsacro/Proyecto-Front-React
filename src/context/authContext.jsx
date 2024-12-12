import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

//Importaciones Backend
import axios from "axios";
import axiosBase from "../assets/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(Cookies.get("authToken") || null);

  // Cargar sesión inicial
  useEffect(() => {
    const loadSession = async () => {
      const storedToken = Cookies.get("authToken");
      if (storedToken) {
        try {
          // Llamar a tu API para obtener los datos del usuario
          const response = await axiosBase.get("/user/me");
          setCurrentUser(response.data); // Suponiendo que tu API devuelve los datos del usuario
          setToken(storedToken);
        } catch (error) {
          console.error("Error loading session:", error);
          logout(); // Si falla, eliminar la sesión
        }
      }
    };

    loadSession();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Función para manejar la autenticación
  const handleAuth = (userData, authToken) => {
    setCurrentUser(userData);
    setToken(authToken);

    // Guardar el token en cookies
    Cookies.set("authToken", authToken, { expires: 7 }); // Token válido por 7 días
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setUserDetails(null);

    // Eliminar token de cookies
    Cookies.remove("authToken");
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     setCurrentUser(user);

  //     if (user) {
  //       try {
  //         const details = await getUserByUid(user.uid);
  //         setUserDetails(details.length > 0 ? details[0] : null);
  //       } catch (error) {
  //         console.error("Error fetching user details:", error);
  //         setUserDetails(null);
  //       }
  //     } else {
  //       setUserDetails(null);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  /*   const loadMessages = useCallback((flatId) => {
    const messagesCollection = collection(db, "messages");
    const messagesQuery = query(
      messagesCollection,
      where("flatId", "==", flatId)
    );

    onSnapshot(messagesQuery, (snapshot) => {
      let messagesList = snapshot.docs.map((item) => item.data());

      messagesList = messagesList.sort((a, b) => a.date - b.date);

      setMessages(messagesList);
    });
  }, []); */

  const addMessages = async (uidMessage, textInput, flatId) => {
    console.log("addMessages");
    try {
      await axios.post(`http://localhost:8080/flats/${flatId}/messages`, {
        content: textInput,
        flatId: "674e4f722023afed31601155",
        senderId: "67562d2a0fa6f6f436b5d434",
      });
    } catch (error) {
      return error;
    }
  };

  const loadMessages = async (flatId) => {
    console.log("getAllMessagesByFlatId");
    try {
      const response = await axios.get(
        `http://localhost:8080/flats/${flatId}/messages`
      );
      console.log("response", response.data);
      setMessages(response.data);
    } catch (error) {
      return error;
    }
  };

  /*   const addMessages = async (uidMessage, textInput, flatId) => {
    try {
      const messagesCollection = collection(db, "messages");
      await addDoc(messagesCollection, {
        date: Date.now(),
        text: textInput,
        uid: uidMessage,
        flatId: flatId,
      });
    } catch (error) {
      console.error("Error adding message:", error);
    }
  }; */

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userDetails,
        messages,
        addMessages,
        loadMessages,
        token,
        handleAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
