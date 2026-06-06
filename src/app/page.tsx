'use client';
import { useEffect, useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import ContentRow from '@/components/ContentRow';
import { Play, UserCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

const MOCK_MOVIES = [
  { id: '1', title: 'Inception', type: 'movie' as const, duration: '2h 28m' },
  { id: '2', title: 'The Dark Knight', type: 'movie' as const, duration: '2h 32m' },
  { id: '3', title: 'Interstellar', type: 'movie' as const, duration: '2h 49m' },
  { id: '4', title: 'Pulp Fiction', type: 'movie' as const, duration: '2h 34m' },
  { id: '5', title: 'Fight Club', type: 'movie' as const, duration: '2h 19m' },
  { id: '6', title: 'The Matrix', type: 'movie' as const, duration: '2h 16m' },
  { id: '7', title: 'Goodfellas', type: 'movie' as const, duration: '2h 25m' },
];

const MOCK_MUSIC = [
  { id: 'm1', title: 'Midnight City', type: 'music' as const, duration: '4:03' },
  { id: 'm2', title: 'Blinding Lights', type: 'music' as const, duration: '3:20' },
  { id: 'm3', title: 'Starboy', type: 'music' as const, duration: '3:50' },
  { id: 'm4', title: 'Shape of You', type: 'music' as const, duration: '3:53' },
  { id: 'm5', title: 'Levitating', type: 'music' as const, duration: '3:23' },
];

export default function Home() {
  const [continueWatching, setContinueWatching] = useState<any[]>([]);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check for username
    const savedName = localStorage.getItem('busstream_username');
    if (!savedName) {
      setShowNamePrompt(true);
    } else {
      setUserName(savedName);
    }

    // Simulate loading from localStorage
    const saved = localStorage.getItem('busstream_continue');
    if (saved) {
      try {
        setContinueWatching(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Mock some continue watching for demo purposes if empty
      setContinueWatching([
        { id: 'c1', title: 'Kabaddi 4', type: 'movie' as const, progress: 45 },
        { id: 'c2', title: 'Chhakka Panja', type: 'movie' as const, progress: 12 },
      ]);
    }
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem('busstream_username', userName.trim());
      setShowNamePrompt(false);
    }
  };

  return (
    <div className={styles.main}>
      <HeroBanner />
      
      <div className={styles.contentSections}>
        {continueWatching.length > 0 && (
          <div className={styles.continueRow}>
            <h2 className={styles.sectionTitle}>Continue Watching</h2>
            <div className={styles.continueGrid}>
              {continueWatching.map(item => (
                <Link href={`/player/${item.id}`} key={item.id} className={styles.continueCard}>
                  <div className={styles.continueImg}>
                    <div className={styles.playOverlay}>
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className={styles.continueInfo}>
                    <h4>{item.title}</h4>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <ContentRow title="New Arrivals" items={MOCK_MOVIES.slice(0, 5)} />
        <ContentRow title="Trending Movies" items={MOCK_MOVIES.slice(2, 7)} />
        <ContentRow title="Nepali Hits" items={MOCK_MUSIC.slice(0, 4)} />
      </div>

      {showNamePrompt && (
        <div className={styles.namePromptOverlay}>
          <div className={`glass-card ${styles.namePromptCard}`}>
            <UserCircle size={48} className={styles.namePromptIcon} />
            <h2>Welcome aboard!</h2>
            <p>Pick a nickname for this journey to save your progress and preferences.</p>
            <form onSubmit={handleSaveName} className={styles.nameForm}>
              <input
                type="text"
                placeholder="Enter a nickname..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={styles.nameInput}
                autoFocus
              />
              <button type="submit" className={styles.nameBtn}>Start Watching</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
