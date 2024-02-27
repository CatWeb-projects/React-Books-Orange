import { useEffect, useMemo } from "react";
import { useRequest } from "estafette";
import { useParams } from "react-router-dom";
import { BookProps } from "../../interface/books.interface";
import { books } from "../../services/api/books/books.api";
import { BooksItem } from "../../components";

const BookPage = () => {
  const { request, data, errors, loading } = useRequest<BookProps>();
  const { id } = useParams();

  const fetchGetBookInfo = () => {
    if (id) {
      request(books.getBookInfo.action(id));
    }
  }

  useEffect(() => {
    fetchGetBookInfo();

    return () => {
      books.getBookInfo.cancel();
    }
  }, [])

  const book = useMemo(() => data, [data]);

  console.log(data, 'info');

  return (
    <div className="article-page">
      {errors?.error?.message && <div>{errors?.error?.message}</div>}
      {loading && <div>...</div>}
      <BooksItem book={book} />
    </div>
  )
}

export default BookPage;
