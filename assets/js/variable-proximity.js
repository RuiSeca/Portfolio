// Variable Font Proximity Effect - Vanilla JS
class VariableProximity {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      fromFontVariationSettings: options.fromFontVariationSettings || "'wght' 400, 'opsz' 9",
      toFontVariationSettings: options.toFontVariationSettings || "'wght' 1000, 'opsz' 40",
      radius: options.radius || 100,
      falloff: options.falloff || 'linear',
      containerRef: options.containerRef || null
    };

    this.letterElements = [];
    this.mousePosition = { x: 0, y: 0 };
    this.lastPosition = { x: null, y: null };
    this.animationFrameId = null;

    this.init();
  }

  init() {
    // Parse font variation settings
    this.parsedSettings = this.parseSettings();

    // Wrap each letter in a span
    this.wrapLetters();

    // Set up mouse tracking
    this.setupMouseTracking();

    // Start animation loop
    this.startAnimationLoop();
  }

  parseSettings() {
    const parseSettingsString = (settingsStr) => {
      const map = new Map();
      settingsStr.split(',').forEach(s => {
        s = s.trim();
        const parts = s.split(' ');
        const name = parts[0].replace(/['"]/g, '');
        const value = parseFloat(parts[1]);
        map.set(name, value);
      });
      return map;
    };

    const fromSettings = parseSettingsString(this.options.fromFontVariationSettings);
    const toSettings = parseSettingsString(this.options.toFontVariationSettings);

    const result = [];
    fromSettings.forEach((fromValue, axis) => {
      result.push({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue
      });
    });

    return result;
  }

  wrapLetters() {
    const originalText = this.element.textContent;
    const words = originalText.split(' ');

    this.element.innerHTML = '';

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';

      word.split('').forEach((letter) => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.style.display = 'inline-block';
        letterSpan.style.fontVariationSettings = this.options.fromFontVariationSettings;
        this.letterElements.push(letterSpan);
        wordSpan.appendChild(letterSpan);
      });

      this.element.appendChild(wordSpan);

      if (wordIndex < words.length - 1) {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.display = 'inline-block';
        this.element.appendChild(space);
      }
    });

    // Add aria-label for accessibility
    this.element.setAttribute('aria-label', originalText);
  }

  setupMouseTracking() {
    const updatePosition = (x, y) => {
      const container = this.options.containerRef || this.element;
      const rect = container.getBoundingClientRect();
      this.mousePosition = {
        x: x - rect.left,
        y: y - rect.top
      };
    };

    const handleMouseMove = (ev) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Store for cleanup
    this.cleanup = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    };
  }

  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  calculateFalloff(distance) {
    const norm = Math.min(Math.max(1 - distance / this.options.radius, 0), 1);

    switch (this.options.falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (this.options.radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  }

  startAnimationLoop() {
    const animate = () => {
      const container = this.options.containerRef || this.element;
      const containerRect = container.getBoundingClientRect();
      const { x, y } = this.mousePosition;

      // Skip if mouse hasn't moved
      if (this.lastPosition.x === x && this.lastPosition.y === y) {
        this.animationFrameId = requestAnimationFrame(animate);
        return;
      }

      this.lastPosition = { x, y };

      this.letterElements.forEach((letterElement) => {
        const rect = letterElement.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = this.calculateDistance(
          this.mousePosition.x,
          this.mousePosition.y,
          letterCenterX,
          letterCenterY
        );

        if (distance >= this.options.radius) {
          letterElement.style.fontVariationSettings = this.options.fromFontVariationSettings;
          return;
        }

        const falloffValue = this.calculateFalloff(distance);
        const newSettings = this.parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(', ');

        letterElement.style.fontVariationSettings = newSettings;
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  destroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }
}

// Initialize variable proximity on hero text
function initVariableProximity() {
  const heroTitle = document.querySelector('.home__title');
  const heroSubtitle = document.querySelector('.home__subtitle');

  // Initialize immediately for title and subtitle only
  if (heroTitle) {
    new VariableProximity(heroTitle, {
      fromFontVariationSettings: "'wght' 400",
      toFontVariationSettings: "'wght' 900",
      radius: 120,
      falloff: 'exponential'
    });
  }

  if (heroSubtitle) {
    new VariableProximity(heroSubtitle, {
      fromFontVariationSettings: "'wght' 400",
      toFontVariationSettings: "'wght' 800",
      radius: 100,
      falloff: 'exponential'
    });
  }

  // DO NOT apply to h1 with typed text - conflicts with Typed.js
  // DO NOT apply to description paragraph - removed per user request
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVariableProximity);
} else {
  initVariableProximity();
}
