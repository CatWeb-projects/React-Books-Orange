import { useEffect, useMemo } from "react";
import { useRequest } from "estafette";
import { books } from "../../services/api/books/books.api";
import { BooksItem } from "./BooksItem";
import { BookProps, BooksProps } from "../../interface/books.interface";

import './Books.scss';

interface BooksComponentProps {
  search: string;
}

export const Books = ({ search }: BooksComponentProps) => {
  const { request, data, errors, loading } = useRequest<BooksProps[]>();
  
  const fetchGetSearchBooks = () => {
    request(books.getSearchBooks.action('-term'));
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) {
        request(books.getSearchBooks.action(search));
      } else {
        fetchGetSearchBooks();
      }
    }, 1000);

    return () => {
      clearInterval(debounce);
      books.getSearchBooks.cancel();
    }
  }, [search])

  const booksData: BookProps[] = useMemo(() => data?.items, [data])
 

  console.log(booksData, 'books');

  return (
    <div className="books">
      {errors?.error?.message && <div>{errors?.error?.message}</div>}
      {loading && <div>...</div>}
      <div className="books--wrapper">
        {booksData?.length && booksData?.map((book) => (
          <BooksItem book={book} key={book.id} />
        ))}
      </div>
    </div>
  )
}