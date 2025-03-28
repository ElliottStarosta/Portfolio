// JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const preview = document.querySelector(".project-preview");
  const timelineItems = document.querySelectorAll(".timeline-item");
  let isAnimating = false;

  // Populate timeline content
  timelineItems.forEach((item) => {
    const content = item.querySelector(".timeline-content");

    // Create elements
    const date = document.createElement("div");
    date.className = "timeline-date";
    date.textContent = item.dataset.date || "";

    const title = document.createElement("h3");
    title.className = "timeline-title";
    title.textContent = item.dataset.title || "";

    // Add custom font size if specified
    if (item.dataset.titleSize) {
      title.style.fontSize = item.dataset.titleSize;
    }
    
    const marker = item.querySelector('.timeline-marker');
    if (item.dataset.markerColor) {
      marker.style.background = item.dataset.markerColor;
    }

    const typeProject = document.createElement("p");
    typeProject.className = "timeline-type";
    typeProject.textContent = item.dataset.type || "";

    

    // Append elements
    content.appendChild(date);
    content.appendChild(title);
    content.appendChild(typeProject);
  });

  // Hover functionality
  timelineItems.forEach((item) => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    console.log("IsMobile " + isMobile);
  
    // Click handler for all devices
    item.addEventListener("click", (e) => {
      if (!e.target.closest('.timeline-link')) {
        const gitUrl = item.dataset.github;
        if (gitUrl) window.open(gitUrl, '_blank');
      }
    });
  
    // Only add hover effects for desktop
    if (!isMobile) {
      item.addEventListener("mouseenter", () => {
        const img = item.dataset.image;
        const title = item.dataset.title;
        const desc = item.dataset.description;
  
        preview.innerHTML = `
          <div class="preview-image">
            <img src="${img}" alt="Project Preview">
            <div class="image-overlay"></div>
          </div>
          <div class="preview-meta">
            <div class="preview-title">${title}</div>
            <div class="preview-description">${desc}</div>
          </div>
        `;
  
        if (item.dataset.previewWidth) {
          preview.style.width = item.dataset.previewWidth;
        } else {
          preview.style.width = "300px";
        }
  
        preview.style.opacity = "1";
      });
  
      item.addEventListener("mousemove", (e) => {
        if (!isAnimating) {
          requestAnimationFrame(() => {
            preview.style.left = `${e.clientX + 30}px`;
            preview.style.top = `${e.clientY + 30}px`;
            preview.style.transform = `translate(0, 0) scale(1)`;
            isAnimating = false;
          });
          isAnimating = true;
        }
      });
  
      item.addEventListener("mouseleave", () => {
        preview.style.opacity = "0";
        preview.style.transform = `translate(-50%, -50%) scale(0.95)`;
        preview.innerHTML = "";
      });
    }
  });
});

// Handle keyword clicks
document.querySelectorAll(".keyword[data-project]").forEach((keyword) => {
  keyword.addEventListener("click", function (e) {
    e.preventDefault();
    const projectId = this.dataset.project;
    console.log(projectId);

    // Find the matching timeline item
    const projectItem = document.querySelector(
      `.timeline-item[data-project="${projectId}"]`
  );
  console.log(projectItem);

    if (projectItem) {
      // Trigger the timeline item's click handler
      projectItem.click();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Calculate height for all timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const content = item.querySelector('.timeline-content');
    const title = item.querySelector('.timeline-title');
    
    if (title && content) {
      // Get the rendered height of the title element
      const titleHeight = title.offsetHeight;
      
      // Calculate minimum content height (title height + buffer space)
      const minHeight = titleHeight + 90; // Adjust buffer as needed
      
      // Set the minimum content height
      content.style.minHeight = `${minHeight}px`;
    }
  });

  // Optional: Update on window resize
  window.addEventListener('resize', function() {
    timelineItems.forEach(item => {
      const content = item.querySelector('.timeline-content');
      const title = item.querySelector('.timeline-title');
      
      if (title && content) {
        const titleHeight = title.offsetHeight;
        content.style.minHeight = `${titleHeight + 80}px`;
      }
    });
  });
});


document.querySelectorAll('.skill-item').forEach(item => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const proficiency = item.getAttribute('data-proficiency');
        item.querySelector('.progress-bar').style.width = `${proficiency}%`;
      }
    });
  });
  observer.observe(item);
});

// Add this script
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('header ul');
  const navItems = document.querySelectorAll('header ul li');

  // Toggle menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on scroll
  window.addEventListener('scroll', () => {
    if (hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Close menu when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});