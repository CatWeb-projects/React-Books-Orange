import {
  lazy,
  Suspense,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Loading } from '../components';

const BooksPage = lazy(() => import('../pages/Books/BooksPage'));
const BookPage = lazy(() => import('../pages/Books/BookPage'));
const FavoriteBooksPage = lazy(() => import('../pages/Books/FavoriteBooksPage'));

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            (
              <Suspense fallback={<Loading />}>
                <BooksPage />
              </Suspense>
            )
          }
        />
        <Route
          path=":id"
          element={
            (
              <Suspense fallback={<Loading />}>
                <BookPage />
              </Suspense>
            )
          }
        />
        <Route
          path="/favorites"
          element={
            (
              <Suspense fallback={<Loading />}>
                <FavoriteBooksPage />
              </Suspense>
            )
          }
        />
      </Route>
    </Routes>
  )
}

export default MainRoutes;