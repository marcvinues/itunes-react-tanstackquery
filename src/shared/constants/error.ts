export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'AppError';
    this.userMessage = userMessage || this.getDefaultMessage();
  }

  private getDefaultMessage(): string {
    switch (this.code) {
      case ErrorCode.NETWORK_ERROR:
        return 'Unable to connect. Please check your internet connection.';
      case ErrorCode.TIMEOUT_ERROR:
        return 'Request took too long. Please try again.';
      case ErrorCode.NOT_FOUND:
        return 'Content not found.';
      case ErrorCode.SERVER_ERROR:
        return 'Server error. Please try again later.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  static fromError(error: unknown): AppError {
    if (error instanceof AppError) return error;

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new AppError(ErrorCode.TIMEOUT_ERROR, error.message);
      }
      if (error.name === 'TypeError') {
        return new AppError(ErrorCode.NETWORK_ERROR, error.message);
      }
    }

    return new AppError(ErrorCode.UNKNOWN_ERROR, 'Unknown error occurred');
  }
}
