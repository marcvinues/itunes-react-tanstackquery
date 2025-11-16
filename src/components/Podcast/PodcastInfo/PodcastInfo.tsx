import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PodcastDetail } from '../../../@types/interfaces/podcast';
import './PodcastInfo.css';

interface PodcastInfoProps {
  podcast: PodcastDetail;
}

export const PodcastInfo = memo(({ podcast }: PodcastInfoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/podcast/${podcast.id}`);
  };

  return (
    <div className="podcast-info" onClick={handleClick}>
      <img src={podcast.imageUrl} alt={podcast.title} className="podcast-info__image" />

      <div className="podcast-info__section">
        <h2 className="podcast-info__title">{podcast.title}</h2>
        <p className="podcast-info__author">by {podcast.author}</p>
      </div>

      <div className="podcast-info__section">
        <h3 className="podcast-info__subtitle">Description:</h3>
        <p className="podcast-info__description">{podcast.description}</p>
      </div>
    </div>
  );
});
