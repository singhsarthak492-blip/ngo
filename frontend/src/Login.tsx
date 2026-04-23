import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Heart, HeartHandshake, ShieldCheck } from 'lucide-react';
import './Auth.css';

type Role = 'NGO' | 'Volunteer' | 'Donor' | 'Admin';

const ROLES: { id: Role; label: string; icon: React.ReactNode }[] = [
  { id: 'NGO', label: 'NGO', icon: <Building2 size={16} /> },
  { id: 'Volunteer', label: 'Volunteer', icon: <Heart size={16} /> },
  { id: 'Donor', label: 'Donor', icon: <HeartHandshake size={16} /> },
  { id: 'Admin', label: 'Admin', icon: <ShieldCheck size={16} /> },
];

export default function Login() {
  const [activeRole, setActiveRole] = useState<Role>('Volunteer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Allow a hardcoded admin login
    if (activeRole === 'Admin' && email === 'admin@example.com' && password === 'admin') {
      navigate('/dashboard', { state: { role: activeRole } });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password && u.role === activeRole);

    if (user) {
      navigate('/dashboard', { state: { role: activeRole } });
    } else {
      setError('Invalid email, password, or role.');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === email && u.role === activeRole);

    if (userIndex !== -1) {
      users[userIndex].password = password;
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess('Password reset successfully! You can now log in.');
      setIsForgotPassword(false);
      setPassword('');
    } else {
      setError('Account not found for this email and role.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{isForgotPassword ? 'Reset Password' : 'Welcome Back'}</h1>
          <p className="auth-subtitle">
            {isForgotPassword
              ? 'Enter your email and new password'
              : 'Log in to your Lokasamyoga account'}
          </p>
        </div>

        <div className="role-selector">
          {ROLES.map((role) => (
            <button
              key={role.id}
              className={`role-btn ${activeRole === role.id ? 'active' : ''}`}
              onClick={() => setActiveRole(role.id)}
              type="button"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                {role.icon}
                <span>{role.label}</span>
              </div>
            </button>
          ))}
        </div>

        <form onSubmit={isForgotPassword ? handleResetPassword : handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder={`your_${activeRole.toLowerCase()}@example.com`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{isForgotPassword ? 'New Password' : 'Password'}</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isForgotPassword && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => { setIsForgotPassword(true); setError(''); setSuccess(''); }}
                style={{ fontSize: '0.9rem', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', padding: 0 }}
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && <div style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
          {success && <div style={{ color: '#16a34a', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{success}</div>}

          <button type="submit" className="btn-primary auth-submit-btn" style={{ marginBottom: isForgotPassword ? '1rem' : '0' }}>
            {isForgotPassword ? 'Reset Password' : `Log In as ${activeRole}`}
          </button>

          {isForgotPassword && (
            <button
              type="button"
              className="btn-primary auth-submit-btn"
              style={{ backgroundColor: 'transparent', color: '#4b5563', border: '1px solid #d1d5db' }}
              onClick={() => { setIsForgotPassword(false); setError(''); setSuccess(''); }}
            >
              Back to Login
            </button>
          )}
        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
