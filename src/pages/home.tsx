import { useState } from 'react';
import { usePodcasts } from '../hooks/usePodcasts';
import { PodcastList } from '../components/podcast/PodcastList/';
import { useSearchPodcasts } from '../hooks/useSearchPodcast';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: podcasts, isLoading, error, refetch, isFetching } = usePodcasts();

  const filteredPodcasts = useSearchPodcasts(podcasts, searchQuery);

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #1976d2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: '#666' }}>Loading top podcasts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ marginBottom: '8px' }}>Oops! Something went wrong</h2>
        <button
          onClick={() => refetch()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>Top Podcasts</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isFetching && !isLoading && (
            <div
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #1976d2',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
          )}

          <span
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          ></span>

          <input
            type="search"
            placeholder="Filter podcasts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: '8px 16px',
              width: '300px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      <PodcastList podcasts={filteredPodcasts} />
    </div>
  );
};
