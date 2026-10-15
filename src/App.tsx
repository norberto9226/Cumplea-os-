import React, { useState, useEffect } from 'react';
import { Cake } from './components/Cake';
import { LetterEnvelope } from './components/LetterEnvelope';
import { BalloonsAndBunting } from './components/BalloonsAndBunting';
import { MusicPlayer } from './components/MusicPlayer';
import { WishModal } from './components/WishModal';
import { CelebrationData, DEFAULT_CELEBRATION } from './types';
import { fireCelebrationConfetti } from './utils/confetti';
import { Sparkles, Cake as CakeIcon, Mail, Heart } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<CelebrationData>(() => {
    // Parse URL params for personalized greetings if present
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      const from = params.get('from');
      const msg = params.get('msg');
      const ps = params.get('ps');

      if (to || from || msg || ps) {
        return {
          ...DEFAULT_CELEBRATION,
          recipientName: to || DEFAULT_CELEBRATION.recipientName,
          senderName: from || DEFAULT_CELEBRATION.senderName,
          letterMessage: msg || DEFAULT_CELEBRATION.letterMessage,
          letterPostscript: ps || DEFAULT_CELEBRATION.letterPostscript,
          cakeFlavor: 'vainilla',
          age: 5,
        };
      }
    }
    return DEFAULT_CELEBRATION;
  });

  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const candleCount = 5; // Por defecto 5 velas fijas

  // Confeti automático: lanzamiento inicial y luego cada 10 segundos
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      fireCelebrationConfetti();
    }, 600);

    const confettiInterval = setInterval(() => {
      fireCelebrationConfetti();
    }, 10000); // Cada 10 segundos

    return () => {
      clearTimeout(initialTimer);
      clearInterval(confettiInterval);
    };
  }, []);

  const handleUpdateData = (updates: Partial<CelebrationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div
      className="min-h-screen flex flex-col relative font-body text-stone-800 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(254, 243, 199, 0.90), rgba(255, 241, 242, 0.88), rgba(255, 237, 213, 0.92)), url('/src/assets/images/festive_celebration_bg_1792033223086.jpg')`,
      }}
    >
      {/* Globos interactivos y Guirnalda festiva superior */}
      <BalloonsAndBunting />

      {/* ENCABEZADO DE FELICITACIÓN PRINCIPAL */}
      <header className="w-full pt-10 sm:pt-14 pb-4 px-4 text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/90 border border-amber-300/80 rounded-full text-xs sm:text-sm font-semibold text-amber-900 mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>¡Hoy celebramos tu vida y tu alegría!</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold text-stone-900 tracking-tight leading-tight text-balance drop-shadow-2xs">
          ¡Feliz Cumpleaños, <span className="text-rose-600">{data.recipientName}</span>!
        </h1>

        <p className="mt-4 text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Que este nuevo año llegue repleto de bendiciones, sonrisas y momentos maravillosos.
        </p>
      </header>

      {/* ESCENARIO PRINCIPAL: VER TODO POR DEFECTO (Pastel y Cartita juntos) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Columna 1: Pastel de Cumpleaños (5 velas fijas, sabor vainilla y miel) */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md flex flex-col items-center transition-all">
            <div className="w-full flex items-center justify-between pb-4 border-b border-amber-200/60 mb-2">
              <div className="flex items-center gap-2">
                <CakeIcon className="w-5 h-5 text-rose-500" />
                <h2 className="text-lg font-bold text-stone-900">El Pastel de Cumpleaños</h2>
              </div>
              <span className="text-xs text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-medium">
                Vainilla y Miel · 5 velas
              </span>
            </div>

            <Cake
              recipientName={data.recipientName}
              flavor="vainilla"
              candleCount={candleCount}
              wishText={data.wishText}
              onOpenWishModal={() => setIsWishModalOpen(true)}
            />
          </div>

          {/* Columna 2: La Cartita Especial (con foto genérica) */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md flex flex-col items-center transition-all">
            <div className="w-full flex items-center justify-between pb-4 border-b border-amber-200/60 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-stone-900">La Cartita Especial</h2>
              </div>
              <span className="text-xs text-stone-500 font-medium">Toca el sobre para abrir</span>
            </div>

            <LetterEnvelope
              data={data}
              onUpdateData={handleUpdateData}
            />
          </div>
        </div>

        {/* Cita inspiradora decorativa sin botones de compartir */}
        <div className="mt-12 bg-white/60 backdrop-blur-xs rounded-3xl p-6 md:p-8 border border-amber-200/60 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 shadow-2xs flex items-center justify-center text-rose-500 mx-auto mb-3">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-800 mb-2">
            "Los mejores años son aquellos que aún están por vivirse"
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pide tus más grandes deseos al soplar las velitas y guarda siempre este día en tu corazón.
          </p>
        </div>
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="w-full border-t border-amber-200/60 py-6 mt-12 bg-white/50 text-center text-xs text-stone-600">
        <p>Hecho con mucho cariño para celebrar un cumpleaños extraordinario 🎉</p>
      </footer>

      {/* Reproductor de música automática con melodía de cumpleaños */}
      <MusicPlayer />

      {/* Modal para pedir y guardar deseos de cumpleaños */}
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
