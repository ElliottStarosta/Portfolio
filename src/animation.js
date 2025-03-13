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
    item.addEventListener("click", (e) => {
      if (!e.target.closest('.timeline-link')) {
        const gitUrl = item.dataset.github;
        if (gitUrl) window.open(gitUrl, '_blank');
      }
    });

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

      // Set custom width if specified
      if (item.dataset.previewWidth) {
        preview.style.width = item.dataset.previewWidth;
      } else {
        preview.style.width = "300px"; // Default width
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

    if (projectItem) {
      // Trigger the timeline item's click handler
      projectItem.click();

      // Optional: Scroll to modal (if needed)
      document.querySelector(".project-modal").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
