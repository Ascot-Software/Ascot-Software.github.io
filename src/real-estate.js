import "./real-estate.css";
import { animate, inView, stagger } from "motion";
import { initContactForm } from "./contact-form.js";
import arrowRightIcon from "iconoir/icons/arrow-right.svg?raw";
import communityIcon from "iconoir/icons/community.svg?raw";
import settingsIcon from "iconoir/icons/settings.svg?raw";
import statsUpSquareIcon from "iconoir/icons/stats-up-square.svg?raw";

const loadGate = document.querySelector("#load-gate");

document.addEventListener("DOMContentLoaded", () =>
  setTimeout(() => {
    loadGate?.classList.add("opacity-0", "pointer-events-none");

    // Respect users who prefer reduced motion — skip all entrance/scroll
    // animations. The CSS already reveals `.reveal` elements under the same
    // media query, so content stays visible without the JS choreography.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      // Hero entrance.
      animate(
        ".hero-title",
        { opacity: [0, 1], y: [32, 0], filter: ["blur(14px)", "blur(0px)"] },
        { duration: 0.8, delay: 0.1, easing: [0.22, 1, 0.36, 1] },
      );

      animate(
        ".hero-copy",
        { opacity: [0, 1], y: [24, 0] },
        { duration: 0.7, delay: 0.25, easing: "ease-out" },
      );

      animate(
        ".hero-defs > *",
        { opacity: [0, 1], y: [20, 0] },
        {
          duration: 0.6,
          delay: stagger(0.22, { start: 0.4 }),
          easing: "ease-out",
        },
      );

      // Scroll reveal for section content.
      inView(
        ".reveal",
        ({ target }) => {
          animate(
            target,
            { opacity: [0, 1], y: [28, 0] },
            { duration: 0.6, easing: [0.22, 1, 0.36, 1] },
          );
        },
        { margin: "0px 0px -12% 0px" },
      );
    }
  }, 500),
);

const iconMarkupByName = {
  "arrow-right": arrowRightIcon,
  community: communityIcon,
  settings: settingsIcon,
  "stats-up-square": statsUpSquareIcon,
};

for (const iconSlot of document.querySelectorAll("[data-icon]")) {
  const iconName = iconSlot.getAttribute("data-icon");
  const iconMarkup = iconName ? iconMarkupByName[iconName] : undefined;

  if (!iconMarkup) {
    continue;
  }

  iconSlot.innerHTML = iconMarkup;

  const svg = iconSlot.querySelector("svg");

  if (!svg) {
    continue;
  }

  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
}

// Nav: transparent over the green hero, light bar over white sections.
const nav = document.querySelector("[data-re-nav]");
const hero = document.querySelector("[data-re-hero]");

if (nav && hero) {
  // Cache the layout read; recompute only on resize to avoid reading
  // offsetHeight on every scroll tick.
  let heroThreshold = hero.offsetHeight - 72;

  const syncNav = () => {
    nav.classList.toggle("is-light", window.scrollY > heroThreshold);
  };

  const refreshThreshold = () => {
    heroThreshold = hero.offsetHeight - 72;
    syncNav();
  };

  syncNav();
  window.addEventListener("scroll", syncNav, { passive: true });
  window.addEventListener("resize", refreshThreshold, { passive: true });
}

// Contact form → Google Form.
initContactForm(document.querySelector("#re-contact-form"));
