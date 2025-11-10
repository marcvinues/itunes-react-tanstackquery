import {
  Podcast,
  ITunesTopPodcastsResponse,
  PodcastRaw,
  ITunesLookupResponse,
  PodcastDetail,
  Episode,
  ITunesLookupResult,
} from '~/@types/interfaces/podcast';

export class PodcastAdapter {
  static toDomain(raw: PodcastRaw): Podcast {
    const images = raw['im:image'] || [];
    const imageUrl = images.length > 0 ? images[images.length - 1].label : '';

    return {
      id: raw.id.attributes['im:id'],
      title: raw['im:name'].label,
      author: raw['im:artist'].label,
      description: raw.summary.label,
      imageUrl: imageUrl,
      category: raw.category?.attributes?.label || 'Unknown',
    };
  }

  static toDomainList(response: ITunesTopPodcastsResponse): Podcast[] {
    return response.feed.entry.map(entry => this.toDomain(entry));
  }

  static toPodcastDetail(response: ITunesLookupResponse): PodcastDetail {
    if (response.resultCount === 0) {
      throw new Error('Podcast not found');
    }

    const podcastData = response.results[0];
    const episodesData = response.results;

    const podcast: Podcast = {
      id: podcastData.collectionId?.toString() || podcastData.trackId.toString(),
      title: podcastData.collectionName || podcastData.trackName,
      author: podcastData.artistName,
      description:
        podcastData.description || podcastData.shortDescription || 'No description available',
      imageUrl: podcastData.artworkUrl600 || podcastData.artworkUrl100 || '',
      category: podcastData.primaryGenreName || 'Unknown',
    };

    const episodes: Episode[] = episodesData.map(ep => this.toEpisode(ep));

    return {
      ...podcast,
      episodes,
    };
  }

  static toEpisode(result: ITunesLookupResult): Episode {
    return {
      id: result.trackId.toString(),
      podcastId: result.collectionId?.toString() || '',
      title: result.trackName,
      description: result.description || result.shortDescription || 'No description available',
      audioUrl: result.episodeUrl || result.previewUrl || '',
      duration: result.trackTimeMillis ? Math.floor(result.trackTimeMillis / 1000) : 0,
      releaseDate: new Date(result.releaseDate),
    };
  }
}
