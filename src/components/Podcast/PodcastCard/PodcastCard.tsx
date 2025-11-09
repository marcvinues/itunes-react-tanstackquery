import { useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Podcast } from '~/@types/interfaces/podcast';
import { podcastKeys } from '../../../app/services/api/queries/queryKeys';
import { podcastService } from '../../../app/services/instances';
import './PodcastCard.css';

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard = memo(({ podcast }: PodcastCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick = () => {
    navigate(`/podcast/${podcast.id}`);
  };

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: podcastKeys.detail(podcast.id),
      queryFn: () => podcastService.getPodcastById(podcast.id),
      staleTime: 10 * 60 * 1000,
    });
  };

  return (
    <article className="podcast-card" onClick={handleClick} onMouseEnter={handleMouseEnter}>
      <img
        src={podcast.imageUrl}
        alt={podcast.title}
        className="podcast-card__image"
        loading="lazy"
      />
      <h3 className="podcast-card__title">{podcast.title}</h3>
      <p className="podcast-card__author">Author: {podcast.author}</p>
    </article>
  );
});
