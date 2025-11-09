import { PodcastApiService } from './api/PodcastApiService';
import { CacheService } from './cache/CacheService';
import { PodcastService } from './PodCastService';

export const podcastApiService = new PodcastApiService();

export const podcastService = new PodcastService(podcastApiService);

export const cacheService = new CacheService(localStorage);
