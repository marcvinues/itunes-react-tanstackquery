import { useQuery } from '@tanstack/react-query';
import { podcastService } from '../app/services/instances';
import { Episode } from '~/@types/interfaces/podcast';
import { podcastKeys } from '../app/services/api/queries/queryKeys';
import { logger } from '../utils/logger';
import { QUERY_CONFIG } from '../app/services/api/config/clientConfig';

export function useEpisode(podcastId: string | undefined, episodeId: string | undefined) {
  return useQuery<Episode, Error>({
    queryKey: podcastKeys.episode(podcastId!, episodeId!),
    queryFn: async () => {
      logger.info(`🔄 Fetching episode ${episodeId} from podcast ${podcastId}...`);
      const episode = await podcastService.getEpisode(podcastId!, episodeId!);
      logger.info(`✅ Episode ${episodeId} fetched successfully`);
      return episode;
    },
    enabled: !!podcastId && !!episodeId,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
    gcTime: QUERY_CONFIG.GC_TIME.DEFAULT,
    retry: QUERY_CONFIG.RETRY.LESS,
  });
}