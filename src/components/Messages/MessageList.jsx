//Componente para mostrar el listado de mensajes

import { useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";

function MessageList({ flat }) {
  const { currentUser, messages } = useAuth();
  const refMessage = useRef(null);
  const prevMessagesLength = useRef(0);

  console.log(currentUser.displayName, flat);

  console.log("MessageList2", messages);

  return (
    <div
      className="w-80"
      style={{ height: "50vh", overflow: "scroll" }}
      ref={refMessage}
    >
      {messages.map((item, index) =>
        currentUser.uid === item.uid ? (
          <article key={index} className="flex items-start gap-2.5 w-full p-1">
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Jese image"
            />
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {`${currentUser.displayName} logged`}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {item.date}
                </span>
              </div>
              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-sm font-normal text-gray-900 dark:text-white">
                  {item.text}
                </p>
              </div>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Delivered1
              </span>
            </div>
          </article>
        ) : (
          <article key={index} className="flex items-start gap-2.5">
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Jese image"
            />
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.uid}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {item.date}
                </span>
              </div>
              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-indigo-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-sm font-normal text-gray-900 dark:text-white">
                  {item.text}
                </p>
              </div>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Delivered2
              </span>
            </div>
          </article>
        )
      )}
    </div>
  );
}

export { MessageList };
