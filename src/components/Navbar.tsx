'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Globe, Users, Bus, X, Play } from 'lucide-react';
import styles from './Navbar.module.css';
import { MOCK_MOVIES, MOCK_TV_SHOWS, MOCK_MUSIC } from '@/data/mockData';

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

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    const movies = MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(query)).map(m => ({ ...m, link: `/player/${m.id}` }));
    const tv = MOCK_TV_SHOWS.filter(t => t.title.toLowerCase().includes(query)).map(t => ({ ...t, link: `/player/${t.id}` }));
    const music = MOCK_MUSIC.filter(m => m.title.toLowerCase().includes(query)).map(m => ({ ...m, link: `/player/${m.id}` }));
    
    return [...movies, ...tv, ...music].slice(0, 6);
  };

  const results = getSearchResults();

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
              {results.length > 0 ? (
                <div className={styles.resultsGrid}>
                  {results.map(item => (
                    <Link 
                      href={item.link} 
                      key={item.id} 
                      className={styles.resultItem}
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div className={styles.resultImgContainer}>
                        <img 
                          src={`https://picsum.photos/seed/${item.id}/100/100`} 
                          alt={item.title} 
                          className={styles.resultImg} 
                        />
                      </div>
                      <div className={styles.resultInfo}>
                        <div className={styles.resultTitle}>{item.title}</div>
                        <div className={styles.resultType}>
                          {item.type === 'tv' ? 'TV Show' : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </div>
                      </div>
                      <Play size={20} className={styles.resultPlay} />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className={styles.searchHint}>No results found for "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
