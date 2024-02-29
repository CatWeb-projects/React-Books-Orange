import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useRequest } from "estafette";
import { books } from "../../services/api/books/books.api";
import { BooksItem } from "./BooksItem";
import { Loading } from "../Loading/Loading";
import { ShowErrorMessage } from "../ShowErrorMessage/ShowErrorMessage";
import { BookProps, BooksProps } from "../../interface/books.interface";

import './Books.scss';

interface BooksComponentProps {
  search?: string;
  favoriteBooks?: BookProps[]
}

export const Books = ({ search, favoriteBooks }: BooksComponentProps) => {
  const [booksData, setBooksData] = useState<BookProps[]>([]);
  const { request, data, errors, loading } = useRequest<BooksProps[]>();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const fetchGetSearchBooks = () => {
    request(books.getSearchBooks.action('-term'));
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (pathname === '/') {
        if (!search) {
          navigate('/')
        }
        if (search) {
          request(books.getSearchBooks.action(search));
          setSearchParams(`q=${search}`);
        } else {
          fetchGetSearchBooks();
        }
      }
    }, 1000);

    return () => {
      clearInterval(debounce);
      books.getSearchBooks.cancel();
    }
  }, [search])

  useEffect(() => {
    if (pathname === '/books/favorites') {
      if (favoriteBooks) {
        setBooksData(favoriteBooks)
      } else {
        setBooksData([]);
      }
    } else {
      setBooksData(data?.items);
    }
  }, [data?.items, favoriteBooks, pathname]);

  console.log(booksData?.length, 'books data')
  console.log(favoriteBooks, 'favoriteBooks')
  return (
    <div className="books">
      {errors?.error?.message && <ShowErrorMessage errorMessage={errors?.error?.message} />}
      {loading && <Loading />}
      <div className="books--wrapper">
        {booksData?.length > 0 && booksData?.map((book) => (
          <BooksItem book={book} key={book.id} />
        ))}
      </div>
      {(pathname === '/favorites' && booksData?.length === 0) && (
        <div>No Data</div>
      )}
    </div>
  )
}