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