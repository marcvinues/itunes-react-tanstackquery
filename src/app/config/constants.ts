export const ROUTES = {
  HOME: '/',
  PODCAST_DETAIL: '/podcast/:podcastId',
  EPISODE_DETAIL: '/podcast/:podcastId/episode/:episodeId',
} as const;

export const buildPodcastRoute = (podcastId: string): string => `/podcast/${podcastId}`;

export const buildEpisodeRoute = (podcastId: string, episodeId: string): string =>
  `/podcast/${podcastId}/episode/${episodeId}`;
