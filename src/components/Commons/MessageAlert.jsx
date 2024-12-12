import { CheckIcon } from "@heroicons/react/24/solid";

function MessageAlert() {
  return (
    <div
      id="popup-modal"
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20 bg-[#0f172acc] "
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex flex-col gap-2 justify-center items-center">
            <CheckIcon className="w-12 h-12 text-green-600" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Flat removed from favorites successfully!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MessageAlert };
