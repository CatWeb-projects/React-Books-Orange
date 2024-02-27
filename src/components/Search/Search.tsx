import './Search.scss';

interface SearchProps {
  search: string;
  searchBook: (searchValue: string) => void;
}

export const Search = ({
  search,
  searchBook
}: SearchProps) => {
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