# 📄 Master PRD: Interactive & Animated Wedding Invitation

## 1. Project Overview & Architecture
- **Product:** Digital Wedding Invitation (Single Page Application).
- **Core Value:** Immersive linear storytelling driven by high-resolution prewedding photography and scroll-bound animations.
- **Target Environment:** Mobile-first (optimized for touch & smooth scrolling), gracefully scaling to Desktop (cursor interactions).
- **Tech Stack Baseline:** React/Next.js (UI Components), Tailwind CSS (Styling), Framer Motion & GSAP ScrollTrigger (Animation Engine).

---

## 2. UX (User Experience) Strategy
- **Scroll as the Main Engine:** User scrolling dictates the timeline of the animation. Elements react to the scroll position rather than just appearing statically.
- **Zero Loading Jitter:** Heavy assets (images) must implement lazy-loading (`loading="lazy"`) with elegant skeleton screens or blur-up transitions to maintain a premium feel.
- **Persistent Call-to-Action (CTA):** A subtle Floating Action Button (FAB) for "RSVP" becomes visible after the user scrolls past the Hero Section.

---

## 3. UI (User Interface) & Art Direction
Design tokens are extracted directly from the provided reference photo to ensure a cohesive "Casual Elegance" aesthetic.

### Global Tokens
- **Color Palette:**
  - `primary-bg`: `#EBE7F0` (Soft Pale Lavender - derived from studio backdrop)
  - `secondary-bg`: `#FFFFFF` (Crisp White - for cards and form containers)
  - `accent-color`: `#C4A48A` (Soft Khaki/Beige - derived from the subject's trousers)
  - `text-main`: `#2D2D30` (Deep Charcoal for optimal readability)
  - `text-muted`: `#7A7A7A`
- **Typography:**
  - `font-heading`: Elegant Serif or clean Script (e.g., Playfair Display, Cormorant Garamond).
  - `font-body`: Geometric, clean Sans-serif (e.g., Inter, Outfit).
- **Shape & Depth:**
  - Utilize `rounded-2xl` for containers.
  - Apply *Glassmorphism* (semi-transparent white background with `backdrop-blur`) for overlay cards to keep the background photography visible.

---

## 4. Component Architecture & Animation Choreography

### A. `<HeroSection />` (The Hook)
- **Layout:** `100vh` fullscreen layout with absolute positioning for image layers.
- **Elements:**
  - `Layer 1 (Background)`: Lavender studio wall without subjects.
  - `Layer 2 (Text)`: Couple's names (H1).
  - `Layer 3 (Foreground)`: Cutout of the couple.
- **Animation (GSAP Parallax):**
  - **On Load:** Text reveals via a smooth `y-axis` mask animation.
  - **On Scroll:** `Layer 1` translates upwards faster than `Layer 3` to create 3D depth. The text fades out (`opacity: 0`) and moves slightly down.

### B. `<StoryTimeline />` (The Narrative)
- **Layout:** A vertical line bisecting the screen (desktop) or aligned left (mobile). Time nodes with associated `<StoryCard />` components.
- **Animation:**
  - **Scroll-bound:** The vertical line is "drawn" (SVG draw animation) dynamically based on the scroll percentage.
  - **Intersection Reveal:** As the line reaches a node, the `<StoryCard />` slides in with a subtle spring physics effect.

### C. `<EventDetails />` (The Info)
- **Layout:** Two primary cards (Ceremony & Reception) featuring a dynamic countdown timer.
- **Animation:**
  - **Interaction:** Cards feature a 3D tilt effect responding to mouse hover (desktop) or device gyroscope (mobile).
  - **Timer:** Numbers update with a smooth vertical flip transition.

### D. `<InteractiveGallery />` (The Visuals)
- **Layout:** Asymmetric Masonry grid.
- **Animation:**
  - **Staggered Reveal:** Images animate upwards into the viewport with a `0.1s` delay stagger.
  - **Interaction:** Clicking a thumbnail triggers a Shared Layout Animation (Framer Motion `layoutId`), smoothly scaling the image to a fullscreen lightbox without page reload.

### E. `<RsvpForm />` (The Action)
- **Layout:** Clean, centered form layout over `secondary-bg`.
- **Animation:**
  - **Input Focus:** Smooth floating labels or expanding underlines on active inputs.
  - **Submit State:** "Send" button morphs into a loading spinner, then into a success checkmark with a micro CSS confetti burst upon successful API response.

---

## 5. Strict AI Generation & Asset Guidelines
**[CRITICAL INSTRUCTIONS FOR AI AGENTS & IMAGE PROCESSORS]**
- **Strict Facial Consistency Mode:** ENABLED.
- **Priority:** The facial features from the provided reference image MUST be prioritized for all subsequent generations, outpainting, or layer processing.
- **Constraint:** Maintain the subject's identity accurately. You are authorized to adapt the pose, lighting, and background to fit the UI needs, but **DO NOT alter the core facial structure** under any circumstances.