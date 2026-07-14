import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setMessage('');

    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setErrorMsg(error.message || 'Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-swoosh-black pt-24 pb-12">
      <PageHeader title="Reset Password" subtitle="Enter your email to recover your account" />
      
      <div className="max-w-md mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="bg-white/5 p-8 border border-white/10 flex flex-col gap-6">
          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}
          
          {message && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 text-sm">
              {message}
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

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-swoosh-gold text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <LoadingSpinner size="small" color="border-black" /> : 'Send Reset Link'}
          </button>

          <div className="text-center text-xs text-white/50 mt-4">
            Remembered your password? <Link to={ROUTES.LOGIN} className="text-swoosh-gold hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
