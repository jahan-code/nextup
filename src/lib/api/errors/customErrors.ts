import {
  ErrorCode,
  getErrorStatus,
  getErrorMessage,
  ErrorCategory,
  getErrorCategory,
} from '../errorConstants';

/**
 * Base API Error class
 */
export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly category: ErrorCategory;
  public readonly details?: unknown;

  constructor(
    code: ErrorCode,
    message?: string,
    details?: unknown
  ) {
    super(message || getErrorMessage(code));
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = getErrorStatus(code);
    this.category = getErrorCategory(code);
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Convert error to JSON-serializable format
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      category: this.category,
      details: this.details,
    };
  }
}

/**
 * Validation Error
 * Used for input validation failures (400)
 */
export class ValidationError extends ApiError {
  constructor(message?: string, details?: unknown) {
    super(ErrorCode.VALIDATION_ERROR, message, details);
  }
}

/**
 * Authentication Error
 * Used when user is not authenticated (401)
 */
export class AuthenticationError extends ApiError {
  constructor(message?: string, details?: unknown) {
    super(ErrorCode.UNAUTHORIZED, message || getErrorMessage(ErrorCode.UNAUTHORIZED), details);
  }
}

/**
 * Authorization Error
 * Used when user lacks permissions (403)
 */
export class AuthorizationError extends ApiError {
  constructor(code: ErrorCode = ErrorCode.FORBIDDEN, message?: string, details?: unknown) {
    super(code, message || getErrorMessage(code), details);
  }
}

/**
 * Not Found Error
 * Used when resource doesn't exist (404)
 */
export class NotFoundError extends ApiError {
  constructor(code: ErrorCode = ErrorCode.NOT_FOUND, message?: string, details?: unknown) {
    super(code, message || getErrorMessage(code), details);
  }
}

/**
 * Business Logic Error
 * Used for business rule violations (400)
 */
export class BusinessLogicError extends ApiError {
  constructor(code: ErrorCode, message?: string, details?: unknown) {
    super(code, message || getErrorMessage(code), details);
  }
}

/**
 * Database Error
 * Used for database-related errors (500/503)
 */
export class DatabaseError extends ApiError {
  constructor(code: ErrorCode = ErrorCode.DATABASE_ERROR, message?: string, details?: unknown) {
    super(code, message || getErrorMessage(code), details);
  }
}

/**
 * Internal Server Error
 * Used for unexpected errors (500)
 */
export class InternalServerError extends ApiError {
  constructor(message?: string, details?: unknown) {
    super(ErrorCode.INTERNAL_SERVER_ERROR, message || getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR), details);
  }
}

/**
 * Type guard to check if error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Type guard to check if error is a specific ApiError type
 */
export function isErrorCode(error: unknown, code: ErrorCode): error is ApiError {
  return isApiError(error) && error.code === code;
}

