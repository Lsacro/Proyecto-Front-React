function ButtonPrimaryForm({ text, type, onClick }) {
  return (
    <div className="mb-6">
      <button
        type={type}
        onClick={onClick}
        className="w-full rounded bg-indigo-500 pt-2 pb-3 text-white duration-100 ease-in-out hover:bg-indigo-600 focus:outline-none"
      >
        {text}
      </button>
    </div>
  );
}

export { ButtonPrimaryForm };
