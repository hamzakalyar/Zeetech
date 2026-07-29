/**
 * policy-modal.js
 * 
 * Intercepts clicks on policy links (Privacy, Terms, Refund),
 * fetches their content dynamically, and displays it in a modal popup.
 */

export function initPolicyModal() {
  const policyLinks = document.querySelectorAll('a[href="privacy-policy.html"], a[href="terms-conditions.html"], a[href="refund-policy.html"]');
  
  if (policyLinks.length === 0) return;

  // Create the modal HTML dynamically
  const modalHTML = `
    <div class="modal-overlay" id="policy-modal" role="dialog" aria-modal="true">
      <div class="modal-content policy-modal-content">
        <div class="modal-header">
          <h3 id="policy-modal-title"><i class="fa-solid fa-shield-halved"></i> <span>Legal Policy</span></h3>
          <button class="modal-close" id="close-policy-modal" aria-label="Close policy modal">&times;</button>
        </div>
        <div class="modal-body policy-modal-body" id="policy-modal-body">
          <div class="policy-loading" style="text-align: center; padding: 2rem;">
            <i class="fa-solid fa-spinner fa-spin fa-2x text-zeetech"></i>
            <p style="margin-top: 1rem; color: var(--color-text-light);">Loading policy content...</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal to body if it doesn't exist
  if (!document.getElementById('policy-modal')) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = document.getElementById('policy-modal');
  const closeBtn = document.getElementById('close-policy-modal');
  const modalBody = document.getElementById('policy-modal-body');
  const modalTitleSpan = modal.querySelector('#policy-modal-title span');

  const loadingHTML = `
    <div class="policy-loading" style="text-align: center; padding: 2rem;">
      <i class="fa-solid fa-spinner fa-spin fa-2x text-zeetech" style="color: var(--color-primary);"></i>
      <p style="margin-top: 1rem; color: var(--color-text-light);">Loading policy content...</p>
    </div>
  `;

  // Close Modal functions
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach click listeners to all policy links
  policyLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      // Allow right-click / open in new tab to work normally
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      
      e.preventDefault();
      
      const targetUrl = link.getAttribute('href');
      
      // Set title based on URL
      if (targetUrl.includes('privacy')) {
        modalTitleSpan.textContent = 'Privacy Policy';
      } else if (targetUrl.includes('terms')) {
        modalTitleSpan.textContent = 'Terms & Conditions';
      } else if (targetUrl.includes('refund')) {
        modalTitleSpan.textContent = 'Refund Policy';
      }

      // Show modal in loading state
      modalBody.innerHTML = loadingHTML;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling

      try {
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Failed to fetch policy content');
        
        const html = await response.text();
        
        // Parse the fetched HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract the .policy-content div
        const policyContent = doc.querySelector('.policy-content');
        
        if (policyContent) {
          modalBody.innerHTML = policyContent.innerHTML;
        } else {
          throw new Error('Policy content structure not found');
        }
      } catch (error) {
        console.error('Error loading policy:', error);
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--color-error, #dc2626);">
            <i class="fa-solid fa-circle-exclamation fa-2x" style="margin-bottom: 1rem;"></i>
            <p>Failed to load policy content. Please try again later or click the link to open in a new tab.</p>
            <a href="${targetUrl}" class="btn btn-outline" style="margin-top: 1rem;" target="_blank">Open Policy Page</a>
          </div>
        `;
      }
    });
  });
}
