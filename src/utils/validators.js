/**
 * Validation utilities
 */

/**
 * Check if a value is not empty
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export const validateRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  return value != null;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
