import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Podcast } from '~/@types/interfaces/podcast';

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard = memo(({ podcast }: PodcastCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/podcast/${podcast.id}`);
  };

  return (
    <article
      onClick={handleClick}
      style={{ cursor: 'pointer', padding: '16px', border: '1px solid #ddd' }}
    >
      <img
        src={podcast.imageUrl}
        alt={podcast.title}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h3>{podcast.title}</h3>
      <p>Author: {podcast.author}</p>
    </article>
  );
});
