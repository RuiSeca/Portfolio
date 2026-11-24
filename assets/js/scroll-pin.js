/* ==================== SCROLL PIN HELPER ====================
 * Pins a "stage" (a viewport-sized element) while its tall "section" scrolls past,
 * and reports smoothed 0..1 progress. Used by the My Work horizontal showcase.
 *
 * Why not position:sticky? `html`, `body` and `.main` all set overflow-x:hidden, which
 * turns each into a scroll container and silently breaks sticky. So the stage is
 * toggled between three states instead:
 *   before -> position:absolute; top:0
 *   pinned -> position:fixed;    top:0
 *   after  -> position:absolute; bottom:0
 *
 * RULES for the section and its ancestors (they would become the containing block of
 * the fixed stage and break pinning): no transform, filter, contain, perspective or
 * will-change:transform. That also means: don't ScrollReveal them.
 *
 * All pins share ONE requestAnimationFrame loop that only runs while at least one
 * section is near the viewport.
 */

const pins = new Set();
let rafId = 0;
let lastTime = 0;

function loop(now) {
  const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.05) || 1 / 60;
  lastTime = now;
  pins.forEach((pin) => pin.tick(dt));
  rafId = pins.size ? requestAnimationFrame(loop) : 0;
}

function startLoop() {
  if (!rafId) {
    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);
  }
}

/**
 * @param {HTMLElement} section  tall element that provides the scroll distance
 * @param {HTMLElement} stage    element pinned to the viewport while section scrolls
 * @param {object} [options]
 * @param {number} [options.smoothing=6.5]  higher = snappier (frame-rate independent)
 * @param {(p:number, dt:number, state:object)=>void} [options.onUpdate]
 * @param {(visible:boolean, state:object)=>void} [options.onVisible]
 */
export function createScrollPin(section, stage, options = {}) {
  const { smoothing = 6.5, onUpdate, onVisible } = options;

  const state = {
    p: 0, // smoothed progress 0..1
    raw: 0, // raw progress 0..1 (what the scrollbar says)
    vel: 0, // smoothed progress per second
    pin: "", // 'before' | 'pinned' | 'after'
    range: 1, // scrollable distance in px (section height - stage height)
    visible: false,
  };

  let override = null; // debugging / screenshots: force a progress value

  if (getComputedStyle(section).position === "static") {
    section.style.position = "relative";
  }

  function measure() {
    state.range = Math.max(1, section.offsetHeight - stage.offsetHeight);
  }

  function setPin(next) {
    state.pin = next;
    const s = stage.style;
    s.position = next === "pinned" ? "fixed" : "absolute";
    s.left = "0";
    s.right = "0";
    s.top = next === "after" ? "auto" : "0";
    s.bottom = next === "after" ? "0" : "auto";
    stage.classList.toggle("is-pinned", next === "pinned");
    stage.classList.toggle("is-after", next === "after");
  }

  const pin = {
    state,

    /** Re-measure after layout changes. */
    refresh: measure,

    /** One frame of work: a single layout read, then writes. */
    tick(dt) {
      const top = section.getBoundingClientRect().top; // the only read per frame

      const next = top > 0 ? "before" : top < -state.range ? "after" : "pinned";
      if (next !== state.pin) setPin(next);

      state.raw =
        override !== null
          ? override
          : Math.min(1, Math.max(0, -top / state.range));

      const prev = state.p;
      state.p += (state.raw - state.p) * (1 - Math.exp(-smoothing * dt));
      if (Math.abs(state.raw - state.p) < 1e-4) state.p = state.raw;
      state.vel = dt > 0 ? (state.p - prev) / dt : 0;

      if (onUpdate) onUpdate(state.p, dt, state);
    },

    /** Jump straight to the current target (no catch-up sweep on re-entry). */
    snap() {
      pin.tick(0);
      state.p = state.raw;
      state.vel = 0;
      if (onUpdate) onUpdate(state.p, 0, state);
    },

    /** Force a progress value (null releases it). Handy for tests and screenshots. */
    setOverride(value, immediate = true) {
      override = value;
      if (immediate) {
        pin.tick(0);
        state.p = state.raw;
        state.vel = 0;
        if (onUpdate) onUpdate(state.p, 0, state);
      }
      if (value !== null && !rafId) startLoop();
    },

    destroy() {
      io.disconnect();
      ro.disconnect();
      pins.delete(pin);
    },
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      state.visible = entry.isIntersecting;
      measure();
      pin.snap(); // on exit this lands on 'before' / 'after' with p = 0 / 1
      if (state.visible) {
        pins.add(pin);
        startLoop();
      } else {
        pins.delete(pin);
      }
      if (onVisible) onVisible(state.visible, state);
    },
    { rootMargin: "10% 0px" }
  );
  io.observe(section);

  const ro = new ResizeObserver(() => {
    measure();
    if (state.visible) pin.snap();
  });
  ro.observe(section);
  ro.observe(stage);

  measure();
  setPin("before");
  return pin;
}
