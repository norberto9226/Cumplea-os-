import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff6b8b', '#ffd166', '#06d6a0', '#118ab2', '#ff9f1c'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireSideCannons() {
  const end = Date.now() + 1.2 * 1000;
  const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#eab308', '#10b981'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function popBalloonConfetti(x: number, y: number, color: string) {
  confetti({
    particleCount: 25,
    spread: 45,
    startVelocity: 20,
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
    colors: [color, '#ffffff', '#ffd166'],
    zIndex: 9999,
  });
}
