const isDev = import.meta.env.DEV;

class Logger {
  debug(message: string, data?: unknown) {
    if (isDev) console.debug(`[DEBUG] ${message}`, data || '');
  }

  info(message: string, data?: unknown) {
    if (isDev) console.info(`[INFO] ${message}`, data || '');
  }

  warn(message: string, data?: unknown) {
    console.warn(`[WARN] ${message}`, data || '');
  }

  error(message: string, error?: unknown) {
    console.error(`[ERROR] ${message}`, error || '');
  }
}

export const logger = new Logger();
