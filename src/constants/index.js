/**
 * Application constants
 * Static values used throughout the application
 */

/** Player position options */
export const POSITIONS = ['GK', 'DEF', 'MID', 'FWD'];

/** Player status options */
export const PLAYER_STATUSES = [
  { value: 'official', label: 'Official Roster' },
  { value: 'spare', label: 'Spare Player' },
];

/** Route path constants */
export const ROUTES = {
  HOME: '/',
  PLAYER_PROFILE: '/player/:id',
  ADMIN: '/admin',
};

/** Default form values for player */
export const DEFAULT_PLAYER_FORM = {
  name: '',
  number: '',
  position: 'GK',
  status: 'official',
  photoURL: '',
  instagram: '',
  birthProvince: '',
  birthCountry: '',
  birthDate: '',
};
