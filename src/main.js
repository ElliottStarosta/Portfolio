document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('Intersection ratio:', entry.intersectionRatio);
      entry.target.classList.toggle('show', entry.isIntersecting);
    });
  }, {
    rootMargin: '-50px 0px', // Trigger 50px before element enters viewport
    threshold: 0.01
  });


  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});



// Initialize AOS
// document.addEventListener('DOMContentLoaded', function () {
//   AOS.init({
//     duration: 1000,  // Duration of the animation
//     easing: 'ease-out',
//     once: false  // Ensures the animation runs each time the element enters the viewport
//   });
// });








let lastScroll = 0;
const scrollThresholdDown = 200; // When to hide the header (scroll down 100px)
const scrollThresholdUp = 10;   // When to show the header (scroll up 10px)
const header = document.querySelector('header');
const scrollButton = document.querySelector('.scroll-to-top');


window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;


  // Show/hide header based on scroll direction
  if (currentScroll > lastScroll && currentScroll > scrollThresholdDown) {
    // Scrolling down: Hide header and show the scroll button
    header.classList.add('header-hidden');
    scrollButton.classList.add('visible');
  } else if (lastScroll - currentScroll > scrollThresholdUp) {
    // Scrolling up: Show header and hide the scroll button
    header.classList.remove('header-hidden');
    scrollButton.classList.remove('visible');
  }


  // Hide button at top of page
  if (currentScroll < 50) {
    scrollButton.classList.remove('visible');
  }


  lastScroll = currentScroll;
});






// Scroll to top functionality
scrollButton.addEventListener('click', () => {
  scrollToTop();
  header.classList.remove('header-hidden');
  scrollButton.classList.remove('visible');
});




// Attach event listeners to the anchor tags
document.querySelectorAll('header ul li a').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default anchor link behavior


    // Get the id from the clicked link (it will be the part after '#' in href)
    const id = anchor.getAttribute('href').substring(1); // Get the part after '#'


    // Call scrollToTop with the id
    scrollToTop(id);


    // Optional: Hide the header and scroll button after scroll
    header.classList.remove('header-hidden');
    scrollButton.classList.remove('visible');
  });
});




function scrollToTop(id) {
  if (id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.warn(`Element with id "${id}" not found`);
    }
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}






document.querySelectorAll('header ul li').forEach(menuItem => {
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let animating = false;
 
  const updatePosition = () => {
    const dx = targetX - currentX;
    const dy = targetY - currentY;
   
    currentX += dx * 0.15;
    currentY += dy * 0.15;
   
    const angleX = (currentY / -20).toFixed(2);
    const angleY = (currentX / 20).toFixed(2);
   
    menuItem.style.transform = `
      translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)
      rotateX(${angleX}deg)
      rotateY(${angleY}deg)
    `;
   
    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      requestAnimationFrame(updatePosition);
    } else {
      animating = false;
    }
  };


  menuItem.addEventListener('mousemove', (e) => {
    const bounds = menuItem.getBoundingClientRect();
    targetX = (e.clientX - bounds.left - bounds.width/2) * 0.3;
    targetY = (e.clientY - bounds.top - bounds.height/2) * 0.3;
   
    // Update gradient position
    menuItem.style.setProperty('--x', `${e.clientX - bounds.left}px`);
    menuItem.style.setProperty('--y', `${e.clientY - bounds.top}px`);
   
    if (!animating) {
      animating = true;
      requestAnimationFrame(updatePosition);
    }
  });


  menuItem.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
   
    gsap.to(menuItem, {
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0
    });
   
    menuItem.style.removeProperty('--x');
    menuItem.style.removeProperty('--y');
  });
});




// Logo


const logo = document.querySelector('.logo');
let raf;


logo.addEventListener('mousemove', (e) => {
  if (raf) cancelAnimationFrame(raf);
 
  raf = requestAnimationFrame(() => {
    const rect = logo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
   
    const shadowX = (x/rect.width - 0.5) * 20;
    const shadowY = (y/rect.height - 0.5) * 20;
   
    logo.style.setProperty('--gradient-x', `${x}px`);
    logo.style.setProperty('--gradient-y', `${y}px`);
    logo.style.setProperty('--shadow-offset', `${shadowX}px`);
  });
});


logo.addEventListener('mouseleave', () => {
  logo.style.setProperty('--gradient-x', '50%');
  logo.style.setProperty('--gradient-y', '50%');
  logo.style.setProperty('--shadow-offset', '0px');
});



// Nav bar logo



const updateGradient = (e) => {
  const rect = logo.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  
  logo.style.setProperty('--gradient-x', `${x}%`);
  logo.style.setProperty('--gradient-y', `${y}%`);
};

logo.addEventListener('mousemove', (e) => {
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => updateGradient(e));
});

logo.addEventListener('mouseleave', () => {
  logo.style.setProperty('--gradient-x', '50%');
  logo.style.setProperty('--gradient-y', '50%');
});