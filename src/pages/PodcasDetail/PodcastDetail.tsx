import { useParams } from 'react-router-dom';
import { usePodcast } from '../../hooks/usePodcast';
import { PodcastInfo } from '../../components/Podcast/PodcastInfo/PodcastInfo';
import { EpisodeList } from '../../components/Podcast/PodcastInfo/PodcastInfoList/PodcastInfoList';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import './PodcastDetail.css';

export const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { data: podcast, isLoading, error, refetch } = usePodcast(podcastId);

  if (isLoading) {
    return <Spinner text="Loading podcast details..." />;
  }

  if (error) {
    return <ErrorMessage message="Episode not found" onRetry={() => refetch()} />;
  }

  if (!podcast) {
    return (
      <div className="podcast-detail__empty">
        <p className="podcast-detail__empty-text">Podcast not found</p>
      </div>
    );
  }

  return (
    <div className="podcast-detail">
      <div className="podcast-detail__grid">
        <aside>
          <PodcastInfo podcast={podcast} />
        </aside>
        <main>
          <EpisodeList episodes={podcast.episodes} podcastId={podcast.id} />
        </main>
      </div>
    </div>
  );
};
