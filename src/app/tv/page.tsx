'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Play, Info, Filter, ChevronDown } from 'lucide-react';
import styles from '../movies/page.module.css';

import { MOCK_TV_SHOWS } from '@/data/mockData';

export default function TvShowsPage() {
  const [filterGenre, setFilterGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Most Popular');

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Crime'];
  const sorts = ['Most Popular', 'Newest', 'A-Z'];

  const filteredShows = MOCK_TV_SHOWS
    .filter(show => filterGenre === 'All' || show.genre === filterGenre)
    .sort((a, b) => {
      if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
      if (sortBy === 'Newest') return parseInt(b.year) - parseInt(a.year);
      return 0;
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>TV Shows</h1>
        
        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            <Filter size={18} className={styles.icon} />
            <div className={styles.selectWrapper}>
              <select 
                value={filterGenre} 
                onChange={(e) => setFilterGenre(e.target.value)}
                className={styles.select}
              >
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown size={16} className={styles.chevron} />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.label}>Sort by:</span>
            <div className={styles.selectWrapper}>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.select}
              >
                {sorts.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} className={styles.chevron} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredShows.map(show => (
          <div key={show.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img 
                src={`https://picsum.photos/seed/${show.id}/400/600`} 
                alt={show.title} 
                className={styles.placeholderImage} 
                style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
              />
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <p className={styles.synopsis}>{show.description.substring(0, 80)}...</p>
                  <div className={styles.actions}>
                    <Link href={`/player/${show.id}`} className={styles.playBtn}>
                      <Play size={20} fill="currentColor" />
                      Play
                    </Link>
                    <button className={styles.infoBtn}>
                      <Info size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.info}>
              <h3 className={styles.movieTitle}>{show.title}</h3>
              <div className={styles.meta}>
                <span>{show.year}</span>
                <span className={styles.dot}>•</span>
                <span>{show.seasons}</span>
                <span className={styles.dot}>•</span>
                <span className={styles.rating}>{show.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
