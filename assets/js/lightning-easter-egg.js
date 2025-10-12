/*=============== LIGHTNING EASTER EGG ⚡ ===============*/
function initLightningEasterEgg() {
  const title = document.getElementById('tech-stack-title');
  const section = document.querySelector('.logo-loop-section');

  if (!title || !section) return;

  // Wrap each letter in a span for individual animation
  const text = title.textContent;
  title.innerHTML = text.split('').map((char, index) => {
    if (char === ' ') return '<span class="letter-space">&nbsp;</span>';
    return `<span class="letter" data-index="${index}">${char}</span>`;
  }).join('');

  // Create SVG overlay for lightning bolts
  const svgOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgOverlay.setAttribute('class', 'lightning-overlay');
  svgOverlay.style.position = 'absolute';
  svgOverlay.style.top = '0';
  svgOverlay.style.left = '0';
  svgOverlay.style.width = '100%';
  svgOverlay.style.height = '100%';
  svgOverlay.style.pointerEvents = 'none';
  svgOverlay.style.zIndex = '1';
  svgOverlay.style.overflow = 'visible';
  section.style.position = 'relative';
  section.appendChild(svgOverlay);

  // Generate random lightning path with jagged edges
  function generateLightningPath(x1, y1, x2, y2, segments = 8) {
    const points = [[x1, y1]];
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Create jagged path with random offsets
    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const x = x1 + dx * t;
      const y = y1 + dy * t;

      // Add randomness perpendicular to the main direction
      const perpX = -dy;
      const perpY = dx;
      const length = Math.sqrt(perpX * perpX + perpY * perpY);
      const normalizedPerpX = perpX / length;
      const normalizedPerpY = perpY / length;

      // Random offset (stronger in the middle of the bolt)
      const variance = Math.sin(t * Math.PI) * (Math.random() - 0.5) * 30;

      points.push([
        x + normalizedPerpX * variance,
        y + normalizedPerpY * variance
      ]);
    }

    points.push([x2, y2]);

    // Convert points to SVG path
    const pathData = points.map((point, index) => {
      return `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`;
    }).join(' ');

    return pathData;
  }

  // Create lightning bolt animation
  function createLightningBolt(logoItem, color) {
    const logoRect = logoItem.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    // Calculate start and end points relative to section
    const startX = logoRect.left + logoRect.width / 2 - sectionRect.left;
    const startY = logoRect.top + logoRect.height / 2 - sectionRect.top;
    const endX = titleRect.left + titleRect.width / 2 - sectionRect.left;
    const endY = titleRect.top + titleRect.height / 2 - sectionRect.top;

    // Create main lightning bolt with gradient for metallic effect
    const gradientId = `lightning-gradient-${Date.now()}`;
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', gradientId);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');

    // Create gradient stops for metallic sheen
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#ffffff');
    stop1.setAttribute('stop-opacity', '0.9');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', color);
    stop2.setAttribute('stop-opacity', '1');

    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', color);
    stop3.setAttribute('stop-opacity', '0.6');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    svgOverlay.appendChild(gradient);

    // Create main lightning bolt
    const mainBolt = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathData = generateLightningPath(startX, startY, endX, endY);
    mainBolt.setAttribute('d', pathData);
    mainBolt.setAttribute('class', 'lightning-bolt');
    mainBolt.style.stroke = `url(#${gradientId})`;
    mainBolt.style.strokeWidth = '4';
    mainBolt.style.fill = 'none';
    mainBolt.style.filter = `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color}) drop-shadow(0 0 20px ${color})`;
    mainBolt.style.strokeDasharray = '1000';
    mainBolt.style.strokeDashoffset = '1000';
    mainBolt.style.strokeLinecap = 'round';
    mainBolt.style.strokeLinejoin = 'round';

    svgOverlay.appendChild(mainBolt);

    // Create branch bolts (smaller offshoots)
    const branches = [];
    for (let i = 0; i < 2; i++) {
      const branchSegment = 3 + Math.floor(Math.random() * 3);
      const pathPoints = pathData.split('L');
      if (pathPoints[branchSegment]) {
        const coords = pathPoints[branchSegment].trim().split(' ');
        const branchStartX = parseFloat(coords[0]);
        const branchStartY = parseFloat(coords[1]);
        const angle = Math.random() * Math.PI * 2;
        const length = 20 + Math.random() * 40;
        const branchEndX = branchStartX + Math.cos(angle) * length;
        const branchEndY = branchStartY + Math.sin(angle) * length;

        const branch = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const branchPath = generateLightningPath(branchStartX, branchStartY, branchEndX, branchEndY, 3);
        branch.setAttribute('d', branchPath);
        branch.setAttribute('class', 'lightning-branch');
        branch.style.stroke = `url(#${gradientId})`;
        branch.style.strokeWidth = '2.5';
        branch.style.fill = 'none';
        branch.style.opacity = '0.7';
        branch.style.filter = `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 8px ${color})`;
        branch.style.strokeDasharray = '100';
        branch.style.strokeDashoffset = '100';
        branch.style.strokeLinecap = 'round';
        branch.style.strokeLinejoin = 'round';

        svgOverlay.appendChild(branch);
        branches.push(branch);
      }
    }

    // Animate lightning bolt traveling
    requestAnimationFrame(() => {
      mainBolt.style.transition = 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      mainBolt.style.strokeDashoffset = '0';

      // Animate branches slightly delayed
      branches.forEach((branch, index) => {
        setTimeout(() => {
          branch.style.transition = 'stroke-dashoffset 0.15s ease-out';
          branch.style.strokeDashoffset = '0';
        }, 100 + index * 50);
      });

      // Strike the title letters
      setTimeout(() => {
        strikeTitleLetters(color);

        // Add flash effect at impact point
        const flash = document.createElement('div');
        flash.className = 'lightning-flash';
        flash.style.position = 'absolute';
        flash.style.left = `${endX}px`;
        flash.style.top = `${endY}px`;
        flash.style.width = '40px';
        flash.style.height = '40px';
        flash.style.borderRadius = '50%';
        flash.style.background = `radial-gradient(circle, ${color}, transparent)`;
        flash.style.transform = 'translate(-50%, -50%) scale(0)';
        flash.style.transition = 'all 0.2s ease-out';
        flash.style.pointerEvents = 'none';
        section.appendChild(flash);

        requestAnimationFrame(() => {
          flash.style.transform = 'translate(-50%, -50%) scale(3)';
          flash.style.opacity = '0';
        });

        setTimeout(() => flash.remove(), 300);
      }, 250);

      // Fade out lightning bolt
      setTimeout(() => {
        mainBolt.style.transition = 'opacity 0.2s ease-out';
        mainBolt.style.opacity = '0';
        branches.forEach(branch => {
          branch.style.transition = 'opacity 0.2s ease-out';
          branch.style.opacity = '0';
        });
      }, 400);

      // Remove lightning bolt
      setTimeout(() => {
        mainBolt.remove();
        branches.forEach(branch => branch.remove());
      }, 700);
    });
  }

  // Strike title letters sequentially and apply persistent glow
  function strikeTitleLetters(color) {
    const letters = title.querySelectorAll('.letter');

    letters.forEach((letter, index) => {
      setTimeout(() => {
        // Flash effect
        letter.style.transition = 'all 0.05s ease-out';
        letter.style.color = '#fff';
        letter.style.textShadow = `
          0 0 10px ${color},
          0 0 20px ${color},
          0 0 30px ${color},
          0 0 40px ${color}
        `;
        letter.style.transform = 'scale(1.2)';

        // Shake effect
        const shakeKeyframes = [
          { transform: 'translateX(0) scale(1.2)' },
          { transform: 'translateX(-2px) scale(1.2)' },
          { transform: 'translateX(2px) scale(1.2)' },
          { transform: 'translateX(-2px) scale(1.2)' },
          { transform: 'translateX(0) scale(1.2)' }
        ];
        letter.animate(shakeKeyframes, { duration: 100 });

        // Fade back but keep persistent glow
        setTimeout(() => {
          letter.style.transition = 'all 0.3s ease-out';
          letter.style.color = '';
          letter.style.textShadow = `0 0 5px ${color}`;
          letter.style.transform = 'scale(1)';

          // After the initial fade, apply persistent glow to the title
          if (index === letters.length - 1) {
            setTimeout(() => {
              applyPersistentGlow(color);
            }, 300);
          }
        }, 100);
      }, index * 50); // 50ms delay per letter
    });
  }

  // Apply persistent glow to the entire title with progressive breathing
  function applyPersistentGlow(color) {
    // Clear any existing letter shadows first
    const letters = title.querySelectorAll('.letter');
    letters.forEach(letter => {
      letter.style.textShadow = '';
    });

    // Store color for the animation and hover effect
    title.setAttribute('data-glow-color', color);
    title.style.setProperty('--strike-color', color);

    // Apply initial glow
    title.style.transition = 'text-shadow 0.5s ease-out';
    title.style.textShadow = `
      0 0 20px ${color},
      0 0 40px ${color},
      0 0 60px ${color},
      0 0 80px ${color}
    `;

    // First breath - strongest (starts immediately)
    title.classList.add('breathing-glow-strong');

    // After first breath (2s), switch to medium
    setTimeout(() => {
      title.classList.remove('breathing-glow-strong');
      title.classList.add('breathing-glow-medium');
    }, 2000);

    // After second breath (4s total), switch to weak
    setTimeout(() => {
      title.classList.remove('breathing-glow-medium');
      title.classList.add('breathing-glow-weak');
    }, 4000);

    // After third breath (6s total), fade away completely
    setTimeout(() => {
      title.classList.remove('breathing-glow-weak');
      title.style.transition = 'text-shadow 2s ease-out';
      title.style.textShadow = '';
      title.removeAttribute('data-glow-color');
    }, 6000);
  }

  // Track which logos have been struck
  const struckLogos = new Set();

  // Attach click listeners to logo items
  document.addEventListener('click', (e) => {
    const logoItem = e.target.closest('.logo-item');
    if (!logoItem) return;

    // Get a unique identifier for this logo (use data-color + text content)
    const logoName = logoItem.querySelector('.logo-name')?.textContent || '';
    const logoId = logoName.trim();

    // Only trigger once per logo
    if (struckLogos.has(logoId)) return;
    struckLogos.add(logoId);

    const color = logoItem.getAttribute('data-color') || '#ffffff';
    createLightningBolt(logoItem, color);

    // Reset after animation completes so it can be triggered again later
    setTimeout(() => {
      struckLogos.delete(logoId);
    }, 1000); // Cooldown period
  });
}

// Expose function globally
window.initLightningEasterEgg = initLightningEasterEgg;
