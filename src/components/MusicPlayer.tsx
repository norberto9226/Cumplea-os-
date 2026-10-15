import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc3 } from 'lucide-react';
import { playBirthdaySong, stopBirthdaySong, isSongPlaying } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      stopBirthdaySong();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playBirthdaySong(() => {
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    return () => {
      stopBirthdaySong();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Floating notes animation when playing */}
      {isPlaying && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-md border border-rose-200 animate-pulse">
          <span className="animate-bounce">🎵</span>
          <span className="hidden sm:inline">Cumpleaños Feliz</span>
          <span className="animate-bounce delay-150">🎶</span>
        </div>
      )}

      {/* Main Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer active:scale-95 border ${
          isPlaying
            ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30'
            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
        }`}
        title={isPlaying ? 'Pausar música de cumpleaños' : 'Reproducir melodía de cumpleaños'}
      >
        {isPlaying ? (
          <Disc3 className="w-6 h-6 animate-spin text-white" />
        ) : (
          <Music className="w-5 h-5 text-amber-600" />
        )}
      </button>
    </div>
  );
};
