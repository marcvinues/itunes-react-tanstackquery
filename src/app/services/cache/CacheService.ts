import { logger } from '../../../utils/logger';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

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
      logger.debug(`💾 Cache set: ${key}`, { ttl: `${ttl}ms` });
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      const now = Date.now();
      const age = now - entry.timestamp;

      if (age > entry.ttl) {
        this.remove(key);
        logger.debug(`⏰ Cache expired: ${key}`, { age: `${age}ms` });
        return null;
      }

      logger.debug(`✅ Cache hit: ${key}`, { age: `${age}ms` });
      return entry.data;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
      logger.debug(`🗑️ Cache removed: ${key}`);
    } catch (error) {
      logger.error('Cache remove error:', error);
    }
  }
}
