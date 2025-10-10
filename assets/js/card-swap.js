// Card Swap Animation - Vanilla JS with GSAP
class CardSwap {
  constructor(container, options = {}) {
    this.container = container;
    this.cards = Array.from(container.querySelectorAll('.swap-card'));

    this.config = {
      width: options.width || 500,
      height: options.height || 400,
      cardDistance: options.cardDistance || 60,
      verticalDistance: options.verticalDistance || 70,
      delay: options.delay || 5000,
      pauseOnHover: options.pauseOnHover !== false,
      skewAmount: options.skewAmount || 6,
      easing: options.easing || 'elastic'
    };

    this.animConfig = this.config.easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

    this.order = Array.from({ length: this.cards.length }, (_, i) => i);
    this.timeline = null;
    this.interval = null;

    this.init();
  }

  makeSlot(i, distX, distY, total) {
    return {
      x: i * distX,
      y: -i * distY,
      z: -i * distX * 1.5,
      zIndex: total - i
    };
  }

  placeNow(el, slot, skew) {
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true
    });
  }

  swap() {
    if (this.order.length < 2) return;

    const [front, ...rest] = this.order;
    const elFront = this.cards[front];
    const tl = gsap.timeline();
    this.timeline = tl;

    // Drop front card
    tl.to(elFront, {
      y: '+=500',
      duration: this.animConfig.durDrop,
      ease: this.animConfig.ease
    });

    // Promote other cards
    tl.addLabel('promote', `-=${this.animConfig.durDrop * this.animConfig.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = this.cards[idx];
      const slot = this.makeSlot(i, this.config.cardDistance, this.config.verticalDistance, this.cards.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: this.animConfig.durMove,
          ease: this.animConfig.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    // Return front card to back
    const backSlot = this.makeSlot(
      this.cards.length - 1,
      this.config.cardDistance,
      this.config.verticalDistance,
      this.cards.length
    );
    tl.addLabel('return', `promote+=${this.animConfig.durMove * this.animConfig.returnDelay}`);
    tl.call(() => {
      gsap.set(elFront, { zIndex: backSlot.zIndex });
    }, undefined, 'return');
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: this.animConfig.durReturn,
        ease: this.animConfig.ease
      },
      'return'
    );

    // Update order
    tl.call(() => {
      this.order = [...rest, front];
    });
  }

  init() {
    // Initial placement
    const total = this.cards.length;
    this.cards.forEach((card, i) => {
      this.placeNow(card, this.makeSlot(i, this.config.cardDistance, this.config.verticalDistance, total), this.config.skewAmount);

      // Add spotlight mouse tracking to each card
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      // Add click to trigger swap
      card.addEventListener('click', () => {
        // Only swap if no animation is currently running
        if (!this.timeline || !this.timeline.isActive()) {
          this.swap();
        }
      });
    });

    // Add visual feedback for clickable cards
    this.cards.forEach(card => {
      card.style.cursor = 'pointer';
    });
  }

  destroy() {
    clearInterval(this.interval);
    this.timeline?.kill();
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.card-swap-container');
  if (container && typeof gsap !== 'undefined') {
    new CardSwap(container, {
      cardDistance: 60,
      verticalDistance: 70,
      delay: 5000,
      pauseOnHover: true
    });
  }
});
