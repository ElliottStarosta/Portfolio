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

// Modal

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.project-modal');
  const closeBtn = document.querySelector('.modal-close');
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Click handler for timeline items
  timelineItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const title = item.querySelector('h3').textContent;
      const subtitle = item.querySelector('p').textContent;
      const techTags = [...item.querySelectorAll('.tech-tag')].map(tag => tag.cloneNode(true));
      const githubUrl = item.dataset.github;
      const websiteUrl = item.dataset.website;
      const longDesc = item.dataset.longDescription;

      // Populate modal
      const modalTech = modal.querySelector('.modal-tech');
      const githubLink = modal.querySelector('.github-link');
      const websiteLink = modal.querySelector('.website-link');

      modal.querySelector('.modal-title').textContent = title;
      modal.querySelector('.modal-subtitle').textContent = subtitle;
      modalTech.replaceChildren(...techTags);
      githubLink.href = githubUrl || '#';
      websiteLink.href = websiteUrl || '#';
      
      // Toggle website link visibility
      if(websiteUrl) {
        websiteLink.style.display = 'inline-flex';
        websiteLink.innerHTML = '<i class="ri-external-link-line"></i> Website';
      } else {
        websiteLink.style.display = 'none';
      }
      
      modal.querySelector('.modal-description').textContent = longDesc;
      openModal();

    });
  });

  // Close modal handlers
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Update the modal script
  function openModal() {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open'); // Add this
    document.documentElement.style.overflow = 'hidden'; // For Firefox
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Add this
    document.documentElement.style.overflow = ''; // For Firefox
  }
});

const techLinks = {
  html: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  css: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  javascript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  java: 'https://docs.oracle.com/javase/8/docs/api/index.html',
  python: 'https://docs.python.org/3/',
  arduino: 'https://docs.arduino.cc/language-reference/',
  node: 'https://nodejs.org/'
};

document.addEventListener('DOMContentLoaded', () => {

  // Only add click handlers to modal tech tags
  document.querySelector('.modal-tech').addEventListener('click', (e) => {
    const techTag = e.target.closest('.tech-tag');
    if (techTag) {
      const tech = techTag.dataset.tech;
      if (techLinks[tech]) {
        window.open(techLinks[tech], '_blank');
      }
    }
  });

  // Update tag cloning to preserve data-tech
  const techTags = [...item.querySelectorAll('.tech-tag')].map(tag => {
    const clone = tag.cloneNode(true);
    clone.dataset.tech = tag.dataset.tech; // Copy data attribute
    return clone;
  });
});

// Handle keyword clicks
document.querySelectorAll('.keyword[data-project]').forEach(keyword => {
  keyword.addEventListener('click', function(e) {
    e.preventDefault();
    const projectId = this.dataset.project;
    console.log(projectId)
    
    // Find the matching timeline item
    const projectItem = document.querySelector(`.timeline-item[data-project="${projectId}"]`);
    
    if(projectItem) {
      // Trigger the timeline item's click handler
      projectItem.click();
      
      // Optional: Scroll to modal (if needed)
      document.querySelector('.project-modal').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});