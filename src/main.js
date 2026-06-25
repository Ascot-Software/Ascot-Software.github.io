import "./landing.css";
import { animate, inView, stagger, spring } from "motion";

// Central landing page. Add path-selection content here.
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
        "#nav",
        { opacity: [0, 1], x: [-20, 0] },
        { duration: 0.8, delay: 0.1, easing: [0.22, 1, 0.36, 1] },
      );

      animate(
        "#nav",
        { width: ["0%", "100%"] },
        {
          duration: 1.4,
          delay: 0.1,
          easing: "ease-out",
          fill: "forwards",
          onComplete: () =>
            document.getElementById("nav")?.classList.add("min-w-200"),
        },
      );
    }
  }, 500),
);
