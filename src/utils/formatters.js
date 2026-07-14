/**
 * Formatting utilities
 */

/**
 * Pad a number with leading zeros
 * @param {number} num - Number to pad
 * @param {number} size - Desired string length (default: 2)
 * @returns {string} Padded number string
 */
export const padNumber = (num, size = 2) => {
  if (num == null) return '00';
  return num.toString().padStart(size, '0');
};

/**
 * Format currency value
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'THB')
 * @param {string} locale - Locale string (default: 'th-TH')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'THB', locale = 'th-TH') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};
