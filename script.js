(function initPortfolio() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const logoToggle = document.getElementById("logoToggle");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const logoMarks = document.querySelectorAll(".logo-mark");
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

  const applyLogoStyle = (style) => {
    const logoSrc = style === "flat" ? "assets/brand/pk-mark-flat.svg" : "assets/brand/pkm-mark.svg";
    logoMarks.forEach((logo) => {
      logo.src = logoSrc;
    });
  };

  const updateLogoLabel = () => {
    if (!logoToggle) {
      return;
    }
    const activeStyle = localStorage.getItem("logoStyle") === "flat" ? "Flat" : "Glow";
    logoToggle.textContent = `Logo: ${activeStyle}`;
  };

  const savedLogoStyle = localStorage.getItem("logoStyle") === "flat" ? "flat" : "glow";
  applyLogoStyle(savedLogoStyle);

  const updateThemeLabel = () => {
    if (!themeToggle) {
      return;
    }
    themeToggle.textContent = body.getAttribute("data-theme") === "dark" ? "Light" : "Dark";
  };

  updateThemeLabel();
  updateLogoLabel();

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

  if (logoToggle) {
    logoToggle.addEventListener("click", () => {
      const currentStyle = localStorage.getItem("logoStyle") === "flat" ? "flat" : "glow";
      const nextStyle = currentStyle === "flat" ? "glow" : "flat";
      localStorage.setItem("logoStyle", nextStyle);
      applyLogoStyle(nextStyle);
      updateLogoLabel();
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
  