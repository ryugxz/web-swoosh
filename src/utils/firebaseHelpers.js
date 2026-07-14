import { doc, serverTimestamp as firestoreServerTimestamp, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import DOMPurify from 'dompurify';

/**
 * Generate a unique document ID for a given collection
 * @param {string} collectionName - Name of the collection
 * @returns {string} Unique ID
 */
export const generateDocumentId = (collectionName) => {
  const newDocRef = doc(collection(db, collectionName));
  return newDocRef.id;
};

/**
 * Get the Firestore server timestamp
 * @returns {FieldValue} Firestore timestamp
 */
export const serverTimestamp = () => {
  return firestoreServerTimestamp();
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input);
};

/**
 * Sanitize an entire object of inputs
 * @param {Object} data - User input object
 * @returns {Object} Sanitized object
 */
export const sanitizeObject = (data) => {
  const sanitized = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      sanitized[key] = typeof data[key] === 'string' ? sanitizeInput(data[key]) : data[key];
    }
  }
  return sanitized;
};
