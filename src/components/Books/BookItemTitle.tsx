interface BookItemTitleProps {
  title: string;
  classes?: string;
}

export const BookItemTitle = ({ title, classes }: BookItemTitleProps) => {
  const bookTitle = () => {
    if (title.length > 60) {
      return `${title.slice(0, 60)}...`
    } else {
      return title;
    }
  };

  return (
    <h3 className={`book--title ${classes}`}>
      {bookTitle()}
    </h3>
  )
}