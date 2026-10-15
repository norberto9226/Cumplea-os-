import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Music, Disc3, VolumeX } from 'lucide-react';
import { playBirthdaySong, stopBirthdaySong, isSongPlaying } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const loopTimeoutRef = useRef<number | null>(null);

  const playLoop = useCallback(() => {
    if (loopTimeoutRef.current) {
      window.clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    playBirthdaySong(() => {
      // If user hasn't paused, replay after a brief 2 second pause
      if (isPlayingRef.current) {
        loopTimeoutRef.current = window.setTimeout(() => {
          if (isPlayingRef.current) {
            playLoop();
          }
        }, 2000);
      }
    });
  }, []);

  const pauseMusic = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (loopTimeoutRef.current) {
      window.clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    stopBirthdaySong();
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playLoop();
    }
  };

  useEffect(() => {
    // Attempt automatic playback on mount
    playLoop();

    // Browsers often require one user interaction to unlock AudioContext audio output
    const unlockAudio = () => {
      if (isPlayingRef.current && !isSongPlaying()) {
        playLoop();
      }
    };

    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    return () => {
      pauseMusic();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [playLoop, pauseMusic]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Floating notes animation when playing */}
      {isPlaying && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-lg border border-rose-200 animate-pulse">
          <span className="animate-bounce">🎵</span>
          <span className="text-stone-800 font-semibold">Música en vivo</span>
          <span className="animate-bounce delay-150">🎶</span>
        </div>
      )}

      {/* Main Music Control Button */}
      <button
        onClick={toggleMusic}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer active:scale-95 border ${
          isPlaying
            ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30'
            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
        }`}
        title={isPlaying ? 'Pausar música' : 'Reproducir música de cumpleaños'}
      >
        {isPlaying ? (
          <Disc3 className="w-6 h-6 animate-spin text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-stone-500" />
        )}
      </button>
    </div>
  );
};
