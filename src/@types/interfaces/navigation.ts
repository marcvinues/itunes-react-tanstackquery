export interface NavigationState {
  readonly isNavigating: boolean;
}

export interface NavigationActions {
  startNavigation: () => void;
  endNavigation: () => void;
}

export type NavigationContextValue = NavigationState & NavigationActions;

export interface NavigationLoaderConfig {
  readonly minLoadingTime?: number;
  readonly trackQueryFetching?: boolean;
}

export interface NavigationProviderProps {
  readonly children: React.ReactNode;
  readonly config?: NavigationLoaderConfig;
}
