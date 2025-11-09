import { QueryClient, DefaultOptions } from '@tanstack/react-query';

export const QUERY_CONFIG = {
  STALE_TIME: {
    SHORT: 5 * 60 * 1000,      
    MEDIUM: 10 * 60 * 1000,    
    LONG: 30 * 60 * 1000,      
    VERY_LONG: 24 * 60 * 60 * 1000, 
  },
  
  GC_TIME: {
    DEFAULT: 30 * 60 * 1000,  
    LONG: 60 * 60 * 1000,      
  },
  
  RETRY: {
    DEFAULT: 3,
    LESS: 2,
    NONE: 0,
  },
} as const;


export const getRetryDelay = (attemptIndex: number): number => {
  return Math.min(1000 * 2 ** attemptIndex, 30000);
};

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: QUERY_CONFIG.STALE_TIME.SHORT,
    gcTime: QUERY_CONFIG.GC_TIME.DEFAULT,
    retry: QUERY_CONFIG.RETRY.DEFAULT,
    retryDelay: getRetryDelay,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
};
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  });
};