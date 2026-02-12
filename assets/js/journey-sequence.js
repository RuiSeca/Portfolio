/* ==================== JOURNEY SEQUENCE LOGIC (CINEMATIC INTRO) ==================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Journey: Initializing (Cinematic Mode)...');
    
    const section = document.querySelector('.journey-sequence-section');
    const container = document.querySelector('.journey-sequence__container');
    const scrollSymbol = document.querySelector('.journey-scroll-symbol');
    const startText = document.querySelector('.journey-start-text');
    
    if (!section || !container) {
        console.error('Journey: Section or Container not found');
        return;
    }

    const canvas = document.getElementById('journey-canvas');
    const context = canvas.getContext('2d');
    const loaderBar = document.querySelector('.journey-loader__bar');
    const loader = document.querySelector('.journey-loader');
    
    // Beats
    const beats = [
        document.querySelector('.journey-intro'), 
        document.querySelector('.journey-beat-1'), 
        document.querySelector('.journey-beat-2'), 
        document.querySelector('.journey-beat-3'), 
        document.querySelector('.journey-beat-4')
    ];

    // Configuration
    const frameCount = 232; 
    const images = [];
    const imagePath = (index) => {
        const paddedIndex = index.toString().padStart(3, '0');
        return `assets/img/space/ezgif-frame-${paddedIndex}.jpg`;
    };

    // State
    const state = {
        framesLoaded: 0,
        currentFrame: 0,
        scrollProgress: 0,
        targetProgress: 0,
        animationStarted: false,
        pinState: 'default' 
    };

    // Set canvas dimensions
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        if (images[state.currentFrame] && images[state.currentFrame].complete) {
            drawImage(images[state.currentFrame]);
        }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Start Animation Control
    const startAnimation = () => {
        if (state.animationStarted) return;
        state.animationStarted = true;
        console.log('Journey: Animation Loop Started');
        requestAnimationFrame(update);
    };

    // Check progress
    const checkLoadProgress = () => {
        const percentage = (state.framesLoaded / frameCount) * 100;
        if (loaderBar) loaderBar.style.width = `${percentage}%`;

        if (state.framesLoaded >= frameCount) { 
            console.log('Journey: All frames accounted for.');
            if (loader) loader.style.opacity = '0';
            setTimeout(() => {
                if (loader) loader.style.display = 'none';
            }, 500);
            startAnimation();
        }
    };

    // Failsafe
    setTimeout(() => {
        if (!state.animationStarted) {
            console.warn('Journey: Failsafe timer triggered.');
            if (loader) loader.style.display = 'none';
            startAnimation();
        }
    }, 5000);

    // Image Loader
    const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = imagePath(i);
            img.onload = () => { state.framesLoaded++; checkLoadProgress(); };
            img.onerror = () => { state.framesLoaded++; checkLoadProgress(); };
            images.push(img);
        }
    };

    const drawImage = (img) => {
        if (!img || !img.width) return;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        /* MATH.MAX (COVER) SCALING */
        const finalRatio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - img.width * finalRatio) / 2;
        const centerShift_y = (canvas.height - img.height * finalRatio) / 2;

        context.drawImage(
            img, 
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * finalRatio, img.height * finalRatio
        );
    };

    // Update Loop
    const update = () => {
        // 1. Manual Pinning Logic
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;
        const scrollableDistance = sectionHeight - viewportHeight;

        let newPinState = 'default';
        if (sectionTop <= 0 && sectionRect.bottom >= viewportHeight) {
            newPinState = 'fixed'; 
        } else if (sectionRect.bottom < viewportHeight) {
            newPinState = 'bottom';
        } else {
            newPinState = 'default';
        }

        if (state.pinState !== newPinState) {
            state.pinState = newPinState;
            container.classList.remove('is-fixed', 'is-bottom');
            if (newPinState === 'fixed') container.classList.add('is-fixed');
            if (newPinState === 'bottom') container.classList.add('is-bottom');
        }

        // 2. Calculate Progress
        let progress = 0;
        if (scrollableDistance > 0) {
            progress = -sectionTop / scrollableDistance;
        }
        progress = Math.max(0, Math.min(1, progress));
        state.targetProgress = progress;
        state.scrollProgress += (state.targetProgress - state.scrollProgress) * 0.1;

        // 3. Render Logic
        const videoStart = 0.25;
        const videoEnd = 1.0;
        
        if (state.scrollProgress < videoStart - 0.05) {
            canvas.style.opacity = 0;
        } else if (state.scrollProgress >= videoStart - 0.05) {
            canvas.style.opacity = Math.min(1, (state.scrollProgress - (videoStart - 0.05)) / 0.05);
        }

        if (state.scrollProgress >= videoStart) {
            const videoP = (state.scrollProgress - videoStart) / (videoEnd - videoStart);
            const frameIndex = Math.floor(videoP * (frameCount - 1));
            state.currentFrame = frameIndex;
            let imgToDraw = images[frameIndex];
            if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
               drawImage(imgToDraw);
            }
        }

        // 4. Text Beats
        const updateBeat = (beat, start, end) => {
            if (!beat) return;
            const fadeInEnd = start + 0.02;
            const fadeOutStart = end - 0.02;
            let opacity = 0;
            let translateY = 30;

            if (state.scrollProgress < start) {
                opacity = 0; translateY = 30;
            } else if (state.scrollProgress >= start && state.scrollProgress < fadeInEnd) {
                const p = (state.scrollProgress - start) / (fadeInEnd - start);
                opacity = p; translateY = 30 * (1 - p);
            } else if (state.scrollProgress >= fadeInEnd && state.scrollProgress <= fadeOutStart) {
                opacity = 1; translateY = 0;
            } else if (state.scrollProgress > fadeOutStart && state.scrollProgress <= end) {
                const p = (state.scrollProgress - fadeOutStart) / (end - fadeOutStart);
                opacity = 1 - p; translateY = -30 * p;
            }
            beat.style.opacity = opacity;
            beat.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
        };
        
        updateBeat(beats[0], 0.06, 0.22);
        
        const narrativeStart = 0.25; 
        const narrativeDuration = 0.75;
        const beatDuration = narrativeDuration / 4; 
        
        for (let i = 1; i < beats.length; i++) {
            const beatIndex = i - 1;
            const start = narrativeStart + (beatIndex * beatDuration);
            const end = start + beatDuration;
            updateBeat(beats[i], start, end);
        }

        // 5. Intro Elements Vanish effect (Symbol + Start Text)
        // Refactored to allow different durations per element
        const applyVanishEffect = (el, effectEnd) => {
             if (!el) return;
             
             if (state.scrollProgress < effectEnd) {
                 const p = state.scrollProgress / effectEnd; 
                 const opacity = 1 - p;
                 const scale = 1 + p * 0.5;
                 const blur = p * 10;
                 const transY = p * -30;
                 
                 el.style.opacity = opacity;
                 
                 // Check if it's the start text (centered) or symbol (horizontal center only)
                 const isCentered = el.classList.contains('journey-start-text');
                 
                 if (isCentered) {
                     el.style.transform = `translate(-50%, calc(-50% + ${transY}px)) scale(${scale})`;
                 } else {
                     el.style.transform = `translateX(-50%) translateY(${transY}px) scale(${scale})`;
                 }
                 
                 el.style.filter = `blur(${blur}px)`;
             } else {
                 el.style.opacity = 0;
             }
        };

        // Symbol vanishes at the same time as Title (0.06) per user request
        applyVanishEffect(scrollSymbol, 0.06);
        applyVanishEffect(startText, 0.06);

        requestAnimationFrame(update);
    };

    preloadImages();
});
