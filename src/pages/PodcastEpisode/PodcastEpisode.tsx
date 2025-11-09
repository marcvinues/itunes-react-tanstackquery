import { useParams } from 'react-router-dom';
import { useEpisode } from '../../hooks/useEpisode';
import { usePodcast } from '../../hooks/usePodcast';
import { PodcastInfo } from '../../components/Podcast/PodcastInfo/PodcastInfo';
import { PodcastPlayer } from '../../components/Podcast/PodcastPlayer/PodcastPlayer';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const EpisodeDetail = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();

  const {
    data: episode,
    isLoading: episodeLoading,
    error: episodeError,
    refetch: refetchEpisode,
  } = useEpisode(podcastId, episodeId);

  const { data: podcast, isLoading: podcastLoading } = usePodcast(podcastId);

  const isLoading = episodeLoading || podcastLoading;

  if (isLoading) {
    return <Spinner text="Loading episode..." />;
  }

  if (episodeError) {
    return <ErrorMessage message="Episode not found" onRetry={() => refetchEpisode()} />;
  }

  if (!episode) {
    return (
      <div className="podcast-detail__empty">
        <p className="podcast-detail__empty-text">Podcast not found</p>
      </div>
    );
  }

  return (
    <div className="podcast-detail">
      <div className="podcast-detail__grid">
        <aside>{podcast && <PodcastInfo podcast={podcast} />}</aside>
        <main>
          <PodcastPlayer episode={episode} />
        </main>
      </div>
    </div>
  );
};
