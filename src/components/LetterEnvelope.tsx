import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Edit3, Check, Sparkles, X } from 'lucide-react';
import { playPaperSound, playPopSound } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';
import { CelebrationData } from '../types';

interface LetterEnvelopeProps {
  data: CelebrationData;
  onUpdateData: (updates: Partial<CelebrationData>) => void;
}

export const LetterEnvelope: React.FC<LetterEnvelopeProps> = ({
  data,
  onUpdateData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSticker, setActiveSticker] = useState('🎂');

  // Form states for editing
  const [recipient, setRecipient] = useState(data.recipientName);
  const [sender, setSender] = useState(data.senderName);
  const [message, setMessage] = useState(data.letterMessage);
  const [postscript, setPostscript] = useState(data.letterPostscript);

  const availableStickers = ['🎂', '💖', '✨', '🎈', '🎉', '🥂', '🌸', '🎁', '⭐', '💌'];

  const toggleOpen = () => {
    playPaperSound();
    if (!isOpen) {
      fireCelebrationConfetti();
    }
    setIsOpen((prev) => !prev);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    onUpdateData({
      recipientName: recipient.trim() || 'Persona Especial',
      senderName: sender.trim() || 'Quien te quiere',
      letterMessage: message,
      letterPostscript: postscript,
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Top action helper */}
      <div className="flex items-center justify-between w-full mb-3 px-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-900/80">
          <Mail className="w-4 h-4 text-amber-700" />
          <span>{isOpen ? 'Carta abierta' : 'Sobre cerrado para ti'}</span>
        </div>

        <div className="flex items-center gap-2">
          {isOpen && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-50 text-amber-900 text-xs font-semibold rounded-lg border border-amber-200 shadow-xs cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancelar edición' : 'Editar mensaje'}</span>
            </button>
          )}
        </div>
      </div>

      {/* --- ENVELOPE / LETTER CONTAINER --- */}
      <div className="relative w-full flex flex-col items-center">
        {!isOpen ? (
          /* CLOSED ENVELOPE WITH WAX SEAL */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleOpen}
            className="w-full max-w-md h-64 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 rounded-2xl shadow-xl border-2 border-amber-200/90 relative cursor-pointer overflow-hidden flex flex-col items-center justify-center p-6 group transition-all"
          >
            {/* Envelope flap visual lines */}
            <div className="absolute top-0 inset-x-0 h-32 bg-amber-200/40 clip-triangle pointer-events-none" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-amber-100/60 pointer-events-none" 
                 style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 20%)' }} />

            {/* Recipient note on front of envelope */}
            <div className="relative z-10 text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-amber-800/70 font-semibold block mb-1">
                Correspondencia Especial
              </span>
              <h3 className="font-handwriting text-3xl md:text-4xl text-rose-950 font-bold tracking-wide">
                Para: {data.recipientName}
              </h3>
            </div>

            {/* WAX SEAL STAMP BUTTON */}
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 shadow-lg shadow-rose-900/30 border-2 border-rose-300 flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <Heart className="w-8 h-8 text-rose-100 fill-rose-100/30" />
                {/* Wax seal ring text */}
                <div className="absolute inset-0.5 rounded-full border border-dashed border-rose-300/40" />
              </div>
              <span className="text-xs font-semibold text-rose-900 mt-2 bg-white/70 px-2.5 py-0.5 rounded-full shadow-xs">
                Haz clic para abrir ✨
              </span>
            </div>

            {/* Subtle vintage stamp in top right */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-white/80 border-2 border-dashed border-amber-400 rounded-sm p-1 flex flex-col items-center justify-center rotate-3 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] font-bold text-amber-800 uppercase mt-0.5">Amor</span>
            </div>
          </motion.div>
        ) : (
          /* OPEN LETTER */
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full bg-[#fdfbf7] rounded-2xl shadow-2xl border border-amber-200/90 relative p-6 md:p-10 flex flex-col"
            style={{
              backgroundImage: 'radial-gradient(#e5e0d8 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Close button to fold back */}
            <button
              onClick={toggleOpen}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Guardar carta en el sobre"
            >
              <X className="w-5 h-5" />
            </button>

            {/* If in edit mode */}
            {isEditing ? (
              <form onSubmit={handleSaveEdit} className="w-full flex flex-col gap-4">
                <h4 className="text-base font-bold text-stone-800 border-b pb-2">
                  Personalizar Carta de Cumpleaños
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Para (Nombre):
                    </label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                      placeholder="Ej: Sofía, Carlos, Mamá..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      De parte de:
                    </label>
                    <input
                      type="text"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                      placeholder="Ej: Tu amigo del alma, David..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Mensaje de la carta:
                  </label>
                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-400 font-sans leading-relaxed"
                    placeholder="Escribe aquí tus más sinceros deseos..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Posdata (P.D.):
                  </label>
                  <input
                    type="text"
                    value={postscript}
                    onChange={(e) => setPostscript(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                    placeholder="P.D.: ..."
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar cambios</span>
                  </button>
                </div>
              </form>
            ) : (
              /* VIEW MODE (THE REAL BEAUTIFUL LETTER) */
              <div className="flex flex-col">
                {/* Decorative vintage header */}
                <div className="flex items-center justify-between border-b border-amber-200/70 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeSticker}</span>
                    <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                      Carta de Celebración
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 italic">
                    Para un día inolvidable
                  </span>
                </div>

                {/* Salutation */}
                <h3 className="font-handwriting text-3xl md:text-4xl text-rose-950 font-bold mb-4">
                  Querido/a {data.recipientName},
                </h3>

                {/* Letter Body in expressive handwritten style */}
                <div className="font-handwriting text-2xl md:text-3xl text-stone-800 leading-relaxed space-y-4 whitespace-pre-line tracking-wide">
                  {data.letterMessage}
                </div>

                {/* Postscript */}
                {data.letterPostscript && (
                  <div className="mt-6 pt-4 border-t border-amber-200/60 font-handwriting text-xl md:text-2xl text-rose-900/90 italic">
                    {data.letterPostscript}
                  </div>
                )}

                {/* Photo Memory polaroid */}
                <div className="my-6 self-center transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="bg-white p-3 pb-6 rounded-sm shadow-md border border-stone-200 max-w-xs text-center">
                    <img
                      src={data.photoUrl || '/src/assets/images/birthday_celebration_snapshot_1792032637227.jpg'}
                      alt="Recuerdo especial"
                      className="w-full h-52 object-cover rounded-xs"
                      referrerPolicy="no-referrer"
                    />
                    <p className="font-handwriting text-xl text-stone-700 mt-2 font-bold">
                      Un recuerdo inolvidable ✨
                    </p>
                  </div>
                </div>

                {/* Sign-off & Signature */}
                <div className="mt-8 flex flex-col items-end">
                  <p className="font-handwriting text-2xl text-stone-600">
                    Con todo mi cariño,
                  </p>
                  <p className="font-handwriting text-3xl md:text-4xl text-rose-700 font-bold mt-1">
                    {data.senderName}
                  </p>
                  <div className="w-28 h-0.5 bg-rose-300/60 rounded-full mt-1" />
                </div>

                {/* Interactive Stickers */}
                <div className="mt-8 pt-4 border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-stone-500 font-medium mr-1">
                      Pegatinas:
                    </span>
                    {availableStickers.map((sticker) => (
                      <button
                        key={sticker}
                        onClick={() => {
                          setActiveSticker(sticker);
                          playPopSound();
                        }}
                        className={`text-lg p-1 rounded-lg hover:scale-125 transition-transform cursor-pointer ${
                          activeSticker === sticker ? 'bg-amber-100 ring-1 ring-amber-400' : ''
                        }`}
                        title="Elegir sello decorativo"
                      >
                        {sticker}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
