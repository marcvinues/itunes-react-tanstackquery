import { Episode, Podcast, PodcastDetail } from '~/@types/interfaces/podcast';
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

  async getPodcastById(podcastId: string): Promise<PodcastDetail> {
    return this.apiService.fetchPodcastById(podcastId);
  }

  searchEpisodes(episodes: Episode[], query: string): Episode[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return episodes;

    return episodes.filter(episode => episode.title.toLowerCase().includes(lowerQuery));
  }

  async getEpisode(podcastId: string, episodeId: string): Promise<Episode> {
    const podcast = await this.getPodcastById(podcastId);
    const episode = podcast.episodes.find(ep => ep.id === episodeId);

    if (!episode) {
      throw new Error(`Episode ${episodeId} not found in podcast ${podcastId}`);
    }

    return episode;
  }
}
