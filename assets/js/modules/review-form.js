/**
 * review-form.js — Review/Feedback Form Module
 * 
 * Handles the customer review submission form with:
 * - Star rating selection
 * - Name and review text validation
 * - EmailJS integration (sends review to admin email for approval)
 * - "Pending admin approval" confirmation message
 * - Feedback panel toggle (floating widget)
 */

import { config } from '../data/config.js';
import {
  isRequired,
  hasMinLength,
  showError,
  markValid,
  showFormFeedback,
  hideFormFeedback,
  setButtonLoading,
  resetButton
} from './form-validation.js';

/**
 * Initialize the review form and feedback widget
 */
export function initReviewForm() {
  initFeedbackWidget();
  initStarRating();
  initReviewSubmit();
}

/**
 * Toggle the feedback panel (floating widget on bottom-left)
 */
function initFeedbackWidget() {
  const mainBtn = document.getElementById('feedback-main-btn');
  const panel = document.getElementById('feedback-panel');
  const closeBtn = document.getElementById('close-feedback-panel');

  if (!mainBtn || !panel) return;

  mainBtn.addEventListener('click', () => {
    panel.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('active');
    });
  }

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.feedback-widget') && panel.classList.contains('active')) {
      panel.classList.remove('active');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
      panel.classList.remove('active');
    }
  });
}

/**
 * Initialize star rating interaction
 * The HTML uses radio inputs with labels in reverse order for CSS trick
 */
function initStarRating() {
  const starContainer = document.querySelector('.star-rating');
  if (!starContainer) return;

  const inputs = starContainer.querySelectorAll('input[type="radio"]');
  const labels = starContainer.querySelectorAll('label');

  // Ensure star labels are clickable
  labels.forEach(label => {
    label.addEventListener('click', () => {
      const forId = label.getAttribute('for');
      const radio = document.getElementById(forId);
      if (radio) {
        radio.checked = true;
        // Trigger visual feedback
        label.style.transform = 'scale(1.2)';
        setTimeout(() => {
          label.style.transform = '';
        }, 200);
      }
    });
  });
}

/**
 * Handle review form submission
 */
function initReviewSubmit() {
  const form = document.getElementById('review-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const feedbackEl = form.querySelector('.form-feedback') || createFeedbackEl(form);

    // Get form values
    const nameInput = form.querySelector('[name="reviewer-name"]');
    const reviewInput = form.querySelector('[name="review-text"]');
    const ratingInputs = form.querySelectorAll('input[name="rating"]');

    let selectedRating = 0;
    ratingInputs.forEach(input => {
      if (input.checked) {
        selectedRating = parseInt(input.value);
      }
    });

    // Validate
    let isValid = true;

    if (!isRequired(nameInput?.value)) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else {
      markValid(nameInput);
    }

    if (!hasMinLength(reviewInput?.value || '', 10)) {
      showError(reviewInput, 'Review must be at least 10 characters');
      isValid = false;
    } else {
      markValid(reviewInput);
    }

    if (selectedRating === 0) {
      showFormFeedback(feedbackEl, 'Please select a star rating.', 'error');
      isValid = false;
    }

    if (!isValid) return;

    // Set loading state
    hideFormFeedback(feedbackEl);
    setButtonLoading(submitBtn, 'Submitting...');

    const reviewData = {
      reviewer_name: nameInput.value.trim(),
      rating: selectedRating,
      review_text: reviewInput.value.trim(),
      submitted_at: new Date().toLocaleString()
    };

    try {
      // Send via PHP API
      const response = await fetch('api/reviews.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        showSuccessMessage(form, feedbackEl);
      } else {
        throw new Error(result.message || 'API Error');
      }

      showSuccessMessage(form, feedbackEl);

    } catch (error) {
      console.error('Review submission error:', error);
      showFormFeedback(
        feedbackEl,
        '❌ Failed to submit review. Please try again or share your feedback on WhatsApp.',
        'error'
      );
    } finally {
      resetButton(submitBtn);
    }
  });
}

/**
 * Show success message after review submission
 * @param {HTMLFormElement} form
 * @param {HTMLElement} feedbackEl
 */
function showSuccessMessage(form, feedbackEl) {
  showFormFeedback(
    feedbackEl,
    '⭐ Thank you! Your review has been submitted successfully.',
    'success'
  );
  form.reset();

  // Reset star rating visual
  const labels = form.querySelectorAll('.star-rating label');
  labels.forEach(label => {
    label.style.color = '#ddd';
  });
}

/**
 * Create a feedback element if one doesn't exist
 * @param {HTMLFormElement} form
 * @returns {HTMLElement}
 */
function createFeedbackEl(form) {
  const el = document.createElement('div');
  el.className = 'form-feedback';
  const firstChild = form.firstElementChild;
  form.insertBefore(el, firstChild);
  return el;
}
