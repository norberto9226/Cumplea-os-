import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPopSound } from '../utils/audio';
import { popBalloonConfetti } from '../utils/confetti';

interface BalloonItem {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  color: string;
  size: number;
  delay: number;
}

const INITIAL_BALLOONS: BalloonItem[] = [
  { id: 1, x: 5, y: 20, color: '#f43f5e', size: 55, delay: 0 },
  { id: 2, x: 92, y: 18, color: '#3b82f6', size: 60, delay: 0.5 },
  { id: 3, x: 8, y: 65, color: '#eab308', size: 50, delay: 1.2 },
  { id: 4, x: 90, y: 60, color: '#10b981', size: 52, delay: 0.8 },
  { id: 5, x: 3, y: 42, color: '#8b5cf6', size: 48, delay: 1.5 },
  { id: 6, x: 94, y: 40, color: '#ec4899', size: 54, delay: 0.3 },
];

export const BalloonsAndBunting: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonItem[]>(INITIAL_BALLOONS);

  const popBalloon = (b: BalloonItem, event: React.MouseEvent) => {
    playPopSound();
    popBalloonConfetti(event.clientX, event.clientY, b.color);
    setBalloons((prev) => prev.filter((item) => item.id !== b.id));

    // Respawn balloon after a few seconds so fun never ends!
    setTimeout(() => {
      setBalloons((prev) => [...prev, b]);
    }, 4500);
  };

  const buntingFlags = [
    { text: '¡', color: 'bg-rose-500' },
    { text: 'F', color: 'bg-amber-500' },
    { text: 'E', color: 'bg-emerald-500' },
    { text: 'L', color: 'bg-sky-500' },
    { text: 'I', color: 'bg-purple-500' },
    { text: 'Z', color: 'bg-pink-500' },
    { text: '★', color: 'bg-yellow-400' },
    { text: 'C', color: 'bg-indigo-500' },
    { text: 'U', color: 'bg-rose-400' },
    { text: 'M', color: 'bg-amber-400' },
    { text: 'P', color: 'bg-teal-500' },
    { text: 'L', color: 'bg-blue-500' },
    { text: 'E', color: 'bg-purple-400' },
    { text: '!', color: 'bg-rose-500' },
  ];

  return (
    <>
      {/* FESTIVE BUNTING BANNER AT TOP */}
      <div className="w-full overflow-hidden pointer-events-none select-none z-10 pt-2 pb-4">
        <div className="flex justify-center items-start gap-1 md:gap-2 px-2">
          {buntingFlags.map((flag, index) => (
            <motion.div
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.04 }}
              className="flex flex-col items-center"
            >
              {/* String attachment */}
              <div className="w-full h-1 border-t-2 border-stone-300 -mb-1" />
              {/* Triangular pennant */}
              <div
                className={`w-5 h-7 sm:w-7 sm:h-9 md:w-9 md:h-11 ${flag.color} text-white font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-xs`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              >
                <span className="mt-[-6px]">{flag.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FLOATING INTERACTIVE BALLOONS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {balloons.map((b) => (
            <motion.div
              key={b.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.92,
                y: [0, -14, 0],
                rotate: [-2, 2, -2],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                y: { duration: 3.5 + b.delay, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4 + b.delay, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.3 },
              }}
              onClick={(e) => popBalloon(b, e)}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
              }}
              className="absolute pointer-events-auto cursor-pointer group select-none transition-transform active:scale-90"
              title="¡Haz clic para reventar el globo!"
            >
              {/* Balloon Oval */}
              <div
                className="w-full h-full rounded-full shadow-md relative overflow-hidden"
                style={{ backgroundColor: b.color }}
              >
                {/* 3D Balloon shine highlight */}
                <div className="absolute top-2 left-2.5 w-3 h-5 bg-white/40 rounded-full transform -rotate-25 blur-2xs" />
                {/* Mini string knot */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: b.color }}
                />
              </div>

              {/* Balloon String */}
              <svg
                className="w-4 h-14 mx-auto -mt-0.5 overflow-visible opacity-50"
                viewBox="0 0 16 56"
                fill="none"
              >
                <path
                  d="M8 0 Q 3 14, 8 28 T 8 56"
                  stroke="#78716c"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
