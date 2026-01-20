/**
 * String sanitization utilities
 * Used to clean user input before processing
 */

/**
 * Sanitize room name
 * - Trim whitespace
 * - Remove excessive spaces
 * - Remove special characters that could cause issues
 */
export function sanitizeRoomName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>]/g, ''); // Remove angle brackets
}

/**
 * Sanitize description
 * - Trim whitespace
 * - Remove excessive newlines
 * - Remove HTML tags (basic)
 */
export function sanitizeDescription(description: string): string {
  return description
    .trim()
    .replace(/\n{3,}/g, '\n\n') // Replace 3+ newlines with 2
    .replace(/<[^>]*>/g, ''); // Remove HTML tags
}

/**
 * Sanitize general text input
 * - Trim whitespace
 * - Remove null bytes
 */
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/\0/g, ''); // Remove null bytes
}

/**
 * Validate and sanitize URL
 * - Check if it's a valid URL format
 * - Ensure it uses http/https protocol
 */
export function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  
  // Basic URL validation
  try {
    const urlObj = new URL(trimmed);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Invalid protocol');
    }
    return trimmed;
  } catch {
    throw new Error('Invalid URL format');
  }
}
