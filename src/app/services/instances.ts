import { ApiClient } from './api/ApiClient';
import { API_CONFIG } from './api/config/clientConfig';
import { PodcastApiService } from './api/PodcastApiService';
import { CacheService } from './cache/CacheService';
import { PodcastService } from './PodCastService';

export const podcastApiService = new PodcastApiService();

export const podcastService = new PodcastService(podcastApiService);

export const cacheService = new CacheService(localStorage);

export const apiClient = new ApiClient(API_CONFIG.BASE_URL);
