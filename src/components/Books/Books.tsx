import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRequest } from "estafette";
import { books } from "../../services/api/books/books.api";
import { BooksItem } from "./BooksItem";
import { Loading } from "../Loading/Loading";
import { ShowErrorMessage } from "../ShowErrorMessage/ShowErrorMessage";
import { BookProps, BooksProps } from "../../interface/books.interface";

import './Books.scss';

interface BooksComponentProps {
  search: string;
}

export const Books = ({ search }: BooksComponentProps) => {
  const { request, data, errors, loading } = useRequest<BooksProps[]>();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const fetchGetSearchBooks = () => {
    request(books.getSearchBooks.action('-term'));
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) {
        request(books.getSearchBooks.action(search));
        setSearchParams(`q=${search}`);
      } else {
        fetchGetSearchBooks();
        navigate(`/`);
      }
    }, 1000);

    return () => {
      clearInterval(debounce);
      books.getSearchBooks.cancel();
    }
  }, [search])

  const booksData: BookProps[] = useMemo(() => data?.items, [data]);
  return (
    <div className="books">
      {errors?.error?.message && <ShowErrorMessage errorMessage={errors?.error?.message} />}
      {loading && <Loading />}
      <div className="books--wrapper">
        {booksData?.length && booksData?.map((book) => (
          <BooksItem book={book} key={book.id} />
        ))}
      </div>
    </div>
  )
}