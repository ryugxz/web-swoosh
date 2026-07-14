/**
 * Date helper utilities
 */

/**
 * Calculate age from a date string
 * @param {string} dateString - Date string in any parseable format (e.g., 'YYYY-MM-DD')
 * @returns {number|null} Age in years, or null if no date provided
 */
export const calculateAge = (dateString) => {
  if (!dateString) return null;
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Format a Date object to a readable string
 * @param {Date} date 
 * @returns {string} Formatted date (e.g., 'Jan 1, 2024')
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

