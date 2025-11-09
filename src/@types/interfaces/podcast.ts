export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface PodcastRaw {
  'im:name': { label: string };
  'im:artist': { label: string };
  summary: { label: string };
  'im:image': Array<{ label: string; attributes: { height: string } }>;
  id: { attributes: { 'im:id': string } };
  category: { attributes: { label: string } };
}

export interface ITunesTopPodcastsResponse {
  feed: {
    entry: PodcastRaw[];
  };
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  releaseDate: Date;
}

export interface PodcastDetail extends Podcast {
  episodes: Episode[];
}

export interface ITunesLookupResponse {
  resultCount: number;
  results: ITunesLookupResult[];
}

export interface ITunesLookupResult {
  wrapperType: 'track' | 'collection';
  kind?: 'podcast' | 'podcast-episode';
  collectionId?: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionViewUrl?: string;
  feedUrl?: string;
  trackViewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  trackCount?: number;
  country: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  artworkUrl160?: string;
  episodeFileExtension?: string;
  episodeContentType?: string;
  episodeUrl?: string;
  closedCaptioning?: string;
  collectionHdPrice?: number;
  description?: string;
  shortDescription?: string;
  trackTimeMillis?: number;
  previewUrl?: string;
  genres?: string[];
  genreIds?: string[];
}