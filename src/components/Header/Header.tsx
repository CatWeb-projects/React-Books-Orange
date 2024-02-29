import './Header.scss';

export const Header = () => {
  return (
    <header>
      <div className="header">
        <a href="/">Search</a>
        <a href="/books/favorites">Favorites</a>
      </div>
    </header>
  )
}