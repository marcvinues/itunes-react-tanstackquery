import { useEffect, useState } from 'react';
import { usePodcasts } from '../../hooks/usePodcasts';
import { PodcastList } from '../../components/Podcast/PodcastList/PodcasList';
import { useSearchPodcasts } from '../../hooks/useSearchPodcast';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { searchHistoryService } from '../../app/services/cache/ServiceHistory';
import './PodcastHome.css';

export const PodcastHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { data: podcasts, isLoading, error, refetch, isFetching } = usePodcasts();

  const filteredPodcasts = useSearchPodcasts(podcasts, searchQuery);

  useEffect(() => {
    setSearchHistory(searchHistoryService.getHistory());
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchHistoryService.addSearch(query);
      setSearchHistory(searchHistoryService.getHistory());
    }
  };

  const handleClearHistory = () => {
    searchHistoryService.clearHistory();
    setSearchHistory([]);
  };

  if (isLoading) {
    return <Spinner text="Loading top podcasts..." />;
  }

  if (error) {
    return <ErrorMessage message="Podcast not found" onRetry={() => refetch()} />;
  }

  return (
    <div className="card-home">
      <div className="card-home__header">
        <h1 className="card-home__title">Top Podcasts</h1>
        <div className="card-home__controls">
          {isFetching && !isLoading && <div className="card-home__spinner-small" />}
          <span className="card-home__badge"></span>
          <input
            type="search"
            placeholder="Filter podcasts..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="card-home__search-input"
          />
          {searchHistory.length > 0 && (
            <div className="card-home__search-history">
              <small className="card-home__search-history-label">Recent searches:</small>

              <div className="card-home__search-history-list">
                {searchHistory.slice(0, 5).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchQuery(q)}
                    className="card-home__search-history-button"
                  >
                    {q}
                  </button>
                ))}

                <button onClick={handleClearHistory} className="card-home__search-history-clear">
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <PodcastList podcasts={filteredPodcasts} />
    </div>
  );
};
