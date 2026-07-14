import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider } from './context/LoadingContext';
import { NotificationProvider } from './context/NotificationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
