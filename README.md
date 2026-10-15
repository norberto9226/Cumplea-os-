# 🎂 Celebración de Cumpleaños Mágica ✨

Una hermosa aplicación web interactiva diseñada para felicitar y celebrar cumpleaños con un pastel de velitas soplables, una cartita manuscrita personalizada en sobre de cera, confeti automático, globos interactivos y melodía de cumpleaños.

---

## 🌟 Características Principales

- 🎂 **Pastel de Cumpleaños Interactivo**:
  - 7 velitas con animaciones realistas de llamas parpadeantes y humo al apagarse.
  - **Soplar con micrófono**: Detección de volumen y frecuencia para soplar directamente al micrófono del dispositivo.
  - **Botón de soplado rápido**: Apagado en cascada con sonido de soplido.
  - **Encendido/Apagado individual**: Puedes hacer clic en cualquier velita para manipularla.
  - Pastel decorado estilo Vainilla & Miel sobre pedestal de cerámica.
- 💌 **Cartita en Sobre con Sello de Cera**:
  - Sobre 3D con sello de lacre que se abre con sonido de papel.
  - Tipografía manuscrita estilizada sobre papel pergamino.
  - Editor en tiempo real para personalizar destinatario, remitente, mensaje y posdata.
  - Fotografía polaroid festiva y selector de pegatinas decorativas (🎂, 💖, ✨, 🎈, 🎉, etc.).
- 🎉 **Ambiente Festivo**:
  - Fondo escénico de celebración con guirnaldas y luces cálidas (bokeh).
  - Lluvia automática de confeti festivo cada **15 segundos** (silencioso).
  - Globos interactivos flotantes en los laterales que explotan al hacer clic con confeti y sonido.
  - Guirnalda de banderines superiores con *"¡FELIZ CUMPLEAÑOS!"*.
- 🎵 **Música con Web Audio API**:
  - Sintetizador en tiempo real que interpreta la melodía clásica de *Cumpleaños Feliz*.
  - No requiere archivos MP3 externos, garantizando compatibilidad offline e instantánea.
- 💫 **Deseo de Cumpleaños**:
  - Modal interactivo para escribir y guardar el deseo antes de soplar las velas.

---

## 🚀 Tecnologías Utilizadas

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Motion** (Framer Motion) para animaciones fluidas y 3D
- **Canvas-Confetti** para explosiones de confeti
- **Web Audio API** para síntesis de sonido sin dependencias de archivos de audio
- **Lucide React** para iconografía minimalista

---

## 📂 Estructura del Proyecto

```text
├── index.html                  # Punto de entrada HTML con Google Fonts
├── package.json                # Dependencias y scripts de ejecución
├── tsconfig.json               # Configuración de TypeScript
├── vite.config.ts              # Configuración de Vite con Tailwind CSS
├── src/
│   ├── main.tsx                # Entrada de React
│   ├── App.tsx                 # Componente principal y escenario festivo
│   ├── index.css               # Estilos globales y keyframes de animación
│   ├── types.ts                # Interfaces y datos por defecto
│   ├── assets/
│   │   └── images/             # Fotografías y fondos festivos generados
│   ├── components/
│   │   ├── Cake.tsx            # Pastel interactivo y velitas
│   │   ├── LetterEnvelope.tsx  # Sobre 3D y carta manuscrita
│   │   ├── BalloonsAndBunting.tsx # Globos interactivos y banderines
│   │   ├── MusicPlayer.tsx     # Reproductor de melodía con Web Audio
│   │   └── WishModal.tsx       # Modal para pedir deseos
│   ├── hooks/
│   │   └── useMicrophoneBlow.ts # Detección de soplido mediante micrófono
│   └── utils/
│       ├── audio.ts            # Sintetizador Web Audio API
│       └── confetti.ts         # Efectos de confeti y cañones
```

---

## 🛠️ Instalación y Ejecución Local

### Prerrequisitos
- **Node.js** (versión 18 o superior recomendada)
- **npm** (o yarn / pnpm)

### Pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd TU_REPOSITORIO
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la celebración.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Los archivos listos para desplegar se generarán en la carpeta `dist/`.

---

## 📤 Cómo Subir a GitHub por Primera Vez

Si tienes este proyecto en tu máquina local:

```bash
# 1. Inicializar git
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el commit inicial
git commit -m "feat: Celebración de cumpleaños con pastel y carta interactiva"

# 4. Cambiar la rama principal a main
git branch -M main

# 5. Conectar con tu repositorio remoto de GitHub
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 6. Subir los archivos
git push -u origin main
```

---

Hecho con mucho cariño para celebrar momentos inolvidables 🎉
