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
