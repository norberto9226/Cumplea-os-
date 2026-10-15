export interface CelebrationData {
  recipientName: string;
  senderName: string;
  letterMessage: string;
  letterPostscript: string;
  age: number;
  cakeFlavor: 'fresa' | 'chocolate' | 'vainilla' | 'arcoiris';
  photoUrl?: string | null;
  wishText?: string;
  stickers: string[];
}

export const DEFAULT_CELEBRATION: CelebrationData = {
  recipientName: 'Cumpleañero/a Especial',
  senderName: 'Quien te quiere mucho',
  letterMessage: `Hoy es un día sumamente especial porque celebramos el día en que llegaste a este mundo a iluminar la vida de todos los que te rodean.

Quiero desearte un año lleno de risas sinceras, momentos inolvidables, salud inagotable y sueños cumplidos. Gracias por ser esa persona única, llena de magia, bondad y luz propia.

Espero que cada segundo de este nuevo año de vida esté lleno de abrazos cálidos, proyectos emocionantes y motivos de sobra para sonreír. ¡Te mereces todo lo más lindo que el universo tenga para dar!`,
  letterPostscript: 'P.D.: No olvides pedir tres grandes deseos al soplar las velitas...',
  age: 7,
  cakeFlavor: 'vainilla',
  photoUrl: '/src/assets/images/birthday_celebration_snapshot_1792032637227.jpg',
  wishText: '',
  stickers: ['🎂', '✨', '🎈', '💖'],
};
