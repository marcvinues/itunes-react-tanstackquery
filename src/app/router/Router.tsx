import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../../layouts/Layout';
import { Home } from '../../pages/home';
import { ROUTES } from '../config/constants';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>
    </Routes>
  );
};
