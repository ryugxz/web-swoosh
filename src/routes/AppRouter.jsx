import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Lazy loaded pages for performance
const HomePage = lazy(() => import('../pages/public/HomePage'));
const PlayerProfilePage = lazy(() => import('../pages/public/PlayerProfilePage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));
const LoginPage = lazy(() => import('../pages/public/LoginPage'));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/public/ForgotPasswordPage'));
const ProfilePage = lazy(() => import('../pages/public/ProfilePage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));

function AppRouter() {
  return (
    <Suspense fallback={<div className="h-screen flex justify-center items-center bg-swoosh-black"><LoadingSpinner message="Loading Page..." /></div>}>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PLAYER_PROFILE} element={<PlayerProfilePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          </Route>

          {/* Protected Routes with MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
          
          {/* 404 Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes with AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route element={<AdminRoute />}>
            <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
