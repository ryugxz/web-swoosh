import BaseRepository from './baseRepository';

/**
 * User Service
 * Manages User profile CRUD operations
 */
class UserService extends BaseRepository {
  constructor() {
    super('users');
  }

  async createUserProfile(uid, data) {
    const profile = {
      uid,
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL || '',
      role: 'member',
      status: 'active',
      emailVerified: false,
      provider: data.provider || 'password',
      lastLogin: new Date(),
    };
    
    // We use set() instead of create() because we want to use the uid as the document ID
    return await this.set(uid, profile);
  }

  async getUserProfile(uid) {
    return await this.getById(uid);
  }

  async updateLastLogin(uid) {
    return await this.update(uid, { lastLogin: new Date() });
  }
}

export const userService = new UserService();

