import { useQuery } from '@tanstack/react-query';
import { podcastService } from '../app/services/instances';
import { PodcastDetail } from '~/@types/interfaces/podcast';
import { podcastKeys } from '../app/services/api/queries/queryKeys';
import { logger } from '../utils/logger';

export function usePodcast(podcastId: string | undefined) {
  return useQuery<PodcastDetail, Error>({
    queryKey: podcastKeys.detail(podcastId!),
    queryFn: async () => {
      logger.info(`🔄 Fetching podcast ${podcastId}...`);
      const podcast = await podcastService.getPodcastById(podcastId!);
      logger.info(`✅ Podcast ${podcastId} fetched successfully`, {
        episodes: podcast.episodes.length,
      });
      return podcast;
    },
    enabled: !!podcastId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}