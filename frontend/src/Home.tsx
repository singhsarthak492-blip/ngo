import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  const roles = [
    {
      title: "NGO",
      icon: "🏢",
      desc: "Create social campaigns, manage volunteers, and track donations to maximize your impact.",
      delay: "0.1s"
    },
    {
      title: "Volunteer",
      icon: "🤝",
      desc: "Discover local NGO campaigns, apply for volunteering opportunities, and make a difference.",
      delay: "0.2s"
    },
    {
      title: "Donor",
      icon: "💰",
      desc: "Find verified NGOs, support their active campaigns, and track your donation history securely.",
      delay: "0.3s"
    },
    {
      title: "Admin",
      icon: "🛠️",
      desc: "Approve NGOs, manage all users, and ensure platform integrity and activity.",
      delay: "0.4s"
    }
  ];

  const upcomingCampaigns = [
    {
      title: "Beach Cleanup Drive",
      ngo: "Ocean Keepers",
      date: "Oct 15, 2026 • 08:00 AM",
      location: "Marine Drive, Mumbai",
      desc: "Join us in our massive weekend effort to clear plastics from the beachfront. Gloves and bags provided.",
      status: "Upcoming",
      icon: "🌊"
    },
    {
      title: "Food Distribution Camp",
      ngo: "Anna Seva Trust",
      date: "Oct 18, 2026 • 12:00 PM",
      location: "Dharavi Community Hall",
      desc: "Help us pack and distribute over 2000 meals to daily wage workers and homeless individuals.",
      status: "Upcoming",
      icon: "🍱"
    },
    {
      title: "Tree Plantation",
      ngo: "Green Earth India",
      date: "Oct 20, 2026 • 09:30 AM",
      location: "Sanjay Gandhi National Park",
      desc: "We are planting 500 indigenous tree saplings. Bring your energy and help restore the green belt.",
      status: "Upcoming",
      icon: "🌳"
    }
  ];

  return (
    <>
      <header className="nav-header">
        <div className="logo-container">
          <div className="logo-icon">🌿</div>
          <span className="text-gradient">Lokasamyoga</span>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#campaigns" className="nav-link">Campaigns</a>
          <a href="#ngos" className="nav-link">NGOs</a>
          <a href="#about" className="nav-link">About</a>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/login" className="btn-secondary">Log In</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">
            Connecting Hearts,<br />
            <span className="text-gradient">Changing Lives</span>
          </h1>
          <p className="hero-subtitle">
            A centralized digital platform uniting NGOs, volunteers, and donors. Together, we can simplify campaign management and maximize social impact.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>Explore Campaigns</Link>
            <Link to="/register" className="btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>Register NGO</Link>
          </div>
        </section>

        <section className="roles-section">
          <h2 className="section-title">Who are you?</h2>
          <div className="roles-grid">
            {roles.map((role, idx) => (
              <div 
                key={idx} 
                className="role-card glass-panel"
                style={{ animation: `slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${role.delay} forwards`, opacity: 0 }}
              >
                <div className="role-icon">{role.icon}</div>
                <h3 className="role-title">{role.title}</h3>
                <p className="role-desc">{role.desc}</p>
                <Link to="/login" className="btn-secondary" style={{ width: '100%', display: 'inline-block', boxSizing: 'border-box' }}>Portal</Link>
              </div>
            ))}
          </div>
        </section>

        <section id="campaigns" className="events-section" style={{ marginTop: '5rem' }}>
          <h2 className="section-title">Discover Campaigns</h2>
          <div className="events-carousel">
            {upcomingCampaigns.map((campaign, idx) => (
              <div key={idx} className="event-card glass-panel">
                <div className="event-image">
                  <span style={{ fontSize: '4rem' }}>{campaign.icon}</span>
                  <div className="event-badge">{campaign.status}</div>
                </div>
                <div className="event-content">
                  <h3 className="event-title">{campaign.title}</h3>
                  <div className="event-meta">
                    <span className="meta-item">🕒 {campaign.date}</span>
                    <span className="meta-item">📍 {campaign.location}</span>
                  </div>
                  <p className="event-desc">{campaign.desc}</p>
                  <div className="event-footer">
                    <span className="ngo-name">By {campaign.ngo}</span>
                    <Link to="/register" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Apply</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
