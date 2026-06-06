'use client';
import { createContext, useState, useContext, useEffect } from 'react';

interface PlayerContextType {
  activeVideo: any | null;
  setActiveVideo: (video: any | null) => void;
  activeAudio: any | null;
  setActiveAudio: (audio: any | null) => void;
}

const PlayerContext = createContext<PlayerContextType>({
  activeVideo: null,
  setActiveVideo: () => {},
  activeAudio: null,
  setActiveAudio: () => {}
});

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);

  return (
    <PlayerContext.Provider value={{ activeVideo, setActiveVideo, activeAudio, setActiveAudio }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
