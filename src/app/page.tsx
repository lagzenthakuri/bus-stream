'use client';
import { useEffect, useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import ContentRow from '@/components/ContentRow';
import { Play, UserCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

import { MOCK_MOVIES, MOCK_MUSIC } from '@/data/mockData';

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
                  <div className={styles.continueImg} style={{ position: 'relative' }}>
                    <img 
                      src={`https://picsum.photos/seed/${item.id}/400/225`} 
                      alt={item.title} 
                      style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '8px' }} 
                    />
                    <div className={styles.playOverlay} style={{ zIndex: 1 }}>
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

        <ContentRow title="New Arrivals" items={MOCK_MOVIES.slice(0, 20)} link="/movies" linkText="See All Movies" />
        <ContentRow title="Trending Movies" items={MOCK_MOVIES.slice(20, 40)} link="/movies" linkText="See Trending" />
        <ContentRow title="Nepali Hits" items={MOCK_MUSIC.slice(0, 20)} link="/music" linkText="See All Music" />
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
