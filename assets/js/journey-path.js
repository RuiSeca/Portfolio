/* ==================== ABOUT - JOURNEY PATH ====================
 * A ship leaves from behind the profile photo in the hero, flies down the page and docks at the
 * first stop; small "bases" build up along its path.
 *   - One SVG layer is injected as the first child of <main>. It sits ABOVE the hero's galaxy but BELOW
 *     the hero text/photo and the About text (z-index), so the ship can hide behind the photo and slide
 *     behind the copy.
 *   - Path: smooth S-curves through the hero start, a detour beside the About heading (wide screens),
 *     the launch pad and each step (vertical tangents at every stop, so y only ever increases).
 *   - Ship: follows the scroll. It starts hidden behind the photo, emerges and catches up with the
 *     viewport, docks at the first stop for a moment, accelerates away, and later parks above the last
 *     base. Lights are blue while it arrives and gold once it has passed; the last base (the current
 *     role) stays softly pulsing blue.
 *
 * Plain SVG + CSS variables (theme colours live in journey-path.css), no WebGL.
 * With prefers-reduced-motion the finished picture is drawn once. Without JS the markup is a plain list.
 */

const root = document.getElementById("about");
const main = document.querySelector("main");
if (root && main && root.classList.contains("jp")) init(root, main);

function init(root, main) {
  const hero = document.getElementById("home");
  const photo = document.querySelector(".home__image");
  const head = root.querySelector(".jp__head");
  const startEl = root.querySelector(".jp__start");
  const steps = [...root.querySelectorAll(".jp-step")];
  const bodies = steps.map((s) => s.querySelector(".jp-step__body"));
  const anchors = steps.map((s) => s.querySelector(".jp-step__node"));

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const wide = window.matchMedia("(min-width: 800px)");

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = (a, b, x) => {
    const t = clamp((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  };

  /* ====================================================================
   * SVG ART  (all colours come from CSS variables, so both themes work)
   * ==================================================================== */

  const defs = `
    <defs>
      <linearGradient id="jp-g-hull" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="jp-st-h0"/><stop offset=".5" class="jp-st-h1"/><stop offset="1" class="jp-st-h2"/>
      </linearGradient>
      <linearGradient id="jp-g-wing" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" class="jp-st-w0"/><stop offset="1" class="jp-st-w1"/>
      </linearGradient>
      <linearGradient id="jp-g-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#c4f1ff"/><stop offset="1" stop-color="#2f86c4"/>
      </linearGradient>
      <linearGradient id="jp-g-flame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4cc9ff" stop-opacity="0"/>
        <stop offset=".55" stop-color="#4cc9ff" stop-opacity=".75"/>
        <stop offset="1" stop-color="#e8f8ff" stop-opacity="1"/>
      </linearGradient>
      <radialGradient id="jp-g-aura">
        <stop offset="0" stop-color="#4cc9ff" stop-opacity=".2"/><stop offset="1" stop-color="#4cc9ff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="jp-g-face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="jp-st-f0"/><stop offset="1" class="jp-st-f1"/>
      </linearGradient>
      <linearGradient id="jp-g-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="jp-st-s0"/><stop offset="1" class="jp-st-s1"/>
      </linearGradient>
      <filter id="jp-blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>

      <!-- The ship: top-down, nose towards +y (the direction of travel). ~70 wide, ~82 long. -->
      <g id="jp-ship-art">
        <circle r="58" fill="url(#jp-g-aura)"/>
        <ellipse class="jp-ship-shadow" cx="9" cy="8" rx="24" ry="40" filter="url(#jp-blur)"/>
        <path class="jp-flame" d="M-10.5 -30 Q-7 -66 -3.5 -30 Z" fill="url(#jp-g-flame)"/>
        <path class="jp-flame" d="M3.5 -30 Q7 -66 10.5 -30 Z" fill="url(#jp-g-flame)" style="animation-delay:-.08s"/>
        <g class="jp-ship-line">
          <path d="M8 12 L35 -22 L35 -31 L8 -26 Z" fill="url(#jp-g-wing)"/>
          <path d="M-8 12 L-35 -22 L-35 -31 L-8 -26 Z" fill="url(#jp-g-wing)"/>
          <path d="M27 -11 L35 -22 L35 -31 L25 -28 Z" fill="#ff7a3d"/>
          <path d="M-27 -11 L-35 -22 L-35 -31 L-25 -28 Z" fill="#ff7a3d"/>
          <rect x="-11" y="-33" width="7" height="7" rx="1.6" fill="#1b2136"/>
          <rect x="4" y="-33" width="7" height="7" rx="1.6" fill="#1b2136"/>
          <path d="M-9.5 -24 L-16 -37 L-9.5 -34 Z" fill="#8798c0"/>
          <path d="M9.5 -24 L16 -37 L9.5 -34 Z" fill="#8798c0"/>
          <path d="M-9.5 -34 C-12 -8 -9 24 0 48 C9 24 12 -8 9.5 -34 Z" fill="url(#jp-g-hull)"/>
        </g>
        <path d="M0 -30 L0 38" stroke="rgba(255,255,255,.55)" stroke-width="1" stroke-linecap="round"/>
        <ellipse cx="0" cy="17" rx="4.8" ry="11" fill="url(#jp-g-glass)"/>
        <ellipse cx="-1.4" cy="13" rx="1.4" ry="4.5" fill="#fff" opacity=".55"/>
      </g>
      <clipPath id="jp-clip"><rect id="jp-clip-rect" x="0" y="0" width="10" height="10"/></clipPath>
    </defs>`;

  /* ---- building blocks. Origin = the base's ground centre, +y is down. ----
   * blk(): a box in light oblique projection - lit front, darker right side, lighter top (a touch of 3D). */
  const blk = (x, y, w, h, d = 7) => {
    const dx = d;
    const dy = d * 0.62;
    return (
      `<path class="jp-side" d="M${x + w} ${y} L${x + w + dx} ${y - dy} V${y + h - dy} L${x + w} ${y + h} Z"/>` +
      `<rect class="jp-face" x="${x}" y="${y}" width="${w}" height="${h}" rx="1.4"/>` +
      `<path class="jp-top" d="M${x} ${y} L${x + dx} ${y - dy} H${x + w + dx} L${x + w} ${y} Z"/>`
    );
  };
  const win = (x, y, dim = false) =>
    `<rect class="jp-light${dim ? " jp-dim" : ""}" x="${x}" y="${y}" width="3.8" height="2.7" rx=".7"/>`;
  const wins = (x, y, cols, rows, sx = 8, sy = 7) => {
    let s = "";
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += win(x + c * sx, y + r * sy, (r + c) % 3 === 2);
    return s;
  };
  const dot = (x, y, r = 2.2, beacon = false) =>
    `<circle class="jp-light${beacon ? " jp-beacon" : ""}" cx="${x}" cy="${y}" r="${r}"/>`;
  const door = (x, y, w, h) => `<rect class="jp-door" x="${x}" y="${y}" width="${w}" height="${h}" rx="1"/>`;
  const line = (d) => `<path class="jp-lattice" d="${d}"/>`;
  const mast = (x, y, h) => `<rect class="jp-mast" x="${x}" y="${y}" width="1.5" height="${h}"/>`;
  const shadow = (rx) => `<ellipse class="jp-shadow" cx="9" cy="3" rx="${rx}" ry="8"/>`;
  const panel = (pts, grid) => `<path class="jp-solar" d="${pts}"/><path class="jp-solar-grid" d="${grid}"/>`;
  const layer = (i, inner) => `<g class="jp-layer" style="--i:${i}">${inner}</g>`;

  // Text blocks sit on the LEFT for steps 1 and 3 and on the RIGHT for 2 and 4, so each base keeps its
  // extra details (panels, dishes) on the side away from its text.
  const BASES = [
    {
      // 0: launch pad - where the ship docks first
      n: 3,
      art:
        layer(0, shadow(48) + blk(-36, -6, 72, 6, 8) + line("M-30 0 H30 M0 -9 V9") + win(-28, -3.5) + win(24, -3.5)) +
        layer(1, blk(-46, -30, 5, 24, 3) + blk(-49, -34, 11, 5, 3) + dot(-43.5, -37, 1.8) + blk(41, -30, 5, 24, 3) + blk(38, -34, 11, 5, 3) + dot(43.5, -37, 1.8)) +
        layer(2, blk(14, -20, 20, 14, 6) + wins(18, -15, 3, 1, 6) + line("M24 -20 V-32") + dot(24, -34, 1.8)),
    },
    {
      // 1: Foundation - stepped hall with columns, door, windows, roof vents
      n: 5,
      art:
        layer(0, shadow(56) + blk(-44, -12, 88, 12, 8) + blk(-12, -3, 24, 3, 3) + wins(-38, -8, 2, 1, 8) + wins(24, -8, 2, 1, 8)) +
        layer(1, blk(-42, -32, 6, 20, 3) + blk(36, -32, 6, 20, 3) + dot(-39, -35, 1.8) + dot(39, -35, 1.8)) +
        layer(2, blk(-30, -34, 60, 22, 8) + door(-4, -22, 8, 10) + wins(-25, -29, 2, 2, 8, 7) + wins(15, -29, 2, 2, 8, 7)) +
        layer(3, blk(-20, -52, 40, 18, 7) + wins(-15, -47, 4, 2, 9, 7)) +
        layer(4, blk(-12, -60, 24, 8, 5) + door(-8, -63, 4, 3) + door(2, -63, 4, 3) + mast(3, -80, 20) + dot(3.8, -82, 2.4, true)),
    },
    {
      // 2: Exploration - tower with a dish; module + solar panel on the left, tank on the right
      n: 5,
      art:
        layer(0, shadow(46) + blk(-30, -10, 60, 10, 7) + wins(-22, -6, 2, 1, 8) + wins(16, -6, 1, 1)) +
        layer(
          1,
          `<rect class="jp-face" x="34" y="-24" width="14" height="14" rx="3"/><ellipse class="jp-top" cx="41" cy="-24" rx="7" ry="2.5"/>` +
            line("M34 -17 H48") + blk(-56, -26, 22, 16, 6) + wins(-51, -21, 3, 1, 6) +
            panel("M-60 -30 L-90 -40 L-90 -26 L-60 -18 Z", "M-68 -32 V-21 M-76 -35 V-23 M-84 -38 V-25")
        ) +
        layer(2, blk(-10, -50, 20, 40, 6) + wins(-1.9, -44, 1, 4, 0, 8) + blk(-12, -54, 24, 4, 4)) +
        layer(
          3,
          `<g transform="rotate(-20 0 -58)">${line("M0 -56 V-68")}<path class="jp-dish" d="M-22 -68 Q0 -48 22 -68"/>${dot(0, -70, 2.4, true)}</g>`
        ) +
        layer(4, line("M-34 -18 L-12 -26") + dot(-56, -30, 1.8)),
    },
    {
      // 3: Specialization - shield dome (security), pylons, hut and dish on the right
      n: 5,
      art:
        layer(0, shadow(52) + blk(-40, -10, 80, 10, 8) + wins(-34, -6, 2, 1, 8) + wins(22, -6, 2, 1, 8)) +
        layer(1, blk(-46, -22, 4, 12, 3) + blk(42, -22, 4, 12, 3) + dot(-44, -25, 1.7) + dot(44, -25, 1.7)) +
        layer(2, `<path class="jp-dome" d="M-32 -10 A32 32 0 0 1 32 -10 Z"/>` + line("M-32 -10 H32")) +
        layer(3, line("M-19 -10 L-9.5 -26 L9.5 -26 L19 -10 M-9.5 -26 L0 -39 L9.5 -26 M0 -10 L0 -39 M-27 -20 Q0 -27 27 -20")) +
        layer(
          4,
          `<path class="jp-shield" d="M0 -35 L8 -31 V-23 C8 -18 4 -15 0 -13 C-4 -15 -8 -18 -8 -23 V-31 Z"/>` + dot(0, -24, 2.3, true) +
            blk(50, -22, 14, 12, 5) + wins(54, -17, 2, 1, 6) + `<path class="jp-dish" d="M56 -34 Q64 -24 72 -34"/>` + line("M64 -29 V-22")
        ),
    },
    {
      // 4: Now (Cognizant) - the tallest tower: tiers, lit windows, mast, solar wing, orbit ring
      n: 6,
      art:
        layer(0, shadow(50) + blk(-34, -12, 68, 12, 8) + wins(-26, -8, 2, 1, 8) + wins(18, -8, 2, 1, 8)) +
        layer(1, blk(-22, -46, 44, 34, 8) + wins(-16, -40, 5, 4, 8, 7)) +
        layer(2, blk(-14, -68, 28, 22, 7) + wins(-8, -62, 3, 2, 8, 7)) +
        layer(3, blk(-8, -82, 16, 14, 5) + win(-1.9, -77) + line("M-11 -82 H11")) +
        layer(4, mast(-0.75, -106, 24) + `<rect class="jp-mast" x="-9" y="-97" width="18" height="1.5"/>` + dot(0, -109, 3.8, true)) +
        layer(5, panel("M-24 -62 L-60 -72 L-60 -54 L-24 -44 Z", "M-34 -65 V-48 M-44 -67 V-50 M-54 -70 V-52") + `<ellipse class="jp-orbit" cx="0" cy="-54" rx="58" ry="14"/>` + dot(58, -54, 2)),
    },
  ];

  /* ---- build the overlay once: first child of <main> ---- */
  const overlay = document.createElement("div");
  overlay.className = "jp-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML =
    `<svg class="jp__svg" focusable="false" xmlns="http://www.w3.org/2000/svg">` +
    defs +
    `<g class="jp-trail" clip-path="url(#jp-clip)">
       <path class="jp-path"></path>
       <path class="jp-path-done"></path>
       <g class="jp-conns"></g>
     </g>
     <g class="jp-bases"></g>
     <g class="jp-ship"><g class="jp-ship__bob"><use href="#jp-ship-art"/></g></g>
     </svg>`;
  main.insertBefore(overlay, main.firstChild);

  const svg = overlay.querySelector("svg");
  const basePath = svg.querySelector(".jp-path");
  const donePath = svg.querySelector(".jp-path-done");
  const connsG = svg.querySelector(".jp-conns");
  const basesG = svg.querySelector(".jp-bases");
  const shipG = svg.querySelector(".jp-ship");
  const clipRect = svg.querySelector("#jp-clip-rect");

  const baseEls = BASES.map((b) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "jp-base");
    g.setAttribute("style", `--n:${b.n};--b:0`);
    g.innerHTML = `<ellipse class="jp-plate" cx="0" cy="0" rx="66" ry="17"/><ellipse class="jp-ring" cx="0" cy="0" rx="50" ry="12.5"/>${b.art}`;
    basesG.appendChild(g);
    return g;
  });

  const connEls = steps.map(() => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.innerHTML = `<path class="jp-conn"/><circle class="jp-conn-dot" r="2.6"/>`;
    connsG.appendChild(g);
    return { g, line: g.querySelector(".jp-conn"), dot: g.querySelector(".jp-conn-dot"), len: 1 };
  });

  /* ====================================================================
   * LAYOUT: measure the DOM, build the path, sample it
   * ==================================================================== */

  const N = 900; // path samples
  const SX = new Float32Array(N);
  const SY = new Float32Array(N);
  const SL = new Float32Array(N);
  let total = 1;
  let nodes = []; // bases: launch pad + one per step  [{x, y}]
  let startY = 0; // where the ship starts (behind the photo)
  let padY = 0;
  let dockY = 0; // where it hovers while docked: just above the launch pad, so the pad stays visible
  let parkY = 0;
  let parkGap = 0;
  let a0 = 0; // viewport anchor (in main coordinates) when the page is scrolled to the top
  let mainDocTop = 0;
  let isWide = true;
  let baseScale = 1;
  let shipScale = 1;
  let laidOut = false;

  function layout() {
    const mr = main.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    const W = Math.round(mr.width);
    const H = Math.round(rr.bottom - mr.top);
    if (!W || !H) return false;
    overlay.style.height = H + "px";
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    mainDocTop = mr.top + window.scrollY;

    isWide = wide.matches;
    baseScale = isWide ? 1.25 : 0.62;
    shipScale = isWide ? 0.88 : 0.74;
    const cx = isWide ? W / 2 : 42;

    // --- the stops: launch pad first, then one per step ---
    const sr = startEl.getBoundingClientRect();
    nodes = [{ x: Math.round(isWide ? sr.left - mr.left + sr.width / 2 : cx), y: Math.round(sr.top - mr.top + sr.height * 0.62) }];
    anchors.forEach((a, i) => {
      const r = a.getBoundingClientRect();
      const sway = isWide ? (i % 2 === 0 ? -22 : 22) : i % 2 === 0 ? -5 : 5;
      nodes.push({ x: Math.round(r.left - mr.left + r.width / 2 + sway), y: Math.round(r.top - mr.top + r.height / 2) });
    });
    padY = nodes[0].y;
    dockY = padY - (40 * shipScale + 38 * baseScale);

    // --- where the ship starts: its nose just peeks out of the bottom of the photo ---
    let heroBottom = 0;
    let start;
    if (photo && hero) {
      const pr = photo.getBoundingClientRect();
      start = { x: Math.round(pr.left - mr.left + pr.width / 2), y: Math.round(pr.bottom - mr.top - 14) };
      heroBottom = Math.round(hero.getBoundingClientRect().bottom - mr.top);
    } else {
      start = { x: nodes[0].x, y: nodes[0].y - 220 };
      heroBottom = start.y;
    }
    startY = start.y;
    // the dashed road and gold trail are only drawn below the hero (the hero stays clean: just the ship)
    clipRect.setAttribute("x", 0);
    clipRect.setAttribute("y", heroBottom);
    clipRect.setAttribute("width", W);
    clipRect.setAttribute("height", Math.max(1, H - heroBottom));

    // --- the route: start -> (detour beside the heading on wide screens) -> pad -> steps ---
    const pts = [start];
    if (isWide && head) {
      const hr = head.getBoundingClientRect();
      const detour = Math.min(430, W / 2 - 70);
      if (detour > 300) pts.push({ x: Math.round(W / 2 + detour), y: Math.round((hr.top + hr.bottom) / 2 - mr.top) });
    }
    pts.push(...nodes);

    // cubic Beziers with VERTICAL tangents at every point: smooth S-curves, y strictly increasing
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const dy = (b.y - a.y) * 0.55;
      d += ` C ${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`;
    }
    basePath.setAttribute("d", d);
    donePath.setAttribute("d", d);
    total = basePath.getTotalLength() || 1;
    donePath.style.strokeDasharray = `${total}`;
    for (let i = 0; i < N; i++) {
      const p = basePath.getPointAtLength((total * i) / (N - 1));
      SX[i] = p.x;
      SY[i] = p.y;
      SL[i] = (total * i) / (N - 1);
    }

    // --- bases ---
    nodes.forEach((n, i) => {
      baseEls[i].setAttribute("transform", `translate(${n.x} ${n.y}) scale(${baseScale})`);
    });

    // --- connectors from each base to its text block ---
    steps.forEach((_, i) => {
      const n = nodes[i + 1];
      const br = bodies[i].getBoundingClientRect();
      const textOnLeft = isWide && i % 2 === 0;
      const reach = 64 * baseScale;
      const x1 = n.x + (textOnLeft ? -reach : reach);
      const x2 = isWide ? (textOnLeft ? br.right - mr.left - 14 : br.left - mr.left + 14) : br.left - mr.left - 4;
      const c = connEls[i];
      c.line.setAttribute("d", `M ${x1} ${n.y} L ${x2} ${n.y}`);
      c.len = Math.abs(x2 - x1);
      c.line.style.strokeDasharray = `${c.len}`;
      c.dot.setAttribute("cx", x2);
      c.dot.setAttribute("cy", n.y);
    });

    // the ship stops hovering just above the last base (nose towards it), so both stay visible
    parkGap = 116 * baseScale + 44 * shipScale;
    parkY = nodes[nodes.length - 1].y - parkGap;
    a0 = window.innerHeight * 0.6 - mainDocTop; // anchor (viewport 60% down) when scrollY = 0

    laidOut = true;
    return true;
  }

  function lengthAtY(y) {
    if (y <= SY[0]) return 0;
    if (y >= SY[N - 1]) return total;
    let lo = 0;
    let hi = N - 1;
    while (hi - lo > 1) {
      const m = (lo + hi) >> 1;
      if (SY[m] <= y) lo = m;
      else hi = m;
    }
    const f = (y - SY[lo]) / (SY[hi] - SY[lo] || 1);
    return SL[lo] + (SL[hi] - SL[lo]) * f;
  }

  /* The ship's target y for the viewport anchor `a` (60% down the screen, in main coordinates):
   *   1. launch  - hidden behind the photo at the top of the page, it sinks at twice the page speed until it
   *                catches up with the anchor
   *   2. follow  - it rides the anchor
   *   3. dock    - at the first stop it stays put for `dwell` px of scrolling (the pad lights are blue)
   *   4. depart  - then it speeds away at twice the page speed until it is back on the anchor
   *   5. park    - it stops above the last base                                                       */
  function shipTarget(a, vh) {
    const dwell = vh * 0.3;
    let y;
    if (a < dockY) y = Math.max(startY, Math.min(a, startY + 2 * (a - a0)));
    else y = Math.min(a, Math.max(dockY, dockY + 2 * (a - dockY - dwell)));
    return clamp(y, startY, parkY);
  }

  /* ====================================================================
   * RENDER: everything is a function of the ship's y position
   * ==================================================================== */

  const cache = {
    ship: "",
    done: -1,
    base: BASES.map(() => ({ b: -1, s: "" })),
    step: steps.map(() => ({ w: -1, s: "" })),
    conn: steps.map(() => ({ s: "" })),
  };
  const LAST = BASES.length - 1;

  function setState(el, store, state) {
    if (store.s !== state) {
      store.s = state;
      el.setAttribute("data-state", state);
    }
  }

  /** shipY: ship's y in main coordinates. final: draw the finished state (reduced motion). */
  function render(shipY, vh, final) {
    // --- ship: position on the path + heading ---
    const s = lengthAtY(shipY);
    const f = (s / total) * (N - 1);
    const i = Math.min(N - 2, Math.floor(f));
    const k = f - i;
    const x = SX[i] + (SX[i + 1] - SX[i]) * k;
    const y = SY[i] + (SY[i + 1] - SY[i]) * k;
    const a = Math.max(0, i - 4);
    const b2 = Math.min(N - 1, i + 5);
    const tx = SX[b2] - SX[a];
    const ty = SY[b2] - SY[a];
    const deg = (Math.atan2(-tx, ty) * 180) / Math.PI; // nose points +y, turn it onto the tangent
    // a bit smaller while it is still emerging from behind the photo
    const grow = final ? 1 : 0.62 + 0.38 * smooth(0, 1, (shipY - startY) / 190);
    const shipT = `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)}) scale(${(shipScale * grow).toFixed(3)})`;
    if (shipT !== cache.ship) {
      cache.ship = shipT;
      shipG.setAttribute("transform", shipT);
    }

    // --- travelled part of the path (gold) ---
    const off = Math.round((total - s) * 10) / 10;
    if (off !== cache.done) {
      cache.done = off;
      donePath.style.strokeDashoffset = off;
    }

    // --- bases + step text ---
    nodes.forEach((n, bi) => {
      // distance still to go; the last base is measured to the parking spot above it (the ship stops there)
      const dist = n.y - shipY - (bi === LAST ? parkGap : 0);
      const passed = final || shipY >= n.y + 8;
      const build = final || bi === 0 ? 1 : 1 - clamp((dist - 70) / (vh * 0.42)); // layers rise as it approaches
      const bc = cache.base[bi];
      if (Math.abs(build - bc.b) > 0.004) {
        bc.b = build;
        baseEls[bi].style.setProperty("--b", build.toFixed(3));
      }

      let state;
      if (bi === LAST) state = build > 0.02 ? "current" : "idle"; // the current role stays blue
      else if (bi === 0) state = final || shipY > dockY + 40 ? "done" : "arriving"; // blue while the ship is docked
      else state = passed ? "done" : build > 0.02 ? "arriving" : "idle";
      setState(baseEls[bi], bc, state);

      if (bi > 0) {
        const si = bi - 1;
        const w = final ? 1 : clamp(1 - (dist - vh * 0.18) / (vh * 0.28));
        const sc = cache.step[si];
        if (Math.abs(w - sc.w) > 0.004) {
          sc.w = w;
          bodies[si].style.setProperty("--w", w.toFixed(3));
          const c = connEls[si];
          c.line.style.strokeDashoffset = (c.len * (1 - w)).toFixed(1);
          c.dot.style.opacity = w.toFixed(2);
        }
        setState(steps[si], sc, state);
        setState(connEls[si].g, cache.conn[si], state);
      }
    });
  }

  /* ====================================================================
   * LOOP: runs only while the hero / About region is on screen
   * ==================================================================== */

  let shipY = null;
  let raf = 0;
  let last = 0;
  let visible = false;

  function frame(t) {
    raf = 0;
    if (!visible || !laidOut) return;
    const dt = Math.min(0.05, (t - last) / 1000 || 1 / 60);
    last = t;

    const vh = window.innerHeight;
    const top = main.getBoundingClientRect().top; // the only layout read per frame
    const anchor = vh * 0.6 - top; // viewport anchor, in main coordinates
    const target = shipTarget(anchor, vh);
    shipY = shipY === null ? target : shipY + (target - shipY) * (1 - Math.exp(-dt * 8));
    if (Math.abs(target - shipY) < 0.05) shipY = target;
    render(shipY, vh, false);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (reduced.matches) return; // reduced motion: the finished picture is drawn once, no scroll loop
    if (!raf && visible && laidOut) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  // the layer spans hero -> end of About, so it is "visible" for the whole journey
  new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    },
    { rootMargin: "20% 0px" }
  ).observe(overlay);

  /* ====================================================================
   * MODES + RESIZE
   * ==================================================================== */

  function applyMode() {
    if (!laidOut && !layout()) return;
    root.classList.add("jp--ready");
    if (reduced.matches) {
      // finished picture, no animation, no scroll-driven reveals
      root.classList.remove("jp--live");
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      render(parkY, window.innerHeight, true);
      bodies.forEach((b) => b.style.removeProperty("--w"));
    } else {
      root.classList.add("jp--live");
      shipY = null;
      cache.ship = "";
      start();
    }
  }

  let resizeTimer = 0;
  function relayout() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!layout()) return;
      cache.ship = "";
      cache.done = -1;
      cache.base.forEach((c) => ((c.b = -1), (c.s = "")));
      cache.step.forEach((c) => ((c.w = -1), (c.s = "")));
      cache.conn.forEach((c) => (c.s = ""));
      if (reduced.matches) render(parkY, window.innerHeight, true);
      else start();
    }, 120);
  }

  const ro = new ResizeObserver(relayout);
  ro.observe(main);
  ro.observe(root);
  if (hero) ro.observe(hero);
  wide.addEventListener("change", relayout);
  reduced.addEventListener("change", () => {
    laidOut = false;
    applyMode();
  });
  // web fonts change line heights, which moves the anchors: measure again once they're in
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);

  applyMode();
}
