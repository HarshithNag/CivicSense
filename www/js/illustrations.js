/* ==========================================================================
   CIVIC SENSE — ILLUSTRATIONS
   Hand-built line-art SVG scenes (no stock imagery, per brief). Each
   function returns a self-contained <svg> string with its own scoped
   <style> block for illustration-specific motion, so these never leak
   animation rules into the rest of the app.
   ========================================================================== */

/* Brand seal — used in the header, footer and AI panel header.
   An original abstract mark (concentric rings + a diamond core) — a
   signal/transparency motif, deliberately not any real state emblem. */
function brandSeal() {
  return (
    '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="20" cy="20" r="18" fill="none" stroke="#1b3a6b" stroke-width="1.6"/>' +
      '<circle cx="20" cy="20" r="13" fill="none" stroke="#1f6b45" stroke-width="1.3" stroke-dasharray="2 4" ' +
        'style="transform-box:fill-box;transform-origin:center;animation:sealspin 16s linear infinite"/>' +
      '<rect x="16" y="16" width="8" height="8" rx="2" transform="rotate(45 20 20)" fill="#1b3a6b"/>' +
      '<circle cx="20" cy="20" r="2" fill="#ffffff"/>' +
      '<style>@keyframes sealspin{to{transform:rotate(360deg)}}</style>' +
    "</svg>"
  );
}

/* Login hero — citizens, a civic building, a road and a data/transparency
   layer, gently animated. Sits on the navy gradient pane of the login page. */
function loginHeroIllustration() {
  return `
  <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>
      .lh-orbit { transform-box: fill-box; transform-origin: center; animation: lh-spin 20s linear infinite; }
      .lh-orbit2 { transform-box: fill-box; transform-origin: center; animation: lh-spin 28s linear infinite reverse; }
      @keyframes lh-spin { to { transform: rotate(360deg); } }
      .lh-float1 { animation: lh-float 5.5s ease-in-out infinite; }
      .lh-float2 { animation: lh-float 4.4s ease-in-out infinite 0.4s; }
      .lh-float3 { animation: lh-float 6.2s ease-in-out infinite 0.9s; }
      @keyframes lh-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      .lh-car { animation: lh-drive 6.5s ease-in-out infinite; }
      @keyframes lh-drive { 0%,100% { transform: translateX(-26px); } 50% { transform: translateX(26px); } }
      .lh-dash { stroke-dasharray: 10 10; animation: lh-dashmove 1.4s linear infinite; }
      @keyframes lh-dashmove { to { stroke-dashoffset: -40; } }
      .lh-pulse { animation: lh-pulse 3s ease-in-out infinite; }
      @keyframes lh-pulse { 0%,100% { opacity: 0.25; } 50% { opacity: 0.9; } }
    </style>

    <!-- transparency network layer -->
    <g class="lh-orbit" stroke="#7fd6ac" stroke-opacity="0.45" stroke-width="1" fill="none">
      <circle cx="300" cy="150" r="120" stroke-dasharray="2 8"/>
    </g>
    <g class="lh-orbit2" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1" fill="none">
      <circle cx="300" cy="150" r="150"/>
    </g>
    <circle class="lh-pulse" cx="180" cy="70" r="3" fill="#7fd6ac"/>
    <circle class="lh-pulse" cx="430" cy="60" r="2.4" fill="#ffffff" style="animation-delay:.5s"/>
    <circle class="lh-pulse" cx="470" cy="140" r="3" fill="#7fd6ac" style="animation-delay:1s"/>
    <circle class="lh-pulse" cx="140" cy="150" r="2.4" fill="#ffffff" style="animation-delay:1.4s"/>

    <!-- civic building -->
    <g stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M300 60 L345 95 L255 95 Z"/>
      <circle cx="300" cy="45" r="10"/>
      <line x1="300" y1="55" x2="300" y2="60"/>
      <rect x="250" y="95" width="100" height="10"/>
      <line x1="262" y1="105" x2="262" y2="175"/>
      <line x1="280" y1="105" x2="280" y2="175"/>
      <line x1="300" y1="105" x2="300" y2="175"/>
      <line x1="320" y1="105" x2="320" y2="175"/>
      <line x1="338" y1="105" x2="338" y2="175"/>
      <rect x="245" y="175" width="110" height="10"/>
      <rect x="230" y="185" width="140" height="10"/>
    </g>

    <!-- road -->
    <line x1="40" y1="330" x2="560" y2="330" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.4"/>
    <line class="lh-dash" x1="40" y1="345" x2="560" y2="345" stroke="#7fd6ac" stroke-opacity="0.55" stroke-width="2"/>
    <g class="lh-car" stroke="#ffffff" stroke-opacity="0.85" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="284" y="300" width="34" height="14" rx="3"/>
      <path d="M290 300 L296 290 L308 290 L314 300"/>
      <circle cx="292" cy="316" r="3.2"/>
      <circle cx="310" cy="316" r="3.2"/>
    </g>

    <!-- citizens -->
    <g class="lh-float1" stroke="#ffffff" stroke-opacity="0.85" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="110" cy="290" r="9"/>
      <path d="M110 299 L110 325 M110 308 L95 318 M110 308 L125 316 M110 325 L98 340 M110 325 L120 342"/>
    </g>
    <g class="lh-float2" stroke="#7fd6ac" stroke-opacity="0.8" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="165" cy="300" r="8"/>
      <path d="M165 308 L165 330 M165 315 L152 322 M165 315 L178 324 M165 330 L155 344 M165 330 L174 344"/>
    </g>
    <g class="lh-float3" stroke="#ffffff" stroke-opacity="0.85" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="480" cy="292" r="9"/>
      <path d="M480 301 L480 327 M480 310 L465 320 M480 310 L495 318 M480 327 L468 342 M480 327 L490 344"/>
    </g>
    <g class="lh-float1" stroke="#7fd6ac" stroke-opacity="0.8" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:.7s">
      <circle cx="430" cy="302" r="8"/>
      <path d="M430 310 L430 332 M430 317 L418 325 M430 317 L442 326 M430 332 L420 346 M430 332 L438 346"/>
    </g>
  </svg>`;
}

/* Small badge illustration used behind each Development & Bills project
   card — a large category icon inside soft concentric rings, so the same
   visual language repeats across all sixteen project types. */
function projectIllustration(type) {
  const iconMap = {
    Roads: "car", Buildings: "building", Bridges: "landmark", Metro: "traffic",
    Electricity: "bolt", "Water Supply": "droplet", Hospitals: "cross", Schools: "book",
    Police: "shield", "Public Transport": "car", Drainage: "droplet", Parks: "leaf",
    "Smart City": "chip", Environment: "leaf", "Public Housing": "home", Other: "dots"
  };
  const key = iconMap[type] || "dots";
  const body = ICONS[key] || ICONS.dots;
  return `
  <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>
      .pi-r1 { transform-box: fill-box; transform-origin: center; animation: pi-spin 22s linear infinite; }
      .pi-r2 { transform-box: fill-box; transform-origin: center; animation: pi-spin 30s linear infinite reverse; }
      @keyframes pi-spin { to { transform: rotate(360deg); } }
      .pi-dot { animation: pi-pulse 3s ease-in-out infinite; }
      @keyframes pi-pulse { 0%,100% { opacity: 0.2; } 50% { opacity: 0.85; } }
    </style>
    <circle class="pi-r1" cx="110" cy="96" r="78" fill="none" stroke="#1b3a6b" stroke-opacity="0.14" stroke-width="1.4" stroke-dasharray="3 7"/>
    <circle class="pi-r2" cx="110" cy="96" r="58" fill="none" stroke="#1f6b45" stroke-opacity="0.24" stroke-width="1.2" stroke-dasharray="2 6"/>
    <circle cx="110" cy="96" r="42" fill="#ffffff" stroke="#e0e3e9" stroke-width="1"/>
    <g transform="translate(88,74)">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#1b3a6b" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${body}</svg>
    </g>
    <circle class="pi-dot" cx="42" cy="36" r="3" fill="#1f6b45"/>
    <circle class="pi-dot" cx="178" cy="46" r="2.4" fill="#1b3a6b" style="animation-delay:.6s"/>
    <circle class="pi-dot" cx="168" cy="158" r="2.8" fill="#1f6b45" style="animation-delay:1.1s"/>
  </svg>`;
}
