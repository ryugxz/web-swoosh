/**
 * Application constants
 * Static values used throughout the application
 */

export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const REGISTRATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const LEAGUE_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
};

export const PRODUCT_CATEGORIES = {
  JERSEY: 'jersey',
  EQUIPMENT: 'equipment',
  ACCESSORY: 'accessory',
  TICKET: 'ticket',
};

export const JERSEY_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  PICKUP: 'pickup',
};

export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'bank_transfer',
  CASH: 'cash',
};

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
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  PROFILE: '/profile',
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
