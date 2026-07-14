import { createContext, useContext, useCallback, useState } from 'react';

/**
 * NotificationContext - Toast/notification provider
 * Phase 1: Shell only — console.log notifications
 * Phase 2: Will display UI toast notifications
 */
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications] = useState([]);

  const notify = useCallback((message, type = 'info') => {
    // Phase 2: Display actual toast notifications
    console.log(`[${type.toUpperCase()}] ${message}`);
  }, []);

  const value = {
    notifications,
    notify,
    success: (msg) => notify(msg, 'success'),
    error: (msg) => notify(msg, 'error'),
    warning: (msg) => notify(msg, 'warning'),
    info: (msg) => notify(msg, 'info'),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
