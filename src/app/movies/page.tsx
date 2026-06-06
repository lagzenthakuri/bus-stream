'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Play, Info, Filter, ChevronDown } from 'lucide-react';
import styles from './page.module.css';

const MOCK_MOVIES = [
  { id: '1', title: 'Inception', type: 'movie', duration: '2h 28m', genre: 'Sci-Fi', year: '2010', rating: 'PG-13', image: '/api/placeholder/400/600', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
  { id: '2', title: 'The Dark Knight', type: 'movie', duration: '2h 32m', genre: 'Action', year: '2008', rating: 'PG-13', image: '/api/placeholder/400/600', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.' },
  { id: '3', title: 'Interstellar', type: 'movie', duration: '2h 49m', genre: 'Sci-Fi', year: '2014', rating: 'PG-13', image: '/api/placeholder/400/600', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
  { id: '4', title: 'Pulp Fiction', type: 'movie', duration: '2h 34m', genre: 'Crime', year: '1994', rating: 'R', image: '/api/placeholder/400/600', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.' },
  { id: '5', title: 'Fight Club', type: 'movie', duration: '2h 19m', genre: 'Drama', year: '1999', rating: 'R', image: '/api/placeholder/400/600', description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.' },
  { id: '6', title: 'The Matrix', type: 'movie', duration: '2h 16m', genre: 'Sci-Fi', year: '1999', rating: 'R', image: '/api/placeholder/400/600', description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.' },
  { id: '7', title: 'Goodfellas', type: 'movie', duration: '2h 25m', genre: 'Crime', year: '1990', rating: 'R', image: '/api/placeholder/400/600', description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.' },
  { id: '8', title: 'Kabaddi 4', type: 'movie', duration: '2h 10m', genre: 'Comedy', year: '2022', rating: 'PG', image: '/api/placeholder/400/600', description: 'Kaji is determined to not marry, but his friends and family have other plans.' },
  { id: '9', title: 'Chhakka Panja', type: 'movie', duration: '2h 15m', genre: 'Comedy', year: '2016', rating: 'PG', image: '/api/placeholder/400/600', description: 'The story revolves around a rich man named Raja, who is a fan of the Nepali actor Rajesh Hamal.' },
];

export default function MoviesPage() {
  const [filterGenre, setFilterGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Most Popular');

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Crime'];
  const sorts = ['Most Popular', 'Newest', 'A-Z'];

  const filteredMovies = MOCK_MOVIES
    .filter(movie => filterGenre === 'All' || movie.genre === filterGenre)
    .sort((a, b) => {
      if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
      if (sortBy === 'Newest') return parseInt(b.year) - parseInt(a.year);
      return 0; // Most Popular logic would go here
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Movies</h1>
        
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
        {filteredMovies.map(movie => (
          <div key={movie.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {/* Using a solid color placeholder since we don't have images */}
              <div className={styles.placeholderImage}>
                <span className={styles.placeholderText}>{movie.title.charAt(0)}</span>
              </div>
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <p className={styles.synopsis}>{movie.description.substring(0, 80)}...</p>
                  <div className={styles.actions}>
                    <Link href={`/player/${movie.id}`} className={styles.playBtn}>
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
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <div className={styles.meta}>
                <span>{movie.year}</span>
                <span className={styles.dot}>•</span>
                <span>{movie.duration}</span>
                <span className={styles.dot}>•</span>
                <span className={styles.rating}>{movie.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
