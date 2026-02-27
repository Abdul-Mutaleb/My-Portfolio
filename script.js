// PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const p = document.getElementById('preloader');
    p.classList.add('hide');
    setTimeout(() => p.remove(), 500);
  }, 800);
});

// NAVBAR MOBILE TOGGLE
const navToggler = document.getElementById('navToggler');
const navMenu = document.getElementById('navMenu');
navToggler.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => navMenu.classList.remove('show'));
});

// STICKY NAVBAR + ACTIVE LINKS
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  // active link
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
});

// TYPING ANIMATION
const phrases = ['Full Stack Developer', 'Laravel Expert', 'PHP Developer', 'Problem Solver'];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingEl');
function typeEffect() {
  const phrase = phrases[pi];
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(typeEffect, 2000); return; }
  } else {
    typingEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeEffect, deleting ? 60 : 110);
}
typeEffect();

// DARK/LIGHT THEME
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// SKILL BAR ANIMATION
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#skills .row.g-4').forEach(el => skillObs.observe(el));

// COUNTER ANIMATION
function animateCounter(el, target) {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const counterGrid = document.querySelector('.counter-grid');
if (counterGrid) counterObs.observe(counterGrid);

// PROJECT FILTER
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.project-item').forEach(item => {
      const cats = item.dataset.category || '';
      if (filter === 'all' || cats.includes(filter)) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => { item.style.transition = 'all 0.4s'; item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 10);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// CONTACT FORM VALIDATION
document.getElementById('sendBtn').addEventListener('click', () => {
  const name = document.getElementById('contactName');
  const email = document.getElementById('contactEmail');
  const subject = document.getElementById('contactSubject');
  const message = document.getElementById('contactMessage');
  let valid = true;
  [[name,'nameError',v=>v.length>=2],[email,'emailError',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)],[subject,'subjectError',v=>v.length>=3],[message,'messageError',v=>v.length>=10]].forEach(([el,errId,test]) => {
    const err = document.getElementById(errId);
    const ok = test(el.value.trim());
    el.classList.toggle('error', !ok);
    err.classList.toggle('show', !ok);
    if (!ok) valid = false;
  });
  if (valid) {
    [name,email,subject,message].forEach(el => { el.value = ''; el.classList.remove('error'); });
    document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
    const success = document.getElementById('formSuccess');
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 4000);
  }
});

// BACK TO TOP
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
