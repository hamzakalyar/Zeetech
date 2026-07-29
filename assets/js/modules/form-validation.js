/**
 * form-validation.js — Shared Form Validation Utilities
 * 
 * Provides reusable validation functions and inline error display helpers
 * used by both the booking form and review form modules.
 */

/**
 * Validate that a field is not empty
 * @param {string} value - The field value
 * @returns {boolean}
 */
export function isRequired(value) {
  return value !== null && value !== undefined && value.toString().trim().length > 0;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim());
}

/**
 * Validate Pakistani phone number format
 * Accepts: 03XX-XXXXXXX, 03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX
 * @param {string} phone - The phone number to validate
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Pakistani mobile: starts with 03 (11 digits) or +923/923 (12-13 digits)
  const pattern = /^(\+?92|0)?3\d{9}$/;
  return pattern.test(cleaned);
}

/**
 * Validate that a date is not in the past
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {boolean}
 */
export function isDateNotPast(dateStr) {
  if (!dateStr) return false;
  const selected = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
}

/**
 * Validate minimum text length
 * @param {string} value - The text value
 * @param {number} minLength - Minimum required length
 * @returns {boolean}
 */
export function hasMinLength(value, minLength) {
  return value.trim().length >= minLength;
}

/**
 * Show an inline error message for a form field
 * @param {HTMLElement} field - The input/textarea element
 * @param {string} message - The error message to display
 */
export function showError(field, message) {
  // Add error class to the field
  field.classList.add('error');
  field.classList.remove('success');

  // Find or create the error message element
  let errorEl = field.parentElement.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span></span>';
    field.parentElement.appendChild(errorEl);
  }

  errorEl.querySelector('span').textContent = message;
  errorEl.classList.add('visible');
}

/**
 * Clear the error message for a form field
 * @param {HTMLElement} field - The input/textarea element
 */
export function clearError(field) {
  field.classList.remove('error');

  const errorEl = field.parentElement.querySelector('.form-error');
  if (errorEl) {
    errorEl.classList.remove('visible');
  }
}

/**
 * Mark a field as valid (green border)
 * @param {HTMLElement} field - The input/textarea element
 */
export function markValid(field) {
  field.classList.remove('error');
  field.classList.add('success');
  clearError(field);
}

/**
 * Validate a single field and show/clear error
 * @param {HTMLElement} field - The form field
 * @param {Function} validatorFn - Validation function that returns boolean
 * @param {string} errorMessage - Error message if validation fails
 * @returns {boolean} Whether the field is valid
 */
export function validateField(field, validatorFn, errorMessage) {
  const value = field.value;
  if (!validatorFn(value)) {
    showError(field, errorMessage);
    return false;
  }
  markValid(field);
  return true;
}

/**
 * Show a form-level feedback message (success or error)
 * @param {HTMLElement} container - The feedback container element
 * @param {string} message - The message text
 * @param {'success'|'error'} type - The type of message
 */
export function showFormFeedback(container, message, type) {
  container.className = `form-feedback show ${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  container.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
}

/**
 * Hide the form-level feedback message
 * @param {HTMLElement} container - The feedback container element
 */
export function hideFormFeedback(container) {
  container.className = 'form-feedback';
  container.innerHTML = '';
}

/**
 * Set a button to loading state
 * @param {HTMLButtonElement} button - The submit button
 * @param {string} loadingText - Text to show while loading
 */
export function setButtonLoading(button, loadingText = 'Sending...') {
  button.disabled = true;
  button.dataset.originalText = button.innerHTML;
  button.innerHTML = `<span class="spinner"></span> ${loadingText}`;
}

/**
 * Reset a button from loading state
 * @param {HTMLButtonElement} button - The submit button
 */
export function resetButton(button) {
  button.disabled = false;
  button.innerHTML = button.dataset.originalText || 'Submit';
}
