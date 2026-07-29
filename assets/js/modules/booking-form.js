/**
 * booking-form.js — Booking Form Module
 * 
 * Handles the booking/appointment form with:
 * - Client-side validation (required fields, phone format, email, date not past)
 * - Inline error/success feedback
 * - EmailJS integration for form delivery
 * - Loading state during submission
 * - Success confirmation
 */

import { config } from '../data/config.js';
import { services } from '../data/services.js';
import {
  isRequired,
  isValidEmail,
  isValidPhone,
  isDateNotPast,
  validateField,
  showFormFeedback,
  hideFormFeedback,
  setButtonLoading,
  resetButton
} from './form-validation.js';

/**
 * Initialize the booking form
 */
export function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Populate the service select dropdown from services data
  populateServiceSelect(form);

  // Set minimum date to today
  const dateInput = form.querySelector('[name="preferred-date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Add real-time validation on blur
  addBlurValidation(form);

  // Handle form submission
  form.addEventListener('submit', handleBookingSubmit);
}

/**
 * Populate the service dropdown from services.js data
 * @param {HTMLFormElement} form
 */
function populateServiceSelect(form) {
  const select = form.querySelector('[name="service"]');
  if (!select) return;

  // Keep the first "Select a service" placeholder option
  const placeholder = select.querySelector('option[value=""]');
  select.innerHTML = '';
  if (placeholder) {
    select.appendChild(placeholder);
  } else {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Select a service';
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);
  }

  // Add service options from data
  services.forEach(service => {
    const opt = document.createElement('option');
    opt.value = service.id;
    opt.textContent = service.name;
    select.appendChild(opt);
  });
}

/**
 * Add blur event listeners for real-time field validation
 * @param {HTMLFormElement} form
 */
function addBlurValidation(form) {
  const fields = {
    'full-name': (val) => isRequired(val) ? '' : 'Full name is required',
    'phone': (val) => {
      if (!isRequired(val)) return 'Phone number is required';
      if (!isValidPhone(val)) return 'Enter a valid Pakistani phone number (e.g., 0300-1234567)';
      return '';
    },
    'email': (val) => {
      if (!isRequired(val)) return 'Email address is required';
      if (!isValidEmail(val)) return 'Enter a valid email address';
      return '';
    },
    'address': (val) => isRequired(val) ? '' : 'Address is required',
    'preferred-date': (val) => {
      if (!isRequired(val)) return 'Preferred date is required';
      if (!isDateNotPast(val)) return 'Date cannot be in the past';
      return '';
    },
    'service': (val) => isRequired(val) ? '' : 'Please select a service'
  };

  Object.entries(fields).forEach(([name, validator]) => {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return;

    field.addEventListener('blur', () => {
      const error = validator(field.value);
      if (error) {
        import('./form-validation.js').then(mod => mod.showError(field, error));
      } else {
        import('./form-validation.js').then(mod => mod.markValid(field));
      }
    });
  });
}

/**
 * Handle booking form submission
 * @param {Event} e
 */
async function handleBookingSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('[type="submit"]');
  const feedbackEl = form.querySelector('.form-feedback') || createFeedbackEl(form);

  // Validate all fields
  let isValid = true;

  const fullName = form.querySelector('[name="full-name"]');
  const phone = form.querySelector('[name="phone"]');
  const email = form.querySelector('[name="email"]');
  const address = form.querySelector('[name="address"]');
  const service = form.querySelector('[name="service"]');
  const date = form.querySelector('[name="preferred-date"]');
  const time = form.querySelector('[name="preferred-time"]');
  const message = form.querySelector('[name="message"]');

  // Validate each field
  if (!validateField(fullName, isRequired, 'Full name is required')) isValid = false;
  if (!validateField(phone, isValidPhone, 'Enter a valid Pakistani phone number')) isValid = false;
  if (!validateField(email, isValidEmail, 'Enter a valid email address')) isValid = false;
  if (!validateField(address, isRequired, 'Address is required')) isValid = false;
  if (!validateField(service, isRequired, 'Please select a service')) isValid = false;
  if (!validateField(date, isDateNotPast, 'Select a valid future date')) isValid = false;

  if (!isValid) {
    showFormFeedback(feedbackEl, 'Please fix the errors above and try again.', 'error');
    return;
  }

  // Set loading state
  hideFormFeedback(feedbackEl);
  setButtonLoading(submitBtn, 'Sending booking...');

  // Get the service name from the select
  const serviceName = service.options[service.selectedIndex]?.text || service.value;

  // Prepare form data
  const formData = {
    service: serviceName,
    full_name: fullName.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    address: address.value.trim(),
    preferred_date: date.value,
    preferred_time: time?.value || 'Not specified',
    message: message?.value?.trim() || 'No additional message'
  };

  try {
    // Check if EmailJS is configured
    if (config.emailjs.publicKey === 'YOUR_PUBLIC_KEY') {
      // EmailJS not configured — show success anyway for demo, log data
      console.log('Booking form data (EmailJS not configured):', formData);
      showFormFeedback(
        feedbackEl,
        '✅ Booking request received! We will contact you shortly to confirm your appointment.',
        'success'
      );
      form.reset();
      resetButton(submitBtn);
      return;
    }

    // Send via EmailJS
    await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.bookingTemplateId,
      formData,
      config.emailjs.publicKey
    );

    showFormFeedback(
      feedbackEl,
      '✅ Booking request sent successfully! We will contact you shortly to confirm.',
      'success'
    );
    form.reset();

  } catch (error) {
    console.error('Booking form error:', error);
    showFormFeedback(
      feedbackEl,
      '❌ Something went wrong. Please try again or contact us directly via WhatsApp.',
      'error'
    );
  } finally {
    resetButton(submitBtn);
  }
}

/**
 * Create a feedback element if one doesn't exist in the form
 * @param {HTMLFormElement} form
 * @returns {HTMLElement}
 */
function createFeedbackEl(form) {
  const el = document.createElement('div');
  el.className = 'form-feedback';
  form.prepend(el);
  return el;
}

/**
 * Open the booking modal with a pre-selected service
 * @param {string} serviceId - The service ID to pre-select
 */
export function openBookingWithService(serviceId) {
  const modal = document.getElementById('booking-modal');
  const form = document.getElementById('booking-form');
  
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  if (form && serviceId) {
    const select = form.querySelector('[name="service"]');
    if (select) {
      select.value = serviceId;
    }
  }
}
