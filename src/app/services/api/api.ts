export const BASE_URL = 'https://itunes.apple.com/us';

export const ENDPOINTS = {
  TOP_PODCASTS: `${BASE_URL}/rss/toppodcasts/limit=100/genre=1310/json`,
  PODCAST_DETAIL: (id: string) => `${BASE_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
} as const;