"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * SectionScroller — wraps the page content and listens for click/tap events.
 * When the user taps on a non-interactive area, it smooth-scrolls to the
 * next section below the current viewport position.
 *
 * Interactive elements (buttons, links, inputs, textareas, selects, labels,
 * and anything inside them) are excluded so normal interaction is preserved.
 */

const INTERACTIVE_SELECTORS = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "[role='button']",
  "[data-no-scroll]",
];

function isInteractiveElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  // Check if the target or any ancestor matches an interactive selector
  for (const selector of INTERACTIVE_SELECTORS) {
    if (target.closest(selector)) return true;
  }

  // Also skip iframe clicks (map embeds)
  if (target.tagName === "IFRAME") return true;

  return false;
}

export default function SectionScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScrolling = useRef(false);
  const lastClickTime = useRef(0);

  const scrollToNextSection = useCallback(() => {
    // Collect all section/footer elements as scroll targets
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section, footer")
    );

    if (sections.length === 0) return;

    const currentScrollY = window.scrollY;
    const threshold = 20; // px tolerance to consider "past" a section top

    // Find the next section whose top is below the current scroll position
    const nextSection = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = currentScrollY + rect.top;
      return sectionTop > currentScrollY + threshold;
    });

    if (nextSection) {
      isScrolling.current = true;
      nextSection.scrollIntoView({ behavior: "smooth" });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    }
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // Don't interfere if already scrolling
      if (isScrolling.current) return;

      // Don't interfere with interactive elements
      const target = e.target as EventTarget;
      if (isInteractiveElement(target)) return;

      // Debounce rapid clicks (300ms)
      const now = Date.now();
      if (now - lastClickTime.current < 300) return;
      lastClickTime.current = now;

      scrollToNextSection();
    },
    [scrollToNextSection]
  );

  useEffect(() => {
    // Use click for both desktop and mobile (click fires after touch)
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return <>{children}</>;
}
