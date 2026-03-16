
Implementation plan for the approved mobile-only stabilization pass:

Scope lock
- Only affect screens below 768px.
- Leave desktop/tablet visuals, spacing, typography, colors, animations, structure, and behavior unchanged.

Files to update
- src/components/Navigation.tsx
- src/components/RewardsSection.tsx
- src/components/HeroSection.tsx
- src/components/DownloadSection.tsx
- src/index.css
- Flag ticker speed override in src/index.css unless a component-scoped hook is clearly safer

What will be built

1. Mobile overflow stabilization
- Fix real overflow sources at component level first:
  - Rewards: replace mobile table with a stacked mobile layout.
  - Hero CTA: prevent button width/padding from exceeding its container on mobile.
  - Download CTAs: enforce mobile-safe width behavior so buttons stay inside the viewport.
  - Check headings, animated containers, and section wrappers for mobile-only width bleed.
- Then add a small-screen safety guard in src/index.css:
  - only under `@media (max-width: 767px)`
  - use `overflow-x: clip` on `html, body, #root`
  - fallback only if needed
- Goal: no horizontal scrolling at 320, 360, 375, 390, 414 widths.

2. Proper mobile navigation
- Keep the existing desktop nav exactly as-is.
- Replace the current mobile header state with:
  - logo left
  - hamburger right
- Use the existing project UI components only.
- Add a polished mobile menu panel containing:
  - System
  - Rewards
  - language switch
  - CTA
- Preserve existing navigation logic and URLs.
- Menu closes on:
  - item selection
  - outside click / overlay tap
  - explicit close action

3. Rewards mobile presentation
- Keep the current table untouched for desktop/tablet.
- Add a mobile-only stacked layout generated directly from the same data source currently used for the desktop table (`tr.table.rows`), so desktop and mobile cannot drift.
- Mobile result:
  - no sideways scroll
  - readable hierarchy
  - same content
  - same branding

4. Mobile CTA stabilization
- In HeroSection and DownloadSection, keep desktop/tablet buttons unchanged.
- On mobile, buttons must use `w-full` or `max-w-full` behavior where needed so no child element can exceed its parent container width.
- Adjust only mobile padding/wrapping/width constraints needed to stop overflow.

5. Mobile-only flag speed
- Keep desktop/tablet ticker behavior unchanged.
- Add a mobile-only override so flag animations run about 2x faster below 768px.
- Preserve the same direction, path, and visual effect.

Execution notes
- Rewards headers/body text, image, badge, and non-mobile layouts remain as they are.
- No copy or translation changes.
- No new dependencies.
- No unrelated diffs.

Post-implementation report will include
- exact files changed
- exact mobile breakpoints affected: below 768px, validated against 320 / 360 / 375 / 390 / 414
- explicit confirmation that desktop/tablet code paths and visuals were left unchanged
