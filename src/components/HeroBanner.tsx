'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';
import styles from './HeroBanner.module.css';
import { MOCK_MOVIES } from '@/data/mockData';

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerMovies = MOCK_MOVIES.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [bannerMovies.length]);

  const movie = bannerMovies[currentIndex];

  if (!movie) return null;

  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        <img 
          key={movie.id}
          src={`https://picsum.photos/seed/${movie.id}/1920/1080`} 
          alt={movie.title} 
          className={styles.bannerImg}
        />
      </div>
      
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.meta}>
            <span className={styles.match}>98% Match</span>
            <span>{movie.year}</span>
            <span className={styles.rating}>{movie.rating}</span>
            <span>{movie.duration}</span>
          </div>
          <p className={styles.description}>
            {movie.description}
          </p>
          <div className={styles.actions}>
            <Link href={`/player/${movie.id}`} className={styles.playBtn}>
              <Play size={24} fill="currentColor" />
              <span>Play Now</span>
            </Link>
            <button className={styles.infoBtn}>
              <Info size={24} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.indicators}>
        {bannerMovies.map((_, idx) => (
          <div 
            key={idx} 
            className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
