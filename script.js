/* ===================================================
   Portfolio — Haingo Nirina Fara Mampionona
   Interactive features: spotlight, scroll reveal,
   active nav, scroll progress, theme toggle
   =================================================== */

(function () {
  'use strict';

  // ---- Spotlight (cursor follow — dark mode only) ----
  const spotlight = document.getElementById('spotlight');

  document.addEventListener('mousemove', (e) => {
    if (document.documentElement.classList.contains('light')) return;
    spotlight.style.background =
      `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });

  // ---- Scroll Progress ----
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = percent + '%';
  }

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---- Active Nav Link ----
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('.section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;

    let currentSection = '';
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === currentSection);
    });
  }

  // ---- Scroll event (throttled) ----
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  updateScrollProgress();
  updateActiveNav();

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check saved preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = html.classList.contains('light');
    html.classList.toggle('light', !isLight);
    html.classList.toggle('dark', isLight);
    localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light');

    // Clear spotlight in light mode
    if (!isLight) {
      spotlight.style.background = 'none';
    }
  });

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Mobile bottom nav (inject dynamically) ----
  if (window.innerWidth < 1024) {
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    mobileNav.innerHTML = `
      <a href="#about" data-section="about" class="active">Profil</a>
      <a href="#experience" data-section="experience">Exp.</a>
      <a href="#skills" data-section="skills">Skills</a>
      <a href="#projects" data-section="projects">Projets</a>
      <a href="#contact" data-section="contact">Contact</a>
    `;
    document.body.appendChild(mobileNav);

    // Update active state for mobile nav too
    const mobileLinks = mobileNav.querySelectorAll('a');

    function updateMobileNav() {
      const scrollPos = window.scrollY + 200;
      let current = '';
      sections.forEach((s) => {
        if (s.offsetTop <= scrollPos) current = s.id;
      });
      mobileLinks.forEach((l) => {
        l.classList.toggle('active', l.dataset.section === current);
      });
    }

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateMobileNav);
    });

    // Smooth scroll for mobile nav
    mobileLinks.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
})();
