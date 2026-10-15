import React, { useState, useEffect } from 'react';
import { Cake } from './components/Cake';
import { LetterEnvelope } from './components/LetterEnvelope';
import { BalloonsAndBunting } from './components/BalloonsAndBunting';
import { MusicPlayer } from './components/MusicPlayer';
import { WishModal } from './components/WishModal';
import { CelebrationData, DEFAULT_CELEBRATION } from './types';
import { fireCelebrationConfetti, fireSideCannons } from './utils/confetti';
import { Sparkles, Heart, PartyPopper, Cake as CakeIcon, Mail } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<CelebrationData>(() => {
    // Parse URL params for personalized greetings
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      const from = params.get('from');
      const msg = params.get('msg');
      const ps = params.get('ps');
      const flavor = params.get('flavor') as CelebrationData['cakeFlavor'] | null;
      const ageParam = params.get('age');

      if (to || from || msg || flavor) {
        return {
          ...DEFAULT_CELEBRATION,
          recipientName: to || DEFAULT_CELEBRATION.recipientName,
          senderName: from || DEFAULT_CELEBRATION.senderName,
          letterMessage: msg || DEFAULT_CELEBRATION.letterMessage,
          letterPostscript: ps || DEFAULT_CELEBRATION.letterPostscript,
          cakeFlavor: flavor || DEFAULT_CELEBRATION.cakeFlavor,
          age: ageParam ? parseInt(ageParam, 10) || 3 : 3,
        };
      }
    }
    return DEFAULT_CELEBRATION;
  });

  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const candleCount = 7;

  // Automatic confetti every 15 seconds without sound
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      fireCelebrationConfetti();
    }, 700);

    const interval = setInterval(() => {
      fireCelebrationConfetti();
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleUpdateData = (updates: Partial<CelebrationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleManualConfetti = () => {
    // Soundless confetti burst on demand
    fireCelebrationConfetti();
    fireSideCannons();
  };

  return (
    <div className="min-h-screen flex flex-col relative font-body text-stone-800">
      {/* Festive Background Image with Warm Ambient Overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/festive_celebration_bg_1792033223086.jpg"
          alt="Ambiente festivo de cumpleaños"
          className="w-full h-full object-cover object-center scale-105 filter brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Luminous warm veil for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/85 via-amber-50/80 to-rose-50/85 backdrop-blur-[1.5px]" />
      </div>

      {/* Interactive Balloons & Top Bunting Banner */}
      <BalloonsAndBunting />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-30 w-full bg-white/85 backdrop-blur-md border-b border-amber-200/60 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <CakeIcon className="w-5 h-5" />
            </div>
            <span className="font-serif-display font-bold text-lg md:text-xl text-stone-900 tracking-tight">
              Cumpleaños Feliz
            </span>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleManualConfetti}
              className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <PartyPopper className="w-4 h-4 text-yellow-200" />
              <span className="hidden sm:inline">¡Lanzar confeti!</span>
              <span className="sm:hidden">Confeti</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO GREETING SECTION */}
      <section className="w-full pt-8 pb-4 px-4 text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100/70 border border-amber-300/60 rounded-full text-xs font-semibold text-amber-900 mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Un momento para celebrar, sonreír y agradecer</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight text-balance">
          ¡Feliz Cumpleaños, <span className="text-rose-600">{data.recipientName}</span>!
        </h1>

        <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Preparamos este rincón especial con pastel de velas interactivas y una cartita personalizada llena de amor para celebrar tu día.
        </p>
      </section>

      {/* MAIN CELEBRATION STAGE */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Column 1: The Birthday Cake */}
          <div className="w-full bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-4 border-b border-amber-100 mb-2">
              <div className="flex items-center gap-2">
                <CakeIcon className="w-5 h-5 text-rose-500" />
                <h2 className="text-lg font-bold text-stone-900">El Pastel de Cumpleaños</h2>
              </div>
              <span className="text-xs text-stone-500 font-medium">Sopla o haz clic</span>
            </div>

            <Cake
              recipientName={data.recipientName}
              candleCount={candleCount}
              wishText={data.wishText}
              onOpenWishModal={() => setIsWishModalOpen(true)}
            />
          </div>

          {/* Column 2: The Letter Envelope */}
          <div className="w-full bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-4 border-b border-amber-100 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-stone-900">La Cartita Especial</h2>
              </div>
              <span className="text-xs text-stone-500 font-medium">Toca para abrir</span>
            </div>

            <LetterEnvelope
              data={data}
              onUpdateData={handleUpdateData}
            />
          </div>
        </div>

        {/* Celebratory Wishes Highlights Banner */}
        <div className="mt-12 bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-amber-200/80 shadow-sm text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-rose-500 mb-2">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">
              "Los mejores años son aquellos que aún están por vivirse"
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Hoy celebramos tu vida, tus sueños y cada sonrisa que compartes con el mundo. ¡Que cada deseo que pidas hoy se haga realidad!
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-amber-200/60 py-6 mt-12 bg-white/40 text-center text-xs text-stone-500">
        <p>Hecho con mucho cariño para celebrar un cumpleaños extraordinario 🎉</p>
      </footer>

      {/* Modals & Music Widget */}
      <MusicPlayer />

      <WishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        currentWish={data.wishText}
        onSaveWish={(w) => handleUpdateData({ wishText: w })}
        recipientName={data.recipientName}
      />
    </div>
  );
}
