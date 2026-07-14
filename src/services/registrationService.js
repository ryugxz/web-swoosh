import BaseRepository from './baseRepository';

/**
 * Registration Service
 * Manages Registration CRUD operations
 */
class RegistrationService extends BaseRepository {
  constructor() {
    super('registrations');
  }

  async getUserRegistrations(userId) {
    return await this.getByQuery('userId', '==', userId);
  }
}

export const registrationService = new RegistrationService();
