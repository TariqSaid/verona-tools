/* ═══════════════════════════════════════════════════════════
   VERONA TOOLS — Scroll Animations & Micro-Interactions
   Drop-in file: just add <script src="js/animations.js"></script>
   before </body> in index.html (after app.js)
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────
     1. SCROLL REVEAL — cards, category blocks, hero
     ───────────────────────────────────────────────────── */
  var revealSelectors = [
    '.product-card',
    '.cat-card',
    '.cat-section-block',
    '.store-section .grid > div',
    'footer .grid > div'
  ];

  function applyRevealClasses() {
    revealSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('vt-reveal')) {
          el.classList.add('vt-reveal');
        }
      });
    });
  }

  var observer;
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      document.querySelectorAll('.vt-reveal').forEach(function (el) {
        el.classList.add('vt-visible');
      });
      return;
    }

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;

          // Stagger siblings: find position among siblings
          var parent = el.parentElement;
          var siblings = parent ? Array.from(parent.querySelectorAll(':scope > .vt-reveal')) : [];
          var idx = siblings.indexOf(el);
          var delay = Math.min(idx * 80, 400); // max 400ms stagger

          el.style.transitionDelay = delay + 'ms';

          requestAnimationFrame(function () {
            el.classList.add('vt-visible');
          });

          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.vt-reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────────────────
     2. HERO ENTRANCE — title + subtitle slide up
     ───────────────────────────────────────────────────── */
  function animateHero() {
    var title = document.getElementById('hero-title');
    var sub = document.getElementById('hero-subtitle');
    var badge = document.querySelector('#hero-section .inline-flex');
    var btns = document.querySelector('#hero-section .flex.flex-wrap');

    [badge, title, sub, btns].forEach(function (el, i) {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
      el.style.transitionDelay = (200 + i * 150) + 'ms';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     3. STATS COUNTER — numbers count up on scroll
     ───────────────────────────────────────────────────── */
  function animateStats() {
    var statsBar = document.querySelector('.bg-primary .flex.flex-wrap');
    if (!statsBar || statsBar.dataset.animated) return;

    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          statsBar.dataset.animated = 'true';
          statsObserver.unobserve(statsBar);

          var spans = statsBar.querySelectorAll('span');
          spans.forEach(function (span) {
            var text = span.textContent;
            var match = text.match(/^(\d+)\+?\s/);
            if (match) {
              var target = parseInt(match[1], 10);
              var suffix = text.replace(match[0], '');
              var prefix = text.includes('+') ? '+' : '';
              countUp(span, target, prefix, suffix);
            }
          });
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsBar);
  }

  function countUp(el, target, prefix, suffix) {
    var current = 0;
    var step = Math.max(1, Math.floor(target / 40));
    var duration = 1200;
    var stepTime = duration / (target / step);

    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + prefix + ' ' + suffix;
    }, stepTime);
  }

  /* ─────────────────────────────────────────────────────
     4. CATEGORY CARDS — 3D tilt on hover (desktop only)
     ───────────────────────────────────────────────────── */
  function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

    document.querySelectorAll('.cat-card').forEach(function (card) {
      card.style.transformStyle = 'preserve-3d';
      card.style.perspective = '800px';

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) scale(1.03)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'rotateY(0) rotateX(0) scale(1)';
        card.style.transition = 'transform 0.4s ease';
      });

      card.addEventListener('mouseenter', function () {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     5. IMAGE SKELETON — shimmer while loading
     ───────────────────────────────────────────────────── */
  function initImageSkeletons() {
    document.querySelectorAll('.product-card .product-img, .product-card img[loading="lazy"]').forEach(function (img) {
      if (img.complete) return;

      var parent = img.parentElement;
      if (!parent || parent.classList.contains('vt-skeleton-wrap')) return;

      parent.classList.add('vt-skeleton-wrap');
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease';

      img.addEventListener('load', function () {
        img.style.opacity = '1';
        parent.classList.remove('vt-skeleton-wrap');
      }, { once: true });

      img.addEventListener('error', function () {
        parent.classList.remove('vt-skeleton-wrap');
        img.style.opacity = '1';
      }, { once: true });
    });
  }

  /* ─────────────────────────────────────────────────────
     6. BRAND STRIP — auto-scroll on mobile
     ───────────────────────────────────────────────────── */
  function initBrandScroll() {
    if (window.innerWidth > 768) return;
    var strip = document.querySelector('.brands-strip-scroll');
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;

    var scrollAmount = 1;
    var paused = false;

    strip.addEventListener('touchstart', function () { paused = true; }, { passive: true });
    strip.addEventListener('touchend', function () {
      setTimeout(function () { paused = false; }, 2000);
    }, { passive: true });

    setInterval(function () {
      if (paused) return;
      strip.scrollLeft += scrollAmount;
      if (strip.scrollLeft >= strip.scrollWidth - strip.clientWidth) {
        strip.scrollLeft = 0;
      }
    }, 30);
  }

  /* ─────────────────────────────────────────────────────
     7. RE-OBSERVE after dynamic content renders
     ───────────────────────────────────────────────────── */
  // Watch for new cards added by renderCategorySections()
  var contentObserver = new MutationObserver(function () {
    applyRevealClasses();
    document.querySelectorAll('.vt-reveal:not(.vt-visible)').forEach(function (el) {
      if (observer) observer.observe(el);
    });
    initImageSkeletons();
  });

  var catSections = document.getElementById('category-sections');
  if (catSections) {
    contentObserver.observe(catSections, { childList: true, subtree: true });
  }

  /* ─────────────────────────────────────────────────────
     INIT — run after DOM ready
     ───────────────────────────────────────────────────── */
  function init() {
    animateHero();
    applyRevealClasses();
    initScrollReveal();
    animateStats();
    initCardTilt();
    initImageSkeletons();
    initBrandScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Small delay to let app.js render cards first
    setTimeout(init, 100);
  }
})();
