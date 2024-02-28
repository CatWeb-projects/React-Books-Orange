import './ShowErrorMessage.scss';

interface ShowErrorMessageProps {
  errorMessage: string;
}

export const ShowErrorMessage = ({ errorMessage }: ShowErrorMessageProps) => {
  return (
    <div className="error">
      <h2>{errorMessage}</h2>
    </div>
  )
}