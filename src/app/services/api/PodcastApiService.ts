import { apiClient } from './ApiClient';
import { PodcastAdapter } from './PodcastAdapter';
import { Podcast, PodcastDetail } from '../../../@types/interfaces/podcast';
import {
  ITunesLookupResponse,
  ITunesTopPodcastsResponse,
} from '../../../@types/interfaces/services';

export class PodcastApiService {
  private readonly endpoints = {
    base_url: 'https://itunes.apple.com',
    topPodcasts: '/us/rss/toppodcasts/limit=100/genre=1310/json',
  };

  private buildUrl(endpoint: string): string {
    const fullUrl = `${this.endpoints.base_url}${endpoint}`;

    return fullUrl;
  }

  async fetchTopPodcasts(): Promise<Podcast[]> {
    const response = await apiClient.get<ITunesTopPodcastsResponse>(this.endpoints.topPodcasts, {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
    });

    return PodcastAdapter.toDomainList(response);
  }

  async fetchPodcastById(podcastId: string): Promise<PodcastDetail> {
    const url = this.buildUrl(
      `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    );

    const response = await apiClient.get<ITunesLookupResponse>(url, {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
    });
    return PodcastAdapter.toPodcastDetail(response);
  }
}
