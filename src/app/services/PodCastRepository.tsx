import { logger } from '../../utils/logger';
import { PodcastApiService } from './api/PodcastApiService';
import { Podcast } from '../../@types/interfaces/podcast';

export class PodcastRepository {
  constructor(private apiService: PodcastApiService) {}

  async getTopPodcasts(): Promise<Podcast[]> {
    logger.info('🌐 Fetching podcasts from API');
    const podcasts = await this.apiService.fetchTopPodcasts();
    logger.info('✅ Fetched podcasts', { count: podcasts.length });
    return podcasts;
  }
}
