interface BookItemTitleProps {
  title: string;
}

export const BookItemTitle = ({ title }: BookItemTitleProps) => {
  const bookTitle = () => {
    if (title.length > 60) {
      return `${title.slice(0, 60)}...`
    } else {
      return title;
    }
  };

  return (
    <h3 className="book--title">
      {bookTitle()}
    </h3>
  )
}