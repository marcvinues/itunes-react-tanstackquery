import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos - datos considerados frescos
      gcTime: 30 * 60 * 1000, // 30 minutos - tiempo en cache (antes cacheTime)
      retry: 3, // Reintentar 3 veces en caso de error
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false, // No refetch automático al cambiar de pestaña
      refetchOnReconnect: true, // Refetch al reconectar internet
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} position="bottom" />}
    </QueryClientProvider>
  </React.StrictMode>
);
