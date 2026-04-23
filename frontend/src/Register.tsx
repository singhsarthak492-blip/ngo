import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Heart, HeartHandshake } from 'lucide-react';
import './Auth.css';

type Role = 'NGO' | 'Volunteer' | 'Donor'; // Removed Admin from registration

const ROLES: { id: Role; label: string; icon: React.ReactNode }[] = [
  { id: 'NGO', label: 'NGO', icon: <Building2 size={16} /> },
  { id: 'Volunteer', label: 'Volunteer', icon: <Heart size={16} /> },
  { id: 'Donor', label: 'Donor', icon: <HeartHandshake size={16} /> },
];

export default function Register() {
  const [activeRole, setActiveRole] = useState<Role>('Volunteer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regId, setRegId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      alert("User with this email already exists!");
      return;
    }

    users.push({ 
      email, 
      password, 
      role: activeRole,
      name,
      ...(activeRole === 'NGO' && { regId })
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful! Please log in.");
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us to make a difference</p>
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

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">
              {activeRole === 'NGO' ? 'Organization Name' : 'Full Name'}
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder={activeRole === 'NGO' ? 'Ocean Keepers Foundation' : 'John Doe'} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="hello@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {activeRole === 'NGO' && (
            <div className="form-group">
              <label className="form-label">Registration Number / ID</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="NGO-REG-12345" 
                value={regId}
                onChange={(e) => setRegId(e.target.value)}
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">
            Register as {activeRole}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? 
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
