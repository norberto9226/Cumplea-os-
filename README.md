# 🎂 Celebración de Cumpleaños Mágica ✨

Una hermosa aplicación web interactiva diseñada para felicitar y celebrar cumpleaños con un pastel de velitas soplables (con soporte para micrófono), una cartita manuscrita en sobre con sello de cera, confeti festivo, globos interactivos y melodía de cumpleaños.

---

## 🌟 Características Principales

- 🎂 **Pastel de Cumpleaños Interactivo**:
  - Velitas con animaciones realistas de llamas parpadeantes y humo al apagarse.
  - **Soplar con micrófono**: Detección de volumen y frecuencia para soplar directamente al micrófono de tu dispositivo como en la vida real.
  - **Botón de soplado rápido**: Apagado automático en cascada.
  - **Interacción individual**: Haz clic sobre cualquier velita para apagarla o volver a encenderla.
  - **Selector de sabores**: Fresa & Crema, Chocolate Belga, Vainilla & Miel y Fiesta Arcoíris.
  - **Cortar pastel**: Sirve una rebanada virtual con mensajes de fortuna y buenos augurios.
  - **Selector de número de velas**: Configura 1, 3, 5 o 7 velitas.
- 💌 **Cartita en Sobre con Sello de Cera**:
  - Sobre 3D con sello de lacre que se abre con sonido de papel.
  - Tipografía manuscrita estilizada sobre papel pergamino.
  - Subida de fotografías polaroid de recuerdos especiales.
  - Pegatinas interactivas (🎂, 💖, ✨, 🎈, 🎉, etc.).
  - Editor en tiempo real para personalizar destinatario, remitente, mensaje y posdata.
- 🔗 **Compartir Felicitación**:
  - Genera enlaces únicos con los datos configurados guardados en la URL.
  - Botón directo para enviar por **WhatsApp** o copiar al portapapeles.
- 🎉 **Ambiente Festivo**:
  - Guirnalda de banderines superiores con *"¡FELIZ CUMPLEAÑOS!"*.
  - Globos flotantes interactivos que explotan al hacer clic con confeti y sonido.
  - Cañones de confeti y fuegos artificiales al soplar las velas o mediante el botón de confeti.
- 🎵 **Música con Web Audio API**:
  - Sintetizador que interpreta la melodía clásica de *Cumpleaños Feliz* con notas musicales animadas.
  - Sin dependencias de archivos de audio externos.
- 💫 **Deseo de Cumpleaños**:
  - Modal interactivo para escribir y guardar el deseo antes de soplar las velas.

---

## 🚀 Tecnologías Utilizadas

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Motion** (Framer Motion) para animaciones y 3D
- **Canvas-Confetti** para explosiones de confeti
- **Web Audio API** para síntesis de audio nativa
- **Lucide React** para iconografía minimalista

---

## 📂 Estructura del Proyecto

```text
├── .gitignore                    # Reglas de exclusión para Git
├── README.md                     # Documentación del proyecto
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
├── vite.config.ts                # Configuración de Vite con Tailwind CSS
├── index.html                    # Punto de entrada HTML con Google Fonts
└── src/
    ├── main.tsx                  # Montaje de React
    ├── App.tsx                   # Escenario principal de la celebración
    ├── index.css                 # Animaciones CSS de flamas, humo y tipografías
    ├── types.ts                  # Interfaces y datos por defecto
    ├── components/
    │   ├── Cake.tsx              # Pastel interactivo con velas y rebanadas
    │   ├── LetterEnvelope.tsx    # Sobre 3D con sello de cera y carta manuscrita
    │   ├── BalloonsAndBunting.tsx# Globos interactivos y banderines
    │   ├── MusicPlayer.tsx       # Reproductor Web Audio API
    │   ├── WishModal.tsx         # Modal de deseos
    │   └── ShareModal.tsx        # Modal para compartir enlace y WhatsApp
    ├── hooks/
    │   └── useMicrophoneBlow.ts  # Detección de soplido mediante micrófono
    └── utils/
        ├── audio.ts              # Sintetizador Web Audio API
        └── confetti.ts           # Control de confeti y fuegos artificiales
```

---

## 🛠️ Instalación y Ejecución Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📤 Cómo Subir a GitHub

```bash
git init
git add .
git commit -m "feat: Celebración de cumpleaños mágica con pastel y carta"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```
