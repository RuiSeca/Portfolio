/* Piano Theme Switcher - Color Theme System */

class PianoThemeSwitcher {
  constructor() {
    this.themes = ['beige', 'red', 'blue', 'purple', 'green', 'pink', 'cyan', 'black', 'white'];
    this.currentTheme = 'beige';
    this.storageKey = 'pianoThemePreference';

    this.init();
  }

  init() {
    // Load saved theme from localStorage
    this.loadSavedTheme();

    // Wait for DOM to be ready - use a longer delay to ensure hologram is rendered
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.setupEventListeners(), 500);
      });
    } else {
      setTimeout(() => this.setupEventListeners(), 500);
    }
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    }
  }

  setupEventListeners() {
    // Palette toggle button
    const paletteToggle = document.querySelector('.theme-palette-toggle');
    const themePicker = document.querySelector('.piano-theme-picker');

    console.log('Setting up theme picker listeners:', { paletteToggle, themePicker });

    if (paletteToggle && themePicker) {
      console.log('Theme picker elements found, adding listeners');

      // Toggle expand/collapse
      paletteToggle.addEventListener('click', (e) => {
        console.log('Palette toggle clicked!');
        e.stopPropagation();
        this.togglePalette();
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (themePicker.classList.contains('expanded') &&
            !themePicker.contains(e.target)) {
          this.collapsePalette();
        }
      });
    } else {
      console.error('Theme picker elements not found!', { paletteToggle, themePicker });
    }

    // Add click listeners to all theme buttons
    const themeButtons = document.querySelectorAll('.theme-color-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const theme = e.currentTarget.getAttribute('data-theme');
        if (theme) {
          this.switchTheme(theme);
          // Auto-collapse after selection
          setTimeout(() => this.collapsePalette(), 300);
        }
      });
    });

    // Set initial active state
    this.updateActiveButton();
  }

  togglePalette() {
    const themePicker = document.querySelector('.piano-theme-picker');
    const paletteToggle = document.querySelector('.theme-palette-toggle');

    console.log('Toggle palette called');

    if (themePicker && paletteToggle) {
      const isExpanded = themePicker.classList.contains('expanded');
      console.log('Current state:', { isExpanded });

      if (isExpanded) {
        this.collapsePalette();
      } else {
        this.expandPalette();
      }
    }
  }

  expandPalette() {
    const themePicker = document.querySelector('.piano-theme-picker');
    const paletteToggle = document.querySelector('.theme-palette-toggle');

    console.log('Expanding palette');

    if (themePicker && paletteToggle) {
      themePicker.classList.add('expanded');
      paletteToggle.classList.add('active');
      console.log('Classes added:', themePicker.className);
    }
  }

  collapsePalette() {
    const themePicker = document.querySelector('.piano-theme-picker');
    const paletteToggle = document.querySelector('.theme-palette-toggle');

    console.log('Collapsing palette');

    if (themePicker && paletteToggle) {
      themePicker.classList.remove('expanded');
      paletteToggle.classList.remove('active');
      console.log('Classes removed:', themePicker.className);
    }
  }

  switchTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Theme "${theme}" not found`);
      return;
    }

    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
    this.updateActiveButton();

    // Trigger custom event for other components to listen to
    document.dispatchEvent(new CustomEvent('pianoThemeChanged', {
      detail: { theme, colors: this.getThemeColors(theme) }
    }));
  }

  applyTheme(theme) {
    document.body.setAttribute('data-piano-theme', theme);
  }

  saveTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
  }

  updateActiveButton() {
    const buttons = document.querySelectorAll('.theme-color-btn');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-theme') === this.currentTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  getThemeColors(theme) {
    const themeMap = {
      beige: { r: 217, g: 119, b: 6 },  // Vintage beige - same as Journey cards amber-600
      red: { r: 239, g: 68, b: 68 },
      blue: { r: 59, g: 130, b: 246 },
      purple: { r: 168, g: 85, b: 247 },
      green: { r: 34, g: 197, b: 94 },
      pink: { r: 236, g: 72, b: 153 },
      cyan: { r: 6, g: 182, b: 212 },
      black: { r: 30, g: 30, b: 30 },
      white: { r: 240, g: 240, b: 240 }
    };
    return themeMap[theme] || themeMap.beige;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  getCurrentColors() {
    return this.getThemeColors(this.currentTheme);
  }
}

// Initialize theme switcher
const pianoThemeSwitcher = new PianoThemeSwitcher();

// Make it globally accessible for other scripts
window.pianoThemeSwitcher = pianoThemeSwitcher;

// Helper function to get current theme colors (for use in main.js)
window.getPianoThemeColors = function() {
  const style = getComputedStyle(document.body);
  return {
    r: parseInt(style.getPropertyValue('--piano-primary-r')) || 215,
    g: parseInt(style.getPropertyValue('--piano-primary-g')) || 119,
    b: parseInt(style.getPropertyValue('--piano-primary-b')) || 6
  };
};
