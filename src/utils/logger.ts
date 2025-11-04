const isDev = import.meta.env.DEV;

class Logger {
  debug(message: string, data?: any) {
    if (isDev) console.debug(`[DEBUG] ${message}`, data || '');
  }

  info(message: string, data?: any) {
    if (isDev) console.info(`[INFO] ${message}`, data || '');
  }

  warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data || '');
  }

  error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error || '');
  }
}

export const logger = new Logger();