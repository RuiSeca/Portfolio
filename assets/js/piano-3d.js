/* ==================== CAREER PIANO - SCROLL-DRIVEN 3D BUILD-IN ====================
 * As the piano scrolls into view it "builds": the cabinet tilts up out of the page in
 * perspective and the keys rise into place in a left-to-right wave, white keys first, then the
 * black keys on top. Scrubbed by scroll (reverses when scrolling back up).
 *
 * How it stays out of the way of the existing piano code (main.js / styles.css):
 *   - it only sets one CSS variable (--build, 0..1) and a class on #piano-container;
 *   - piano-3d.css uses the INDIVIDUAL transform properties (rotate / translate), which compose with -
 *     rather than replace - the existing `transform` rules (key press, mobile scale(...) !important);
 *   - once fully built the class is removed, so no 3D properties remain on the piano.
 *
 * No-op for prefers-reduced-motion and for browsers without individual transform properties
 * (the piano simply appears as it always did).
 */
(function () {
  "use strict";

  var mount = document.getElementById("piano-container");
  if (!mount) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supported = window.CSS && CSS.supports && CSS.supports("rotate", "1 0 0 1deg");
  if (reduced || !supported) return;

  var built = -1; // last --build value written
  var ticking = false;

  function clamp(x) {
    return Math.min(1, Math.max(0, x));
  }

  function update() {
    ticking = false;
    // Use the (untransformed) mount, not the frame: the frame is tilted while building.
    var top = mount.getBoundingClientRect().top;
    var vh = window.innerHeight;
    // 0 when the piano's top edge is at the bottom of the screen, 1 once it has reached ~38% of the screen
    var b = clamp((vh - top) / (vh * 0.62));
    if (Math.abs(b - built) < 0.002) return;
    built = b;
    mount.style.setProperty("--build", b.toFixed(3));
    mount.classList.toggle("piano-3d-building", b < 0.999);
  }

  function request() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  function start() {
    // main.js builds the piano inside its own DOMContentLoaded handler; index each key so the
    // CSS can stagger them (keys are appended white first, then black)
    var keys = mount.querySelectorAll(".piano-key");
    if (!keys.length) return false;
    keys.forEach(function (key, i) {
      key.style.setProperty("--i", i);
    });
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
    return true;
  }

  function init() {
    if (start()) return;
    // piano not built yet: wait for main.js to add the keys
    var observer = new MutationObserver(function () {
      if (start()) observer.disconnect();
    });
    observer.observe(mount, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
