import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ApiError,
  ValidationError,
  isApiError,
} from "./errors/customErrors";
import {
  ErrorCode,
  getErrorStatus,
  getErrorMessage,
} from "./errorConstants";

/**
 * API Error Response Types
 */
export interface ApiErrorResponse {
  error?: string;
  message?: string;
  details?: unknown;
  errors?: z.ZodIssue[];
  errorCode?: string;
  statusCode?: number;
}

/**
 * Handle API errors and return appropriate NextResponse
 */
export function handleApiError(error: unknown, context?: string): NextResponse<ApiErrorResponse> {
  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: getErrorMessage(ErrorCode.VALIDATION_ERROR),
        message: "Invalid request data",
        errors: error.issues,
        errorCode: ErrorCode.VALIDATION_ERROR,
        statusCode: getErrorStatus(ErrorCode.VALIDATION_ERROR),
      },
      { status: getErrorStatus(ErrorCode.VALIDATION_ERROR) }
    );
  }

  // Handle custom ApiError instances
  if (isApiError(error)) {
    // Log error with context
    if (context) {
      console.error(`Error in ${context}:`, error);
    } else {
      console.error("API Error:", error);
    }

    return NextResponse.json(
      {
        error: error.message,
        message: error.message,
        errorCode: error.code,
        statusCode: error.statusCode,
        details: process.env.NODE_ENV === "development" ? error.details : undefined,
      },
      { status: error.statusCode }
    );
  }

  // Handle generic Error instances (fallback for non-custom errors)
  if (error instanceof Error) {
    const errorMessage = error.message;
    const errorName = error.name;

    // Log error with context
    if (context) {
      console.error(`Error in ${context}:`, error);
    } else {
      console.error("API Error:", error);
    }

    // Try to map common error messages to error codes
    // This is a fallback for errors that haven't been converted to custom errors yet
    if (errorMessage.includes("Can't reach database server") || errorMessage.includes("P1001")) {
      return NextResponse.json(
        {
          error: getErrorMessage(ErrorCode.DATABASE_CONNECTION_FAILED),
          message: getErrorMessage(ErrorCode.DATABASE_CONNECTION_FAILED),
          errorCode: ErrorCode.DATABASE_CONNECTION_FAILED,
          statusCode: getErrorStatus(ErrorCode.DATABASE_CONNECTION_FAILED),
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: getErrorStatus(ErrorCode.DATABASE_CONNECTION_FAILED) }
      );
    }

    if (errorMessage.includes("does not exist") || errorMessage.includes("Table")) {
      return NextResponse.json(
        {
          error: getErrorMessage(ErrorCode.DATABASE_SCHEMA_MISMATCH),
          message: getErrorMessage(ErrorCode.DATABASE_SCHEMA_MISMATCH),
          errorCode: ErrorCode.DATABASE_SCHEMA_MISMATCH,
          statusCode: getErrorStatus(ErrorCode.DATABASE_SCHEMA_MISMATCH),
        },
        { status: getErrorStatus(ErrorCode.DATABASE_SCHEMA_MISMATCH) }
      );
    }

    // Generic error response for unknown errors
    return NextResponse.json(
      {
        error: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
        message: errorMessage,
        errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
        statusCode: getErrorStatus(ErrorCode.INTERNAL_SERVER_ERROR),
        details: process.env.NODE_ENV === "development" ? { errorName, stack: error.stack } : undefined,
      },
      { status: getErrorStatus(ErrorCode.INTERNAL_SERVER_ERROR) }
    );
  }

  // Handle unknown errors
  console.error("Unknown error:", error);
  return NextResponse.json(
    {
      error: getErrorMessage(ErrorCode.UNKNOWN_ERROR),
      message: getErrorMessage(ErrorCode.UNKNOWN_ERROR),
      errorCode: ErrorCode.UNKNOWN_ERROR,
      statusCode: getErrorStatus(ErrorCode.UNKNOWN_ERROR),
    },
    { status: getErrorStatus(ErrorCode.UNKNOWN_ERROR) }
  );
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse<T> {
  return NextResponse.json(data, { status });
}

/**
 * Create an unauthorized response
 */
export function unauthorizedResponse(message?: string): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      error: message || getErrorMessage(ErrorCode.UNAUTHORIZED),
      message: message || getErrorMessage(ErrorCode.UNAUTHORIZED),
      errorCode: ErrorCode.UNAUTHORIZED,
      statusCode: getErrorStatus(ErrorCode.UNAUTHORIZED),
    },
    { status: getErrorStatus(ErrorCode.UNAUTHORIZED) }
  );
}

/**
 * Create a not found response
 */
export function notFoundResponse(message?: string, code: ErrorCode = ErrorCode.NOT_FOUND): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      error: message || getErrorMessage(code),
      message: message || getErrorMessage(code),
      errorCode: code,
      statusCode: getErrorStatus(code),
    },
    { status: getErrorStatus(code) }
  );
}


