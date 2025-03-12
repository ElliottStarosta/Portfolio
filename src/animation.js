document.addEventListener('DOMContentLoaded', () => {
  const preview = document.querySelector('.project-preview');
  const timelineItems = document.querySelectorAll('.timeline-item');
  let isAnimating = false;

  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const img = item.dataset.projectImage;
      if (!img) return;
      
      preview.innerHTML = `<img src="${img}" alt="Project Preview">`;
      preview.style.opacity = '1';
    });

    item.addEventListener('mousemove', (e) => {
      if (!isAnimating) {
        requestAnimationFrame(() => {
          preview.style.left = `${e.clientX + 25}px`;
          preview.style.top = `${e.clientY + 25}px`;
          preview.style.transform = `translate(0, 0) scale(1)`;
          isAnimating = false;
        });
        isAnimating = true;
      }
    });

    item.addEventListener('mouseleave', () => {
      preview.style.opacity = '0';
      preview.style.transform = `translate(-50%, -50%) scale(0.95)`;
      preview.innerHTML = '';
    });
  });
});