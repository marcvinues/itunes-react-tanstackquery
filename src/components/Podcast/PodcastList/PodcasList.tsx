import { memo } from 'react';
import { Podcast } from '~/@types/interfaces/podcast';
import { PodcastCard } from '../PodcastCard/PodcastCard';
import './PodcastList.css';

interface PodcastListProps {
  podcasts: Podcast[];
}

export const PodcastList = memo(({ podcasts }: PodcastListProps) => {
  if (podcasts.length === 0) {
    return <div className="podcast-list__empty">No podcasts found</div>;
  }

  return (
    <div className="podcast-list">
      {podcasts.map(podcast => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
});
