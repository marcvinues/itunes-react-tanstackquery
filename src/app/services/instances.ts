// src/services/instances.ts

import { PodcastApiService } from './api/PodcastApiService';
import { PodcastService } from './PodCastService';

export const podcastApiService = new PodcastApiService();

export const podcastService = new PodcastService(podcastApiService);
