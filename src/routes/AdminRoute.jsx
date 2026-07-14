import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * AdminRoute - Protects routes that require admin privileges
 */
const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-swoosh-black text-swoosh-gold">
        <LoadingSpinner message="Verifying access..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
