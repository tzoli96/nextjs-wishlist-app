/**
 * Format price to currency string
 * @param price - Price number
 * @param currency - Currency symbol (default: '$')
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted price string
 */
export function formatPrice(
  price: number,
  currency: string = '$',
  decimals: number = 2
): string {
  return `${currency}${price.toFixed(decimals)}`
}

/**
 * Format rating to one decimal place
 * @param rating - Rating number
 * @returns Formatted rating string
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Generate array of numbers for iteration
 * @param length - Array length
 * @returns Array of numbers [0, 1, 2, ...]
 */
export function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i)
}

/**
 * Pluralize word based on count
 * @param count - Number to check
 * @param singular - Singular form
 * @param plural - Plural form (optional, defaults to singular + 's')
 * @returns Pluralized word
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  return count === 1 ? singular : plural || `${singular}s`
}
