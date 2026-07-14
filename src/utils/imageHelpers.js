/**
 * Image helper utilities
 */

/**
 * Crop an image to the specified pixel area
 * @param {string} imageSrc - Source URL of the image
 * @param {Object} pixelCrop - Crop area { x, y, width, height }
 * @returns {Promise<Blob>} Cropped image as a JPEG blob
 */
export const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (error) => reject(error));
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
};

/**
 * Generate a Cloudinary thumbnail URL from a full-size URL
 * @param {string} url - Original Cloudinary image URL
 * @param {Object} options - Transformation options
 * @param {number} options.width - Thumbnail width (default: 300)
 * @param {number} options.height - Thumbnail height (default: 300)
 * @returns {string} Transformed thumbnail URL
 */
export const getCloudinaryThumbnail = (url, { width = 300, height = 300 } = {}) => {
  if (!url) return '';
  return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,g_face,f_auto,q_auto/`);
};
