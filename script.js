/* Portfolio interactions — Haingo */
(function () {
  'use strict';

  // === Scroll Progress ===
  const progressBar = document.getElementById('progressBar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  // === Navbar scrolled state ===
  const navbar = document.querySelector('.navbar');
  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  // === Active nav link ===
  const navLinks = document.querySelectorAll('.navbar__nav a');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let current = '';
    sections.forEach((s) => {
      if (s.offsetTop <= scrollPos) current = s.id;
    });
    navLinks.forEach((l) => {
      l.classList.toggle('active', l.dataset.section === current);
    });
  }

  // === Scroll reveal ===
  const revealItems = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  revealItems.forEach((el) => io.observe(el));

  // === Throttled scroll ===
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateNavbar();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProgress();
  updateNavbar();
  updateActiveNav();

  // === Smooth scroll ===
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const nav = document.querySelector('.navbar__nav');
        if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // === Burger menu ===
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.navbar__nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // === Subtle parallax on blobs ===
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((b, i) => {
      const factor = (i + 1) * 12;
      b.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
})();
