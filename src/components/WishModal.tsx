import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, X, Check } from 'lucide-react';
import { playPopSound } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWish?: string;
  onSaveWish: (wish: string) => void;
  recipientName: string;
}

export const WishModal: React.FC<WishModalProps> = ({
  isOpen,
  onClose,
  currentWish = '',
  onSaveWish,
  recipientName,
}) => {
  const [wish, setWish] = useState(currentWish);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      playPopSound();
      fireCelebrationConfetti();
      onSaveWish(wish.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-amber-200/90 overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 p-6 text-white text-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-yellow-200" />
              </div>
              <h3 className="text-xl font-bold">Pide un deseo para {recipientName}</h3>
              <p className="text-xs text-rose-100 mt-1">
                Cierra los ojos, piensa en algo que desees de corazón y sopla las velitas.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Escribe tu deseo aquí:
                </label>
                <textarea
                  rows={3}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Ej: Mucha salud, viajar por el mundo, sonreír todos los días..."
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white resize-none"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar deseo</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
