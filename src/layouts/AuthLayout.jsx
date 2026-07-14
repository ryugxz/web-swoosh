import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="bg-swoosh-black min-h-screen flex flex-col items-center justify-center">
      <main className="w-full max-w-md p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
