//Componente para mostrar el listado de mensajes

import { useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";

function MessageList({ flat }) {
  const { currentUser, messages } = useAuth();
  const refMessage = useRef(null);

  console.log("MessageList", flat);

  return (
    <div
      className="w-80"
      style={{ height: "50vh", overflow: "scroll" }}
      ref={refMessage}
    >
      {flat.map((item, index) => (
        <article key={index} className="flex items-start gap-2.5">
          <img
            className="w-8 h-8 rounded-full"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Jese image"
          />
          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.senderId.firstName}
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {new Date(item.created).toDateString() +
                  " / " +
                  new Date(item.created).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-indigo-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {item.content}
              </p>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Sent
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

export { MessageList };
