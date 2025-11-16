import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/header';
import { useNavigation } from '../hooks/useNavigation';

export const MainLayout = () => {
  useNavigation();
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout-content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
