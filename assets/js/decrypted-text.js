// Decrypted Text Effect - Vanilla JS
class DecryptedText {
  constructor(element, options = {}) {
    this.element = element;
    this.originalText = element.textContent;
    this.options = {
      speed: options.speed || 50,
      maxIterations: options.maxIterations || 10,
      sequential: options.sequential || false,
      revealDirection: options.revealDirection || 'start',
      useOriginalCharsOnly: options.useOriginalCharsOnly || false,
      characters: options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
      animateOn: options.animateOn || 'view',
      delay: options.delay || 0
    };

    this.displayText = this.originalText;
    this.isAnimating = false;
    this.revealedIndices = new Set();
    this.hasAnimated = false;
    this.interval = null;
    this.currentIteration = 0;

    this.init();
  }

  init() {
    // Trim and normalize text
    this.originalText = this.originalText.trim().replace(/\s+/g, ' ');

    // Wrap text for animation
    this.wrapText();

    if (this.options.animateOn === 'view') {
      this.setupIntersectionObserver();
    } else if (this.options.animateOn === 'hover') {
      this.setupHoverListeners();
    } else if (this.options.animateOn === 'load') {
      setTimeout(() => this.startAnimation(), this.options.delay);
    }
  }

  wrapText() {
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-block';
    wrapper.style.whiteSpace = 'normal';
    wrapper.setAttribute('aria-label', this.originalText);

    const textSpan = document.createElement('span');
    textSpan.setAttribute('aria-hidden', 'true');

    this.originalText.split('').forEach((char, index) => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.dataset.index = index;
      charSpan.style.whiteSpace = 'pre';
      textSpan.appendChild(charSpan);
    });

    wrapper.appendChild(textSpan);
    this.element.textContent = '';
    this.element.appendChild(wrapper);
    this.textSpan = textSpan;
  }

  getAvailableChars() {
    if (this.options.useOriginalCharsOnly) {
      return Array.from(new Set(this.originalText.split(''))).filter(char => char !== ' ');
    }
    return this.options.characters.split('');
  }

  getNextIndex(revealedSet) {
    const textLength = this.originalText.length;
    switch (this.options.revealDirection) {
      case 'start':
        return revealedSet.size;
      case 'end':
        return textLength - 1 - revealedSet.size;
      case 'center': {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

        if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
          return nextIndex;
        }

        for (let i = 0; i < textLength; i++) {
          if (!revealedSet.has(i)) return i;
        }
        return 0;
      }
      default:
        return revealedSet.size;
    }
  }

  shuffleText() {
    const availableChars = this.getAvailableChars();
    const chars = this.textSpan.querySelectorAll('span');

    chars.forEach((charSpan, i) => {
      const char = this.originalText[i];

      if (char === ' ') {
        charSpan.textContent = ' ';
        return;
      }

      if (this.revealedIndices.has(i)) {
        charSpan.textContent = this.originalText[i];
        charSpan.classList.add('revealed');
        charSpan.classList.remove('encrypted');
      } else {
        charSpan.textContent = availableChars[Math.floor(Math.random() * availableChars.length)];
        charSpan.classList.add('encrypted');
        charSpan.classList.remove('revealed');
      }
    });
  }

  startAnimation() {
    if (this.hasAnimated && this.options.animateOn === 'view') return;

    this.isAnimating = true;
    this.currentIteration = 0;
    this.revealedIndices.clear();

    this.interval = setInterval(() => {
      if (this.options.sequential) {
        if (this.revealedIndices.size < this.originalText.length) {
          const nextIndex = this.getNextIndex(this.revealedIndices);
          this.revealedIndices.add(nextIndex);
          this.shuffleText();
        } else {
          this.stopAnimation();
        }
      } else {
        this.shuffleText();
        this.currentIteration++;

        if (this.currentIteration >= this.options.maxIterations) {
          this.stopAnimation();
          this.revealText();
        }
      }
    }, this.options.speed);

    if (this.options.animateOn === 'view') {
      this.hasAnimated = true;
    }
  }

  stopAnimation() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isAnimating = false;
  }

  revealText() {
    const chars = this.textSpan.querySelectorAll('span');
    chars.forEach((charSpan, i) => {
      charSpan.textContent = this.originalText[i];
      charSpan.classList.add('revealed');
      charSpan.classList.remove('encrypted');
    });
  }

  resetText() {
    this.stopAnimation();
    this.revealedIndices.clear();
    this.currentIteration = 0;
    this.revealText();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.startAnimation();
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(this.element);
  }

  setupHoverListeners() {
    this.element.addEventListener('mouseenter', () => this.startAnimation());
    this.element.addEventListener('mouseleave', () => this.resetText());
  }
}

// Initialize decrypted text on elements
function initDecryptedText() {
  // Hero section text elements
  const heroSubtitle = document.querySelector('.home__subtitle');
  const heroTitle = document.querySelector('.home__title');

  if (heroSubtitle) {
    new DecryptedText(heroSubtitle, {
      speed: 30,
      maxIterations: 15,
      animateOn: 'load',
      delay: 500,
      revealDirection: 'start'
    });
  }

  if (heroTitle) {
    new DecryptedText(heroTitle, {
      speed: 25,
      maxIterations: 20,
      animateOn: 'load',
      delay: 1000,
      revealDirection: 'start'
    });
  }

  // Description paragraph - leave normal, no encryption effect
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDecryptedText);
} else {
  initDecryptedText();
}
