/**
 * service-modal.js — Service Detail Modal Module
 * 
 * Handles:
 * - Opening/closing the service detail modal
 * - Dynamically populating modal content from services.js data
 * - Keyboard accessibility (Escape to close, focus trapping)
 * - Backdrop click to close
 * - Connecting "Book Now" from modal to booking form
 */

import { getServiceById } from '../data/services.js';
import { openBookingWithService } from './booking-form.js';

/**
 * Initialize service modals
 */
export function initServiceModals() {
  initModalTriggers();
  initModalClose();
  initHashHandling();
}

/**
 * Handle URL hash to open modal automatically
 */
function initHashHandling() {
  const checkHash = () => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const serviceId = hash.substring(1);
      const service = getServiceById(serviceId);
      if (service) {
        openServiceModal(serviceId);
      }
    }
  };

  // Check on load
  checkHash();

  // Check on hash change (if clicking dropdown while already on the page)
  window.addEventListener('hashchange', checkHash);
}

/**
 * Set up click handlers on all "View More" / service detail triggers
 */
function initModalTriggers() {
  // All elements with data-service-id trigger the modal
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-service-id]');
    if (!trigger) return;

    const action = trigger.dataset.action;
    const serviceId = trigger.dataset.serviceId;

    if (action === 'book') {
      // Open booking modal with this service pre-selected
      openBookingWithService(serviceId);
    } else if (action === 'view' || !action) {
      // Open service detail modal
      openServiceModal(serviceId);
    }
  });
}

/**
 * Open the service detail modal with data from services.js
 * @param {string} serviceId - The service ID
 */
function openServiceModal(serviceId) {
  const service = getServiceById(serviceId);
  if (!service) {
    console.warn(`Service not found: ${serviceId}`);
    return;
  }

  const modal = document.getElementById('service-detail-modal');
  if (!modal) return;

  // Populate modal content
  const modalTitle = modal.querySelector('.modal-title');
  const modalIcon = modal.querySelector('.modal-icon');
  const modalDescription = modal.querySelector('.modal-description');
  const modalFeatures = modal.querySelector('.modal-features');
  const modalPrice = modal.querySelector('.modal-price');
  const modalBookBtn = modal.querySelector('.modal-book-btn');

  if (modalTitle) modalTitle.textContent = service.name;
  if (modalIcon) modalIcon.className = service.icon + ' modal-icon';
  if (modalDescription) modalDescription.textContent = service.fullDescription;
  if (modalPrice) modalPrice.textContent = service.priceRange;

  // Build feature list
  if (modalFeatures) {
    modalFeatures.innerHTML = '<ul class="service-detail-list">' +
      service.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('') +
      '</ul>';
  }

  // Set up the Book Now button inside the modal
  if (modalBookBtn) {
    modalBookBtn.onclick = () => {
      closeModal(modal);
      setTimeout(() => openBookingWithService(serviceId), 300);
    };
  }

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus the close button for accessibility
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 100);
  }
}

/**
 * Set up modal close handlers (close button, backdrop click, Escape key)
 */
function initModalClose() {
  // Close button clicks
  document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-close')) {
      const modal = e.target.closest('.modal-overlay');
      if (modal) closeModal(modal);
    }
  });

  // Backdrop click (click on overlay, not on content)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
      closeModal(e.target);
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });
}

/**
 * Close a modal
 * @param {HTMLElement} modal - The modal overlay element
 */
function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Public API: close all modals
 */
export function closeAllModals() {
  document.querySelectorAll('.modal-overlay.active').forEach(closeModal);
}
