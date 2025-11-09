import { CacheEntry } from '~/@types/interfaces/api';

export class CacheService {
  private storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  set<T>(key: string, data: T, ttl: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    try {
      this.storage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      
      if (!item) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(item);
      const now = Date.now();

      // Check if cache is still valid
      if (now - entry.timestamp > entry.ttl) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  has(key: string): boolean {
    const data = this.get(key);
    return data !== null;
  }
}