/**
 * Brand Atelier — Core Script & Particle Engine
 * Specifications: Cold, Dark, Monochrome Luxury (SPEC §2, §3, §4)
 */

(function () {
  'use strict';

  // --- 1. Reduced Motion & Device Capability Check ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowPower = hardwareConcurrency < 4 || isMobile;

  // --- 2. Ambient Cursor Spotlight ---
  const spotlight = document.getElementById('ambient-spotlight');
  if (spotlight && !isMobile && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function renderSpotlight() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderSpotlight);
    }
    requestAnimationFrame(renderSpotlight);
  }

  // --- 3. Header Scroll & Mobile Drawer ---
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close drawer when link clicked
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 4. Viewport Intersection Observer (Reveals & Line Draws) ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-line, .founder-card');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.18,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // --- 5. Centered Chess Showcase 3D Tilt Effect ---
  const chessContainer = document.getElementById('chess-tilt-container');
  const chessImg = document.getElementById('chess-img');

  if (chessContainer && chessImg && !isMobile && !prefersReducedMotion) {
    let bounds = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovered = false;

    chessContainer.addEventListener('mouseenter', () => {
      bounds = chessContainer.getBoundingClientRect();
      isHovered = true;
    });

    chessContainer.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = chessContainer.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const normX = (x / bounds.width) - 0.5;
      const normY = (y / bounds.height) - 0.5;

      targetRotateY = normX * 8;   // Max 8 deg Y
      targetRotateX = -normY * 6;  // Max 6 deg X
    });

    chessContainer.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRotateX = 0;
      targetRotateY = 0;
    });

    function tiltLoop() {
      currentRotateX += (targetRotateX - currentRotateX) * 0.08;
      currentRotateY += (targetRotateY - currentRotateY) * 0.08;

      if (isHovered || Math.abs(currentRotateX) > 0.01 || Math.abs(currentRotateY) > 0.01) {
        chessContainer.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
      } else {
        chessContainer.style.transform = 'none';
      }
      requestAnimationFrame(tiltLoop);
    }
    requestAnimationFrame(tiltLoop);
  }

  // --- 6. S1 Hero Canvas Particle Engine ("The Crowded Market Resolves") ---
  const heroSection = document.getElementById('hero');
  const canvas = document.getElementById('hero-canvas');
  const heroTitle = document.getElementById('hero-title');
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroSubhead = document.querySelector('.hero-subhead');
  const heroActions = document.querySelector('.hero-actions');
  const heroFooterBar = document.querySelector('.hero-footer-bar');

  // Trigger Hero entrance sequence timeline
  setTimeout(() => {
    if (heroEyebrow) heroEyebrow.classList.add('is-revealed');
    if (heroTitle) heroTitle.classList.add('is-revealed');
  }, 400);

  setTimeout(() => {
    if (heroSubhead) heroSubhead.classList.add('is-revealed');
    if (heroActions) heroActions.classList.add('is-revealed');
    if (heroFooterBar) heroFooterBar.classList.add('is-revealed');
  }, 1100);

  if (!canvas || prefersReducedMotion) {
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Particle parameters (SPEC §3 S1)
  const PARTICLE_COUNT = isLowPower ? 350 : 850;
  const FOCAL_LENGTH = 450;
  const CAMERA_Z = 6;
  const RESOLVE_START = 2200; // ms
  const RESOLVE_DURATION = 1800; // ms

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Resize listener
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // Camera parallax targets
  let mouseTargetX = 0;
  let mouseTargetY = 0;
  let cameraX = 0;
  let cameraY = 0;

  if (!isMobile) {
    window.addEventListener('pointermove', (e) => {
      // Micro-parallax camera target: +/-0.25u
      mouseTargetX = ((e.clientX / width) - 0.5) * 0.45;
      mouseTargetY = ((e.clientY / height) - 0.5) * 0.35;
    }, { passive: true });
  }

  // Particle Structure
  class Particle {
    constructor(isLeader = false) {
      this.isLeader = isLeader;
      this.reset();
    }

    reset() {
      if (this.isLeader) {
        // The Leader: Positioned deliberately near center-right at z = -2 (SPEC §3 S1)
        this.x = 0.55;
        this.y = -0.15;
        this.z = -2.0;
        this.baseSize = 3.5;
        this.baseAlpha = 0.14;
      } else {
        // Uniformly distributed volume: x in [-3, 3], y in [-2.5, 2.5], z in [-12, 2]
        this.x = (Math.random() - 0.5) * 6.8;
        this.y = (Math.random() - 0.5) * 5.2;
        this.z = -12 + Math.random() * 14;
        this.baseSize = 1.2 + Math.random() * 1.6;
        this.baseAlpha = 0.08 + Math.random() * 0.08;
      }

      // Drift characteristics (per-point sine, period 8-14s)
      this.driftAmpX = 0.08 + Math.random() * 0.12;
      this.driftAmpY = 0.08 + Math.random() * 0.12;
      this.driftFreq = 0.0004 + Math.random() * 0.0004;
      this.phaseX = Math.random() * Math.PI * 2;
      this.phaseY = Math.random() * Math.PI * 2;
    }
  }

  // Populate particles: index 0 is The Resolved Leader
  const particles = [];
  particles.push(new Particle(true));
  for (let i = 1; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(false));
  }

  const startTime = performance.now();
  let animationFrameId = null;
  let isRendering = true;

  // Easing function: Expo Out (SPEC §2.3)
  function easeExpoOut(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // Main Render Loop
  function render(now) {
    const elapsed = now - startTime;

    // Clear Canvas with pure black background
    ctx.clearRect(0, 0, width, height);

    // Calculate Resolve Progress (0 to 1)
    let resolveProgress = 0;
    if (elapsed > RESOLVE_START) {
      resolveProgress = Math.min(1, (elapsed - RESOLVE_START) / RESOLVE_DURATION);
      resolveProgress = easeExpoOut(resolveProgress);
    }

    // Camera Sway + Mouse Parallax
    const swayX = Math.sin(now * 0.00035) * 0.15;
    const swayY = Math.cos(now * 0.00028) * 0.1;
    cameraX += (mouseTargetX + swayX - cameraX) * 0.04;
    cameraY += (mouseTargetY + swayY - cameraY) * 0.04;

    const halfW = width / 2;
    const halfH = height / 2;

    // Render Crowd Particles (Background Market)
    for (let i = 1; i < particles.length; i++) {
      const p = particles[i];

      // Ambient sine drift
      const currentX = p.x + Math.sin(now * p.driftFreq + p.phaseX) * p.driftAmpX - cameraX;
      const currentY = p.y + Math.cos(now * p.driftFreq + p.phaseY) * p.driftAmpY - cameraY;
      const currentZ = p.z - CAMERA_Z;

      if (currentZ >= 0) continue; // Behind camera

      const scale = FOCAL_LENGTH / -currentZ;
      const screenX = halfW + currentX * scale * 75;
      const screenY = halfH + currentY * scale * 75;

      // Depth falloff alpha
      let depthAlpha = Math.min(1, Math.max(0, 1 - (-currentZ / 18)));
      // Market blurs/dims slightly as the leader resolves
      const dimFactor = 1 - (resolveProgress * 0.38);
      const alpha = p.baseAlpha * depthAlpha * dimFactor;

      if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) {
        continue;
      }

      ctx.beginPath();
      ctx.arc(screenX, screenY, Math.max(0.6, p.baseSize * (scale / 45)), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(242, 240, 236, ${alpha.toFixed(3)})`;
      ctx.fill();
    }

    // Render The Resolved Leader (The Positioned Brand)
    const leader = particles[0];
    const leaderX = leader.x + Math.sin(now * leader.driftFreq + leader.phaseX) * 0.04 - cameraX;
    const leaderY = leader.y + Math.cos(now * leader.driftFreq + leader.phaseY) * 0.04 - cameraY;
    const leaderZ = leader.z - CAMERA_Z;

    const leaderScale = FOCAL_LENGTH / -leaderZ;
    const leaderScreenX = halfW + leaderX * leaderScale * 75;
    const leaderScreenY = halfH + leaderY * leaderScale * 75;

    // Interpolate Leader Properties:
    // Scale: 1x -> 3.2x
    // Opacity: 0.14 -> 1.0 (SPEC §3 S1)
    const currentLeaderScale = 1.0 + resolveProgress * 2.2;
    const currentLeaderAlpha = 0.14 + resolveProgress * 0.86;
    const leaderRadius = leader.baseSize * currentLeaderScale * (leaderScale / 50);

    if (resolveProgress > 0.05) {
      // Ethereal Outer Bloom
      const bloomRadius = leaderRadius * (4.5 + Math.sin(now * 0.002) * 0.5);
      const gradient = ctx.createRadialGradient(
        leaderScreenX, leaderScreenY, 0,
        leaderScreenX, leaderScreenY, bloomRadius
      );
      gradient.addColorStop(0, `rgba(242, 240, 236, ${(0.32 * resolveProgress).toFixed(3)})`);
      gradient.addColorStop(0.35, `rgba(242, 240, 236, ${(0.12 * resolveProgress).toFixed(3)})`);
      gradient.addColorStop(1, 'rgba(242, 240, 236, 0)');

      ctx.beginPath();
      ctx.arc(leaderScreenX, leaderScreenY, bloomRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Delicate Ring Halo
      ctx.beginPath();
      ctx.arc(leaderScreenX, leaderScreenY, leaderRadius * 2.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(242, 240, 236, ${(0.28 * resolveProgress).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Core Solid Star
    ctx.beginPath();
    ctx.arc(leaderScreenX, leaderScreenY, leaderRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(242, 240, 236, ${currentLeaderAlpha.toFixed(3)})`;
    ctx.shadowColor = 'rgba(242, 240, 236, 0.85)';
    ctx.shadowBlur = 14 * resolveProgress;
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    if (isRendering) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // Start Animation
  animationFrameId = requestAnimationFrame(render);

  // --- 7. Hero Scroll Fade & rAF Performance Guard (SPEC §3 S1) ---
  // Canvas opacity -> 0 across first 60vh of scroll.
  // IntersectionObserver pauses rAF when offscreen.
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH = heroSection.offsetHeight;
    const fadeLimit = heroH * 0.65;

    if (scrollY <= fadeLimit) {
      canvas.style.opacity = (1 - (scrollY / fadeLimit)).toFixed(2);
    } else {
      canvas.style.opacity = '0';
    }
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isRendering) {
            isRendering = true;
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          isRendering = false;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      });
    }, { threshold: 0.05 });

    heroObserver.observe(heroSection);
  }

})();
