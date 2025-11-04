import { useMemo } from 'react';
import { podcastService } from '../app/services/instances';
import { Podcast } from '~/@types/interfaces/podcast';

export function useSearchPodcasts(podcasts: Podcast[] | undefined, query: string) {
  return useMemo(() => {
    if (!podcasts) return [];
    if (!query.trim()) return podcasts;
    return podcastService.searchPodcasts(podcasts, query);
  }, [podcasts, query]);
}
