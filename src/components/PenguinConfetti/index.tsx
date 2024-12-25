import { useEffect, useCallback } from 'react';

interface PenguinConfettiProps {
  isActive: boolean;
}

const PenguinConfetti = ({ isActive }: PenguinConfettiProps) => {
  const createPenguinConfetti = useCallback((clickX: number, clickY: number) => {
    // Créer plusieurs émojis pingouins
    for (let i = 0; i < 12; i++) {
      const emoji = document.createElement('div');
      emoji.textContent = '🐧';
      emoji.style.position = 'fixed';
      emoji.style.pointerEvents = 'none';
      emoji.style.fontSize = '1.2rem';
      emoji.style.zIndex = '9999';
      document.body.appendChild(emoji);

      // Position initiale aléatoire au-dessus du curseur dans un arc
      const spreadAngle = -60 + (i * 120 / 11); // Répartition uniforme entre -60° et +60°
      const startDistance = 20 + Math.random() * 30; // Distance initiale du point de clic
      const startX = clickX + Math.cos(spreadAngle * Math.PI / 180) * startDistance;
      const startY = clickY - 20 - Math.random() * 30; // Légèrement au-dessus du curseur

      // Angle de départ basé sur la position dans l'arc
      const angle = (-90 + spreadAngle * 0.5) * (Math.PI / 180); // Direction principalement vers le haut
      
      // Vitesse et distance très réduites
      const velocity = 2 + Math.random() * 3;
      const distance = 100 + Math.random() * 100;

      let currentTime = 0;
      const duration = 4000 + Math.random() * 3000; // Animation encore plus lente (4-7 secondes)

      function animate() {
        currentTime += 16; // ~60fps
        const progress = currentTime / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Easing pour un mouvement plus naturel

        if (progress >= 1) {
          emoji.remove();
          return;
        }

        // Trajectoire modifiée pour un mouvement plus doux
        const x = startX + (Math.cos(angle) * velocity * easeProgress * distance);
        const y = startY + (Math.sin(angle) * velocity * easeProgress * distance) + 
                 (0.1 * 980 * Math.pow(easeProgress, 2)); // Gravité très réduite

        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
        emoji.style.transform = `rotate(${90 * easeProgress}deg) scale(${1 - easeProgress * 0.2})`; // Rotation plus lente
        emoji.style.opacity = `${1 - Math.pow(easeProgress, 0.5)}`; // Fondu encore plus progressif

        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      const handleClick = (e: MouseEvent) => {
        createPenguinConfetti(e.clientX, e.clientY);
      };

      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('click', handleClick);
      };
    }
  }, [isActive, createPenguinConfetti]);

  return null;
};

export default PenguinConfetti; 