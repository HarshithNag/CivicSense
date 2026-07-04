/* ==========================================================================
   CIVIC SENSE — ICON SET
   Minimal stroke-based icons (24x24, currentColor) so every icon inherits
   the surrounding text/badge color automatically. Add new icons here —
   they become available everywhere via icon("name").
   ========================================================================== */

const ICONS = {
  scale: '<path d="M12 3v18M5 7h14M5 7l-3 6a4 4 0 0 0 8 0L5 7ZM19 7l-3 6a4 4 0 0 0 8 0L19 7Z"/>',
  shield: '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2Z"/>',
  cross: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  "heart-shield": '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z"/><path d="M12 9.6c-.8-1-2.4-.9-3 .3-.4.9.1 1.7.9 2.4L12 14l2.1-1.7c.8-.7 1.3-1.5.9-2.4-.6-1.2-2.2-1.3-3-.3Z"/>',
  child: '<circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/>',
  traffic: '<rect x="9" y="2" width="6" height="16" rx="3"/><path d="M9 20h6"/><circle cx="12" cy="6" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="14" r=".9" fill="currentColor" stroke="none"/>',
  alert: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/>',
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/><path d="M3 4h2l2.2 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  leaf: '<path d="M5 19c8 0 14-6 14-14 0 0-11-2-14 8-1.5 4.5.5 6 0 6Z"/><path d="M5 19c0-4 2-8 6-10"/>',
  landmark: '<path d="M4 10h16M6 10v9M10 10v9M14 10v9M18 10v9M3 21h18M12 3 3 8h18L12 3Z"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>',
  bolt: '<path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/>',
  paw: '<circle cx="7" cy="8" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="17" cy="8" r="1.6"/><path d="M12 12c-3 0-6 2.2-6 5.2 0 1.8 1.5 2.8 3 2.2 1-.4 2-.6 3-.6s2 .2 3 .6c1.5.6 3-.4 3-2.2 0-3-3-5.2-6-5.2Z"/>',
  elder: '<circle cx="11" cy="6" r="3"/><path d="M6 21c0-4 2-7 5-7s5 3 5 7M16 21l3-8"/>',
  accessibility: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="7.4" r="1.3" fill="currentColor" stroke="none"/><path d="M9 12h6M12 12v4M9 20l3-4 3 4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  dots: '<circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
  car: '<path d="M5 16V9l2-4h10l2 4v7"/><path d="M3 16h18v3H3z"/><circle cx="7" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  book: '<path d="M4 5c3-1.3 6-1.3 8 0v14c-2-1.3-5-1.3-8 0V5Z"/><path d="M20 5c-3-1.3-6-1.3-8 0v14c2-1.3 5-1.3 8 0V5Z"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12 20 3M16 8l3 3M13 11l2 2"/>',
  receipt: '<path d="M6 2h12v20l-2-1.3L14 22l-2-1.3L10 22l-2-1.3L6 22V2Z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  store: '<path d="M4 8 5 3h14l1 5"/><path d="M4 8v12h16V8"/><path d="M4 8a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"/>',
  cloud: '<path d="M7 18a4 4 0 1 1 1.3-7.8A5 5 0 0 1 18 12a3.5 3.5 0 0 1-.5 6.9H7Z"/>',
  gavel: '<path d="m14 9-7 7-3-3 7-7 3 3Z"/><path d="m17 6-3-3M2 22l6-6M13 6l5 5"/>',
  sprout: '<path d="M12 22v-9"/><path d="M12 13c0-4-3-6-7-6 0 4 3 6 7 6Z"/><path d="M12 10c0-3.5 2.5-5.5 6-5.5 0 3.5-2.5 5.5-6 5.5Z"/>',
  droplet: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z"/>',
  scroll: '<path d="M6 4h11a2 2 0 0 1 2 2v13a1 1 0 0 1-1.6.8L15 18H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M6 4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2"/>',

  "chevron-down": '<polyline points="6 9 12 15 18 9"/>',
  "chevron-right": '<polyline points="9 6 15 12 9 18"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/>',
  send: '<path d="m4 12 16-8-6 16-2.5-7L4 12Z"/>',
  check: '<path d="M4 12l5 5 11-11"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  chat: '<path d="M4 4h16v12H8l-4 4V4Z"/>',
  flag: '<path d="M6 3v18"/><path d="M6 4h11l-2 4 2 4H6"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 11.5h1v5h1"/>',
  doc: '<path d="M6 2h9l5 5v15H6V2Z"/><path d="M15 2v5h5"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.8 2.8M15.2 15.2 18 18M18 6l-2.8 2.8M8.8 15.2 6 18"/>'
};

function icon(name, cls) {
  const body = ICONS[name] || ICONS.dots;
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" class="' + (cls || "") + '">' + body + "</svg>";
}
