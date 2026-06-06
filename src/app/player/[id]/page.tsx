'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Settings, SkipForward } from 'lucide-react';
import 'plyr/dist/plyr.css';
import styles from './page.module.css';

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const [showPrompt, setShowPrompt] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const plyrRef = useRef<any>(null);

  useEffect(() => {
    // Check localStorage for saved position
    const savedProgress = localStorage.getItem(`busstream_progress_${videoId}`);
    if (savedProgress) {
      const time = parseFloat(savedProgress);
      if (time > 10) {
        setResumeTime(time);
        setShowPrompt(true);
      }
    }
  }, [videoId]);

  useEffect(() => {
    if (!videoRef.current) return;
    
    // Dynamically import plyr to avoid SSR issues
    let plyrInstance: any;
    import('plyr').then((PlyrModule) => {
      const Plyr = PlyrModule.default;
      plyrInstance = new Plyr(videoRef.current!, {
        controls: [
          'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
        ],
        settings: ['captions', 'quality', 'speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] }
      });
      plyrRef.current = plyrInstance;
    });

    return () => {
      if (plyrInstance) plyrInstance.destroy();
    };
  }, []);

  const handleResume = () => {
    if (plyrRef.current) {
      plyrRef.current.currentTime = resumeTime;
      plyrRef.current.play();
    }
    setShowPrompt(false);
  };

  const handleStartOver = () => {
    if (plyrRef.current) {
      plyrRef.current.currentTime = 0;
      plyrRef.current.play();
    }
    setShowPrompt(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (plyrRef.current) {
        const current = plyrRef.current.currentTime;
        if (current > 5) {
          localStorage.setItem(`busstream_progress_${videoId}`, current.toString());
          
          // Also update continue watching array
          const saved = localStorage.getItem('busstream_continue') || '[]';
          let continueArr = JSON.parse(saved);
          const index = continueArr.findIndex((item: any) => item.id === videoId);
          
          const duration = plyrRef.current.duration || 100;
          const progressPercent = Math.min((current / duration) * 100, 100);
          
          if (index >= 0) {
            continueArr[index].progress = progressPercent;
          } else {
            continueArr.unshift({
              id: videoId,
              title: `Movie ${videoId}`, // Mock title
              type: 'movie',
              progress: progressPercent
            });
          }
          localStorage.setItem('busstream_continue', JSON.stringify(continueArr.slice(0, 10)));
        }
      }
    }, 5000); // save every 5s

    return () => clearInterval(interval);
  }, [videoId]);

  return (
    <div className={styles.playerWrapper}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
        <h1 className={styles.title}>Playing: {videoId}</h1>
        <div className={styles.controlsRight}>
          <button className={styles.iconBtn}><Settings size={20} /></button>
        </div>
      </div>

      <div className={styles.videoContainer}>
        <video 
          ref={videoRef}
          className="plyr-react plyr"
          controls
          crossOrigin=""
          playsInline
        >
          <source src="https://cdn.plyr.io/static/blank.mp4" type="video/mp4" />
        </video>
        
        {/* Skip Intro Overlay */}
        <button className={styles.skipIntroBtn}>
          <SkipForward size={20} />
          Skip Intro
        </button>

        {showPrompt && (
          <div className={styles.resumePromptOverlay}>
            <div className={`glass-card ${styles.resumePrompt}`}>
              <h3>Resume watching?</h3>
              <p>You left off at {Math.floor(resumeTime / 60)}:{Math.floor(resumeTime % 60).toString().padStart(2, '0')}</p>
              <div className={styles.promptActions}>
                <button className={styles.resumeBtn} onClick={handleResume}>Resume</button>
                <button className={styles.startOverBtn} onClick={handleStartOver}>Start Over</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
