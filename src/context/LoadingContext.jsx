import { createContext, useContext, useState } from 'react';

/**
 * LoadingContext - Global loading state provider
 */
const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    isLoading,
    setIsLoading,
    showLoading: () => setIsLoading(true),
    hideLoading: () => setIsLoading(false),
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
