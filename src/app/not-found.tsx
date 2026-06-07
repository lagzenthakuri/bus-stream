import Link from 'next/link';
import { Home } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.glitchWrapper}>
          <h1 className={styles.errorCode}>404</h1>
        </div>
        <h2 className={styles.title}>You stepped off the bus!</h2>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track to enjoy your media.
        </p>
        <Link href="/" className={styles.homeBtn}>
          <Home size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
