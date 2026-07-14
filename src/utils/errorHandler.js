/**
 * Error Handling Utility
 * Centralizes error mapping and messaging for Firebase and the application.
 */

const FIREBASE_ERROR_MAP = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'Account not found.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'permission-denied': 'You do not have permission to perform this action.',
  'unauthenticated': 'Please log in to perform this action.',
  'not-found': 'The requested resource was not found.',
};

/**
 * Handle Firebase Error
 * @param {Error} error - The error object caught
 * @returns {Object} Structured error response
 */
export const handleFirebaseError = (error) => {
  console.error('[Firebase Error]:', error);
  
  const code = error.code || 'unknown';
  const message = FIREBASE_ERROR_MAP[code] || error.message || 'An unexpected error occurred.';
  
  return {
    success: false,
    code,
    message,
    originalError: error
  };
};

/**
 * Log error for monitoring
 * @param {string} context - Where the error occurred
 * @param {Error} error - The error object
 */
export const logError = (context, error) => {
  console.error(`[Error in ${context}]:`, error);
  // Future: send to Sentry or monitoring tool
};
