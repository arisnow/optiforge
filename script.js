// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Skip if the href is just "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get header height to offset scroll position
        const headerHeight = document.querySelector("header").offsetHeight;

        // Calculate scroll position
        const scrollPosition = targetElement.offsetTop - headerHeight;

        // Smooth scroll to target
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile navigation toggle (for smaller screens)
  const createMobileNav = () => {
    const header = document.querySelector("header");

    // Only create mobile nav if it doesn't already exist
    if (!document.querySelector(".mobile-nav-toggle")) {
      const navMenu = document.querySelector("nav ul");
      const mobileToggle = document.createElement("button");

      mobileToggle.className = "mobile-nav-toggle";
      mobileToggle.innerHTML = "<span></span><span></span><span></span>";
      mobileToggle.setAttribute("aria-label", "Toggle Navigation");

      header
        .querySelector(".container")
        .insertBefore(mobileToggle, navMenu.parentElement);

      mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        navMenu.classList.toggle("show");
      });

      // Close mobile menu when clicking a nav link
      navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileToggle.classList.remove("active");
          navMenu.classList.remove("show");
        });
      });

      // Add mobile nav styles
      const style = document.createElement("style");
      style.textContent = `
                @media (max-width: 768px) {
                    header .container {
                        flex-wrap: wrap;
                    }
                    
                    nav {
                        width: 100%;
                        order: 3;
                    }
                    
                    nav ul {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                        padding: 1rem 0;
                    }
                    
                    nav ul.show {
                        display: flex;
                    }
                    
                    nav ul li {
                        margin: 0.5rem 0;
                    }
                    
                    .mobile-nav-toggle {
                        display: block;
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0.5rem;
                    }
                    
                    .mobile-nav-toggle span {
                        display: block;
                        width: 25px;
                        height: 3px;
                        background-color: var(--dark-color);
                        margin: 5px 0;
                        transition: all 0.3s ease;
                    }
                    
                    .mobile-nav-toggle.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    
                    .mobile-nav-toggle.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-nav-toggle.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -7px);
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-nav-toggle {
                        display: none;
                    }
                    
                    nav ul {
                        display: flex !important;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  };

  // Check viewport width and create mobile nav if needed
  const handleResponsiveNav = () => {
    if (window.innerWidth <= 768) {
      createMobileNav();
    }
  };

  // Initialize responsive nav
  handleResponsiveNav();
  window.addEventListener("resize", handleResponsiveNav);

  // Form submission handling
  const contactForm = document.querySelector('form[name="contact"]');

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // Form is handled by Netlify, this is just for additional UX
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.innerHTML = "Sending...";
      submitButton.disabled = true;

      // We're not preventing default, letting Netlify handle the form

      // Show success message after a short delay (will redirect if configured)
      setTimeout(() => {
        submitButton.innerHTML = "Submit";
        submitButton.disabled = false;
      }, 3000);
    });
  }

  // Animation for approach steps
  const steps = document.querySelectorAll(".approach-step");

  if (steps.length > 0) {
    // Add animation CSS
    const stepAnimation = document.createElement("style");
    stepAnimation.textContent = `
            .approach-step {
                opacity: 0;
                transform: translateX(-20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .approach-step.animated {
                opacity: 1;
                transform: translateX(0);
            }
            
            .approach-step:nth-child(1) { transition-delay: 0.1s; }
            .approach-step:nth-child(2) { transition-delay: 0.3s; }
            .approach-step:nth-child(3) { transition-delay: 0.5s; }
            .approach-step:nth-child(4) { transition-delay: 0.7s; }
        `;
    document.head.appendChild(stepAnimation);

    // Animate steps on scroll
    const animateSteps = () => {
      const triggerPosition = window.innerHeight * 0.8;

      const approachSection = document.querySelector(".approach");
      const approachRect = approachSection.getBoundingClientRect();

      if (approachRect.top < triggerPosition) {
        steps.forEach((step) => {
          step.classList.add("animated");
        });
        // Remove scroll listener once animated
        window.removeEventListener("scroll", animateSteps);
      }
    };

    // Initial check and add scroll event listener
    animateSteps();
    window.addEventListener("scroll", animateSteps);
  }

  // Animation for solution and case study cards
  const animateCards = () => {
    const cards = document.querySelectorAll(".solution-card, .case-card");
    const triggerPosition = window.innerHeight * 0.8;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();

      if (cardRect.top < triggerPosition) {
        card.classList.add("revealed");
      }
    });
  };

  // Add CSS for reveal animation
  const revealStyle = document.createElement("style");
  revealStyle.textContent = `
        .solution-card, .case-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .solution-card.revealed, .case-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(revealStyle);

  // Initial check and add scroll event listener
  animateCards();
  window.addEventListener("scroll", animateCards);
});
