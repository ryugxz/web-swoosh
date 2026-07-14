import BaseRepository from './baseRepository';

/**
 * Notification Service
 * Manages Notification CRUD operations
 */
class NotificationService extends BaseRepository {
  constructor() {
    super('notifications');
  }

  async getUserNotifications(userId) {
    return await this.getByQuery('userId', '==', userId);
  }

  async markAsRead(notificationId) {
    return await this.update(notificationId, { read: true });
  }
}

export const notificationService = new NotificationService();
