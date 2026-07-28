// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });
}

// Set active nav link based on current page
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active");
  }
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// Portfolio filter
const filters = document.querySelectorAll(".filter");
const portfolioGrid = document.querySelector(".filters")?.nextElementSibling;
const projects = portfolioGrid ? portfolioGrid.querySelectorAll(".project") : [];

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");
    const category = filter.dataset.filter;
    projects.forEach((project) => {
      const match = category === "all" || project.dataset.category === category;
      project.style.display = match ? "" : "none";
    });
  });
});

// Show an accurate confirmation after the hosted form service redirects back.
const form = document.querySelector("#contact-form");
if (form && new URLSearchParams(window.location.search).get("submitted") === "true") {
  const status = form.querySelector(".form-status");
  if (status) {
    status.textContent = "Thanks — your message was sent successfully.";
  }
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
