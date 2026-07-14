import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Re-export useAuth from context for cleaner imports
 * Provides { user, profile, isAuthenticated, isAdmin, loading, error, login, logout, register, resetPassword }
 */
export const useAuth = () => {
  return useAuthContext();
};

/**
 * Hook specifically to get just the current Firebase user object
 */
export const useCurrentUser = () => {
  const { user } = useAuthContext();
  return user;
};

/**
 * Hook specifically to get just the Firestore user profile
 */
export const useProfile = () => {
  const { profile } = useAuthContext();
  return profile;
};

/**
 * Hook specifically to get the user's role
 */
export const useRole = () => {
  const { profile } = useAuthContext();
  return profile?.role || 'guest';
};

/**
 * Hook to check if current user is an admin
 */
export const useIsAdmin = () => {
  const { isAdmin } = useAuthContext();
  return isAdmin;
};

/**
 * Higher level hook to ensure a component is only rendered if authenticated.
 * It's usually better to use ProtectedRoute, but this is useful for inline checks.
 */
export const useRequireAuth = () => {
  const { isAuthenticated, loading } = useAuthContext();
  return { isAuthenticated, loading };
};
