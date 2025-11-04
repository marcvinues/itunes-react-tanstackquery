import { Podcast, ITunesTopPodcastsResponse, PodcastRaw } from '~/@types/interfaces/podcast';

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
}