import { Outlet } from 'react-router-dom';
// import { useAuth } from '../hooks';
// import { Navigate } from 'react-router-dom';

function ProtectedRoute() {
  // Phase 1: Passthrough
  // Phase 2: Implement authentication check
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  
  return <Outlet />;
}

export default ProtectedRoute;
