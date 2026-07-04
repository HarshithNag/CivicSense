/* ==========================================================================
   CIVIC SENSE — APP LOGIC
   Vanilla JS, hash-based router, no build step. This file is organised as:
     1. State & utilities
     2. Router
     3. Header / global chrome (location dropdown, AI panel, mobile nav)
     4. Page renderers (login, home, dev-bills, help, laws)
     5. Modals (project actions, call/chat simulation)
     6. Init
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* 1. State & utilities                                                   */
/* ---------------------------------------------------------------------- */
const STATE = {
  loggedIn: false,
  route: "login",
  routeParam: null,
  location: { scope: "20 km" },
  devFilters: { type: "All Types", time: "All Time", search: "" },
  expandedProjects: new Set(),
  otpSent: false,
  captcha: "",
  aiOpen: false,
  aiMessages: [],
  helpSubmissions: {} // keyed by help category key -> {query, volunteer}
};

function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function esc(str) { return String(str == null ? "" : str).replace(/[&<>"']/g, s => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[s])); }

function navigate(hash) { window.location.hash = hash; }

function showToast(msg, iconName) {
  const t = $("#toast");
  t.innerHTML = icon(iconName || "check-circle") + "<span>" + esc(msg) + "</span>";
  t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 2800);
}

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function refCode(prefix) {
  return prefix + "-" + Math.floor(100000 + Math.random() * 899999);
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return h;
}

function initials(name) {
  const parts = name.split(" ").filter(p => !p.endsWith(".") && p.length > 1);
  return parts.slice(0, 2).map(p => p[0].toUpperCase()).join("") || "CS";
}

function scopeThresholdKm(scope) {
  const map = { "1 km": 1, "5 km": 5, "20 km": 20, "District": 30, "City": 60, "State": 300, "Entire India": Infinity };
  return map[scope] != null ? map[scope] : 5;
}

const FUNDING_SOURCES = ["State Budget Allocation", "Central Sector Scheme", "Public-Private Partnership", "Municipal Bond Issue", "Multilateral Development Loan"];
function extraProjectDetails(p) {
  const seed = Math.abs(hashString(p.id));
  const funding = FUNDING_SOURCES[seed % FUNDING_SOURCES.length];
  const billNo = "KA/" + p.type.slice(0, 3).toUpperCase() + "/" + (2023 + (seed % 4)) + "/" + (1000 + (seed % 8999));
  const lastInspDay = 2 + (seed % 26);
  const lastInsp = lastInspDay + " Jun 2026";
  return { funding, billNo, lastInsp };
}

/* Generic law-detail builder for the 19 categories without bespoke copy */
function buildGenericLawDetail(catMeta) {
  const label = catMeta ? catMeta.label : "This category";
  const lower = label.toLowerCase();
  return {
    overview: `${label} law brings together the rules, entitlements and procedures citizens most often encounter around ${lower} in Karnataka. This summary is written in plain language — for full statutory text, use the linked resources alongside this page.`,
    appliesTo: `Any citizen interacting with ${lower}-related services, facilities or disputes within Karnataka.`,
    rights: [
      `The right to a clear, published process for any ${lower}-related application or complaint.`,
      `The right to a reasoned response if a request related to ${lower} is denied.`,
      `Access to an escalation path if the standard process takes longer than the published timeline.`
    ],
    responsibilities: [
      `Keep supporting documents ready when raising a ${lower}-related request.`,
      `Report violations through the correct department rather than informal channels, so the case can be tracked.`
    ],
    acts: [`Karnataka ${label} (Regulation) Act`, `${label} Rules, Government of Karnataka`],
    relatedRules: [`${label} Administrative Guidelines`],
    faqs: [
      { q: `Who do I contact first for a ${lower} issue?`, a: `Start with your local ward or taluk office — they can resolve it directly or route it to the correct department.` },
      { q: `Is there a fee to raise a ${lower}-related complaint?`, a: `No — filing an initial complaint through official government channels is free of cost.` }
    ],
    updates: [{ date: "01 Jun 2026", text: `Process guidelines for ${lower}-related applications were streamlined this quarter.` }],
    scenarios: [{ title: `Unsure which office handles a ${lower} matter`, text: `Use the CS AI assistant or the Help section to be routed to the right department — you don't need to know the exact office in advance.` }],
    aiExplanation: `In short: ${lower} matters are handled through a published, trackable process — if something is unclear or delayed, you have the right to ask for a reason and escalate.`,
    related: LAW_CATEGORIES.filter(c => !catMeta || c.key !== catMeta.key).slice(0, 3).map(c => c.label),
    links: [{ label: `${label} Department Portal`, note: "Mock link — illustrative only" }]
  };
}
function getLawDetail(key) {
  const catMeta = LAW_CATEGORIES.find(c => c.key === key);
  const detail = LAW_DETAILS[key] || buildGenericLawDetail(catMeta);
  return { catMeta, detail };
}
function labelToLawKey(label) {
  const f = LAW_CATEGORIES.find(c => c.label === label);
  return f ? f.key : null;
}

/* Small icon-badge illustration reused on law detail pages (mirrors the
   visual language of projectIllustration but keyed directly by icon name) */
function badgeIllustration(iconKey) {
  const body = ICONS[iconKey] || ICONS.dots;
  return `
  <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:88px;height:88px">
    <style>.bi-r{transform-box:fill-box;transform-origin:center;animation:bi-spin 24s linear infinite}@keyframes bi-spin{to{transform:rotate(360deg)}}</style>
    <circle class="bi-r" cx="70" cy="70" r="58" fill="none" stroke="#1f6b45" stroke-opacity="0.22" stroke-width="1.2" stroke-dasharray="2 6"/>
    <circle cx="70" cy="70" r="42" fill="#e4f2ea"/>
    <g transform="translate(48,48)"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#1f6b45" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${body}</svg></g>
  </svg>`;
}

/* ---------------------------------------------------------------------- */
/* 2. Router                                                              */
/* ---------------------------------------------------------------------- */
function parseHash() {
  let h = window.location.hash.replace(/^#\/?/, "");
  if (!h) return { route: "login" };
  const parts = h.split("/");
  if (parts[0] === "help" && parts[1]) return { route: "help-detail", param: decodeURIComponent(parts[1]) };
  if (parts[0] === "laws" && parts[1]) return { route: "law-detail", param: decodeURIComponent(parts[1]) };
  return { route: parts[0] };
}

function renderRoute() {
  const { route, param } = parseHash();

  if (route !== "login" && !STATE.loggedIn) {
    showToast("Please log in to continue", "info");
    navigate("#/login");
    return;
  }
  closeLocDropdown();
  $all(".mobile-nav-panel").forEach(p => p.classList.remove("open"));

  STATE.route = route;
  STATE.routeParam = param;
  updateActiveNav(route);

  const main = $("#main");
  let html = "";
  if (route === "login") html = renderLogin();
  else if (route === "home") html = renderHome();
  else if (route === "dev-bills") html = renderDevBills();
  else if (route === "help") html = renderHelp();
  else if (route === "help-detail") html = renderHelpDetail(param);
  else if (route === "laws") html = renderLaws();
  else if (route === "law-detail") html = renderLawDetail(param);
  else html = renderHome();

  main.innerHTML = html;
  main.classList.remove("page"); void main.offsetWidth; main.classList.add("page");

  if (route === "login") afterRenderLogin();
  if (route === "dev-bills") afterRenderDevBills();
  if (route === "help-detail") afterRenderHelpDetail(param);
  if (route === "law-detail") afterRenderLawDetail();

  window.scrollTo({ top: 0, behavior: "auto" });
  document.body.classList.toggle("is-login", route === "login");
}

function updateActiveNav(route) {
  $all(".main-nav a, .mobile-nav-panel a").forEach(a => {
    a.classList.toggle("active", a.dataset.route === route);
  });
}

/* ---------------------------------------------------------------------- */
/* 3. Header / global chrome                                              */
/* ---------------------------------------------------------------------- */
function toggleLocDropdown(forceOpen) {
  const dd = $("#locDropdown");
  const willOpen = forceOpen != null ? forceOpen : dd.style.display !== "block";
  if (willOpen) {
    dd.style.display = "block";
    dd.classList.remove("pop-in"); void dd.offsetWidth; dd.style.animation = "pop-in 0.16s ease";
  } else {
    dd.style.display = "none";
    $("#customSub").classList.remove("open");
  }
}
function closeLocDropdown() { const dd = $("#locDropdown"); if (dd) dd.style.display = "none"; }

function setLocationScope(scope) {
  STATE.location.scope = scope;
  $("#locScopeLabel").textContent = scope;
  $all(".loc-option").forEach(b => b.classList.toggle("selected", b.dataset.scope === scope));
  closeLocDropdown();
  showToast("Location scope set to " + scope, "pin");
  if (STATE.route === "dev-bills") updateDevBillsList();
}

function initHeader() {
  $("#locBtn").addEventListener("click", e => { e.stopPropagation(); toggleLocDropdown(); });
  $("#customToggle").addEventListener("click", e => { e.stopPropagation(); $("#customSub").classList.toggle("open"); });
  $all(".loc-option[data-scope]").forEach(btn => {
    if (btn.id === "customToggle") return;
    btn.addEventListener("click", () => setLocationScope(btn.dataset.scope));
  });
  document.addEventListener("click", e => {
    const wrap = $(".nav-loc-wrap");
    if (wrap && !wrap.contains(e.target)) closeLocDropdown();
  });

  $("#mobileNavToggle").addEventListener("click", () => $("#mobileNavPanel").classList.toggle("open"));

  $("#csBtn").addEventListener("click", () => toggleAIPanel(true));
  $("#aiCloseBtn").addEventListener("click", () => toggleAIPanel(false));
  $("#aiPanelOverlay").addEventListener("click", () => toggleAIPanel(false));
  $("#aiSendBtn").addEventListener("click", sendAIMessageFromInput);
  $("#aiInputField").addEventListener("keydown", e => { if (e.key === "Enter") sendAIMessageFromInput(); });

  const promptsWrap = $("#aiPrompts");
  promptsWrap.innerHTML = AI_SUGGESTED_PROMPTS.map(p => `<button class="ai-prompt-btn" data-prompt="${esc(p)}">${esc(p)}</button>`).join("");
  promptsWrap.addEventListener("click", e => {
    const btn = e.target.closest(".ai-prompt-btn");
    if (btn) sendAIMessage(btn.dataset.prompt);
  });

  $("#modalOverlay").addEventListener("click", e => { if (e.target.id === "modalOverlay") closeModal(); });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeModal(); toggleAIPanel(false); closeLocDropdown(); }
  });
}

/* ---- AI Assistant panel ---- */
function toggleAIPanel(open) {
  STATE.aiOpen = open;
  $("#aiPanel").classList.toggle("open", open);
  $("#aiPanelOverlay").classList.toggle("open", open);
  if (open) {
    if (STATE.aiMessages.length === 0) {
      STATE.aiMessages.push({ role: "bot", text: "Hi, I'm the Civic Sense AI — your Government Operating Assistant. Ask about a law, a nearby project, or how to file a complaint. All responses here are simulated for this prototype." });
    }
    renderAIMessages();
    setTimeout(() => $("#aiInputField").focus(), 300);
  }
}
function renderAIMessages() {
  const body = $("#aiPanelBody");
  body.innerHTML = STATE.aiMessages.map(m => `<div class="ai-msg ${m.role}">${esc(m.text)}</div>`).join("");
  body.scrollTop = body.scrollHeight;
}
function sendAIMessageFromInput() {
  const input = $("#aiInputField");
  const val = input.value.trim();
  if (!val) return;
  input.value = "";
  sendAIMessage(val);
}
function sendAIMessage(text) {
  STATE.aiMessages.push({ role: "user", text });
  renderAIMessages();
  const body = $("#aiPanelBody");
  const typingEl = document.createElement("div");
  typingEl.className = "ai-typing";
  typingEl.innerHTML = '<div class="dot-flash"><span></span><span></span><span></span></div>';
  body.appendChild(typingEl);
  body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    typingEl.remove();
    STATE.aiMessages.push({ role: "bot", text: getAIResponse(text) });
    renderAIMessages();
  }, 650 + Math.random() * 500);
}

/* ---------------------------------------------------------------------- */
/* 4. Page renderers                                                      */
/* ---------------------------------------------------------------------- */

/* ---- LOGIN ---- */
function renderLogin() {
  STATE.captcha = generateCaptcha();
  const features = [
    { icon: "landmark", title: "Transparent Governance", desc: "Every bill, budget and project status, open to view." },
    { icon: "sparkle", title: "AI Legal Assistant", desc: "Plain-language answers to your legal questions." },
    { icon: "chip", title: "Development Tracker", desc: "Follow projects near you from bill to completion." },
    { icon: "heart-shield", title: "Citizen Participation", desc: "Flag, report or object — and be heard." }
  ];
  return `
  <div class="login-shell">
    <div class="login-form-pane">
      <div class="wrap" style="padding:0;max-width:380px">
        <span class="eyebrow">SECURE SIGN-IN · DEMO</span>
        <h1>Welcome to Civic Sense</h1>
        <p class="sub">Bringing Governance Closer to Every Citizen. Sign in to explore development projects, laws and civic help — all in one place.</p>
        <div class="login-card">
          <div class="field">
            <label for="phoneInput">Phone Number</label>
            <input class="input" id="phoneInput" inputmode="numeric" maxlength="10" placeholder="10-digit mobile number" />
            <span class="error-text" id="errPhone">Enter a valid 10-digit phone number.</span>
          </div>
          <div class="field">
            <label for="aadhaarInput">Aadhaar Number</label>
            <input class="input" id="aadhaarInput" inputmode="numeric" maxlength="14" placeholder="XXXX XXXX XXXX" />
            <span class="error-text" id="errAadhaar">Enter a valid 12-digit Aadhaar number.</span>
            <span class="hint">Used for demo validation only — never stored or verified.</span>
          </div>
          <div class="field">
            <label>One-Time Password</label>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
              <button type="button" class="btn btn-outline btn-sm" id="sendOtpBtn">Send OTP</button>
              <span class="hint" id="otpHint">We'll send a 4-digit demo code</span>
            </div>
            <div class="otp-row" id="otpRow" style="display:none">
              <input maxlength="1" inputmode="numeric" /><input maxlength="1" inputmode="numeric" />
              <input maxlength="1" inputmode="numeric" /><input maxlength="1" inputmode="numeric" />
            </div>
            <span class="error-text" id="errOtp">Enter the 4-digit code sent to your phone.</span>
          </div>
          <div class="field">
            <label>Captcha</label>
            <div class="captcha-box">
              <span class="captcha-code" id="captchaCode">${STATE.captcha}</span>
              <button type="button" class="captcha-refresh" id="captchaRefresh">Refresh</button>
            </div>
            <input class="input" id="captchaInput" style="margin-top:8px" placeholder="Type the code above" maxlength="6" />
            <span class="error-text" id="errCaptcha">Captcha does not match.</span>
          </div>
          <button class="btn btn-primary btn-block" id="loginBtn">Login</button>
          <div class="mock-note">${icon("info")}<span>This is a prototype. No real authentication, Aadhaar verification or data storage takes place — any values in the correct format will work.</span></div>
        </div>
      </div>
    </div>
    <div class="login-illustration-pane">
      <div class="illo-stage">${loginHeroIllustration()}</div>
      <div class="feature-grid">
        ${features.map(f => `
          <div class="feature-panel">
            <div class="ficon">${icon(f.icon)}</div>
            <div class="ftitle">${esc(f.title)}</div>
            <div class="fdesc">${esc(f.desc)}</div>
          </div>`).join("")}
      </div>
    </div>
  </div>`;
}

function afterRenderLogin() {
  $("#captchaRefresh").addEventListener("click", () => {
    STATE.captcha = generateCaptcha();
    $("#captchaCode").textContent = STATE.captcha;
  });

  $("#sendOtpBtn").addEventListener("click", () => {
    STATE.otpSent = true;
    $("#otpRow").style.display = "flex";
    $("#otpHint").textContent = "Demo code sent — enter any 4 digits";
    showToast("Demo OTP sent to your phone", "check-circle");
    $all("#otpRow input")[0].focus();
  });

  $all("#otpRow input").forEach((inp, i, arr) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.replace(/\D/g, "");
      if (inp.value && arr[i + 1]) arr[i + 1].focus();
    });
    inp.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !inp.value && arr[i - 1]) arr[i - 1].focus();
    });
  });

  $("#aadhaarInput").addEventListener("input", () => {
    let v = $("#aadhaarInput").value.replace(/\D/g, "").slice(0, 12);
    $("#aadhaarInput").value = v.replace(/(\d{4})(?=\d)/g, "$1 ");
  });
  $("#phoneInput").addEventListener("input", () => {
    $("#phoneInput").value = $("#phoneInput").value.replace(/\D/g, "").slice(0, 10);
  });

  $("#loginBtn").addEventListener("click", () => {
    let valid = true;
    const phone = $("#phoneInput").value.replace(/\D/g, "");
    const aadhaar = $("#aadhaarInput").value.replace(/\D/g, "");
    const otpDigits = $all("#otpRow input").map(i => i.value).join("");
    const captchaVal = $("#captchaInput").value.trim();

    const setErr = (id, on) => $("#" + id).classList.toggle("show", on);

    if (phone.length !== 10) { setErr("errPhone", true); valid = false; } else setErr("errPhone", false);
    if (aadhaar.length !== 12) { setErr("errAadhaar", true); valid = false; } else setErr("errAadhaar", false);
    if (!STATE.otpSent || otpDigits.length !== 4) { setErr("errOtp", true); valid = false; } else setErr("errOtp", false);
    if (captchaVal.toUpperCase() !== STATE.captcha.toUpperCase()) { setErr("errCaptcha", true); valid = false; } else setErr("errCaptcha", false);

    if (!valid) { showToast("Please check the highlighted fields", "alert"); return; }

    STATE.loggedIn = true;
    showToast("Login successful — welcome to Civic Sense", "check-circle");
    navigate("#/home");
  });
}

/* ---- HOME ---- */
function renderHome() {
  return `
  <div class="wrap">
    <div class="home-hero">
      <span class="eyebrow">CIVIC SENSE</span>
      <h1>Bringing Governance Closer to Every Citizen.</h1>
      <p>Track public projects, understand the law, and get help — all from one calm, transparent view of your government.</p>
    </div>
    <div class="home-cards">
      <a class="card card-hover home-card c-dev" href="#/dev-bills">
        <div class="hc-icon">${icon("chip")}</div>
        <h3>Development &amp; Bills</h3>
        <p>Follow every public project near you — budgets, timelines, contractors and real progress.</p>
        <div class="hc-go">Explore projects ${icon("chevron-right")}</div>
      </a>
      <a class="card card-hover home-card c-help" href="#/help">
        <div class="hc-icon">${icon("heart-shield")}</div>
        <h3>Help</h3>
        <p>From legal questions to emergencies — reach the right support in a few taps.</p>
        <div class="hc-go">Get help ${icon("chevron-right")}</div>
      </a>
      <a class="card card-hover home-card c-laws" href="#/laws">
        <div class="hc-icon">${icon("scale")}</div>
        <h3>All Laws</h3>
        <p>Plain-language explanations of the laws that apply to your everyday life.</p>
        <div class="hc-go">Browse laws ${icon("chevron-right")}</div>
      </a>
    </div>
    <div class="home-strip">
      <div class="mini-stat"><div class="num">${PROJECTS.length}</div><div class="lbl">Active Projects</div></div>
      <div class="mini-stat"><div class="num">${HELP_CATEGORIES.length}</div><div class="lbl">Help Categories</div></div>
      <div class="mini-stat"><div class="num">${LAW_CATEGORIES.length}</div><div class="lbl">Law Categories</div></div>
      <div class="mini-stat"><div class="num">${STATE.location.scope}</div><div class="lbl">Location Scope</div></div>
    </div>
  </div>`;
}

/* ---- DEVELOPMENT & BILLS ---- */
function renderDevBills() {
  return `
  <div class="section-hero">
    <div class="wrap">
      <div class="crumb"><a href="#/home">Home</a> / <span>Development &amp; Bills</span></div>
      <h1>Development</h1>
      <p>Every public project in your selected location scope — from bill approval to completion, with full citizen oversight.</p>
    </div>
  </div>
  <div class="wrap">
    <div class="filters-bar">
      <select class="select" id="filterType" style="max-width:190px">
        <option>All Types</option>
        ${PROJECT_TYPES.map(t => `<option ${t === STATE.devFilters.type ? "selected" : ""}>${t}</option>`).join("")}
      </select>
      <select class="select" id="filterTime" style="max-width:190px">
        <option>All Time</option>
        ${TIME_FILTERS.map(t => `<option ${t === STATE.devFilters.time ? "selected" : ""}>${t}</option>`).join("")}
      </select>
      <div class="search-field">
        ${icon("search")}
        <input class="input" id="filterSearch" placeholder="Search projects by name or area" value="${esc(STATE.devFilters.search)}" />
      </div>
    </div>
    <div class="result-count" id="resultCount"></div>
    <div class="project-grid" id="projectGrid"></div>
  </div>`;
}

function renderProjectCard(p) {
  const extra = extraProjectDetails(p);
  const isOpen = STATE.expandedProjects.has(p.id);
  return `
  <div class="card project-card" data-id="${p.id}">
    <div class="pc-main">
      <div class="pc-top">
        <div>
          <h3 class="pc-title">${esc(p.name)}</h3>
          <div class="pc-meta">
            <span>${esc(p.area)}</span><span>·</span><span>${esc(p.department)}</span>
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
          <span class="badge badge-${p.statusTone}">${esc(p.status)}</span>
          <span class="badge badge-gray">${esc(p.type)}</span>
        </div>
      </div>
      <p class="pc-desc">${esc(p.desc)}</p>
      <div class="pc-stat-row">
        <div class="pc-stat"><div class="k">Budget</div><div class="v">${esc(p.budget)}</div></div>
        <div class="pc-stat"><div class="k">Bill Passed</div><div class="v">${esc(p.billPassed)}</div></div>
        <div class="pc-stat"><div class="k">Timeline</div><div class="v">${esc(p.start)}</div></div>
        <div class="pc-stat"><div class="k">Est. Completion</div><div class="v">${esc(p.eta)}</div></div>
      </div>
      <div class="pc-progress">
        <div class="pp-row"><span>Progress</span><span>${p.progress}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${p.progress}%"></div></div>
      </div>
      <div class="pc-actions">
        <button class="btn btn-outline btn-sm act-btn" data-action="flag" data-id="${p.id}">${icon("flag")} Flag</button>
        <button class="btn btn-outline btn-sm act-btn" data-action="report" data-id="${p.id}">${icon("alert")} Report</button>
        <button class="btn btn-outline btn-sm act-btn" data-action="object" data-id="${p.id}">${icon("ban")} Object</button>
      </div>
      <button class="pc-toggle ${isOpen ? "open" : ""}" data-id="${p.id}">
        ${isOpen ? "Hide full details" : "View full details"} ${icon("chevron-down")}
      </button>
      <div class="pc-details ${isOpen ? "open" : ""}" id="details-${p.id}">
        <div class="dd-row"><span class="dk">Contractor</span><span class="dv">${esc(p.contractor)}</span></div>
        <div class="dd-row"><span class="dk">Funding Source</span><span class="dv">${esc(extra.funding)}</span></div>
        <div class="dd-row"><span class="dk">Bill / Tender Number</span><span class="dv">${esc(extra.billNo)}</span></div>
        <div class="dd-row"><span class="dk">Last Site Inspection</span><span class="dv">${esc(extra.lastInsp)}</span></div>
        <div class="dd-row"><span class="dk">Citizen Impact</span><span class="dv">${esc(p.impact)}</span></div>
        <div class="dd-row"><span class="dk">Safety Instructions</span><span class="dv">${esc(p.safety)}</span></div>
      </div>
    </div>
    <div class="pc-illo">${projectIllustration(p.type)}</div>
  </div>`;
}

function getFilteredProjects() {
  const { type, search } = STATE.devFilters;
  const threshold = scopeThresholdKm(STATE.location.scope);
  return PROJECTS.filter(p => {
    if (type && type !== "All Types" && p.type !== type) return false;
    if (p.distanceKm > threshold) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.area.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function updateDevBillsList() {
  const list = getFilteredProjects();
  const grid = $("#projectGrid");
  const count = $("#resultCount");
  if (!grid) return;
  const timeNote = STATE.devFilters.time !== "All Time" ? ` · Time filter "${esc(STATE.devFilters.time)}" applied to live records (mock dataset shown)` : "";
  count.textContent = `${list.length} project${list.length === 1 ? "" : "s"} within ${STATE.location.scope}${timeNote}`;
  grid.innerHTML = list.length ? list.map(renderProjectCard).join("") : `
    <div class="empty-state">${icon("search")}<h4>No projects match these filters</h4><p>Try widening your location scope or clearing the search.</p></div>`;
}

function afterRenderDevBills() {
  updateDevBillsList();
  $("#filterType").addEventListener("change", e => { STATE.devFilters.type = e.target.value; updateDevBillsList(); });
  $("#filterTime").addEventListener("change", e => { STATE.devFilters.time = e.target.value; updateDevBillsList(); });
  $("#filterSearch").addEventListener("input", e => { STATE.devFilters.search = e.target.value; updateDevBillsList(); });

  $("#projectGrid").addEventListener("click", e => {
    const toggleBtn = e.target.closest(".pc-toggle");
    if (toggleBtn) {
      const id = toggleBtn.dataset.id;
      const details = $("#details-" + id);
      const nowOpen = !details.classList.contains("open");
      details.classList.toggle("open", nowOpen);
      toggleBtn.classList.toggle("open", nowOpen);
      toggleBtn.innerHTML = (nowOpen ? "Hide full details" : "View full details") + " " + icon("chevron-down");
      if (nowOpen) STATE.expandedProjects.add(id); else STATE.expandedProjects.delete(id);
      return;
    }
    const actBtn = e.target.closest(".act-btn");
    if (actBtn) {
      const project = PROJECTS.find(p => p.id === actBtn.dataset.id);
      openActionModal(project, actBtn.dataset.action);
    }
  });
}

/* ---- HELP ---- */
function renderHelp() {
  return `
  <div class="section-hero">
    <div class="wrap">
      <div class="crumb"><a href="#/home">Home</a> / <span>Help</span></div>
      <h1>Help</h1>
      <p>Pick a category to get AI-assisted guidance and a nearby human responder — or use the emergency contacts below.</p>
      <div class="emergency-banner">
        <div class="eb-text">${icon("alert")}
          <div><h4>In an immediate emergency</h4><p>Police 100 · Ambulance 108 · Women's Helpline 1091 · Child Helpline 1098 (all demo numbers)</p></div>
        </div>
        <button class="btn btn-red btn-sm" onclick="navigate('#/help/police')">Get Emergency Help</button>
      </div>
    </div>
  </div>
  <div class="wrap">
    <div class="help-grid">
      ${HELP_CATEGORIES.map(c => `
        <a class="card card-hover help-tile ${c.urgent ? "urgent" : ""}" href="#/help/${c.key}">
          <div class="ht-icon">${icon(c.icon)}</div>
          <h4>${esc(c.label)}</h4>
          <p>${esc(c.desc)}</p>
        </a>`).join("")}
    </div>
  </div>`;
}

function renderHelpDetail(key) {
  const cat = HELP_CATEGORIES.find(c => c.key === key);
  if (!cat) {
    return `<div class="wrap"><div class="empty-state">${icon("search")}<h4>Category not found</h4><p><a href="#/help">Back to Help</a></p></div></div>`;
  }
  const isLaw = key === "law";
  return `
  <div class="section-hero">
    <div class="wrap">
      <div class="crumb"><a href="#/home">Home</a> / <a href="#/help">Help</a> / <span>${esc(cat.label)}</span></div>
      <h1>${esc(cat.label)}</h1>
      <p>${esc(cat.desc)}</p>
    </div>
  </div>
  <div class="wrap">
    <div class="help-detail-layout">
      <div class="card hd-card">
        <h3>${isLaw ? "Describe your legal question" : "Describe your issue"}</h3>
        <div class="field">
          <textarea class="input" id="helpQuery" placeholder="${isLaw ? "e.g. My landlord is withholding my security deposit without reason..." : "Tell us what's happening and where"}"></textarea>
          <span class="error-text" id="errQuery">Please describe your situation before submitting.</span>
        </div>
        <div class="field">
          <label>Location</label>
          <div class="hint">Using current scope: <strong>${esc(STATE.location.scope)}</strong> — change it anytime from the header.</div>
        </div>
        ${isLaw ? `
        <div class="field">
          <label>Evidence (optional)</label>
          <div class="upload-zone" id="uploadZone">${icon("upload")}<div>Click to attach a photo or document (mock upload)</div><div id="uploadFileName" class="hint"></div></div>
          <input type="file" id="uploadInput" style="display:none" />
        </div>` : ""}
        <button class="btn btn-primary" id="helpSubmitBtn">${isLaw ? "Submit for AI Analysis" : "Submit request"}</button>

        ${isLaw ? `
        <div class="ai-summary-box" id="aiSummaryBox"></div>` : ""}
      </div>
      <div>
        <div class="card volunteer-card" id="volunteerCard"></div>
        ${!isLaw ? `<div class="card hd-card" style="margin-top:16px"><h3>What happens next</h3><p style="font-size:13px;color:var(--gray-500);line-height:1.6">Your request is routed to the nearest available responder for <strong>${esc(cat.label)}</strong>. You'll see their details here once matched, with options to call or chat instantly.</p></div>` : ""}
      </div>
    </div>
  </div>`;
}

function buildLawAiSummary(query, catLabel) {
  const q = query.toLowerCase();
  let topic = "your situation";
  const topics = ["deposit", "fee", "certificate", "harassment", "noise", "encroachment", "salary", "contract", "refund", "eviction"];
  const found = topics.find(t => q.includes(t));
  if (found) topic = `the ${found} issue you described`;
  return `Based on what you've shared, this looks like a matter related to ${topic}. Here's a plain-language read: you likely have a right to a documented response from the relevant party within a reasonable timeframe, and a right to escalate if that doesn't happen. I've matched you with a volunteer specialising in cases like this — review their profile alongside this summary.`;
}

function afterRenderHelpDetail(key) {
  const cat = HELP_CATEGORIES.find(c => c.key === key);
  if (!cat) return;
  const isLaw = key === "law";

  if (isLaw) {
    $("#uploadZone").addEventListener("click", () => $("#uploadInput").click());
    $("#uploadInput").addEventListener("change", () => {
      const f = $("#uploadInput").files[0];
      $("#uploadFileName").textContent = f ? "Attached: " + f.name + " (not actually uploaded — demo only)" : "";
    });
  }

  $("#helpSubmitBtn").addEventListener("click", () => {
    const query = $("#helpQuery").value.trim();
    if (!query) { $("#errQuery").classList.add("show"); return; }
    $("#errQuery").classList.remove("show");
    const volunteer = pickVolunteer(query + key);

    if (isLaw) {
      const box = $("#aiSummaryBox");
      box.classList.add("show");
      box.innerHTML = `<div class="waiting-box"><div class="dot-flash"><span></span><span></span><span></span></div> Analyzing your query...</div>`;
      setTimeout(() => {
        box.innerHTML = `<div class="as-head">${icon("sparkle")} AI Analysis Summary</div><p>${esc(buildLawAiSummary(query, cat.label))}</p>`;
        setTimeout(() => renderVolunteerCard(volunteer, cat, true), 500);
      }, 900);
    } else {
      renderVolunteerCard(volunteer, cat, false);
    }
    showToast("Request submitted", "check-circle");
  });
}

function renderVolunteerCard(v, cat, isLegal) {
  const card = $("#volunteerCard");
  card.innerHTML = `
    <div class="vc-top">
      <div class="vc-avatar">${initials(v.name)}</div>
      <div><div class="vc-name">${esc(v.name)}</div><div class="vc-spec">${esc(isLegal ? v.spec : cat.label + " Responder")}</div></div>
    </div>
    <div class="vc-row"><span>Rating</span><span class="vv">${v.rating} / 5</span></div>
    <div class="vc-row"><span>Distance</span><span class="vv">${v.distance} km</span></div>
    <div class="vc-row"><span>Availability</span><span class="vv">${esc(v.availability)}</span></div>
    <div class="vc-row"><span>Est. Response Time</span><span class="vv">${v.eta} min</span></div>
    <div class="vc-actions">
      <button class="btn btn-green btn-sm" id="vcCallBtn">${icon("phone")} Call</button>
      <button class="btn btn-outline btn-sm" id="vcChatBtn">${icon("chat")} Chat</button>
    </div>`;
  card.classList.add("show");
  $("#vcCallBtn").addEventListener("click", () => openCallModal(v));
  $("#vcChatBtn").addEventListener("click", () => openChatModal(v));
}

/* ---- ALL LAWS ---- */
function renderLaws() {
  return `
  <div class="section-hero">
    <div class="wrap">
      <div class="crumb"><a href="#/home">Home</a> / <span>All Laws</span></div>
      <h1>All Laws</h1>
      <p>Plain-language explanations of the laws and rules that shape everyday life — organised by category.</p>
    </div>
  </div>
  <div class="wrap">
    <div class="law-grid">
      ${LAW_CATEGORIES.map(c => `
        <a class="card card-hover law-tile" href="#/laws/${c.key}">
          <div class="lt-icon">${icon(c.icon)}</div>
          <h4>${esc(c.label)}</h4>
          <div class="lt-count">${c.count} acts &amp; rules</div>
        </a>`).join("")}
    </div>
  </div>`;
}

function renderLawDetail(key) {
  const { catMeta, detail } = getLawDetail(key);
  if (!catMeta) {
    return `<div class="wrap"><div class="empty-state">${icon("search")}<h4>Law category not found</h4><p><a href="#/laws">Back to All Laws</a></p></div></div>`;
  }
  return `
  <div class="section-hero">
    <div class="wrap">
      <div class="crumb"><a href="#/home">Home</a> / <a href="#/laws">All Laws</a> / <span>${esc(catMeta.label)}</span></div>
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        ${badgeIllustration(catMeta.icon)}
        <div>
          <h1>${esc(catMeta.label)}</h1>
          <p>${catMeta.count} acts &amp; rules referenced in this category</p>
        </div>
      </div>
    </div>
  </div>
  <div class="wrap">
    <div class="law-detail-layout">
      <div>
        <div class="ld-section"><h3><span class="num">01</span> Overview</h3><p>${esc(detail.overview)}</p></div>
        <div class="ld-section"><h3><span class="num">02</span> Who It Applies To</h3><p>${esc(detail.appliesTo)}</p></div>
        <div class="ld-section"><h3><span class="num">03</span> Citizen Rights</h3><ul class="ld-list">${detail.rights.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>
        <div class="ld-section"><h3><span class="num">04</span> Citizen Responsibilities</h3><ul class="ld-list">${detail.responsibilities.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>
        <div class="ld-section"><h3><span class="num">05</span> Important Acts</h3>${detail.acts.map(a => `<span class="act-chip">${icon("scroll")}${esc(a)}</span>`).join("")}</div>
        <div class="ld-section"><h3><span class="num">06</span> Related Rules</h3>${detail.relatedRules.map(a => `<span class="act-chip">${icon("doc")}${esc(a)}</span>`).join("")}</div>
        <div class="ld-section">
          <h3><span class="num">07</span> Frequently Asked Questions</h3>
          ${detail.faqs.map((f, i) => `
            <div class="faq-item">
              <button class="faq-q" data-i="faq${i}">${esc(f.q)} ${icon("x")}</button>
              <div class="faq-a" data-a="faq${i}">${esc(f.a)}</div>
            </div>`).join("")}
        </div>
        <div class="ld-section">
          <h3><span class="num">08</span> Recent Updates</h3>
          ${detail.updates.map(u => `<div class="update-item"><div class="update-date">${esc(u.date)}</div><div>${esc(u.text)}</div></div>`).join("")}
        </div>
        <div class="ld-section">
          <h3><span class="num">09</span> Common Scenarios</h3>
          ${detail.scenarios.map(s => `<div class="scenario-card"><div class="sc-title">${esc(s.title)}</div><p>${esc(s.text)}</p></div>`).join("")}
        </div>
      </div>
      <div class="ld-side">
        <div class="ai-explain-box">
          <div class="ae-head">${icon("sparkle")} AI Explanation</div>
          <p>${esc(detail.aiExplanation)}</p>
        </div>
        <div class="hd-card card" style="margin-top:16px">
          <h3 style="font-size:14px;margin-bottom:10px">Related Categories</h3>
          ${detail.related.map(label => {
            const k = labelToLawKey(label);
            return k ? `<a class="related-chip" href="#/laws/${k}">${esc(label)}</a>` : `<span class="related-chip">${esc(label)}</span>`;
          }).join("")}
        </div>
        <div class="hd-card card" style="margin-top:16px">
          <h3 style="font-size:14px;margin-bottom:6px">Useful Links</h3>
          ${detail.links.map(l => `<div class="link-row"><span>${esc(l.label)}</span><span class="badge badge-gray">${esc(l.note)}</span></div>`).join("")}
        </div>
      </div>
    </div>
  </div>`;
}

function afterRenderLawDetail() {
  $all(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.i;
      const answer = $(`.faq-a[data-a="${key}"]`);
      const open = !btn.classList.contains("open");
      btn.classList.toggle("open", open);
      answer.classList.toggle("open", open);
    });
  });
}

/* ---------------------------------------------------------------------- */
/* 5. Modals                                                              */
/* ---------------------------------------------------------------------- */
function openModal(innerHtml) {
  $("#modalBox").innerHTML = innerHtml;
  $("#modalOverlay").classList.add("open");
}
function closeModal() { $("#modalOverlay").classList.remove("open"); }

const ACTION_CONFIG = {
  flag: { title: "Flag this project", verb: "Flag", options: ["Incorrect information", "Outdated status", "Duplicate entry", "Other"], desc: "Let the department know something looks wrong with this listing." },
  report: { title: "Report an issue", verb: "Report", options: ["Safety concern", "Construction delay", "Environmental concern", "Poor quality of work", "Other"], desc: "Report a specific problem you've observed at this project site." },
  object: { title: "Raise an objection", verb: "Objection", options: ["Land acquisition dispute", "Environmental impact", "Lack of public consultation", "Budget concern", "Other"], desc: "Formally object to this project. Your objection is routed to the reviewing department." }
};

function openActionModal(project, action) {
  const cfg = ACTION_CONFIG[action];
  openModal(`
    <div class="modal-head">
      <div><h3>${cfg.title}</h3><p style="font-size:13px;color:var(--gray-500);margin-top:4px">${esc(project.name)}</p></div>
      <button class="modal-close" data-close>${icon("x")}</button>
    </div>
    <div id="modalFormArea">
      <p style="font-size:13.5px;color:var(--gray-500);margin-bottom:14px">${cfg.desc}</p>
      <div class="field">
        <label>Category</label>
        <select class="select" id="modalCategory">${cfg.options.map(o => `<option>${o}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Details</label>
        <textarea class="input" id="modalReason" placeholder="Add any details that will help the department review this..."></textarea>
        <span class="error-text" id="modalErr">Please add a short description.</span>
      </div>
      <div class="modal-foot">
        <button class="btn btn-outline btn-block" data-close>Cancel</button>
        <button class="btn btn-primary btn-block" id="modalSubmitBtn">Submit ${cfg.verb}</button>
      </div>
    </div>
    <div class="modal-success" id="modalSuccess">
      <div class="ms-icon">${icon("check-circle")}</div>
      <h4>${cfg.verb} submitted</h4>
      <p>The relevant department has been notified for review. This is a simulated submission for the prototype.</p>
      <div class="modal-ref" id="modalRefCode"></div>
      <button class="btn btn-primary btn-block" style="margin-top:18px" data-close>Close</button>
    </div>
  `);
  $all("#modalBox [data-close]").forEach(b => b.addEventListener("click", closeModal));
  $("#modalSubmitBtn").addEventListener("click", () => {
    const reason = $("#modalReason").value.trim();
    if (!reason) { $("#modalErr").classList.add("show"); return; }
    $("#modalSubmitBtn").disabled = true;
    $("#modalSubmitBtn").textContent = "Submitting...";
    setTimeout(() => {
      $("#modalFormArea").style.display = "none";
      $("#modalRefCode").textContent = "Reference: " + refCode(action.toUpperCase().slice(0, 3));
      $("#modalSuccess").classList.add("show");
      $all("#modalBox [data-close]").forEach(b => b.addEventListener("click", closeModal));
    }, 650);
  });
}

function openCallModal(person) {
  openModal(`
    <div class="modal-head">
      <div><h3>Calling ${esc(person.name)}</h3><p style="font-size:13px;color:var(--gray-500);margin-top:4px">Simulated call — no real connection is made</p></div>
      <button class="modal-close" data-close>${icon("x")}</button>
    </div>
    <div id="callState" style="text-align:center;padding:24px 0">
      <div class="ms-icon" style="background:var(--green-100);color:var(--green-700)">${icon("phone")}</div>
      <p style="margin-top:14px;color:var(--gray-500)">Connecting...</p>
      <div class="dot-flash" style="justify-content:center;margin-top:10px"><span></span><span></span><span></span></div>
    </div>
  `);
  $all("#modalBox [data-close]").forEach(b => b.addEventListener("click", closeModal));
  setTimeout(() => {
    const el = $("#callState");
    if (!el) return;
    el.innerHTML = `
      <div class="ms-icon" style="background:var(--green-100);color:var(--green-700)">${icon("check-circle")}</div>
      <h4 style="margin-top:14px">Connected (simulated)</h4>
      <p style="color:var(--gray-500);margin-top:4px">Average wait for ${esc(person.name)} was under ${person.eta} minutes.</p>
      <button class="btn btn-primary btn-block" style="margin-top:18px" data-close>End call</button>`;
    $all("#modalBox [data-close]").forEach(b => b.addEventListener("click", closeModal));
  }, 1600);
}

function openChatModal(person) {
  openModal(`
    <div class="modal-head">
      <div><h3>Chat with ${esc(person.name)}</h3><p style="font-size:13px;color:var(--gray-500);margin-top:4px">${esc(person.spec || "Civic responder")}</p></div>
      <button class="modal-close" data-close>${icon("x")}</button>
    </div>
    <div id="chatThread" style="display:flex;flex-direction:column;gap:10px;min-height:140px"></div>
  `);
  $all("#modalBox [data-close]").forEach(b => b.addEventListener("click", closeModal));
  const thread = $("#chatThread");
  const lines = [
    { role: "bot", text: "Connecting you now..." },
    { role: "bot", text: "Hi, I've received your request — could you share a little more about when this happened?" },
    { role: "user", text: "Sure, sharing details now." },
    { role: "bot", text: "Thanks, reviewing this. (This is a simulated chat for the prototype.)" }
  ];
  lines.forEach((l, i) => {
    setTimeout(() => {
      if (!thread) return;
      const bubble = document.createElement("div");
      bubble.className = "ai-msg " + l.role;
      bubble.style.alignSelf = l.role === "user" ? "flex-end" : "flex-start";
      bubble.textContent = l.text;
      thread.appendChild(bubble);
    }, i * 650);
  });
}

/* ---------------------------------------------------------------------- */
/* 6. Init                                                                */
/* ---------------------------------------------------------------------- */
function init() {
  $all(".seal-slot").forEach(el => el.innerHTML = brandSeal());
  $("#csBtn").innerHTML = icon("sparkle");
  $("#locScopeLabel").textContent = STATE.location.scope;
  $all(".loc-option[data-scope]").forEach(b => b.classList.toggle("selected", b.dataset.scope === STATE.location.scope));

  initHeader();
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

document.addEventListener("DOMContentLoaded", init);
