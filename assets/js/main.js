/**
 * main.js — Entry Point
 * 
 * Initializes all JavaScript modules on DOMContentLoaded.
 * Conditionally loads modules based on what elements are present on the page,
 * so pages that don't have a timer or form don't run unnecessary code.
 */

import { initNavigation } from './modules/nav-menu.js';
import { initCountdownTimer } from './modules/countdown-timer.js';
import { initBookingForm } from './modules/booking-form.js';
import { initReviewForm } from './modules/review-form.js';
import { initServiceModals } from './modules/service-modal.js';
import { init3DEffects } from './modules/3d-effects.js';
import { initPolicyModal } from './modules/policy-modal.js';
import { initProjects } from './modules/projects-gallery.js';
import { initReviewsLoader } from './modules/reviews-loader.js';

// Force the browser to start at the top of the page on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/**
 * Initialize everything when the DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Navigation is present on every page
  initNavigation();

  // 3D Interactive Features (Logo tilt, card perspective pop-out, 3D parallax)
  init3DEffects();

  // Countdown timer — only if the timer section exists on this page
  if (document.getElementById('offer-timer-section')) {
    initCountdownTimer();
  }

  // Booking form — only if the form exists
  if (document.getElementById('booking-form')) {
    initBookingForm();
  }

  // Review/feedback form — only if the feedback widget exists
  if (document.getElementById('feedback-main-btn') || document.getElementById('review-form')) {
    initReviewForm();
  }

  // Fetch and load reviews dynamically if the reviews swiper wrapper exists
  if (document.querySelector('.reviews-swiper .swiper-wrapper')) {
    initReviewsLoader();
  }

  // Service modals — only if service detail modal exists
  if (document.getElementById('service-detail-modal')) {
    initServiceModals();
  }

  // FAQ accordion — init if FAQ items exist
  if (document.querySelector('.faq-question')) {
    initFaqAccordion();
  }

  // Hero Background Slider
  if (document.getElementById('heroBgSlider')) {
    initHeroBgSlider();
  }

  // Smooth scroll for anchor links
  initSmoothScroll();

  // Initialize dynamic policy modal for footer links
  initPolicyModal();

  // Initialize Portfolio Gallery
  if (document.getElementById('projects-grid')) {
    initProjects();
  }

  // Lazy load images
  initLazyLoad();
});

/**
 * Hero Background Slider Logic
 * Auto-rotates backgrounds and allows hover-to-change on thumbnails.
 */
function initHeroBgSlider() {
  const slides = document.querySelectorAll('.hero-bg-slide');
  const thumbs = document.querySelectorAll('.service-thumb');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  // Function to change slide
  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    if (slides[index]) {
      slides[index].classList.add('active');
      currentSlide = index;
    }
  }

  // Auto rotate every 5 seconds
  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      goToSlide(nextSlide);
    }, 5000);
  }

  // Hover interactions on thumbnails
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('mouseenter', () => {
      // Pause auto-slide and change to hovered slide
      clearInterval(slideInterval);
      goToSlide(index);
    });

    thumb.addEventListener('mouseleave', () => {
      // Resume auto-slide
      startAutoSlide();
    });
  });

  // Start auto rotation initially
  startAutoSlide();
}

/**
 * FAQ Accordion — toggle answers on question click
 */
function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.contains('active');

      // Close all other open FAQs
      questions.forEach(q => {
        q.classList.remove('active');
        const a = q.nextElementSibling;
        if (a && a.classList.contains('faq-answer')) {
          a.classList.remove('show');
        }
      });

      // Toggle current
      if (!isOpen) {
        question.classList.add('active');
        if (answer && answer.classList.contains('faq-answer')) {
          answer.classList.add('show');
        }
      }
    });
  });
}

/**
 * Smooth scroll for same-page anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/**
 * Lazy load images using Intersection Observer
 * Images with data-src attribute will be loaded when they enter the viewport
 */
function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback: load all images immediately
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}
