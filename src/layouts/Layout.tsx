import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <div className="main-layout-content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
