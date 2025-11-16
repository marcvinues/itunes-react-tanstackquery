export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  category: string;
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
