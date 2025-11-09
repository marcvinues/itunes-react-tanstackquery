import { cacheService } from '../instances';

const CACHE_KEY = 'search_history';
const MAX_HISTORY = 10;
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 días

export class SearchHistoryService {
  getHistory(): string[] {
    return cacheService.get<string[]>(CACHE_KEY) || [];
  }

  addSearch(query: string): void {
    const history = this.getHistory();
    const filtered = history.filter(q => q !== query);
    const newHistory = [query, ...filtered].slice(0, MAX_HISTORY);
    cacheService.set(CACHE_KEY, newHistory, CACHE_TTL);
  }

  clearHistory(): void {
    cacheService.remove(CACHE_KEY);
  }
}

export const searchHistoryService = new SearchHistoryService();