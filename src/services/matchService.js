import BaseRepository from './baseRepository';

/**
 * Match Service
 * Manages Match CRUD operations
 */
class MatchService extends BaseRepository {
  constructor() {
    super('matches');
  }

  // Add specific match methods here if needed
}

export const matchService = new MatchService();
