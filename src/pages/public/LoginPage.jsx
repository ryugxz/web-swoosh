import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await login(email, password);
      navigate(ROUTES.HOME);
    } catch (error) {
      setErrorMsg(error.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-swoosh-black pt-24 pb-12">
      <PageHeader title="Welcome Back" subtitle="Login to your Swoosh account" />
      
      <div className="max-w-md mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="bg-white/5 p-8 border border-white/10 flex flex-col gap-6">
          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xs tracking-widest uppercase">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-white/20 p-3 text-white focus:border-swoosh-gold outline-none transition-colors"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xs tracking-widest uppercase">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-white/20 p-3 text-white focus:border-swoosh-gold outline-none transition-colors"
              required 
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 text-white/50 cursor-pointer">
              <input type="checkbox" className="accent-swoosh-gold" />
              Remember Me
            </label>
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-swoosh-gold hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-swoosh-gold text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <LoadingSpinner size="small" color="border-black" /> : 'Login'}
          </button>

          <div className="text-center text-xs text-white/50 mt-4">
            Don't have an account? <Link to={ROUTES.REGISTER} className="text-swoosh-gold hover:underline">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
