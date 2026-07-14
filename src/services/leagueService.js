import BaseRepository from './baseRepository';

/**
 * League Service
 * Manages League CRUD operations
 */
class LeagueService extends BaseRepository {
  constructor() {
    super('league');
  }

  // Add specific league methods here if needed
}

export const leagueService = new LeagueService();
