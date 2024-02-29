import { useParams } from "react-router-dom";
import { BookProps } from "../../interface/books.interface"
import { BookItemTitle } from "./BookItemTitle";
import { getDataFromStorage, setDataToStorage } from "../../hooks/storage";
import { Icon } from "../Icon/Icon";

interface BookItemsProps {
  book: BookProps
}

export const BooksItem = ({ book }: BookItemsProps) => {
  const favoriteBooksStorage = getDataFromStorage('favorite-books');
  const { id } = useParams();
  let isFavoriteBook: BookProps
  favoriteBooksStorage?.filter((el) => {
    if (el.id === book.id) {
      isFavoriteBook = {...el}
    }
  });

  console.log(isFavoriteBook, 'x')

  const addFavoriteBook = () => {
    const favoriteBooks: BookProps[] = favoriteBooksStorage ? favoriteBooksStorage : [];
    if (favoriteBooks?.includes(favoriteBooks?.find((el) => el.id === book.id))) {
      favoriteBooks.filter((el) => el.id !== book.id);
    } else {
      favoriteBooks?.push(book);
    }
    setDataToStorage('favorite-books', favoriteBooks);
  };
  
  return (
    <div className="book" style={id ? {padding: '24px 0'} : {}}>
      {id && (
        <button className="book--favorites" onClick={addFavoriteBook}>
          <span>Add to favorites</span>
          <Icon
            type="star"
            fill={isFavoriteBook?.id ? '#000' : '#fff'}
          />
        </button>
      )}
      {book?.volumeInfo?.title && (
        <BookItemTitle title={book?.volumeInfo?.title} />
      )}
      
      {book?.volumeInfo?.imageLinks?.thumbnail && (
        <a
          href={id ? `${book.volumeInfo.previewLink}&printsec=frontcover&dq=-term&hl=&cd=1` : `/book/${book.id}`}
          target={id ? '_blank' : ''}
          style={id ? {margin: '12px 0'} : {}}
        >
          <img
            className="book--image"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            style={id ? {maxHeight: 'none'} : {}}
          />
        </a>
      )}

      {book?.volumeInfo?.publisher && (
        <div className="book--text">
          {book?.volumeInfo?.publisher}
        </div>
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
