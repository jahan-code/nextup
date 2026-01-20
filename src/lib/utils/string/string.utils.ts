/**
 * String utility functions
 */

/**
 * Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number, suffix: string = "..."): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

