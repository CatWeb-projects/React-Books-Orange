import { useParams } from "react-router-dom";
import { BookProps } from "../../interface/books.interface"
import { BookItemTitle } from "./BookItemTitle";
import { Star } from '../../../public/svg/star';
import { getDataFromStorage, setDataToStorage } from "../../hooks/storage";

interface BookItemsProps {
  book: BookProps
}

export const BooksItem = ({ book }: BookItemsProps) => {
  const storage = getDataFromStorage('favorite-books')
  // const [books, setBooks] = useState<any>(JSON.parse(storage!))
  const { id } = useParams();

  const addFavoriteBook = () => {
    const data = JSON.parse(storage!);
    console.log(data, 'data');
    const x = data ? [...data] : []
    x.push(book);
    // if (!books?.includes(book.id)) {
     
    // }
    // setBooks(x);
    setDataToStorage('favorite-books', x);
  };

  console.log(JSON.parse(storage!), 'storage');
  // console.log(books, 'bboks')
  
  return (
    <div className="book">
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
        <a href={id ? `${book.volumeInfo.previewLink}&printsec=frontcover&dq=-term&hl=&cd=1` : `/${book.id}`} target={id ? '_blank' : ''}>
          <img className="book--image" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
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
