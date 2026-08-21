document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(max-width: 1499px)').matches) return;

  const heroContent = document.querySelector('.mobile-hero-content');
  const overlay = document.querySelector('.hero-overlay');
  const scrollHint = document.querySelector('.scroll-hint');
  const heroHeader = document.querySelector('.hero-header');
  const heroCoverTitle = document.querySelector('.hero-cover-title');

  const CONTENT_FADE_DISTANCE = 600;
  const OVERLAY_FADE_DISTANCE = 400;
  const OVERLAY_MAX_OPACITY = 0.5;
  const SWIPE_THRESHOLD = 5; 

  let ticking = false;
  let isAnimating = false;
  let touchStartY = null;

  // --- dynamic reveal target ---
  function getRevealDistance() {
    if (!heroHeader) return 0;
    // distance from current document top to the header's position
    return heroHeader.getBoundingClientRect().top + window.scrollY - 50;
  }

  // --- existing opacity fade logic, unchanged ---
  function update() {
    const scrollY = window.scrollY;

    if (heroContent) {
      const contentProgress = Math.min(Math.max(scrollY / CONTENT_FADE_DISTANCE, 0), 1);
      heroContent.style.opacity = contentProgress;
    }

    if (overlay) {
      const overlayProgress = Math.min(Math.max(scrollY / OVERLAY_FADE_DISTANCE, 0), 1);
      overlay.style.opacity = overlayProgress * OVERLAY_MAX_OPACITY;
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // --- snap-to logic ---
  function snapTo(target) {
    if (isAnimating) return;
    isAnimating = true;
    window.scrollTo({ top: target, behavior: 'smooth' });

    const check = setInterval(() => {
      if (Math.abs(window.scrollY - target) < 2) {
        isAnimating = false;
        clearInterval(check);
      }
    }, 50);
  }

  function inHeroZone() {
    const revealDistance = getRevealDistance();
    return window.scrollY >= 0 && window.scrollY <= revealDistance;
  }

  // --- touch (swipe) handling ---
  window.addEventListener('touchstart', function (e) {
    if (!inHeroZone()) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (!inHeroZone() || touchStartY === null || isAnimating) return;

    const deltaY = touchStartY - e.touches[0].clientY;

    if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
      e.preventDefault();
      if (deltaY > 0) {
        snapTo(getRevealDistance()); // swiped up → reveal content, header lands at top
        scrollHint?.classList.add('invisible');
        heroCoverTitle?.classList.add('invisible');
      } else {
        snapTo(0); // swiped down → back to cover
        scrollHint?.classList.remove('invisible');
        heroCoverTitle?.classList.remove('invisible');
      }
      touchStartY = null;
    }
  }, { passive: false });

  window.addEventListener('touchend', function () {
    touchStartY = null;
  }, { passive: true });

  // --- wheel/trackpad handling ---
  window.addEventListener('wheel', function (e) {
    if (!inHeroZone() || isAnimating) return;

    e.preventDefault();
    if (e.deltaY > 0) {
      snapTo(getRevealDistance());
      scrollHint?.classList.add('invisible');
      heroCoverTitle?.classList.add('invisible');
    } else if (e.deltaY < 0) {
      snapTo(0);
      scrollHint?.classList.remove('invisible');
      heroCoverTitle?.classList.remove('invisible');
    }
  }, { passive: false });
});