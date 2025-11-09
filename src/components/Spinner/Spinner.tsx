import './Spinner.css';

export const Spinner = ({ text = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p className="spinner-text">{text}</p>
    </div>
  );
};
