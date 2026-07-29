/**
 * portfolio-gallery.js
 * 
 * Handles rendering the masonry gallery, filtering categories,
 * pagination (load more), and the fullscreen lightbox feature.
 */

import { portfolioItems } from '../data/portfolio.js';

export function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const filters = document.getElementById('portfolio-filters');
  const lightbox = document.getElementById('portfolio-lightbox');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreContainer = document.getElementById('load-more-container');
  
  if (!grid || !filters || !lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  let currentCategoryItems = portfolioItems;
  let itemsToShow = 15; // Initial load amount
  let currentLoaded = 0;

  // Render initial batch
  resetAndLoad();

  // Filter click events
  const filterBtns = filters.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;
      
      if (filterValue === 'all') {
        currentCategoryItems = portfolioItems;
      } else {
        currentCategoryItems = portfolioItems.filter(item => item.category === filterValue);
      }
      
      resetAndLoad();
    });
  });

  // Load More Button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadNextBatch();
    });
  }

  // Lightbox close events
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function resetAndLoad() {
    grid.innerHTML = '';
    currentLoaded = 0;
    
    if (currentCategoryItems.length === 0) {
      grid.innerHTML = '<p class="text-center text-gray-500 py-8" style="column-span: all;">No projects found in this category.</p>';
      loadMoreContainer.style.display = 'none';
      return;
    }

    loadNextBatch();
  }

  function loadNextBatch() {
    const fragment = document.createDocumentFragment();
    const end = Math.min(currentLoaded + itemsToShow, currentCategoryItems.length);

    for (let i = currentLoaded; i < end; i++) {
      const item = currentCategoryItems[i];
      const div = document.createElement('div');
      div.className = `portfolio-item fade-in-up`;
      div.dataset.category = item.category;
      
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.loading = 'lazy';

      div.appendChild(img);
      
      // Click to open lightbox
      div.addEventListener('click', () => openLightbox(item.src));
      
      fragment.appendChild(div);
    }

    grid.appendChild(fragment);
    currentLoaded = end;

    // Show or hide Load More button
    if (currentLoaded >= currentCategoryItems.length) {
      loadMoreContainer.style.display = 'none';
    } else {
      loadMoreContainer.style.display = 'block';
    }
  }

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }
}
