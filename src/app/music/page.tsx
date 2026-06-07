'use client';
import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, ListMusic, Plus } from 'lucide-react';
import styles from './page.module.css';

import { MOCK_MUSIC as MOCK_ALBUMS } from '@/data/mockData';

const PLAYLISTS = [
  { id: 'p1', title: 'Road Trip Vibes', count: 45, color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)' },
  { id: 'p2', title: 'Night Bus Chill', count: 32, color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 'p3', title: 'Top 50 Nepal', count: 50, color: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
];

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ title: 'Blinding Lights', artist: 'The Weeknd', progress: 45 });

  return (
    <div className={styles.container}>
      {/* Playlists Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Curated Playlists</h2>
        <div className={styles.playlistGrid}>
          {PLAYLISTS.map(playlist => (
            <div key={playlist.id} className={styles.playlistCard} style={{ background: playlist.color }}>
              <div className={styles.playlistContent}>
                <h3>{playlist.title}</h3>
                <p>{playlist.count} tracks</p>
                <button className={styles.playFab}>
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Albums Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Albums</h2>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.activeTab}`}>Albums</button>
            <button className={styles.tab}>Artists</button>
            <button className={styles.tab}>Songs</button>
          </div>
        </div>
        
        <div className={styles.albumGrid}>
          {MOCK_ALBUMS.map(album => (
            <div key={album.id} className={styles.albumCard}>
              <div className={styles.albumCover}>
                <img 
                  src={`https://picsum.photos/seed/${album.id}/400/400`} 
                  alt={album.title} 
                  className={styles.placeholderCover} 
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
                />
                <div className={styles.albumOverlay}>
                  <button className={styles.roundPlayBtn}>
                    <Play size={20} fill="currentColor" />
                  </button>
                  <button className={styles.iconBtn}>
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div className={styles.albumInfo}>
                <h4 className={styles.albumTitle}>{album.title}</h4>
                <p className={styles.albumArtist}>{album.artist}</p>
                <p className={styles.albumMeta}>{album.year} • {album.tracks} tracks</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Now Playing Bar */}
      <div className={styles.nowPlayingBar}>
        <div className={styles.npInfo}>
          <div className={styles.npCover}>B</div>
          <div className={styles.npText}>
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.artist}</p>
          </div>
        </div>

        <div className={styles.npControlsWrapper}>
          <div className={styles.npControls}>
            <button className={styles.controlIcon}><Shuffle size={18} /></button>
            <button className={styles.controlIcon}><SkipBack size={20} fill="currentColor" /></button>
            <button 
              className={styles.npPlayBtn}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
            <button className={styles.controlIcon}><SkipForward size={20} fill="currentColor" /></button>
            <button className={styles.controlIcon}><Repeat size={18} /></button>
          </div>
          <div className={styles.npProgress}>
            <span>1:23</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${currentTrack.progress}%` }}></div>
            </div>
            <span>3:20</span>
          </div>
        </div>

        <div className={styles.npActions}>
          <button className={styles.controlIcon}><ListMusic size={20} /></button>
        </div>
      </div>
    </div>
  );
}
