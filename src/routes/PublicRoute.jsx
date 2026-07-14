import { Outlet } from 'react-router-dom';

function PublicRoute() {
  // Phase 2: Add any public route restrictions here (e.g. redirecting away from login if already authenticated)
  return <Outlet />;
}

export default PublicRoute;
