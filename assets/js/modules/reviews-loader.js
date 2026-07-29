/**
 * Fetches and renders approved customer reviews from the PHP API
 */

export async function initReviewsLoader() {
  const wrapper = document.querySelector('.reviews-swiper .swiper-wrapper');
  if (!wrapper) return;

  try {
    const response = await fetch('/api/reviews.php');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const result = await response.json();
    
    if (result.success && result.data.length > 0) {
      wrapper.innerHTML = ''; // Clear loading state
      
      result.data.forEach(review => {
        // Generate stars HTML
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
          if (i < review.rating) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
          } else {
            starsHtml += '<i class="fa-regular fa-star"></i>';
          }
        }
        
        // Get first letter of name for avatar
        const avatarLetter = review.reviewer_name.charAt(0).toUpperCase();
        
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">${avatarLetter}</div>
              <div>
                <div class="review-name">${review.reviewer_name}</div>
                <div class="review-stars">
                  ${starsHtml}
                </div>
              </div>
            </div>
            <p class="review-text">"${review.review_text}"</p>
          </div>
        `;
        
        wrapper.appendChild(slide);
      });
      
      // We must re-initialize or update the Swiper after adding dynamic content
      // If Swiper instance exists on the element, update it. Otherwise, init it.
      const swiperContainer = document.querySelector('.reviews-swiper');
      if (swiperContainer && swiperContainer.swiper) {
        swiperContainer.swiper.update();
      }
      
    } else {
      wrapper.innerHTML = `
        <div class="swiper-slide">
          <div class="review-card" style="display: flex; justify-content: center; align-items: center; min-height: 150px;">
            <p>No reviews available yet.</p>
          </div>
        </div>
      `;
    }
    
  } catch (error) {
    console.error('Error fetching reviews:', error);
    wrapper.innerHTML = `
        <div class="swiper-slide">
          <div class="review-card" style="display: flex; justify-content: center; align-items: center; min-height: 150px;">
            <p>Failed to load reviews.</p>
          </div>
        </div>
      `;
  }
}
