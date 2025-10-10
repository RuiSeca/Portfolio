// Initialize Galaxy Background
import { initGalaxy } from './galaxy.js';

// Use setTimeout to defer initialization until after page is fully loaded and painted
window.addEventListener('load', () => {
  // Delay galaxy init slightly to let page render first
  requestIdleCallback(() => {
    const galaxyContainer = document.getElementById('galaxy-background');
    if (galaxyContainer) {
      console.log('Initializing galaxy...');
      initGalaxy('galaxy-background', {
      focal: [0.5, 0.5],
      rotation: [1.0, 0.0],
      starSpeed: 0.3,              // Reduced from 0.5
      density: 1.5,                // Increased for more stars (original was 1)
      hueShift: 140,
      disableAnimation: false,
      speed: 0.5,                  // Reduced from 1.0 - slower animation
      mouseInteraction: true,
      glowIntensity: 0.2,          // Reduced from 0.3 - less glow
      saturation: 0.0,
      mouseRepulsion: true,
      repulsionStrength: 1.5,      // Reduced from 2
      twinkleIntensity: 0.2,       // Reduced from 0.3
      rotationSpeed: 0.02,         // Reduced from 0.05 - slower rotation
      autoCenterRepulsion: 0,
      transparent: true
    });
    } else {
      console.error('Galaxy container not found');
    }
  }, { timeout: 2000 });
});
