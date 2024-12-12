function HeaderForm({title, description}) {
  return (
    <div className="my-6 text-center">
      <h1 className="text-3xl font-semibold text-gray-700">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
export { HeaderForm };
