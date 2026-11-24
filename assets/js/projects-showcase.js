/* ==================== MY WORK - PINNED HORIZONTAL SHOWCASE ====================
 * Desktop: #projects pins while vertical scroll slides the project panels sideways
 * (scroll-pin.js drives it). Each panel eases into a gentle 3D pose as it nears the
 * centre, and its image tilts toward the pointer.
 * Mobile (<768px) and prefers-reduced-motion: a plain vertical stack (no pin, no motion).
 *
 * Project text/tech data stays in `projectData` (main.js); this file only renders the chips and
 * exposes window.projectsShowcase.slideTo(i) for the story viewer (main.js calls it through the
 * Swiper stand-in) and for keyboard focus.
 */

import { createScrollPin } from "./scroll-pin.js";

const section = document.getElementById("projects");
if (section && section.classList.contains("pw")) init(section);

function init(section) {
  const stage = section.querySelector(".pw__stage");
  const viewport = section.querySelector(".pw__viewport");
  const track = section.querySelector(".pw__track");
  const panels = [...track.querySelectorAll(".pw-panel")];
  const counter = section.querySelector(".pw__counter b");
  const fill = section.querySelector(".pw__fill");
  const live = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

  /* ---------- tech chips from projectData (a global const declared in main.js) ---------- */
  panels.forEach((panel) => {
    const list = panel.querySelector(".pw-panel__tags");
    const data = typeof projectData !== "undefined" ? projectData[panel.dataset.project] : null;
    ((data && data.technologies) || []).slice(0, 5).forEach((tech) => {
      const li = document.createElement("li");
      li.textContent = tech;
      list.appendChild(li);
    });
  });

  /* ---------- pointer tilt on each panel's image (not on touch screens) ---------- */
  if (!window.matchMedia("(pointer: coarse)").matches) {
    panels.forEach((panel) => {
      const media = panel.querySelector(".pw-panel__media");
      if (!media) return;
      let raf = 0;
      let nx = 0;
      let ny = 0;
      let glare = 0;

      const apply = () => {
        raf = 0;
        media.style.setProperty("--tx", (-ny * 10).toFixed(2));
        media.style.setProperty("--ty", (nx * 14).toFixed(2));
        media.style.setProperty("--mx", ((nx + 0.5) * 100).toFixed(1) + "%");
        media.style.setProperty("--my", ((ny + 0.5) * 100).toFixed(1) + "%");
        media.style.setProperty("--glare", glare);
      };

      media.addEventListener("pointermove", (e) => {
        const r = media.getBoundingClientRect();
        nx = (e.clientX - r.left) / r.width - 0.5;
        ny = (e.clientY - r.top) / r.height - 0.5;
        glare = 1;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      media.addEventListener("pointerleave", () => {
        nx = ny = glare = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      });
    });
  }

  /* ---------- pinned horizontal layout ---------- */
  let pin = null;
  const geo = { travel: 0, dwell: 0, length: 1, vw: 1, centers: [] };
  const cache = { x: NaN, index: -1, fill: -1, pose: panels.map(() => "") };

  function measure() {
    const vh = stage.offsetHeight;
    geo.vw = viewport.clientWidth;
    geo.travel = Math.max(0, track.scrollWidth - geo.vw);
    geo.dwell = Math.round(vh * 0.18); // a short pause on the first / last panel
    geo.length = geo.travel + geo.dwell * 2;
    geo.centers = panels.map((p) => p.offsetLeft + p.offsetWidth / 2);
    // the section is as tall as the stage plus the scroll distance the pin needs
    section.style.height = vh + geo.length + "px";
  }

  function onUpdate(p) {
    const x = clamp(p * geo.length - geo.dwell, 0, geo.travel);

    // (written so that cache.x = NaN, used to force a refresh, counts as "changed")
    if (!(Math.abs(x - cache.x) <= 0.05)) {
      cache.x = x;
      track.style.transform = "translate3d(" + (-x).toFixed(2) + "px,0,0)";

      let nearest = 0;
      let best = Infinity;
      panels.forEach((el, i) => {
        const c = (geo.centers[i] - x - geo.vw / 2) / geo.vw; // 0 = centred, +/-1 = a full screen away
        const a = Math.min(1, Math.abs(c));
        if (a < best) {
          best = a;
          nearest = i;
        }
        const key = c.toFixed(3);
        if (key !== cache.pose[i]) {
          cache.pose[i] = key;
          el.style.setProperty("--pry", (-c * 16).toFixed(2) + "deg");
          el.style.setProperty("--psc", (1 - a * 0.1).toFixed(3));
          el.style.setProperty("--pop", (1 - a * 0.5).toFixed(3));
        }
      });

      if (nearest !== cache.index) {
        cache.index = nearest;
        counter.textContent = String(nearest + 1).padStart(2, "0");
        panels.forEach((el, i) => el.classList.toggle("is-active", i === nearest));
      }
    }

    if (Math.abs(p - cache.fill) > 0.0005) {
      cache.fill = p;
      fill.style.transform = "scaleX(" + p.toFixed(4) + ")";
    }
  }

  function enable() {
    if (pin) return;
    section.classList.add("pw--live");
    measure();
    pin = createScrollPin(section, stage, { smoothing: 9, onUpdate });
    pin.snap();
  }

  function disable() {
    if (!pin) return;
    pin.destroy();
    pin = null;
    section.classList.remove("pw--live");
    section.style.height = "";
    stage.removeAttribute("style");
    track.style.transform = "";
    panels.forEach((el) => {
      el.removeAttribute("style");
      el.classList.remove("is-active");
    });
    cache.x = NaN;
    cache.index = -1;
    cache.fill = -1;
    cache.pose = panels.map(() => "");
  }

  function sync() {
    if (live.matches) enable();
    else disable();
  }
  live.addEventListener("change", sync);

  let resizeTimer = 0;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!pin) return;
      measure();
      pin.refresh();
      cache.x = NaN;
      pin.snap();
    }, 120);
  }).observe(viewport);

  /* ---------- bring a project into view (story viewer + keyboard focus) ---------- */
  function slideTo(index) {
    if (!pin) return;
    // while a modal has locked the body (position:fixed) the page can't scroll
    if (document.body.style.position === "fixed") return;
    const i = clamp(index, 0, panels.length - 1);
    const x = clamp(geo.centers[i] - geo.vw / 2, 0, geo.travel);
    const target = (x + geo.dwell) / geo.length;
    const top = section.getBoundingClientRect().top + window.scrollY + target * pin.state.range;
    window.scrollTo({ top, behavior: "instant" });
  }
  window.projectsShowcase = { slideTo };

  // tabbing to a panel's button must also slide that panel into view
  panels.forEach((panel, i) => panel.addEventListener("focusin", () => slideTo(i)));

  sync();
}
