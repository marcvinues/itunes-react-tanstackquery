import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import { useNavigationContext } from '../context/NavigationContext';

export const useNavigation = (): void => {
  const location = useLocation();
  const isFetching = useIsFetching();
  const { startNavigation, endNavigation } = useNavigationContext();

  useEffect(() => {
    startNavigation();

    const timer = setTimeout(() => {
      endNavigation();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, startNavigation, endNavigation]);

  useEffect(() => {
    if (isFetching > 0) {
      startNavigation();
    } else {
      endNavigation();
    }
  }, [isFetching, startNavigation, endNavigation]);
};
