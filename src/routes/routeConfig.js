import { ROUTES } from '../constants';

export const routeConfig = {
  public: [
    { path: ROUTES.HOME, name: 'Home' },
    { path: ROUTES.PLAYER_PROFILE, name: 'PlayerProfile' }
  ],
  admin: [
    { path: ROUTES.ADMIN, name: 'AdminDashboard' }
  ]
};
