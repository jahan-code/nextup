import { NextRequest } from "next/server";
import { z } from "zod";
import { ValidationError } from "../errors/customErrors";
import { ErrorCode } from "../errorConstants";

/**
 * Parses and validates the request body against a Zod schema.
 * Throws ValidationError if parsing fails or validation fails.
 */
export async function parseRequestBody<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  let body: any;
  try {
    body = await req.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        "Invalid request body",
        { body, errors: error.issues }
      );
    }
    if (error instanceof SyntaxError) {
      const bodyText = await req.text().catch(() => "Unable to read body");
      throw new ValidationError(
        "Invalid JSON in request body",
        { body: bodyText }
      );
    }
    throw new ValidationError(
      "Failed to parse request body",
      { error: error instanceof Error ? error.message : String(error) }
    );
  }
}

/**
 * Validates request body against a Zod schema.
 * Alias for parseRequestBody for consistency.
 */
export async function validateRequest<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  return parseRequestBody(req, schema);
}

/**
 * Validates route parameters against expected keys.
 * Throws ValidationError if any required parameter is missing.
 */
export async function validateParams(
  params: Promise<Record<string, string>> | Record<string, string>,
  requiredKeys: string[]
): Promise<Record<string, string>> {
  const resolvedParams = await Promise.resolve(params);

  const missingKeys = requiredKeys.filter(
    (key) => !resolvedParams[key] || resolvedParams[key].trim() === ""
  );

  if (missingKeys.length > 0) {
    throw new ValidationError(
      `Missing required parameters: ${missingKeys.join(", ")}`,
      { params: resolvedParams, missingKeys }
    );
  }

  return resolvedParams;
}

/**
 * Gets a query parameter value from the request URL.
 * Returns null if the parameter is not present.
 */
export function getQueryParam(req: NextRequest, key: string): string | null {
  const { searchParams } = new URL(req.url);
  return searchParams.get(key);
}

/**
 * Gets a boolean query parameter value from the request URL.
 * Returns null if the parameter is not present.
 * Returns true for "true", "1", "yes", "on" (case-insensitive).
 */
export function getBooleanQueryParam(req: NextRequest, key: string): boolean | null {
  const value = getQueryParam(req, key);
  if (value === null) return null;
  const lowerValue = value.toLowerCase();
  return ["true", "1", "yes", "on"].includes(lowerValue);
}

/**
 * Gets a number query parameter value from the request URL.
 * Returns null if the parameter is not present or cannot be parsed.
 */
export function getNumberQueryParam(req: NextRequest, key: string): number | null {
  const value = getQueryParam(req, key);
  if (value === null) return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
}

/**
 * Validates request headers.
 * Throws ValidationError if any required header is missing.
 */
export function validateHeaders(
  req: NextRequest,
  requiredHeaders: string[]
): Record<string, string> {
  const headers: Record<string, string> = {};
  const missingHeaders: string[] = [];

  for (const headerName of requiredHeaders) {
    const headerValue = req.headers.get(headerName);
    if (!headerValue) {
      missingHeaders.push(headerName);
    } else {
      headers[headerName] = headerValue;
    }
  }

  if (missingHeaders.length > 0) {
    throw new ValidationError(
      `Missing required headers: ${missingHeaders.join(", ")}`,
      { missingHeaders }
    );
  }

  return headers;
}

