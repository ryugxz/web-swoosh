import { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges, login as loginService, register as registerService, logout as logoutService, resetPassword as resetService } from '../services/authService';
import { userService } from '../services/userService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to Firebase Auth state changes
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Fetch the user's profile from Firestore
          const userProfile = await userService.getUserProfile(firebaseUser.uid);
          setProfile(userProfile);
        } catch (err) {
          console.error("Failed to fetch user profile", err);
          setError(err);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    return await loginService(email, password);
  };

  const register = async (email, password, userData) => {
    return await registerService(email, password, userData);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setProfile(null);
  };

  const resetPassword = async (email) => {
    return await resetService(email);
  };

  const value = {
    user,
    profile,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    loading,
    error,
    login,
    register,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

