import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface NavigationContextValue {
  isNavigating: boolean;
  startNavigation: () => void;
  endNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = useCallback(() => {
    setIsNavigating(true);
  }, []);

  const endNavigation = useCallback(() => {
    setIsNavigating(false);
  }, []);

  const value = {
    isNavigating,
    startNavigation,
    endNavigation,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigationContext = (): NavigationContextValue => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }

  return context;
};
