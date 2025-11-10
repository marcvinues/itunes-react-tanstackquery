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

  clear(): void {
    try {
      this.storage.clear();
      logger.info('🧹 Cache cleared');
    } catch (error) {
      logger.error('Cache clear error:', error);
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  getKeys(prefix?: string): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && (!prefix || key.startsWith(prefix))) {
        keys.push(key);
      }
    }
    return keys;
  }

  clearPrefix(prefix: string): void {
    const keys = this.getKeys(prefix);
    keys.forEach(key => this.remove(key));
    logger.info(`🧹 Cleared ${keys.length} items with prefix: ${prefix}`);
  }
}
