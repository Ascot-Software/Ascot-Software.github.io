import "./healthcare.css";
import { animate, inView, stagger } from "motion";
import { initContactForm } from "./contact-form.js";
import arrowDownIcon from "iconoir/icons/arrow-down.svg?raw";
import arrowUpRightIcon from "iconoir/icons/arrow-up-right.svg?raw";
import mailIcon from "iconoir/icons/mail.svg?raw";
import navArrowUpIcon from "iconoir/icons/nav-arrow-up.svg?raw";
import suitcaseIcon from "iconoir/icons/suitcase.svg?raw";

const loadGate = document.querySelector("#load-gate");

document.addEventListener("DOMContentLoaded", () =>
  setTimeout(
    () => loadGate?.classList.add("opacity-0", "pointer-events-none"),
    500,
  ),
);

const iconMarkupByName = {
  "arrow-down": arrowDownIcon,
  "arrow-up-right": arrowUpRightIcon,
  mail: mailIcon,
  "nav-arrow-up": navArrowUpIcon,
  suitcase: suitcaseIcon,
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

// Respect users who prefer reduced motion — skip entrance/scroll
// animations. The CSS reveals `.reveal` elements under the same media
// query, so content stays visible without the JS choreography.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
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
    ".hero-actions > *",
    { opacity: [0, 1], y: [18, 0] },
    { duration: 0.5, delay: stagger(0.1, { start: 0.35 }), easing: "ease-out" },
  );

  inView(
    ".case-card, .capability-card, .stat-card",
    (info) => {
      animate(
        info.target,
        { opacity: [0, 1], y: [26, 0], scale: [0.98, 1] },
        { duration: 0.55, easing: [0.22, 1, 0.36, 1] },
      );
    },
    { margin: "0px 0px -12% 0px" },
  );

  inView(
    ".reveal",
    ({ target }) => {
      animate(
        target,
        { opacity: [0, 1], y: [36, 0], filter: ["blur(10px)", "blur(0px)"] },
        { duration: 0.7, easing: [0.22, 1, 0.36, 1] },
      );
    },
    { margin: "0px 0px -15% 0px" },
  );

  inView(
    ".capability-card",
    (info) => {
      const icon = info.target.querySelector(".capability-icon");

      if (!icon) {
        return;
      }

      animate(
        icon,
        { scale: [0.84, 1], rotate: [-14, 0] },
        { duration: 0.5, easing: [0.22, 1, 0.36, 1] },
      );
    },
    { margin: "0px 0px -10% 0px" },
  );
}

// Contact form → Google Form.
initContactForm(document.querySelector("#hc-contact-form"));
