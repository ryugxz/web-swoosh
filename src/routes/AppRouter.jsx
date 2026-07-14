import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

// Lazy loaded pages for performance
const HomePage = lazy(() => import('../pages/public/HomePage'));
const PlayerProfilePage = lazy(() => import('../pages/public/PlayerProfilePage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));

function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading Page..." />}>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PLAYER_PROFILE} element={<PlayerProfilePage />} />
          </Route>
          {/* 404 Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes with AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
