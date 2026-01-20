/**
 * Error Constants
 * Centralized error codes, messages, and HTTP status codes
 */

export enum ErrorCode {
  // Validation Errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_REQUEST_BODY = 'INVALID_REQUEST_BODY',
  INVALID_QUERY_PARAM = 'INVALID_QUERY_PARAM',
  INVALID_URL = 'INVALID_URL',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  // Authentication Errors (401)
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // Authorization Errors (403)
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  NOT_ROOM_MEMBER = 'NOT_ROOM_MEMBER',
  NOT_ROOM_CREATOR = 'NOT_ROOM_CREATOR',
  
  // Not Found Errors (404)
  NOT_FOUND = 'NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ROOM_NOT_FOUND = 'ROOM_NOT_FOUND',
  STREAM_NOT_FOUND = 'STREAM_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  
  // Business Logic Errors (400)
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  ALREADY_MEMBER = 'ALREADY_MEMBER',
  INVALID_OPERATION = 'INVALID_OPERATION',
  YOUTUBE_ID_EXTRACTION_FAILED = 'YOUTUBE_ID_EXTRACTION_FAILED',
  
  // Database Errors (500/503)
  DATABASE_ERROR = 'DATABASE_ERROR',
  DATABASE_CONNECTION_FAILED = 'DATABASE_CONNECTION_FAILED',
  DATABASE_SCHEMA_MISMATCH = 'DATABASE_SCHEMA_MISMATCH',
  
  // Internal Server Errors (500)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum ErrorCategory {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  DATABASE = 'DATABASE',
  INTERNAL = 'INTERNAL',
}

/**
 * Error code to HTTP status code mapping
 */
export const ERROR_STATUS_MAP: Record<ErrorCode, number> = {
  // Validation Errors
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.INVALID_REQUEST_BODY]: 400,
  [ErrorCode.INVALID_QUERY_PARAM]: 400,
  [ErrorCode.INVALID_URL]: 400,
  [ErrorCode.MISSING_REQUIRED_FIELD]: 400,
  
  // Authentication Errors
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.INVALID_CREDENTIALS]: 401,
  [ErrorCode.SESSION_EXPIRED]: 401,
  
  // Authorization Errors
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: 403,
  [ErrorCode.NOT_ROOM_MEMBER]: 403,
  [ErrorCode.NOT_ROOM_CREATOR]: 403,
  
  // Not Found Errors
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.USER_NOT_FOUND]: 404,
  [ErrorCode.ROOM_NOT_FOUND]: 404,
  [ErrorCode.STREAM_NOT_FOUND]: 404,
  [ErrorCode.RESOURCE_NOT_FOUND]: 404,
  
  // Business Logic Errors
  [ErrorCode.ALREADY_EXISTS]: 400,
  [ErrorCode.USER_ALREADY_EXISTS]: 400,
  [ErrorCode.ALREADY_MEMBER]: 400,
  [ErrorCode.INVALID_OPERATION]: 400,
  [ErrorCode.YOUTUBE_ID_EXTRACTION_FAILED]: 400,
  
  // Database Errors
  [ErrorCode.DATABASE_ERROR]: 500,
  [ErrorCode.DATABASE_CONNECTION_FAILED]: 503,
  [ErrorCode.DATABASE_SCHEMA_MISMATCH]: 500,
  
  // Internal Server Errors
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
  [ErrorCode.UNKNOWN_ERROR]: 500,
};

/**
 * Error code to category mapping
 */
export const ERROR_CATEGORY_MAP: Record<ErrorCode, ErrorCategory> = {
  // Validation Errors
  [ErrorCode.VALIDATION_ERROR]: ErrorCategory.VALIDATION,
  [ErrorCode.INVALID_REQUEST_BODY]: ErrorCategory.VALIDATION,
  [ErrorCode.INVALID_QUERY_PARAM]: ErrorCategory.VALIDATION,
  [ErrorCode.INVALID_URL]: ErrorCategory.VALIDATION,
  [ErrorCode.MISSING_REQUIRED_FIELD]: ErrorCategory.VALIDATION,
  
  // Authentication Errors
  [ErrorCode.UNAUTHORIZED]: ErrorCategory.AUTHENTICATION,
  [ErrorCode.INVALID_CREDENTIALS]: ErrorCategory.AUTHENTICATION,
  [ErrorCode.SESSION_EXPIRED]: ErrorCategory.AUTHENTICATION,
  
  // Authorization Errors
  [ErrorCode.FORBIDDEN]: ErrorCategory.AUTHORIZATION,
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: ErrorCategory.AUTHORIZATION,
  [ErrorCode.NOT_ROOM_MEMBER]: ErrorCategory.AUTHORIZATION,
  [ErrorCode.NOT_ROOM_CREATOR]: ErrorCategory.AUTHORIZATION,
  
  // Not Found Errors
  [ErrorCode.NOT_FOUND]: ErrorCategory.NOT_FOUND,
  [ErrorCode.USER_NOT_FOUND]: ErrorCategory.NOT_FOUND,
  [ErrorCode.ROOM_NOT_FOUND]: ErrorCategory.NOT_FOUND,
  [ErrorCode.STREAM_NOT_FOUND]: ErrorCategory.NOT_FOUND,
  [ErrorCode.RESOURCE_NOT_FOUND]: ErrorCategory.NOT_FOUND,
  
  // Business Logic Errors
  [ErrorCode.ALREADY_EXISTS]: ErrorCategory.BUSINESS_LOGIC,
  [ErrorCode.USER_ALREADY_EXISTS]: ErrorCategory.BUSINESS_LOGIC,
  [ErrorCode.ALREADY_MEMBER]: ErrorCategory.BUSINESS_LOGIC,
  [ErrorCode.INVALID_OPERATION]: ErrorCategory.BUSINESS_LOGIC,
  [ErrorCode.YOUTUBE_ID_EXTRACTION_FAILED]: ErrorCategory.BUSINESS_LOGIC,
  
  // Database Errors
  [ErrorCode.DATABASE_ERROR]: ErrorCategory.DATABASE,
  [ErrorCode.DATABASE_CONNECTION_FAILED]: ErrorCategory.DATABASE,
  [ErrorCode.DATABASE_SCHEMA_MISMATCH]: ErrorCategory.DATABASE,
  
  // Internal Server Errors
  [ErrorCode.INTERNAL_SERVER_ERROR]: ErrorCategory.INTERNAL,
  [ErrorCode.UNKNOWN_ERROR]: ErrorCategory.INTERNAL,
};

/**
 * Default error messages for each error code
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // Validation Errors
  [ErrorCode.VALIDATION_ERROR]: 'Validation error',
  [ErrorCode.INVALID_REQUEST_BODY]: 'Invalid request body',
  [ErrorCode.INVALID_QUERY_PARAM]: 'Invalid query parameter',
  [ErrorCode.INVALID_URL]: 'Invalid URL',
  [ErrorCode.MISSING_REQUIRED_FIELD]: 'Missing required field',
  
  // Authentication Errors
  [ErrorCode.UNAUTHORIZED]: 'Unauthorized',
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid credentials',
  [ErrorCode.SESSION_EXPIRED]: 'Session expired',
  
  // Authorization Errors
  [ErrorCode.FORBIDDEN]: 'Forbidden',
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions',
  [ErrorCode.NOT_ROOM_MEMBER]: 'You must be a member of the room',
  [ErrorCode.NOT_ROOM_CREATOR]: 'Only the room creator can perform this action',
  
  // Not Found Errors
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.USER_NOT_FOUND]: 'User not found',
  [ErrorCode.ROOM_NOT_FOUND]: 'Room not found',
  [ErrorCode.STREAM_NOT_FOUND]: 'Stream not found',
  [ErrorCode.RESOURCE_NOT_FOUND]: 'Resource not found',
  
  // Business Logic Errors
  [ErrorCode.ALREADY_EXISTS]: 'Resource already exists',
  [ErrorCode.USER_ALREADY_EXISTS]: 'User with this email already exists',
  [ErrorCode.ALREADY_MEMBER]: 'User is already a member of this room',
  [ErrorCode.INVALID_OPERATION]: 'Invalid operation',
  [ErrorCode.YOUTUBE_ID_EXTRACTION_FAILED]: 'Invalid YouTube URL or could not extract video ID',
  
  // Database Errors
  [ErrorCode.DATABASE_ERROR]: 'Database error',
  [ErrorCode.DATABASE_CONNECTION_FAILED]: 'Unable to connect to the database. Please check if your database is active.',
  [ErrorCode.DATABASE_SCHEMA_MISMATCH]: 'Database tables not initialized. Please run migrations.',
  
  // Internal Server Errors
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred',
};

/**
 * Get HTTP status code for an error code
 */
export function getErrorStatus(code: ErrorCode): number {
  return ERROR_STATUS_MAP[code];
}

/**
 * Get error category for an error code
 */
export function getErrorCategory(code: ErrorCode): ErrorCategory {
  return ERROR_CATEGORY_MAP[code];
}

/**
 * Get default message for an error code
 */
export function getErrorMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code];
}

