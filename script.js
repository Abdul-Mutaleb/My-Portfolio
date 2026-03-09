/* ════════════════════════════════════════════════
   Abdul Mutaleb — Portfolio Script
   Scroll popup + Infinite slider + Web3Forms
   ════════════════════════════════════════════════ */

<<<<<<< HEAD
const WEB3_KEY = '3837ebc6-0387-4278-8f13-0906af2d0232';
const TO_EMAIL  = 'abdulmutaleb.puc@gmail.com';
const CV_PATH   = 'cv/Abdul-Mutaleb-CV.pdf';

/* ══════════════════════════════════════
   INFINITE TECH SLIDER
   ══════════════════════════════════════ */
const TECHS = [
  {icon:'fa-brands fa-html5',     label:'HTML5',      color:'#e34f26'},
  {icon:'fa-brands fa-css3-alt',  label:'CSS3',        color:'#264de4'},
  {icon:'fa-brands fa-bootstrap', label:'Bootstrap',   color:'#7952b3'},
  {icon:'fa-brands fa-js',        label:'JavaScript',  color:'#f7df1e'},
  {icon:'fa-brands fa-react',     label:'React',       color:'#61dafb'},
  {icon:'fa-brands fa-php',       label:'PHP',         color:'#8892be'},
  {icon:'fa-brands fa-laravel',   label:'Laravel',     color:'#ff2d20'},
  {icon:'fa-solid fa-database',   label:'MySQL',       color:'#4479a1'},
  {icon:'fa-brands fa-git-alt',   label:'Git',         color:'#f05032'},
  {icon:'fa-brands fa-github',    label:'GitHub',      color:'#333'},
  {icon:'fa-solid fa-server',     label:'REST API',    color:'#0d9488'},
  {icon:'fa-solid fa-terminal',   label:'CLI',         color:'#059669'},
  {icon:'fa-brands fa-npm',       label:'NPM',         color:'#cb3837'},
  {icon:'fa-solid fa-code',       label:'VS Code',     color:'#007acc'},
  {icon:'fa-solid fa-wind',       label:'Tailwind',    color:'#38bdf8'},
  {icon:'fa-solid fa-layer-group',label:'MVC',         color:'#14b8a6'},
  {icon:'fa-solid fa-shield-alt', label:'JWT Auth',    color:'#10b981'},
  {icon:'fa-brands fa-sass',      label:'SCSS',        color:'#cc6699'},
];

function buildSlider() {
  const wrap = document.getElementById('slider-wrap');
  if (!wrap) return;

  // Row 1 — first 10 techs, loop twice for seamless
  const r1techs = TECHS.slice(0, 10);
  // Row 2 — last 8 techs + first 2, loop twice
  const r2techs = [...TECHS.slice(9), ...TECHS.slice(0, 4)];

  function makeChips(list) {
    return list.map(t =>
      `<span class="tech-chip">
        <i class="${t.icon}" style="color:${t.color}"></i>${t.label}
      </span>`
    ).join('');
  }

  // Double each row so CSS translateX(-50%) creates seamless loop
  const row1Html = makeChips([...r1techs, ...r1techs]);
  const row2Html = makeChips([...r2techs, ...r2techs]);

  wrap.innerHTML = `
    <div class="slider-track row1">${row1Html}</div>
    <div class="slider-track row2">${row2Html}</div>
  `;
}
buildSlider();

/* ══════════════════════════════════════
   SKILLS DATA + RENDER
   ══════════════════════════════════════ */
const SKILLS = [
  {icon:'fa-brands fa-html5',     name:'HTML5',      cat:'// frontend',           pct:95, c1:'#e34f26', c2:'#ff6b35'},
  {icon:'fa-brands fa-css3-alt',  name:'CSS3',        cat:'// frontend',           pct:90, c1:'#264de4', c2:'#3b82f6'},
  {icon:'fa-brands fa-bootstrap', name:'Bootstrap',   cat:'// ui_framework',       pct:92, c1:'#7952b3', c2:'#9c6bdb'},
  {icon:'fa-brands fa-js',        name:'JavaScript',  cat:'// scripting',          pct:80, c1:'#f7df1e', c2:'#f59e0b'},
  {icon:'fa-brands fa-react',     name:'React',       cat:'// frontend_framework', pct:72, c1:'#61dafb', c2:'#06b6d4'},
  {icon:'fa-brands fa-php',       name:'PHP',         cat:'// backend',            pct:85, c1:'#777bb4', c2:'#8b5cf6'},
  {icon:'fa-brands fa-laravel',   name:'Laravel',     cat:'// backend_framework',  pct:88, c1:'#ff2d20', c2:'#ef4444'},
  {icon:'fa-solid fa-database',   name:'MySQL',       cat:'// database',           pct:83, c1:'#4479a1', c2:'#0891b2'},
];

const sg = document.getElementById('skills-grid');
SKILLS.forEach((s, i) => {
  const delay = (i % 4) * 0.1;
  sg.innerHTML += `
  <div class="col-sm-6 col-lg-3" data-pop="up" data-delay="${delay}">
    <div class="skill-card" data-pct="${s.pct}">
      <div class="sk-icon-wrap" style="background:linear-gradient(135deg,${s.c1},${s.c2})"><i class="${s.icon}"></i></div>
      <span class="sk-pct">${s.pct}%</span>
      <div class="sk-name">${s.name}</div>
      <div class="sk-cat">${s.cat}</div>
      <div class="sk-bar"><div class="sk-fill" style="background:linear-gradient(90deg,${s.c1},${s.c2})"></div></div>
    </div>
  </div>`;
});

/* ══════════════════════════════════════
   PROJECTS DATA + RENDER
   ══════════════════════════════════════ */
const PROJECTS = [
  {icon:'fa-solid fa-traffic-light', bg:'linear-gradient(135deg,#0d9488,#059669)',cat:'Laravel',catIcon:'fa-brands fa-laravel',title:'Traffic Offense Management System',desc:'Role-based violation management for police departments — offense recording, fine management, vehicle verification, and admin dashboard.',tags:['Laravel','PHP','MySQL','Bootstrap','JavaScript'],github:'https://github.com/Abdul-Mutaleb',demo:'#'},
  {icon:'fa-solid fa-gavel',         bg:'linear-gradient(135deg,#059669,#14b8a6)',cat:'Laravel',catIcon:'fa-brands fa-laravel',title:'Online Bidding System',desc:'Full-stack auction platform with bidding history, item approval workflow, user authorization, and admin management panel.',tags:['Laravel','PHP','MySQL','Bootstrap','JavaScript'],github:'https://github.com/Abdul-Mutaleb',demo:'#'},
  {icon:'fa-solid fa-chart-line',    bg:'linear-gradient(135deg,#0f766e,#10b981)',cat:'Laravel',catIcon:'fa-brands fa-laravel',title:'Admin Dashboard',desc:'Real-time analytics panel with charts, user roles, CRUD operations and permission management built with Laravel.',tags:['Laravel','JavaScript','MySQL','Bootstrap'],github:'https://github.com/Abdul-Mutaleb',demo:'#'},
  {icon:'fa-solid fa-plug',          bg:'linear-gradient(135deg,#14b8a6,#059669)',cat:'PHP',catIcon:'fa-brands fa-php',title:'RESTful API',desc:'Secure REST API with JWT authentication, rate limiting, CRUD endpoints and full Postman documentation.',tags:['PHP','Laravel','MySQL','JSON'],github:'https://github.com/Abdul-Mutaleb',demo:'#'},
  {icon:'fa-solid fa-newspaper',     bg:'linear-gradient(135deg,#5eead4,#0d9488)',cat:'PHP',catIcon:'fa-brands fa-php',title:'Blog & CMS',desc:'Content management system with rich text editor, SEO tools, categories, tags and comment system.',tags:['PHP','MySQL','CSS','JavaScript'],github:'https://github.com/Abdul-Mutaleb',demo:'#'},
  {icon:'fa-solid fa-briefcase',     bg:'linear-gradient(135deg,#0d9488,#5eead4)',cat:'Frontend',catIcon:'fa-solid fa-code',title:'Portfolio Website',desc:'Responsive animated portfolio with scroll effects, typed animation, and dynamic project loading.',tags:['HTML','CSS','Bootstrap','JavaScript'],github:'https://github.com/Abdul-Mutaleb',demo:'#'},
];

const cats     = ['All', ...new Set(PROJECTS.map(p => p.cat))];
const catIcons = {All:'fa-solid fa-border-all',Laravel:'fa-brands fa-laravel',PHP:'fa-brands fa-php',Frontend:'fa-solid fa-code'};
const fEl      = document.getElementById('filters');
cats.forEach((c, i) => {
  const b = document.createElement('button');
  b.className = 'filter-btn' + (i === 0 ? ' active' : '');
  b.innerHTML = `<i class="${catIcons[c] || 'fa-solid fa-code'}"></i> ${c}`;
  b.dataset.c = c;
  fEl.appendChild(b);
});

function renderProj(f = 'All') {
  const g    = document.getElementById('proj-grid');
  const list = f === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === f);
  g.innerHTML = list.map((p, i) => `
  <div class="col-md-6 col-lg-4" data-pop="up" data-delay="${i * 0.1}">
    <div class="proj-card">
      <div class="proj-thumb" style="background:${p.bg}">
        <div class="proj-thumb-icon"><i class="${p.icon}"></i></div>
        <div class="proj-overlay">
          <a href="${p.demo}" class="ov-btn" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
          <a href="${p.github}" target="_blank" class="ov-btn" title="GitHub"><i class="fab fa-github"></i></a>
        </div>
      </div>
      <div class="proj-body">
        <div class="proj-cat-tag"><i class="${p.catIcon}"></i> ${p.cat}</div>
        <div class="proj-name">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-tags">${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}</div>
      </div>
    </div>
  </div>`).join('');
  // Re-observe newly rendered items
  setTimeout(() => observeAll(), 50);
}
renderProj();

fEl.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProj(btn.dataset.c);
});

/* ══════════════════════════════════════
   TYPED TEXT
   ══════════════════════════════════════ */
const phrases = ['Full Stack Laravel Developer','PHP Backend Engineer','Laravel Expert','Web App Builder','MySQL Specialist','React Developer'];
let pi = 0, ci = 0, del = false;
const tEl = document.getElementById('typed');
function type() {
  const cur = phrases[pi];
  tEl.textContent = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
  let t = del ? 55 : 100;
  if (!del && ci === cur.length + 1)    { del = true;  t = 1800; }
  else if (del && ci < 0)               { del = false; pi = (pi + 1) % phrases.length; t = 320; }
  setTimeout(type, t);
}
type();

/* ══════════════════════════════════════
   COUNTER ANIMATION
   ══════════════════════════════════════ */
function animCount(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = true;
  const tgt = +el.dataset.count;
  let n = 0;
  const iv = setInterval(() => {
    n += tgt / 50;
    if (n >= tgt) { el.textContent = tgt + '+'; clearInterval(iv); }
    else            el.textContent = Math.floor(n);
  }, 28);
}

/* ══════════════════════════════════════
   UNIVERSAL SCROLL POPUP OBSERVER
   ══════════════════════════════════════ */
function observeAll() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseFloat(el.dataset.delay || 0) * 1000;

      setTimeout(() => {
        el.classList.add('popped');

        // Skill bar fill
        const fill = el.querySelector('.sk-fill');
        if (fill) fill.style.width = el.querySelector('.skill-card')?.dataset.pct + '%';

        // Counter
        el.querySelectorAll('[data-count]').forEach(animCount);
      }, delay);

      obs.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-pop]').forEach(el => {
    if (!el.classList.contains('popped')) obs.observe(el);
  });
}

// Initial observation
observeAll();

/* ══════════════════════════════════════
   SMOOTH SCROLL
   ══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
    const nav = document.getElementById('navMenu');
    if (nav.classList.contains('show')) bootstrap.Collapse.getInstance(nav)?.hide();
  });
});

/* ══════════════════════════════════════
   NAVBAR SCROLL + ACTIVE LINK
   ══════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
  document.getElementById('stt').classList.toggle('show', scrollY > 400);
  let cur = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 100) cur = s.id; });
  document.querySelectorAll('.navbar-nav .nav-link').forEach(l => {
    l.classList.remove('active-link');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('active-link');
  });
});
document.getElementById('stt').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ══════════════════════════════════════
   CV DOWNLOAD
   ══════════════════════════════════════ */
const cvBtn = document.getElementById('cv-btn');
if (cvBtn) {
  cvBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href     = CV_PATH;
    link.download = 'Abdul-Mutaleb-CV.pdf';
    link.target   = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

/* ══════════════════════════════════════
   CONTACT FORM — WEB3FORMS LIVE EMAIL
   ══════════════════════════════════════ */
document.getElementById('cform').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn     = document.getElementById('send-btn');
  const btnTxt  = document.getElementById('btn-txt');
  const btnSpin = document.getElementById('btn-spin');
  const succBox = document.getElementById('succ');
  const errBox  = document.getElementById('err-box');
  const errMsg  = document.getElementById('err-msg');

  succBox.style.display = 'none';
  errBox.style.display  = 'none';
  btn.disabled          = true;
  btnTxt.style.display  = 'none';
  btnSpin.style.display = 'flex';

  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const message = document.getElementById('f-msg').value.trim();

  try {
    const res  = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3_KEY,
        name, email,
        subject:  `[Portfolio] ${subject}`,
        message:  `From: ${name}\nEmail: ${email}\n\n${message}`,
        to_email: TO_EMAIL,
        botcheck: '',
      }),
    });
    const data = await res.json();
    if (data.success) {
      succBox.style.display = 'flex';
      this.reset();
      setTimeout(() => { succBox.style.display = 'none'; }, 6000);
    } else {
      errMsg.textContent   = data.message || 'Submission failed. Please try again.';
      errBox.style.display = 'flex';
    }
  } catch (err) {
    errMsg.textContent   = 'Network error. Please check your connection and try again.';
    errBox.style.display = 'flex';
  } finally {
    btn.disabled          = false;
    btnTxt.style.display  = 'flex';
    btnSpin.style.display = 'none';
  }
});
=======
>>>>>>> 6b542674dd66e7f36ca020239a49a2a45a55f1b0
