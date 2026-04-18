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

  // Skip any element (or ancestor) with data-no-scroll attribute
  if (target.closest("[data-no-scroll]")) return true;

  // Skip iframe clicks (map embeds)
  if (target.tagName === "IFRAME") return true;

  // Skip any element (or ancestor) that has cursor:pointer — these are
  // clickable UI elements like gallery photos even if they aren't <button>s
  let el: HTMLElement | null = target;
  while (el) {
    if (window.getComputedStyle(el).cursor === "pointer") return true;
    el = el.parentElement;
  }

  // Skip clicks on fixed/absolute overlays (e.g. lightbox)
  if (target.closest("[class*='fixed']")) return true;

  return false;
}


export default function SectionScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScrolling = useRef(false);
  const lastClickTime = useRef(0);
  // Capture the mousedown/touchstart target before the DOM changes (e.g.
  // lightbox closing removes the button from the tree before click fires).
  const pointerDownTarget = useRef<EventTarget | null>(null);

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

  const handlePointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    pointerDownTarget.current = e.target;
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // Don't interfere if already scrolling
      if (isScrolling.current) return;

      // Check BOTH the original pointerdown target and the click target.
      // This catches cases where the DOM changes between mousedown and click
      // (e.g. lightbox close button removes itself before the click event).
      const clickTarget = e.target as EventTarget;
      if (isInteractiveElement(clickTarget)) return;
      if (isInteractiveElement(pointerDownTarget.current)) return;

      // Debounce rapid clicks (300ms)
      const now = Date.now();
      if (now - lastClickTime.current < 300) return;
      lastClickTime.current = now;

      scrollToNextSection();
    },
    [scrollToNextSection]
  );

  useEffect(() => {
    // Capture the target at pointerdown before DOM mutations
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    // Handle the actual scroll on click
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick, handlePointerDown]);

  return <>{children}</>;
}
