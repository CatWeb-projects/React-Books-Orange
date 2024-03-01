import { useLocation } from 'react-router-dom';
import './Search.scss';
import { useEffect } from 'react';

interface SearchProps {
  search: string;
  searchBook: (searchValue: string) => void;
}

export const Search = ({
  search,
  searchBook
}: SearchProps) => {
  const location = useLocation();
  const searchQuery = location.search.split('?q=')[1]

  useEffect(() => {
    if (searchQuery) {
      searchBook(searchQuery);
    }

    return () => {
      searchBook('');
    }
  }, [searchQuery]);
  
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Book"
        value={search}
        onChange={(e) => searchBook(e.target.value)}
      />
    </div>
  )
}