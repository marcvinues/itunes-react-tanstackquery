// src/domain/services/PodcastService.ts
import { Podcast } from '~/@types/interfaces/podcast';
import { PodcastApiService } from './api/PodcastApiService';

export class PodcastService {
  constructor(private apiService: PodcastApiService) {}

  async getAllPodcasts(): Promise<Podcast[]> {
    return this.apiService.fetchTopPodcasts();
  }

  searchPodcasts(podcasts: Podcast[], query: string): Podcast[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return podcasts;

    return podcasts.filter(
      podcast =>
        podcast.title.toLowerCase().includes(lowerQuery) ||
        podcast.author.toLowerCase().includes(lowerQuery)
    );
  }
}
