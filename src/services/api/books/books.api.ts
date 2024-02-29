import axios, { Canceler } from 'axios';
import { BookProps, BooksProps } from '../../../interface/books.interface';

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1';
const { CancelToken } = axios;

export const books = {
  getSearchBooks: {
    action: (search: string): Promise<{ data: BooksProps }> =>
      axios.get(`/volumes?q=${search}&maxResults=40`, {
        cancelToken: new CancelToken(
          (c: Canceler) => (books.getSearchBooks.cancel = c)
        )
      }),
    cancel: (() => null) as Canceler
  },

  getBookInfo: {
    action: (id: string): Promise<{ data: BookProps }> =>
      axios.get(`/volumes/${id}`, {
        cancelToken: new CancelToken(
          (c: Canceler) => (books.getBookInfo.cancel = c)
        )
      }),
    cancel: (() => null) as Canceler
  }
};
