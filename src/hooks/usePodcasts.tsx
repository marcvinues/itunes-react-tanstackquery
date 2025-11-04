import { useQuery } from '@tanstack/react-query';
import { Podcast } from '~/@types/interfaces/podcast';
import { logger } from '../utils/logger';
import { podcastService } from '../app/services/instances';
import { podcastKeys } from '../app/services/api/queries/queryKeys';

export function usePodcasts() {
  return useQuery<Podcast[], Error>({
    queryKey: podcastKeys.all,
    queryFn: async () => {
      logger.info('🔄 Fetching podcasts...');
      const podcasts = await podcastService.getAllPodcasts();
      logger.info('✅ Podcasts fetched successfully', { count: podcasts.length });
      return podcasts;
    },
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
  });
}
