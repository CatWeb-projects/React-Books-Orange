import { Books } from "../../components";
import { getDataFromStorage } from "../../hooks/storage";

const FavoriteBooksPage = () => {
  const favoriteBooksStorage = getDataFromStorage('favorite-books');

  return (
   <div className="favorite-books-page">
    <Books favoriteBooks={favoriteBooksStorage} />
   </div>
  )
}

export default FavoriteBooksPage;