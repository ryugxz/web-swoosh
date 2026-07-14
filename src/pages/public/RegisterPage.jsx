import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Invalid email format.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      await register(formData.email, formData.password, {
        username: formData.username,
        displayName: formData.displayName
      });
      navigate(ROUTES.HOME);
    } catch (error) {
      setErrorMsg(error.message || 'Failed to register');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-swoosh-black pt-24 pb-12">
      <PageHeader title="Join Us" subtitle="Create your Swoosh account" />
      
      <div className="max-w-md mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="bg-white/5 p-8 border border-white/10 flex flex-col gap-6">
          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xs tracking-widest uppercase">Username</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white focus:border-swoosh-gold outline-none transition-colors"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xs tracking-widest uppercase">Display Name</label>
            <input 
              type="text" 
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white focus:border-swoosh-gold outline-none transition-colors"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xs tracking-widest uppercase">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white focus:border-swoosh-gold outline-none transition-colors"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xs tracking-widest uppercase">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white focus:border-swoosh-gold outline-none transition-colors"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-xs tracking-widest uppercase">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white focus:border-swoosh-gold outline-none transition-colors"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-swoosh-gold text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <LoadingSpinner size="small" color="border-black" /> : 'Register'}
          </button>

          <div className="text-center text-xs text-white/50 mt-4">
            Already have an account? <Link to={ROUTES.LOGIN} className="text-swoosh-gold hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
