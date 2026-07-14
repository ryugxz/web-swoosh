import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/ui/PageHeader';
import { formatDate } from '../../utils/dateHelpers';

function ProfilePage() {
  const { user, profile } = useAuth();

  if (!profile) {
    return (
      <div className="min-h-screen bg-swoosh-black pt-24 pb-12 flex justify-center items-center">
        <div className="text-swoosh-gold">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-swoosh-black pt-24 pb-12">
      <PageHeader title="Your Profile" subtitle="Manage your account" />
      
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <div className="bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row gap-8 items-start">
          
          <div className="flex flex-col items-center gap-4 w-full md:w-1/3 border-r border-white/10 pr-0 md:pr-8">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center text-4xl text-swoosh-gold overflow-hidden">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                profile.displayName?.charAt(0).toUpperCase() || '?'
              )}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">{profile.displayName}</h2>
              <p className="text-white/50 text-sm">@{profile.username}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-swoosh-gold/20 text-swoosh-gold text-xs tracking-widest uppercase border border-swoosh-gold/30">
                {profile.role}
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div>
              <h3 className="text-swoosh-gold text-sm uppercase tracking-widest mb-4">Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-white/50 text-xs uppercase">Email Address</p>
                  <p className="text-white">{profile.email}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase">Email Status</p>
                  <p className={user.emailVerified ? 'text-green-400' : 'text-red-400'}>
                    {user.emailVerified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase">Member Since</p>
                  <p className="text-white">{profile.createdAt ? formatDate(profile.createdAt.toDate()) : 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase">Last Login</p>
                  <p className="text-white">{profile.lastLogin ? formatDate(profile.lastLogin.toDate()) : 'Unknown'}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm italic">
                Editing profile will be supported in Phase 4.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
