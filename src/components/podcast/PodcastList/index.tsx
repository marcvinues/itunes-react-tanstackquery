import { memo } from 'react';
import { Podcast } from '~/@types/interfaces/podcast';
import { PodcastCard } from '../PodcastCards';

interface PodcastListProps {
  podcasts: Podcast[];
}

export const PodcastList = memo(({ podcasts }: PodcastListProps) => {
  if (podcasts.length === 0) {
    return <div>No podcasts found</div>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      {podcasts.map(podcast => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
});
