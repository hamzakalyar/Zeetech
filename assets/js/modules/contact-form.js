import { config } from '../data/config.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fullName = document.getElementById('contact-name');
  const email = document.getElementById('contact-email');
  const phone = document.getElementById('contact-phone');
  const subject = document.getElementById('contact-subject');
  const message = document.getElementById('contact-message');
  const feedbackEl = form.querySelector('.form-feedback');
  const submitBtn = form.querySelector('button[type="submit"]');

  if (!fullName || !email || !message || !feedbackEl || !submitBtn) {
    console.error('Contact form elements missing');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset feedback
    hideFormFeedback(feedbackEl);

    // Basic Validation
    let isValid = true;

    if (!fullName.value.trim()) {
      showError(fullName);
      isValid = false;
    } else {
      removeError(fullName);
    }

    if (!isValidEmail(email.value.trim())) {
      showError(email);
      isValid = false;
    } else {
      removeError(email);
    }

    if (!message.value.trim()) {
      showError(message);
      isValid = false;
    } else {
      removeError(message);
    }

    if (!isValid) {
      showFormFeedback(feedbackEl, 'Please fill in all required fields correctly.', 'error');
      return;
    }

    // Set loading state
    setButtonLoading(submitBtn, 'Sending...');

    const formData = {
      full_name: fullName.value.trim(),
      email: email.value.trim(),
      phone: phone?.value?.trim() || 'Not provided',
      subject: subject?.value?.trim() || 'No subject',
      message: message.value.trim()
    };

    try {
      // Check if EmailJS is configured
      if (config.emailjs.publicKey === 'YOUR_PUBLIC_KEY' || config.emailjs.contactTemplateId === 'YOUR_CONTACT_TEMPLATE') {
        // Not configured - demo mode
        console.log('Contact form data (EmailJS not fully configured):', formData);
        showFormFeedback(feedbackEl, '✅ Message received! (Demo Mode)', 'success');
        form.reset();
        resetButton(submitBtn);
        return;
      }

      // Send via EmailJS
      await emailjs.send(
        config.emailjs.serviceId,
        config.emailjs.contactTemplateId,
        formData,
        config.emailjs.publicKey
      );

      showFormFeedback(
        feedbackEl,
        '✅ Message sent successfully! We will get back to you shortly.',
        'success'
      );
      form.reset();

    } catch (error) {
      console.error('Contact form error:', error);
      showFormFeedback(
        feedbackEl,
        '❌ Something went wrong. Please try again or contact us via WhatsApp.',
        'error'
      );
    } finally {
      resetButton(submitBtn);
    }
  });
}

// ----------------------------------------------------
// UI Helper Functions
// ----------------------------------------------------
function hideFormFeedback(el) {
  el.style.display = 'none';
  el.className = 'form-feedback';
  el.textContent = '';
}

function showFormFeedback(el, msg, type) {
  el.textContent = msg;
  el.className = `form-feedback ${type}`;
  el.style.display = 'block';
}

function showError(inputEl) {
  inputEl.classList.add('error');
}

function removeError(inputEl) {
  inputEl.classList.remove('error');
}

function isValidEmail(emailStr) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
}

function setButtonLoading(btn, text) {
  btn.disabled = true;
  btn.dataset.originalText = btn.innerHTML;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${text}`;
}

function resetButton(btn) {
  btn.disabled = false;
  if (btn.dataset.originalText) {
    btn.innerHTML = btn.dataset.originalText;
  }
}
