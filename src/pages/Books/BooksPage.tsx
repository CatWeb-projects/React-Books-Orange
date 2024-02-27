import { useState } from "react";
import { Books, Search } from "../../components";

const BooksPage = () => {
  const [search, setSearch] = useState('');

  const searchBook = (searchValue: string) => {
    setSearch(searchValue)
  }

  return (
   <div className="book-page">
    <Search
      search={search}
      searchBook={searchBook}
    />
    <Books search={search} />
   </div>
  )
}

export default BooksPage;