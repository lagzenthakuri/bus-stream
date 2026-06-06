'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Globe, Users, Bus } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Music', path: '/music' },
    { name: 'TV Shows', path: '/tv' },
  ];

  return (
    <nav className={`glass ${styles.navbar}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Bus size={28} className={styles.logoIcon} />
          <span>BusStream</span>
        </Link>
        
        <div className={styles.navLinks}>
          {links.map(link => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`${styles.link} ${pathname === link.path ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <Search size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="Language">
            <Globe size={20} />
          </button>
          <div className={styles.usersConnected} title="Users Connected">
            <Users size={16} />
            <span>42</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
