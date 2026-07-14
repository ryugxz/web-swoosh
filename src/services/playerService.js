import BaseRepository from './baseRepository';

/**
 * Player Service
 * Manages Player CRUD operations
 */
class PlayerService extends BaseRepository {
  constructor() {
    super('players');
  }

  // Example of extending base repository
  async getOfficialRoster() {
    return await this.getByQuery('status', '==', 'official');
  }
}

export const playerService = new PlayerService();
