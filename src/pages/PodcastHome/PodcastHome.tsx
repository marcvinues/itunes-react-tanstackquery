import { useState } from 'react';
import { usePodcasts } from '../../hooks/usePodcasts';
import { PodcastList } from '../../components/Podcast/PodcastList/PodcasList';
import { useSearchPodcasts } from '../../hooks/useSearchPodcast';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { searchHistoryService } from '../../app/services/cache/ServiceHistory';
import './PodcastHome.css';

export const PodcastHome = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: podcasts, isLoading, error, refetch, isFetching } = usePodcasts();

  const filteredPodcasts = useSearchPodcasts(podcasts, searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchHistoryService.addSearch(query);
    }
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
          <span className="card-home__badge">{podcasts?.length}</span>
          <input
            type="search"
            placeholder="Filter podcasts..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="card-home__search-input"
          />
        </div>
      </div>
      <PodcastList podcasts={filteredPodcasts} />
    </div>
  );
};
