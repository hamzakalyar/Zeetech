/**
 * nav-menu.js — Navigation Module
 * 
 * Handles:
 * - Mobile hamburger menu toggle (slide-in panel + backdrop overlay)
 * - Desktop services dropdown (click-based, consistent across all pages)
 * - Mobile services accordion dropdown
 * - Active nav state detection from current URL
 * - Header scroll shadow effect
 */

/**
 * Initialize all navigation functionality
 */
export function initNavigation() {
  initHamburgerMenu();
  initDesktopDropdown();
  initMobileDropdown();
  initActiveNavState();
  initScrollHeader();
}

/**
 * Mobile hamburger menu — slide-in panel with overlay
 */
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');

  if (!hamburger || !mobileNav) return;

  function openMenu() {
    hamburger.classList.add('active');
    mobileNav.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close when a link is clicked (except the services dropdown trigger)
  mobileNav.querySelectorAll('a:not(.mobile-services-link)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Desktop services dropdown is now handled purely by CSS :hover
 */
function initDesktopDropdown() {
  // Empty - Logic moved to CSS hover in layout.css
}

/**
 * Mobile services dropdown — accordion toggle
 */
function initMobileDropdown() {
  const mobileDropdownArrow = document.getElementById('mobile-dropdown-arrow');
  const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');

  if (!mobileDropdownArrow || !mobileDropdownMenu) return;

  mobileDropdownArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDropdownMenu.classList.toggle('show');
    mobileDropdownArrow.classList.toggle('rotated');
  });

  // Also allow the services text to toggle
  const mobileServicesLink = document.getElementById('mobile-services-link');
  if (mobileServicesLink) {
    mobileServicesLink.addEventListener('click', (e) => {
      if (window.location.pathname.includes('services')) return;
      e.preventDefault();
      mobileDropdownMenu.classList.toggle('show');
      mobileDropdownArrow.classList.toggle('rotated');
    });
  }
}

/**
 * Close all desktop dropdowns
 */
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.classList.remove('show');
  });
  document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
    arrow.classList.remove('rotated');
  });
}

/**
 * Highlight the current page's nav link based on URL
 */
function initActiveNavState() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if the link matches the current page
    const isActive = (
      (currentPath === '/' && (href === '/' || href === 'index.html')) ||
      (currentPath.includes(href) && href !== '/' && href !== 'index.html') ||
      (currentPath.endsWith(href))
    );

    if (isActive) {
      link.classList.add('active-nav');
    }
  });
}

/**
 * Add shadow to header on scroll
 */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}
