(function initPortfolio() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const yearEl = document.getElementById("year");
  const revealItems = document.querySelectorAll(".reveal");
  const pageName = body.getAttribute("data-page");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");
  }

  const updateThemeLabel = () => {
    if (!themeToggle) {
      return;
    }
    themeToggle.textContent = body.getAttribute("data-theme") === "dark" ? "Light" : "Dark";
  };

  updateThemeLabel();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (nextTheme === "dark") {
        body.setAttribute("data-theme", "dark");
      } else {
        body.removeAttribute("data-theme");
      }
      localStorage.setItem("theme", nextTheme);
      updateThemeLabel();
    });
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (pageName) {
    document.querySelectorAll(".nav-links a[data-nav]").forEach((link) => {
      if (link.getAttribute("data-nav") === pageName) {
        link.classList.add("active-link");
      }
    });
  }

  if (window.IntersectionObserver && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("active"));
  }

})();
  