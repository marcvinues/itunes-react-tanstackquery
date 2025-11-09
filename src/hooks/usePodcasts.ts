import { useQuery } from '@tanstack/react-query';
import { Podcast } from '~/@types/interfaces/podcast';
import { logger } from '../utils/logger';
import { podcastService } from '../app/services/instances';
import { podcastKeys } from '../app/services/api/queries/queryKeys';
import { QUERY_CONFIG } from '../app/services/api/config/clientConfig';

export function usePodcasts() {
  return useQuery<Podcast[], Error>({
    queryKey: podcastKeys.all,
    queryFn: async () => {
      logger.info('🔄 Fetching podcasts...');
      const podcasts = await podcastService.getAllPodcasts();
      logger.info('✅ Podcasts fetched successfully', { count: podcasts.length });
      return podcasts;
    },
    staleTime: QUERY_CONFIG.STALE_TIME.VERY_LONG,
    gcTime: QUERY_CONFIG.GC_TIME.DEFAULT,
    retry: QUERY_CONFIG.RETRY.DEFAULT,
  });
}
