import './ErrorMessage.css';

interface ErrorMessageProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorMessage = ({ message = 'Loading..', onRetry }: ErrorMessageProps) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">{message}</h2>

      <button className="error-button" onClick={onRetry}>
        {/* check i18n */}
        Try Again
      </button>
    </div>
  );
};
