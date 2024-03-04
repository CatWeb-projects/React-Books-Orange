import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookItemTitle } from "./BookItemTitle";
import { Icon } from "../Icon/Icon";
import { Button } from "../Button/Button";
import { getDataFromStorage, setDataToStorage } from "../../hooks/storage";
import { BookProps } from "../../interface/books.interface";

interface BookItemsProps {
  book: BookProps;
}

export const BooksItem = ({ book }: BookItemsProps) => {
  const [books, setBooks] = useState<BookProps[]>(() => {
    return getDataFromStorage('favorite-books') || [];
  });
  const [isFavoriteBook, setIsFavoriteBook] = useState<BookProps>();
  const { id } = useParams();
  const bookRedirect = id ? `${book?.volumeInfo?.previewLink}&printsec=frontcover&dq=-term&hl=&cd=1` : `/book/${book.id}`;
  const redirectToNewTab = id ? '_blank' : ''

  useEffect(() => {
    setIsFavoriteBook(books?.find((el) => el.id === book.id));
    setDataToStorage('favorite-books', books);
  }, [books, isFavoriteBook]);

  const addFavoriteBook = () => {
    if (isFavoriteBook) {
      setBooks(books.filter((el) => el.id !== isFavoriteBook.id));
    } else {
      setBooks([...books, book]);
    }
  };

  return (
    <div className={`book--wrapper ${id ? 'book--wrapper--detailed' : ''}`}>
      {id && (
        <div className="book--button">
          <Button size="large" className="book--favorites" onClick={addFavoriteBook}>
            <span>Add to favorites</span>
            <Icon
              type="star"
              fill={isFavoriteBook?.id ? 'var(--books-black)' : 'var(--books-white)'}
            />
          </Button>
        </div>
      )}
      <a
        href={bookRedirect}
        target={redirectToNewTab}
        className="book"
        style={id ? { padding: '24px' } : {}}
      >
        {book?.volumeInfo?.title && (
          <BookItemTitle title={book?.volumeInfo?.title} classes={id ? 'book--title--detailed' : ''} />
        )}
        
        {(book?.volumeInfo?.imageLinks?.thumbnail) ? (
          <img
            className={`book--image ${id ? 'book--image--detailed' : ''}`}
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        ): (
          <img
            src="/svg/no-image-placeholder.svg"
            alt="placeholder"
            className={`book--image ${id ? 'book--image--detailed no-image' : ''}`}
          />
        )}

        {book?.volumeInfo?.publisher && (
          <div className={`book--text ${id ? 'book--text--detailed' : ''}`}>
            Publisher: {book?.volumeInfo?.publisher}
          </div>
        )}
        
        {book?.volumeInfo?.subtitle && (
          <div className={`book--text ${id ? 'book--text--detailed' : ''}`}>
            {book?.volumeInfo?.subtitle}
          </div>
        )}

        {book?.searchInfo?.textSnippet && (
          <div
            className={`book--text ${id ? 'book--text--detailed' : ''}`}
            dangerouslySetInnerHTML={{ __html: book.searchInfo.textSnippet }}
          />
        )}

      </a>
    </div>
  )
}
