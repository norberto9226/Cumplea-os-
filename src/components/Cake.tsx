import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mic, MicOff, RefreshCw, Heart } from 'lucide-react';
import { useMicrophoneBlow } from '../hooks/useMicrophoneBlow';
import { playBlowSound, playCelebrationFanfare, playPopSound } from '../utils/audio';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confetti';

interface CakeProps {
  recipientName: string;
  flavor?: 'fresa' | 'chocolate' | 'vainilla' | 'arcoiris';
  candleCount?: number;
  onAllCandlesBlown?: () => void;
  wishText?: string;
  onOpenWishModal?: () => void;
}

export const Cake: React.FC<CakeProps> = ({
  recipientName,
  flavor = 'vainilla',
  candleCount = 7,
  onAllCandlesBlown,
  wishText,
  onOpenWishModal,
}) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>(() =>
    Array(candleCount).fill(true)
  );
  const [hasTriggeredCelebration, setHasTriggeredCelebration] = useState(false);

  // Synchronize when candleCount prop changes
  useEffect(() => {
    setCandlesLit(Array(candleCount).fill(true));
    setHasTriggeredCelebration(false);
  }, [candleCount]);

  const allBlownOut = candlesLit.length > 0 && candlesLit.every((lit) => !lit);

  const handleBlowOut = () => {
    if (allBlownOut) return;
    playBlowSound();

    // Blow them out in rapid cascade
    setCandlesLit((prev) => {
      const next = [...prev];
      let delay = 0;
      for (let i = 0; i < next.length; i++) {
        if (next[i]) {
          setTimeout(() => {
            setCandlesLit((current) => {
              const updated = [...current];
              updated[i] = false;
              return updated;
            });
          }, delay);
          delay += 120;
        }
      }
      return next;
    });
  };

  const { isListening, volumeLevel, permissionError, startListening, stopListening } =
    useMicrophoneBlow({
      onBlowDetected: () => {
        if (!allBlownOut) {
          handleBlowOut();
        }
      },
      threshold: 35,
    });

  // When all candles become blown out
  useEffect(() => {
    if (allBlownOut && !hasTriggeredCelebration) {
      setHasTriggeredCelebration(true);
      playCelebrationFanfare();
      fireCelebrationConfetti();
      setTimeout(() => {
        fireSideCannons();
      }, 500);
      onAllCandlesBlown?.();
    }
  }, [allBlownOut, hasTriggeredCelebration, onAllCandlesBlown]);

  const toggleSingleCandle = (index: number) => {
    if (candlesLit[index]) {
      playBlowSound();
    } else {
      playPopSound();
    }
    setCandlesLit((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const relightAll = () => {
    playPopSound();
    setCandlesLit(Array(candleCount).fill(true));
    setHasTriggeredCelebration(false);
  };

  // Visual palettes based on flavor
  const flavorStyles = {
    fresa: {
      label: 'Fresa & Crema',
      topTier: 'from-pink-200 via-rose-100 to-pink-300',
      bottomTier: 'from-pink-300 via-rose-200 to-pink-400',
      dripColor: '#fb7185',
      frostingCream: '#fff1f2',
      accentColor: '#f43f5e',
      borderTone: 'border-pink-300',
      icingPuffs: '#ffe4e6',
      insideCake: '#fda4af',
    },
    chocolate: {
      label: 'Chocolate Belga',
      topTier: 'from-amber-900 via-stone-800 to-amber-950',
      bottomTier: 'from-stone-900 via-amber-950 to-stone-950',
      dripColor: '#3e2723',
      frostingCream: '#d7ccc8',
      accentColor: '#8d6e63',
      borderTone: 'border-stone-700',
      icingPuffs: '#efebe9',
      insideCake: '#4e342e',
    },
    vainilla: {
      label: 'Vainilla & Miel',
      topTier: 'from-amber-100 via-yellow-50 to-amber-200',
      bottomTier: 'from-amber-200 via-yellow-100 to-amber-300',
      dripColor: '#f59e0b',
      frostingCream: '#fef3c7',
      accentColor: '#d97706',
      borderTone: 'border-amber-300',
      icingPuffs: '#fffbeb',
      insideCake: '#fde68a',
    },
    arcoiris: {
      label: 'Fiesta Arcoíris',
      topTier: 'from-violet-200 via-sky-100 to-teal-200',
      bottomTier: 'from-teal-200 via-amber-100 to-rose-200',
      dripColor: '#8b5cf6',
      frostingCream: '#f3e8ff',
      accentColor: '#ec4899',
      borderTone: 'border-purple-300',
      icingPuffs: '#fdf4ff',
      insideCake: '#a7f3d0',
    },
  };

  const currentStyle = flavorStyles[flavor];

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Main Cake Stage Area */}
      <div className="relative w-full flex flex-col items-center justify-end min-h-[380px] pt-12 pb-4">
        {/* Wish indicator banner if wish is written */}
        <AnimatePresence>
          {wishText && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-0 z-20 flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-400/40 rounded-full text-xs font-medium text-amber-900 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Deseo guardado: "{wishText}"</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Sparks when candles are lit */}
        {!allBlownOut && (
          <div className="absolute top-16 pointer-events-none flex gap-8">
            <span className="text-amber-400 text-xs animate-ping">✨</span>
            <span className="text-rose-400 text-xs animate-pulse">⭐</span>
            <span className="text-yellow-400 text-xs animate-ping delay-300">✨</span>
          </div>
        )}

        {/* --- CAKE VISUAL STRUCTURE --- */}
        <div className="relative flex flex-col items-center">
          {/* CANDLES ROW */}
          <div className="flex items-end justify-center gap-3 md:gap-5 z-20 mb-[-4px]">
            {candlesLit.map((isLit, idx) => {
              // slight height variation for charming handmade feel
              const candleHeights = ['h-16', 'h-18', 'h-17', 'h-19', 'h-16'];
              const candleHeight = candleHeights[idx % candleHeights.length];
              const candlePatterns = [
                'bg-gradient-to-b from-rose-300 to-rose-400',
                'bg-gradient-to-b from-sky-300 to-sky-400',
                'bg-gradient-to-b from-amber-300 to-amber-400',
                'bg-gradient-to-b from-emerald-300 to-emerald-400',
                'bg-gradient-to-b from-purple-300 to-purple-400',
              ];
              const candlePattern = candlePatterns[idx % candlePatterns.length];

              return (
                <div
                  key={idx}
                  onClick={() => toggleSingleCandle(idx)}
                  className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  title={isLit ? 'Haz clic para apagar esta vela' : 'Haz clic para encender esta vela'}
                >
                  {/* Candle Flame / Smoke */}
                  <div className="h-9 flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                      {isLit ? (
                        <motion.div
                          key="flame"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className={`w-4 h-6 rounded-full relative cursor-pointer ${
                            idx % 3 === 0
                              ? 'animate-flame'
                              : idx % 3 === 1
                              ? 'animate-flame-delayed'
                              : 'animate-flame-slow'
                          }`}
                        >
                          {/* Outer glow */}
                          <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full" />
                          {/* Inner white flame core */}
                          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full opacity-90" />
                          {/* Halo light */}
                          <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-xs pointer-events-none" />
                        </motion.div>
                      ) : (
                        <div key="smoke" className="relative flex flex-col items-center">
                          {/* Smoke cloud effect */}
                          <div className="w-2.5 h-2.5 bg-slate-400/40 rounded-full blur-xs animate-smoke" />
                          <div className="w-3.5 h-3.5 bg-slate-300/30 rounded-full blur-xs animate-smoke delay-100" />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Wick */}
                  <div className="w-0.5 h-2 bg-stone-700" />

                  {/* Candle Body */}
                  <div
                    className={`w-3.5 md:w-4 ${candleHeight} ${candlePattern} rounded-t-sm rounded-b-xs shadow-md border-x border-white/40 relative overflow-hidden`}
                  >
                    {/* Candle spiral stripes */}
                    <div
                      className="absolute inset-0 opacity-35"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255, 255, 255, 0.7) 4px, rgba(255, 255, 255, 0.7) 8px)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* TOP TIER */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Strawberries / Cherries on top */}
            <div className="flex items-center justify-center gap-4 mb-[-8px] z-20">
              <span className="text-xl transform -rotate-12 select-none hover:scale-125 transition-transform">
                🍓
              </span>
              <span className="text-lg select-none hover:scale-125 transition-transform">
                🍒
              </span>
              <span className="text-xl transform rotate-12 select-none hover:scale-125 transition-transform">
                🍓
              </span>
            </div>

            {/* Top Tier Body */}
            <div
              className={`w-44 md:w-56 h-20 rounded-2xl bg-gradient-to-r ${currentStyle.topTier} shadow-lg relative overflow-hidden border border-white/60`}
            >
              {/* Dripping frosting on top tier */}
              <svg
                viewBox="0 0 200 40"
                className="absolute top-0 left-0 w-full h-8 preserve-3d"
                fill={currentStyle.dripColor}
              >
                <path d="M0,0 L200,0 L200,10 C180,25 170,5 150,20 C135,32 125,12 110,22 C95,30 85,15 70,25 C55,32 45,10 30,22 C18,30 10,12 0,18 Z" opacity="0.85" />
              </svg>

              {/* Frosting rosettes & pearls */}
              <div className="absolute bottom-1 left-0 right-0 flex justify-around px-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs border border-white"
                  />
                ))}
              </div>

              {/* Shimmer light */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* MIDDLE FROSTING DIVIDER */}
          <div className="w-52 md:w-64 h-3.5 bg-white rounded-full z-15 shadow-sm border border-stone-200/50 flex justify-between px-3 items-center">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-rose-200/70" />
            ))}
          </div>

          {/* BOTTOM TIER */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-64 md:w-80 h-28 rounded-2xl bg-gradient-to-r ${currentStyle.bottomTier} shadow-xl relative overflow-hidden border border-white/60 flex items-center justify-center`}
            >
              {/* Dripping frosting on bottom tier */}
              <svg
                viewBox="0 0 300 45"
                className="absolute top-0 left-0 w-full h-10"
                fill={currentStyle.dripColor}
              >
                <path d="M0,0 L300,0 L300,12 C280,30 265,10 245,26 C225,38 210,14 190,28 C170,40 155,18 135,30 C115,40 100,16 80,30 C60,40 45,15 25,28 C15,35 8,15 0,22 Z" opacity="0.85" />
              </svg>

              {/* Dedicated name banner embossed on cake */}
              <div className="relative z-10 px-5 py-1.5 bg-white/85 backdrop-blur-xs rounded-xl shadow-xs border border-white/90 transform -rotate-1 text-center">
                <p className="text-xs font-semibold tracking-wider text-rose-900/70 uppercase">
                  Felicidades
                </p>
                <p className="text-sm md:text-base font-bold text-rose-700 truncate max-w-[200px]">
                  {recipientName}
                </p>
              </div>

              {/* Decorative side rosettes */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-white/90 shadow-xs border border-rose-100 flex items-center justify-center"
                  >
                    <div className="w-1 h-1 rounded-full bg-amber-400" />
                  </div>
                ))}
              </div>

              {/* Sprinkles scatter */}
              <div className="absolute inset-0 pointer-events-none opacity-45">
                <span className="absolute top-12 left-8 w-2 h-1 bg-yellow-400 rounded-full transform rotate-45" />
                <span className="absolute top-16 left-16 w-2 h-1 bg-cyan-400 rounded-full transform -rotate-12" />
                <span className="absolute top-14 right-10 w-2 h-1 bg-pink-400 rounded-full transform rotate-30" />
                <span className="absolute top-20 right-20 w-2 h-1 bg-lime-400 rounded-full transform -rotate-45" />
                <span className="absolute top-10 right-28 w-2 h-1 bg-purple-400 rounded-full transform rotate-15" />
              </div>
            </div>
          </div>

          {/* CAKE STAND / PEDESTAL */}
          <div className="relative z-5 flex flex-col items-center">
            {/* Ceramic Plate */}
            <div className="w-72 md:w-92 h-5 bg-gradient-to-r from-stone-200 via-white to-stone-200 rounded-full shadow-lg border-b-2 border-stone-300 relative">
              <div className="absolute inset-x-4 top-1 h-0.5 bg-white/80 rounded-full" />
            </div>
            {/* Stand Base */}
            <div className="w-28 md:w-36 h-4 bg-gradient-to-r from-stone-300 via-stone-100 to-stone-300 shadow-md" />
            <div className="w-36 md:w-44 h-3 bg-gradient-to-r from-stone-300 via-white to-stone-300 rounded-b-xl shadow-lg border-t border-stone-200" />
          </div>
        </div>
      </div>

      {/* CAKE CONTROLS & ACTIONS */}
      <div className="w-full mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {/* Main Blow Out Button */}
          {!allBlownOut ? (
            <button
              onClick={handleBlowOut}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md shadow-rose-500/25 transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>¡Soplar las velas!</span>
            </button>
          ) : (
            <button
              onClick={relightAll}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Volver a encender velas</span>
            </button>
          )}

          {/* Microphone Blowing Button */}
          {!allBlownOut && (
            <button
              onClick={isListening ? stopListening : startListening}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                isListening
                  ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-inner'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700 shadow-xs'
              }`}
              title="Sopla directo a tu micrófono para apagar las velitas como en la vida real"
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Escuchando... ({volumeLevel}%)</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-amber-600" />
                  <span>Soplar con micrófono</span>
                </>
              )}
            </button>
          )}

          {/* Make a wish button */}
          <button
            onClick={onOpenWishModal}
            className="px-4 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-sm font-semibold rounded-xl shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>{wishText ? 'Ver mi deseo' : 'Pedir un deseo'}</span>
          </button>
        </div>

        {/* Microphone permission feedback if any */}
        {permissionError && (
          <p className="text-xs text-rose-600 mt-1">{permissionError}</p>
        )}

        {/* Small hint */}
        <p className="text-xs text-stone-500 text-center">
          Tip: También puedes hacer clic sobre cualquier velita para apagarla o encenderla individualmente.
        </p>
      </div>
    </div>
  );
};
