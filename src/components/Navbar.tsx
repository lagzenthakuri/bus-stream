'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Globe, Users, Bus, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);

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
          <button 
            className={styles.iconBtn} 
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>
          
          <div className={styles.langWrapper}>
            <button 
              className={styles.iconBtn} 
              aria-label="Language"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Globe size={20} />
            </button>
            {isLangOpen && (
              <div className={styles.langDropdown}>
                <button className={styles.langOption}>English</button>
                <button className={styles.langOption}>नेपाली (Nepali)</button>
                <button className={styles.langOption}>हिन्दी (Hindi)</button>
              </div>
            )}
          </div>
          
          <div className={styles.usersConnected} title="Users Connected">
            <Users size={16} />
            <span>42</span>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchContainer}>
            <Search size={24} className={styles.searchOverlayIcon} />
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Search movies, music, TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              className={styles.closeSearchBtn}
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          {searchQuery && (
            <div className={styles.searchResults}>
              <p className={styles.searchHint}>Press Enter to search for "{searchQuery}"</p>
              {/* Mock results could go here */}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
