// src/infrastructure/api/services/PodcastApiService.ts
import { apiClient } from './ApiClient';
import { PodcastAdapter } from './PodcastAdapter';
import { Podcast, ITunesTopPodcastsResponse } from '~/@types/interfaces/podcast';

export class PodcastApiService {
  private readonly endpoints = {
    topPodcasts: '/us/rss/toppodcasts/limit=100/genre=1310/json',
  };

  async fetchTopPodcasts(): Promise<Podcast[]> {
    const response = await apiClient.get<ITunesTopPodcastsResponse>(
      this.endpoints.topPodcasts,
      {
        timeout: 10000,
        retries: 3,
        retryDelay: 1000,
      }
    );

    return PodcastAdapter.toDomainList(response);
  }
}