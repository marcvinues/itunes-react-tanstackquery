export const podcastKeys = {
  all: ['podcasts'] as const,
  lists: () => [...podcastKeys.all, 'list'] as const,
  list: (filters?: string) => [...podcastKeys.lists(), { filters }] as const,
  details: () => [...podcastKeys.all, 'detail'] as const,
  detail: (id: string) => [...podcastKeys.details(), id] as const,
  episodes: (podcastId: string) => [...podcastKeys.detail(podcastId), 'episodes'] as const,
  episode: (podcastId: string, episodeId: string) =>
    [...podcastKeys.episodes(podcastId), episodeId] as const,
};
