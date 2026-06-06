import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import PlayerProvider from '@/context/PlayerContext';

export const metadata: Metadata = {
  title: 'BusStream - Premium Entertainment',
  description: 'Enjoy movies and music right from your seat!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
        </PlayerProvider>
      </body>
    </html>
  );
}
