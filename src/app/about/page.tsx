'use client';
import { QrCode, HardDrive, Users, Wifi, ShieldAlert } from 'lucide-react';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.logoWrapper}>
          <Wifi size={48} className={styles.heroIcon} />
        </div>
        <h1 className={styles.title}>Welcome to BusStream</h1>
        <p className={styles.subtitle}>Premium local entertainment for your journey</p>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <QrCode size={24} className={styles.cardIcon} />
              <h2>How to Connect</h2>
            </div>
            <div className={styles.cardBody}>
              <p>You are currently connected to the local BusStream network.</p>
              <ol className={styles.list}>
                <li>Connect to WiFi: <strong>Bus_Media_Free</strong></li>
                <li>Open browser and go to: <strong>bus.stream</strong></li>
                <li>Or scan the QR code on the seat in front of you.</li>
              </ol>
              <div className={styles.qrPlaceholder}>
                [ QR Code Placeholder ]
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <HardDrive size={24} className={styles.cardIcon} />
              <h2>System Status</h2>
            </div>
            <div className={styles.cardBody}>
              <ul className={styles.statsList}>
                <li>
                  <span className={styles.statLabel}>Total Content:</span>
                  <span className={styles.statValue}>127 Movies · 43 Albums</span>
                </li>
                <li>
                  <span className={styles.statLabel}>Storage Used:</span>
                  <span className={styles.statValue}>850 GB / 2 TB</span>
                </li>
                <li>
                  <span className={styles.statLabel}>Device Name:</span>
                  <span className={styles.statValue}>Raspberry Pi 4 Media Server</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Users size={24} className={styles.cardIcon} />
              <h2>Active Users</h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.bigStat}>
                <span className={styles.bigNumber}>42</span>
                <span className={styles.bigLabel}>passengers currently streaming</span>
              </div>
              <p className={styles.note}>Content is served locally, so streaming won't use your mobile data!</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <ShieldAlert size={24} className={styles.cardIcon} />
              <h2>Rules & Guidelines</h2>
            </div>
            <div className={styles.cardBody}>
              <ul className={styles.rulesList}>
                <li><strong>Respect Bandwidth:</strong> High-quality streaming is available, but please select lower qualities if the network is slow.</li>
                <li><strong>Use Headphones:</strong> Be considerate of other passengers while listening to music or watching movies.</li>
                <li><strong>No Downloads:</strong> Content is strictly for streaming during the journey.</li>
              </ul>
            </div>
          </div>

        </div>

        <div className={styles.footer}>
          <p>Operated by <strong>Himalayan Travels</strong> • Support: +977 9800000000</p>
        </div>
      </div>
    </div>
  );
}
