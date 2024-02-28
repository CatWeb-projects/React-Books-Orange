import { useParams } from "react-router-dom";
import { BookProps } from "../../interface/books.interface"
import { BookItemTitle } from "./BookItemTitle";
import { Star } from '../../../public/svg/star';
import { getDataFromStorage, setDataToStorage } from "../../hooks/storage";

interface BookItemsProps {
  book: BookProps
}

export const BooksItem = ({ book }: BookItemsProps) => {
  const favoriteBooksStorage = getDataFromStorage('favorite-books');
  const { id } = useParams();

  const addFavoriteBook = () => {
    const favoriteBooks: BookProps[] = favoriteBooksStorage;
    if (!favoriteBooks?.includes(favoriteBooks?.find((el) => el.id === book.id))) {
      favoriteBooks?.push(book);
    }
    setDataToStorage('favorite-books', favoriteBooks);
  };
  
  return (
    <div className="book" style={id ? {padding: '24px 0'} : {}}>
      {id && (
        <button className="book--favorites" onClick={addFavoriteBook}>
          <span>Add to favorites</span>
          <Star />
          {/* <img src="/images/star.svg" alt="star" /> */}
        </button>
      )}
      {book?.volumeInfo?.title && (
        <BookItemTitle title={book?.volumeInfo?.title} />
      )}
      
      {book?.volumeInfo?.imageLinks?.thumbnail && (
        <a
          href={id ? `${book.volumeInfo.previewLink}&printsec=frontcover&dq=-term&hl=&cd=1` : `/${book.id}`}
          target={id ? '_blank' : ''}
          style={id ? {margin: '24px 0'} : {}}
        >
          <img
            className="book--image"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            style={id ? {maxHeight: 'none'} : {}}
          />
        </a>
      )}
      
      {book?.volumeInfo?.subtitle && (
        <div className="book--text">
          {book?.volumeInfo?.subtitle}
        </div>
      )}

      {book?.searchInfo?.textSnippet && (
        <div className="book--text" dangerouslySetInnerHTML={{__html: book.searchInfo.textSnippet}} />
      )}
    </div>
  )
}
