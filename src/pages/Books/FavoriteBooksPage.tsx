import { Books } from "../../components";
import { getDataFromStorage } from "../../hooks/storage";

const FavoriteBooksPage = () => {
  const favoriteBooksStorage = getDataFromStorage('favorite-books');
  
  return (
   <div className="book-page">
    <Books favoriteBooks={favoriteBooksStorage} />
   </div>
  )
}

export default FavoriteBooksPage;