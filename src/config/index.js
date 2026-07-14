/**
 * Application configuration
 * Centralizes all environment-dependent configuration values
 */

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  get uploadUrl() {
    return `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  },
};

export const APP_CONFIG = {
  appName: 'Swoosh',
  tagline: 'Elegance • Power • Glory',
  established: 2024,
};
