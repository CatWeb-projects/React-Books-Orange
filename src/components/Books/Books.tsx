import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useRequest } from "estafette";
import { books } from "../../services/api/books/books.api";
import { BooksItem } from "./BooksItem";
import { Loading } from "../Loading/Loading";
import { ShowErrorMessage } from "../ShowErrorMessage/ShowErrorMessage";
import { BookProps, BooksDataProps } from "../../interface/books.interface";

import './Books.scss';

interface BooksComponentProps {
  search?: string;
  favoriteBooks?: BookProps[];
  classes?: string;
}

export const Books = ({ search, favoriteBooks, classes = '' }: BooksComponentProps) => {
  const [booksData, setBooksData] = useState<BookProps[]>([]);
  const { request, data, errors, loading } = useRequest<BooksDataProps>();
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

  useMemo(() => {
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

  return (
    <div className={`books ${classes}`}>
      {errors?.error?.message && <ShowErrorMessage errorMessage={errors?.error?.message} />}

      {loading && <Loading />}

      {booksData?.length > 0 && (
        <div className="books--wrapper">
          {booksData.map((book) => (
            <BooksItem book={book} key={book.id} />
          ))}
        </div>
      )}
      
      {(pathname === '/books/favorites' && booksData?.length === 0) && (
        <div className="no-data">
          <h3>No Data</h3>
        </div>
      )}
    </div>
  )
}