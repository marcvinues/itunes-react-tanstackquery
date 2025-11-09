import { logger } from '../../../utils/logger';
import { AppError, ErrorCode } from '../../../shared/constants/error';

interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class ApiClient {
  private baseURL: string;
  private defaultTimeout = 10000;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async fetchWithTimeout<T>(
    url: string,
    config: RequestConfig,
    timeout: number
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url);

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status >= 500) {
          throw new AppError(ErrorCode.SERVER_ERROR, `Server error: ${response.status}`);
        }
        if (response.status === 404) {
          throw new AppError(ErrorCode.NOT_FOUND, 'Resource not found');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async requestWithRetry<T>(
    url: string,
    config: RequestConfig,
    retries: number,
    retryDelay: number
  ): Promise<T> {
    try {
      return await this.fetchWithTimeout<T>(url, config, config.timeout || this.defaultTimeout);
    } catch (error) {
      const shouldRetry =
        retries > 0 &&
        (error instanceof Error &&
          (error.name === 'TypeError' ||
            (error instanceof AppError && error.code === ErrorCode.SERVER_ERROR)));

      if (shouldRetry) {
        logger.warn(`Retrying request. Attempts left: ${retries}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return this.requestWithRetry<T>(url, config, retries - 1, retryDelay * 2);
      }

      throw AppError.fromError(error);
    }
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;

    const { timeout = this.defaultTimeout, retries = 3, retryDelay = 1000, ...fetchConfig } = config;

    logger.debug(`API GET: ${url}`);

    const finalConfig: RequestConfig = {
      ...fetchConfig,
      method: 'GET',
      timeout,
    };

    try {
      const data = await this.requestWithRetry<T>(url, finalConfig, retries, retryDelay);
      logger.info(`API Success: ${url}`);
      return data;
    } catch (error) {
      logger.error(`API Error: ${url}`, error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || 'https://itunes.apple.com'
);