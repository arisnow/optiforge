// script.js
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1. Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      mainNav.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuToggle.classList.remove("active");
        mainNav.classList.remove("active");
      });
    });
  }

  // 2. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight =
            document.querySelector(".site-header").offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // 3. Form Submission with Success Message
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    const successMessage = document.getElementById("formSuccessMessage");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Helper function to encode form data
      const encode = (data) => {
        return Object.keys(data)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
          )
          .join("&");
      };

      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Submit form data using fetch
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      })
        .then((response) => {
          if (response.ok) {
            // Show success message
            successMessage.classList.remove("hidden");
            // Reset form
            contactForm.reset();
            // Hide success message after 5 seconds
            setTimeout(() => {
              successMessage.classList.add("hidden");
            }, 5000);
          } else {
            console.error("Form submission failed:", response.status);
          }
        })
        .catch((error) => console.error("Error submitting form:", error));
    });
  }

  // 4. Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // 5. CMS Content Loading
  async function loadCmsData() {
    try {
      // Home Content
      const homeResponse = await fetch("/_data/home.json");
      if (homeResponse.ok) {
        const homeData = await homeResponse.json();
        document.getElementById("heroTitle").textContent =
          homeData.hero_title || "";
        document.getElementById("heroSubtitle").textContent =
          homeData.hero_subtitle || "";
      }

      // Services Content
      const servicesResponse = await fetch("/_data/services.json");
      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        document.getElementById("servicesTitle").textContent =
          servicesData.title || "";
        document.getElementById("servicesDescription").textContent =
          servicesData.description || "";

        if (servicesData.items && servicesData.items.length > 0) {
          const servicesContainer = document.getElementById("servicesItems");
          servicesContainer.innerHTML = "";

          servicesData.items.forEach((service) => {
            const serviceHTML = `
                          <div class="service-item">
                              <div class="service-icon">
                                  <i class="${service.icon}"></i>
                              </div>
                              <h3>${service.title}</h3>
                              <p>${service.description}</p>
                          </div>
                      `;
            servicesContainer.innerHTML += serviceHTML;
          });
        }
      }

      // Case Studies Content
      const caseStudiesResponse = await fetch("/_data/case_studies.json");
      if (caseStudiesResponse.ok) {
        const caseStudiesData = await caseStudiesResponse.json();
        document.getElementById("caseStudiesTitle").textContent =
          caseStudiesData.title || "";
        document.getElementById("caseStudiesDescription").textContent =
          caseStudiesData.description || "";

        if (caseStudiesData.items && caseStudiesData.items.length > 0) {
          const caseStudiesContainer =
            document.getElementById("caseStudiesItems");
          caseStudiesContainer.innerHTML = "";

          caseStudiesData.items.forEach((caseStudy) => {
            const caseStudyHTML = `
                          <div class="case-study-item">
                              <div class="case-study-image">
                                  <img src="${caseStudy.image}" alt="${caseStudy.title}">
                              </div>
                              <div class="case-study-content">
                                  <h3>${caseStudy.title}</h3>
                                  <p>${caseStudy.description}</p>
                              </div>
                          </div>
                      `;
            caseStudiesContainer.innerHTML += caseStudyHTML;
          });
        }
      }

      // Approach Content
      const approachResponse = await fetch("/_data/approach.json");
      if (approachResponse.ok) {
        const approachData = await approachResponse.json();
        document.getElementById("approachTitle").textContent =
          approachData.title || "";
        document.getElementById("approachDescription").textContent =
          approachData.description || "";

        if (approachData.steps && approachData.steps.length > 0) {
          const stepsContainer = document.getElementById("approachSteps");
          stepsContainer.innerHTML = "";

          approachData.steps.forEach((step) => {
            const stepHTML = `
                          <div class="timeline-item">
                              <div class="timeline-number">${step.number}</div>
                              <div class="timeline-content">
                                  <h3>${step.title}</h3>
                                  <p>${step.description}</p>
                              </div>
                          </div>
                      `;
            stepsContainer.innerHTML += stepHTML;
          });
        }
      }

      // Contact Content
      const contactResponse = await fetch("/_data/contact.json");
      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        document.getElementById("contactTitle").textContent =
          contactData.title || "";
        document.getElementById("contactDescription").textContent =
          contactData.description || "";

        // Set footer email
        if (contactData.email) {
          const footerEmail = document.getElementById("footerEmail");
          footerEmail.innerHTML = `<a href="mailto:${contactData.email}">${contactData.email}</a>`;
        }
      }
    } catch (error) {
      console.error("Error loading CMS data:", error);
    }
  }

  // Load CMS data
  loadCmsData().catch((err) => {
    console.log("CMS data not available yet, using default placeholders");
  });
});
