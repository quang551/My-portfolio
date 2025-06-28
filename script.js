// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  // Back to Top
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
  backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hobby click to show details
  const details = document.querySelector('.hobby-details');
  document.querySelectorAll('.hobby').forEach(hobby => {
    hobby.addEventListener('click', () => {
      const id = hobby.dataset.hobby;
      document.querySelectorAll('.hobby-details .detail').forEach(d => d.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      details.classList.add('active');
    });
  });

  // Close details on any click outside the detail panel
details.addEventListener('click', e => {
  // chỉ đóng khi click ngoài detail (chính xác là trên overlay)
  if (e.target === details) {
    details.classList.remove('active');
    document.querySelectorAll('.hobby-details .detail').forEach(d => d.classList.remove('active'));
  }
});

  // Carousel functionality
  document.querySelectorAll('.hobby-details .detail').forEach(detail => {
    const imgs = Array.from(detail.querySelectorAll('.carousel-image'));
    let idx = 0;
    const total = imgs.length;
    const btnPrev = detail.querySelector('.arrow-left');
    const btnNext = detail.querySelector('.arrow-right');

    function updateCarousel() {
      imgs.forEach((img, i) => img.classList.toggle('active', i === idx));
    }

    btnPrev.addEventListener('click', e => {
      idx = (idx - 1 + total) % total;
      updateCarousel();
    });

    btnNext.addEventListener('click', e => {
      idx = (idx + 1) % total;
      updateCarousel();
    });

    updateCarousel();
  });

  // Scroll animations & skill bars
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'skills') {
          document.querySelectorAll('.bar div').forEach(b => b.style.width = b.getAttribute('data-width'));
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Tilt text effect
  document.querySelectorAll('.tilt-text').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2)/rect.width;
      const y = (e.clientY - rect.top - rect.height/2)/rect.height;
      el.style.transform = `rotateX(${y*10}deg) rotateY(${x*10}deg)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
});