import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Episode } from '~/@types/interfaces/podcast';
import { formatDate, formatDuration } from '../../../../utils/common';
import './PodcastInfoList.css';

interface EpisodeListProps {
  episodes: Episode[];
  podcastId: string;
}

export const EpisodeList = memo(({ episodes, podcastId }: EpisodeListProps) => {
  const navigate = useNavigate();

  const handleEpisodeClick = (episodeId: string) => {
    navigate(`/podcast/${podcastId}/episode/${episodeId}`);
  };

  if (episodes.length === 0) {
    return <div className="episode-list__empty">No episodes found</div>;
  }

  return (
    <div className="episode-list">
      <div className="episode-list__header">
        <h2>Episodes: {episodes.length}</h2>
      </div>

      <div className="episode-list__table-wrapper">
        <table className="episode-list__table">
          <thead className="episode-list__thead">
            <tr>
              <th className="episode-list__th">Title</th>
              <th className="episode-list__th episode-list__th--center episode-list__th--width-150">
                Date
              </th>
              <th className="episode-list__th episode-list__th--center episode-list__th--width-100">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {episodes.map(episode => (
              <tr
                key={episode.id}
                className="episode-list__tr"
                onClick={() => handleEpisodeClick(episode.id)}
              >
                <td className="episode-list__td episode-list__td--title">
                  <span>{episode.title}</span>
                </td>
                <td className="episode-list__td episode-list__td--center episode-list__td--text">
                  {formatDate(episode.releaseDate)}
                </td>
                <td className="episode-list__td episode-list__td--center episode-list__td--text">
                  {formatDuration(episode.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
