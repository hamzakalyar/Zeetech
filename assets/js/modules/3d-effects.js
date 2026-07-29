/**
 * 3d-effects.js — Interactive 3D Features Module
 * 
 * Adds high-performance, smooth 3D interactive features:
 * 1. 3D Tilt Effect on Logo with Dynamic Light Glare
 * 2. 3D Gyroscope/Mouse Perspective Tilt on Service Cards, Flip Cards, & Stat Cards
 * 3. 3D Icon Parallax Lift (elements pop out in 3D space)
 * 4. 3D Hero Image Mouse Parallax Depth
 * 
 * Mobile & Desktop friendly with 60fps requestAnimationFrame optimization.
 */

export function init3DEffects() {
  init3DLogo();
  init3DCards();
  init3DHeroParallax();
}

/**
 * 1. 3D Interactive Logo with Glare and Depth
 */
function init3DLogo() {
  const logoLinks = document.querySelectorAll('.logo-link, .footer-logo');

  logoLinks.forEach(container => {
    const img = container.querySelector('.logo-img, .footer-logo-img');
    const text = container.querySelector('.logo-text, .footer-logo-text');

    if (!img) return;

    // Enable 3D transform style on parent
    container.style.perspective = '1000px';
    container.style.transformStyle = 'preserve-3d';

    if (img) {
      img.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
      img.style.transformStyle = 'preserve-3d';
    }

    if (text) {
      text.style.transition = 'transform 0.15s ease-out';
      text.style.transformStyle = 'preserve-3d';
    }

    let requestId = null;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max rotation in degrees
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      if (requestId) cancelAnimationFrame(requestId);

      requestId = requestAnimationFrame(() => {
        if (img) {
          img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale(1.08)`;
          img.style.boxShadow = `${-rotateY * 0.8}px ${rotateX * 0.8}px 25px rgba(12, 92, 168, 0.4)`;
        }
        if (text) {
          text.style.transform = `perspective(1000px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg) translateZ(8px)`;
        }
      });
    });

    container.addEventListener('mouseleave', () => {
      if (requestId) cancelAnimationFrame(requestId);
      if (img) {
        img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        img.style.boxShadow = '';
      }
      if (text) {
        text.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    });
  });
}

/**
 * 2. 3D Mouse Perspective Tilt on Service Cards, Stat Cards, & Contact Cards
 */
function init3DCards() {
  const tiltSelectors = [
    '.service-card-home',
    '.contact-info-card',
    '.stat-card',
    '.stat-item',
    '.why-card',
    '.support-cat-card'
  ].join(', ');

  const cards = document.querySelectorAll(tiltSelectors);

  cards.forEach(card => {
    // Add 3D container styles
    card.style.perspective = '1000px';
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease-out';

    // Find inner elements to lift out in 3D
    const icon = card.querySelector('.icon-wrapper, .service-card-icon, .icon-box, .stat-icon, i');
    const title = card.querySelector('h3, h4');
    const button = card.querySelector('.btn, .card-actions');

    if (icon) icon.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
    if (title) title.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
    if (button) button.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)';

    let frameId = null;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${-rotateY * 1.2}px ${rotateX * 1.2 + 15}px 35px rgba(12, 92, 168, 0.18)`;

        // 3D Layer Elevation (Parallax Pop-out)
        if (icon) icon.style.transform = 'translateZ(30px) scale(1.1)';
        if (title) title.style.transform = 'translateZ(20px)';
        if (button) button.style.transform = 'translateZ(25px)';
      });
    });

    card.addEventListener('mouseleave', () => {
      if (frameId) cancelAnimationFrame(frameId);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      card.style.boxShadow = '';

      if (icon) icon.style.transform = 'translateZ(0px) scale(1)';
      if (title) title.style.transform = 'translateZ(0px)';
      if (button) button.style.transform = 'translateZ(0px)';
    });
  });
}

/**
 * 3. 3D Hero Parallax Mouse Movement
 */
function init3DHeroParallax() {
  const heroSection = document.querySelector('.hero-section, .about-hero');
  if (!heroSection) return;

  const heroImage = heroSection.querySelector('.hero-image img, .about-hero-image img');
  const heroBadge = heroSection.querySelector('.section-badge');
  const heroTitle = heroSection.querySelector('h1');

  if (!heroImage) return;

  heroSection.style.perspective = '1200px';

  let heroFrame = null;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    if (heroFrame) cancelAnimationFrame(heroFrame);

    heroFrame = requestAnimationFrame(() => {
      // Rotate hero image in 3D
      const moveX = (x / rect.width) * 15;
      const moveY = (y / rect.height) * 15;

      heroImage.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(20px)`;
      heroImage.style.boxShadow = `${-moveX * 1.5}px ${moveY * 1.5 + 20}px 40px rgba(0, 0, 0, 0.2)`;

      if (heroBadge) {
        heroBadge.style.transform = `translate3d(${moveX * 0.5}px, ${moveY * 0.5}px, 15px)`;
      }
      if (heroTitle) {
        heroTitle.style.transform = `translate3d(${moveX * 0.2}px, ${moveY * 0.2}px, 10px)`;
      }
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    if (heroFrame) cancelAnimationFrame(heroFrame);
    heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    heroImage.style.boxShadow = '';
    if (heroBadge) heroBadge.style.transform = '';
    if (heroTitle) heroTitle.style.transform = '';
  });
}
