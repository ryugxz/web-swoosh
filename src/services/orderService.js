import BaseRepository from './baseRepository';

/**
 * Order Service
 * Manages Order CRUD operations
 */
class OrderService extends BaseRepository {
  constructor() {
    super('orders');
  }

  async getUserOrders(userId) {
    return await this.getByQuery('userId', '==', userId);
  }
}

export const orderService = new OrderService();
