import "./style.css";
import { animate, inView, stagger } from "motion";
import arrowRightIcon from "iconoir/icons/arrow-right.svg?raw";
import checkCircleIcon from "iconoir/icons/check-circle.svg?raw";
import communityIcon from "iconoir/icons/community.svg?raw";
import navArrowDownIcon from "iconoir/icons/nav-arrow-down.svg?raw";
import searchIcon from "iconoir/icons/search.svg?raw";

const iconMarkupByName = {
  "arrow-right": arrowRightIcon,
  "check-circle": checkCircleIcon,
  community: communityIcon,
  "nav-arrow-down": navArrowDownIcon,
  search: searchIcon,
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

// Hero entrance.
animate(
  ".hero-title",
  { opacity: [0, 1], y: [32, 0], filter: ["blur(14px)", "blur(0px)"] },
  { duration: 0.8, delay: 0.1, easing: [0.22, 1, 0.36, 1] },
);

animate(
  ".hero-defs > *",
  { opacity: [0, 1], y: [20, 0] },
  { duration: 0.6, delay: stagger(0.12, { start: 0.35 }), easing: "ease-out" },
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

// Nav: transparent over the navy hero, light bar over white sections.
const nav = document.querySelector("[data-re-nav]");
const hero = document.querySelector("[data-re-hero]");

if (nav && hero) {
  const syncNav = () => {
    const threshold = hero.offsetHeight - 72;
    nav.classList.toggle("is-light", window.scrollY > threshold);
  };

  syncNav();
  window.addEventListener("scroll", syncNav, { passive: true });
}

// Contact form is presentational for now — prevent a navigating submit.
const contactForm = document.querySelector("#re-contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
