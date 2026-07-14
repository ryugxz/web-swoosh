import { ROUTES } from '../constants';

export const routeConfig = {
  public: [
    { path: ROUTES.HOME, name: 'Home' },
    { path: ROUTES.PLAYER_PROFILE, name: 'PlayerProfile' },
    { path: ROUTES.LOGIN, name: 'Login' },
    { path: ROUTES.REGISTER, name: 'Register' },
    { path: ROUTES.FORGOT_PASSWORD, name: 'ForgotPassword' },
  ],
  protected: [
    { path: ROUTES.PROFILE, name: 'Profile' },
  ],
  admin: [
    { path: ROUTES.ADMIN, name: 'AdminDashboard' }
  ]
};

