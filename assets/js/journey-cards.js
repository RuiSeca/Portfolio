/*==================== JOURNEY CARDS SWIPER ====================*/
document.addEventListener('DOMContentLoaded', function () {
  // Wait for Swiper library to be loaded
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library not loaded');
    return;
  }

  // Initialize Journey Swiper with simplified config
  const journeySwiper = new Swiper('.journeySwiper', {
    // Basic parameters
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: false,
    speed: 400,

    // Pagination
    pagination: {
      el: '.journey-pagination',
      clickable: true,
      type: 'bullets',
    },

    // Keyboard
    keyboard: {
      enabled: true,
    },

    // Accessibility
    a11y: {
      enabled: true,
    },

    // Events
    on: {
      init: function () {
        console.log('✨ Journey Swiper initialized');
      },
    },
  });

  // Scroll reveal for journey container
  const journeyContainer = document.querySelector('.journey__container');
  if (journeyContainer) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(journeyContainer);
  }

});
