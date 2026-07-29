/**
 * countdown-timer.js — Countdown Timer Module
 * 
 * Counts down to a configurable end date from config.js.
 * When the timer expires, it hides the offer banner or shows an "expired" message.
 * Uses requestAnimationFrame for smooth updates.
 */

import { config } from '../data/config.js';

let timerInterval = null;

/**
 * Initialize the countdown timer
 * Looks for elements with IDs: timer-days, timer-hours, timer-minutes, timer-seconds
 * And the parent container: offer-timer-section
 */
export function initCountdownTimer() {
  const timerSection = document.getElementById('offer-timer-section');
  if (!timerSection) return; // No timer on this page

  // Init Collapsible Bar Toggle
  const timerBar = timerSection.querySelector('.offer-timer-bar');
  if (timerBar) {
    timerBar.addEventListener('click', () => {
      timerSection.classList.toggle('expanded');
    });
  }

  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');
  const discountEl = document.getElementById('discount-number');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Set the discount percentage from config
  if (discountEl) {
    discountEl.textContent = `${config.discountPercent}%`;
  }

  const endDate = new Date(config.countdownEndDate).getTime();

  /**
   * Update the timer display
   */
  function updateTimer() {
    const now = Date.now();
    const remaining = endDate - now;

    if (remaining <= 0) {
      // Timer expired
      clearInterval(timerInterval);
      handleExpired(timerSection);
      return;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    // Update display with zero-padded values
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Initial update
  updateTimer();

  // Update every second
  timerInterval = setInterval(updateTimer, 1000);
}

/**
 * Handle timer expiration
 * Shows an "offer expired" message or hides the section
 * @param {HTMLElement} timerSection - The timer section container
 */
function handleExpired(timerSection) {
  const offerContainer = timerSection.querySelector('.offer-container');
  if (offerContainer) {
    offerContainer.innerHTML = `
      <div class="offer-expired" style="width: 100%;">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-clock" style="margin-right: 0.5rem;"></i>
          This offer has expired
        </p>
        <p style="font-size: 0.85rem; opacity: 0.85;">
          Stay tuned for our next promotion! Contact us for current pricing.
        </p>
      </div>
    `;
  }
}

/**
 * Cleanup: stop the timer interval (useful if the page changes dynamically)
 */
export function destroyCountdownTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}
