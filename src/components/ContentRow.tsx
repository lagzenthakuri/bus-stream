'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import styles from './ContentRow.module.css';

interface Item {
  id: string;
  title: string;
  image: string;
  duration?: string;
  type: 'movie' | 'music';
}

interface ContentRowProps {
  title: string;
  items: Item[];
}

export default function ContentRow({ title, items }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      rowRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.rowContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.sliderWrap}>
        <button className={`${styles.sliderArrow} ${styles.leftArrow}`} onClick={() => scroll('left')}>
          <ChevronLeft size={30} />
        </button>
        
        <div className={styles.row} ref={rowRef}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.posterContainer}>
                {/* Fallback gradient for missing images */}
                <div 
                  className={styles.posterBg}
                  style={{ background: `linear-gradient(45deg, #1f2833, ${item.type === 'movie' ? '#45a29e' : '#ff4c4c'})` }}
                >
                  <span className={styles.fallbackTitle}>{item.title}</span>
                </div>
                
                <div className={styles.hoverOverlay}>
                  <Link href={`/player/${item.id}`} className={styles.playIcon}>
                    <Play size={24} fill="currentColor" />
                  </Link>
                  <div className={styles.itemInfo}>
                    <h4>{item.title}</h4>
                    {item.duration && <span>{item.duration}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={`${styles.sliderArrow} ${styles.rightArrow}`} onClick={() => scroll('right')}>
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
}
