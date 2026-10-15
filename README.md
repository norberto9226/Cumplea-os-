# 🎂 Celebración de Cumpleaños Mágica ✨

Una hermosa aplicación web interactiva diseñada para felicitar y celebrar cumpleaños con un pastel de velitas soplables, una cartita manuscrita en sobre con sello de cera, confeti automático, globos interactivos y melodía de cumpleaños.

---

## 🌟 Características Principales

- 🎂 **Pastel de Cumpleaños con 7 Velitas**:
  - Velitas con animaciones realistas de llamas parpadeantes y humo al apagarse.
  - **Botón de soplado**: Apagado automático en cascada con sonido de soplido.
  - **Interacción individual**: Haz clic sobre cualquier velita para apagarla o encenderla.
  - Pastel estilo **Vainilla & Miel** sobre pedestal de cerámica decorado.
- 💌 **Cartita en Sobre con Sello de Cera**:
  - Sobre 3D con sello de lacre que se abre con sonido de papel.
  - Tipografía manuscrita estilizada sobre papel pergamino.
  - Fotografía polaroid festiva y pegatinas interactivas.
  - Editor en tiempo real para personalizar destinatario, remitente, mensaje y posdata.
- 🎉 **Ambiente Festivo**:
  - Fondo escénico de celebración con guirnaldas y luces cálidas (bokeh).
  - Lluvia automática de confeti festivo cada **15 segundos** (silencioso).
  - Globos interactivos flotantes en los laterales que explotan al hacer clic con confeti y sonido.
  - Guirnalda de banderines superiores con *"¡FELIZ CUMPLE!"*.
- 🎵 **Música con Web Audio API**:
  - Sintetizador que interpreta la melodía clásica de *Cumpleaños Feliz*.
  - Cero dependencias de archivos de audio externos.
- 💫 **Deseo de Cumpleaños**:
  - Espacio para pedir un deseo antes de soplar las velas.

---

## ⚡ ¿Cómo usar la versión "Solo HTML + JSON"? (Sin Node ni npm)

Si quieres subir la página a GitHub Pages o abrirla directamente en tu navegador sin instalar dependencias de programación:

1. **Usa los dos archivos principales**:
   - `celebration.json`: El archivo de configuración donde puedes cambiar el nombre, el mensaje de la carta y el remitente.
   - `standalone/index.html`: La página web completa y autocontenida.
2. **Para GitHub Pages**:
   - Copia `standalone/index.html` a la raíz de tu repositorio como `index.html`.
   - Copia `celebration.json` en la misma carpeta.
   - ¡Listo! En Configuración -> Pages de GitHub activa tu sitio y funcionará al instante.
3. **Para abrir en tu computadora**:
   - Haz doble clic sobre `standalone/index.html` y se abrirá en tu navegador favorito.

---

## 🛠️ Opción 2: Proyecto React + Vite (Desarrollo local)

Si prefieres usar el entorno React con Vite:

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📄 Archivo de Configuración (`celebration.json`)

Puedes editar `celebration.json` con cualquier editor de texto o bloc de notas:

```json
{
  "recipientName": "Nombre de la Persona",
  "senderName": "Tu Nombre",
  "letterMessage": "Tu mensaje de felicitación...",
  "letterPostscript": "P.D.: Que todos tus sueños se hagan realidad...",
  "candleCount": 7,
  "cakeFlavor": "Vainilla & Miel"
}
```

---

Hecho con mucho cariño para celebrar un día inolvidable 🎉
