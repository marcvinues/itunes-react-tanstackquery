import { Link } from 'react-router-dom';
import { useNavigationContext } from '../../context/NavigationContext';
import { ROUTES } from '../../app/config/constants';
import './Header.css';

export const Header = () => {
  const { isNavigating } = useNavigationContext();

  return (
    <header className="header">
      <div className="header__container">
        <Link to={ROUTES.HOME} className="header__link">
          <h1 className="header__title">Podcaster</h1>
        </Link>
        {isNavigating && (
          <div className="header__loader" role="status" aria-label="Cargando">
            <div className="header__loader-circle"></div>
          </div>
        )}
      </div>
    </header>
  );
};
