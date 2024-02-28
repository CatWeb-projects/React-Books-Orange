import { useEffect, useMemo } from "react";
import { useRequest } from "estafette";
import { useParams } from "react-router-dom";
import { BookProps } from "../../interface/books.interface";
import { books } from "../../services/api/books/books.api";
import { BooksItem, Loading, ShowErrorMessage } from "../../components";

const BookPage = () => {
  const { request, data, errors, loading } = useRequest<BookProps>({
    data: {}
  });
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
  return (
    <div className="book-page">
      {errors?.error?.message && <ShowErrorMessage errorMessage={errors?.error?.message} />}
      {loading && <Loading />}
      {(!loading && !errors?.error?.message) && <BooksItem book={book} />}
    </div>
  )
}

export default BookPage;
