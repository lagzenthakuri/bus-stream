'use client';
import { useState } from 'react';
import { UploadCloud, Users, Activity, Settings, Edit3, Trash2, Shield, AlertTriangle } from 'lucide-react';
import styles from './page.module.css';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock auth
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginIcon}>
            <Shield size={32} />
          </div>
          <h2>Admin Access</h2>
          <p>Please enter the operator password to continue.</p>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              className={styles.input}
              autoFocus
            />
            <button type="submit" className={styles.btnPrimary}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Operator Dashboard</h1>
          <p className={styles.subtitle}>System Status & Content Management</p>
        </div>
        <button className={styles.btnLogout} onClick={() => setIsAuthenticated(false)}>
          Logout
        </button>
      </header>

      <div className={styles.dashboardGrid}>
        
        {/* Stats Row */}
        <div className={styles.statsCard}>
          <div className={styles.statIcon}><Activity size={24} /></div>
          <div className={styles.statInfo}>
            <h3>Bandwidth Usage</h3>
            <p className={styles.statValue}>45 Mbps</p>
            <span className={styles.statTrend}>Optimal</span>
          </div>
        </div>

        <div className={styles.statsCard}>
          <div className={styles.statIcon}><Users size={24} /></div>
          <div className={styles.statInfo}>
            <h3>Active Streams</h3>
            <p className={styles.statValue}>42</p>
            <span className={styles.statTrend}>18 Movies, 24 Music</span>
          </div>
        </div>

        <div className={styles.statsCard}>
          <div className={styles.statIcon}><HardDriveIcon /></div>
          <div className={styles.statInfo}>
            <h3>Storage Space</h3>
            <p className={styles.statValue}>850 GB</p>
            <span className={styles.statTrendWarning}>42% Used</span>
          </div>
        </div>

      </div>

      <div className={styles.mainGrid}>
        {/* Upload Section */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2><UploadCloud size={20} /> Upload New Media</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.uploadArea}>
              <UploadCloud size={48} className={styles.uploadIcon} />
              <h3>Drag & Drop files here</h3>
              <p>Supports .mp4, .mkv, .mp3, .srt</p>
              <button className={styles.btnSecondary}>Select Files</button>
            </div>
          </div>
        </section>

        {/* Content Management */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2><Settings size={20} /> Manage Content</h2>
            <div className={styles.tabs}>
              <button className={styles.activeTab}>Movies</button>
              <button className={styles.tab}>Music</button>
            </div>
          </div>
          <div className={styles.cardBody}>
            <ul className={styles.contentList}>
              {['Kabaddi 4', 'Chhakka Panja', 'Inception', 'The Dark Knight'].map((item, i) => (
                <li key={i} className={styles.contentItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.statusIndicator}></span>
                    <span>{item}</span>
                  </div>
                  <div className={styles.itemActions}>
                    <button className={styles.iconBtn} title="Edit Metadata"><Edit3 size={16} /></button>
                    <button className={styles.iconBtn} title="Delete"><Trash2 size={16} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        {/* Active Users/Streams */}
        <section className={`${styles.card} ${styles.fullWidth}`}>
          <div className={styles.cardHeader}>
            <h2><Users size={20} /> Currently Streaming</h2>
          </div>
          <div className={styles.cardBody}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User IP / ID</th>
                  <th>Content</th>
                  <th>Progress</th>
                  <th>Bandwidth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User-A1B2</td>
                  <td>Kabaddi 4 (Movie)</td>
                  <td>45:12 / 2:10:00</td>
                  <td>2.4 Mbps</td>
                </tr>
                <tr>
                  <td>User-C3D4</td>
                  <td>Starboy (Album)</td>
                  <td>Track 3</td>
                  <td>320 kbps</td>
                </tr>
                <tr>
                  <td>User-E5F6</td>
                  <td>Inception (Movie)</td>
                  <td>1:10:00 / 2:28:00</td>
                  <td>1.8 Mbps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function HardDriveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="12" x2="2" y2="12"></line>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
      <line x1="6" y1="16" x2="6.01" y2="16"></line>
      <line x1="10" y1="16" x2="10.01" y2="16"></line>
    </svg>
  );
}
