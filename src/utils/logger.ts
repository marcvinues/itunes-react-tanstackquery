type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isDev = import.meta.env.NODE_ENV === 'development';

class Logger {
  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (!isDev && level === 'debug') {
      return;
    }

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'debug':
        console.debug(prefix, message, ...args);
        break;
      case 'info':
        console.info(prefix, message, ...args);
        break;
      case 'warn':
        console.warn(prefix, message, ...args);
        break;
      case 'error':
        console.error(prefix, message, ...args);
        break;
    }
  }

  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  error(message: string | Error, ...args: unknown[]): void {
    const errorMessage = message instanceof Error ? message.message : message;
    this.log('error', errorMessage, ...args);
  }
}

export const logger = new Logger();
