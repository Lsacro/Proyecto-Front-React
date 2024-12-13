// Componente para listar los flats
import { FlatItem } from "../Flats/FlatItem.jsx";

function FlatList({ flats, onDeleteFlat }) {
  return (
    <>
      {flats.map((flat) => (
        <FlatItem
          key={flat._id}
          {...flat}
          displayFavoriteIcon="hidden"
          displayPencilIcon="block"
          displayTrashIcon="block"
          displayHomeIcon="block"
          onDelete={() => onDeleteFlat(flat._id)}
        />
      ))}
    </>
  );
}

export { FlatList };
