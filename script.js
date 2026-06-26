const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const heroChoiceButtons = Array.from(document.querySelectorAll("[data-target-tab]"));
const hero = document.querySelector(".hero");
const bridge = document.querySelector(".bridge");
const contact = document.querySelector(".contact");
const animatedSections = Array.from(document.querySelectorAll(".about, .bridge, .process, .contact"));
const form = document.querySelector(".contact-form");
const statusMessage = document.querySelector(".form-status");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function activateTab(nextTab) {
  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== nextTab.getAttribute("aria-controls");
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));

  tab.addEventListener("keydown", (event) => {
    const current = tabs.indexOf(tab);
    let next = current;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (current + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(tabs[next]);
    tabs[next].focus();
  });

  tab.tabIndex = index === 0 ? 0 : -1;
});

heroChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTab = document.getElementById(button.dataset.targetTab);
    if (!nextTab) return;

    activateTab(nextTab);
    form?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  });
});

if (!prefersReducedMotion.matches) {
  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  animatedSections.forEach((section) => observer.observe(section));

  let ticking = false;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function scrollProgress(element) {
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const range = window.innerHeight + rect.height;
    return clamp((window.innerHeight - rect.top) / Math.max(range, 1), 0, 1);
  }

  function updateParallax() {
    ticking = false;
    const mobileScale = window.innerWidth < 760 ? 0.45 : 1;

    if (hero) {
      const rect = hero.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);

      document.documentElement.style.setProperty(
        "--portrait-parallax",
        `${Math.round(progress * 46 * mobileScale)}px`
      );
      document.documentElement.style.setProperty(
        "--hero-copy-parallax",
        `${Math.round(progress * -18 * mobileScale)}px`
      );
      document.documentElement.style.setProperty(
        "--note-parallax",
        `${Math.round(progress * 28 * mobileScale)}px`
      );
      document.documentElement.style.setProperty(
        "--hero-grain-parallax",
        `${Math.round(progress * 34)}px`
      );
    }

    const bridgeProgress = scrollProgress(bridge) - 0.5;
    document.documentElement.style.setProperty(
      "--bridge-title-parallax",
      `${Math.round(bridgeProgress * -16 * mobileScale)}px`
    );
    document.documentElement.style.setProperty(
      "--bridge-note-parallax",
      `${Math.round(bridgeProgress * 28 * mobileScale)}px`
    );

    document.documentElement.style.setProperty(
      "--contact-card-parallax",
      `${Math.round((scrollProgress(contact) - 0.5) * -34 * mobileScale)}px`
    );
    document.documentElement.style.setProperty(
      "--contact-note-parallax",
      `${Math.round((scrollProgress(contact) - 0.5) * 22 * mobileScale)}px`
    );
  }

  function requestParallaxUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  }

  updateParallax();
  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.textContent = "Got it. This demo form is wired for the UI; hook it to your backend when ready.";
});
