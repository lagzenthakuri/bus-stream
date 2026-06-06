import Link from 'next/link';
import { Play, Info } from 'lucide-react';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        {/* Placeholder gradient to simulate an image if we don't have one */}
        <div className={styles.placeholderBg}></div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>Dune: Part Two</h1>
        <div className={styles.meta}>
          <span className={styles.match}>98% Match</span>
          <span>2024</span>
          <span className={styles.rating}>PG-13</span>
          <span>2h 46m</span>
        </div>
        <p className={styles.description}>
          Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.
        </p>
        <div className={styles.actions}>
          <Link href="/player/dune-2" className={styles.playBtn}>
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
  );
}
