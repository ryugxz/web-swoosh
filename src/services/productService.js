import BaseRepository from './baseRepository';

/**
 * Product Service
 * Manages Product CRUD operations
 */
class ProductService extends BaseRepository {
  constructor() {
    super('products');
  }

  // Add specific product methods here if needed
}

export const productService = new ProductService();
