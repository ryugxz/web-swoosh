import { createContext, useContext, useState } from 'react';

/**
 * AuthContext - Authentication state provider
 * Phase 1: Shell only — returns unauthenticated state
 * Phase 2: Will integrate Firebase Auth
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user] = useState(null);

  const value = {
    user,
    isAuthenticated: false,
    isAdmin: false,
    // Phase 2: login, logout, register functions
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
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
