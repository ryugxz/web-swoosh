import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';
import { handleFirebaseError } from './errorHandler';

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The destination path in storage (e.g., 'avatars/userId/filename')
 * @returns {Promise<string>} The download URL of the uploaded file
 */
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    throw handleFirebaseError(error);
  }
};

/**
 * Delete a file from Firebase Storage
 * @param {string} path - The path of the file to delete or full URL
 */
export const deleteFile = async (path) => {
  try {
    // If it's a full URL, we might need to extract the path or let Firebase handle it if possible.
    // For simplicity, we assume 'path' is the relative path in the bucket.
    // E.g., 'avatars/123/profile.jpg'
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    // Ignore error if file doesn't exist
    if (error.code !== 'storage/object-not-found') {
      throw handleFirebaseError(error);
    }
  }
};

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {boolean} Is valid
 */
export const validateImage = (file, maxSizeMB = 5) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPG, PNG, and WebP are allowed.');
  }
  
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > maxSizeMB) {
    throw new Error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
  }
  
  return true;
};
