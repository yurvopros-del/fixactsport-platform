

# Sculpted Metal Architecture -- AllocationSection Redesign (No WebGL)

Transform the existing AllocationSection into a federation-grade architectural podium using the uploaded cup and medal images, advanced CSS lighting, and controlled 3D transforms. Zero new dependencies.

---

## Files Changed

| File | Action |
|------|--------|
| `src/assets/cup-gold.png` | Save uploaded cup image |
| `src/assets/medal-gold.png` | Save uploaded gold medal image |
| `src/assets/medal-silver.png` | AI-generated silver recolor of the same medal |
| `src/assets/medal-bronze.png` | AI-generated bronze recolor of the same medal |
| `src/lib/translations.ts` | Update `allocation.title`, add `allocation.subtitle` |
| `src/components/AllocationSection.tsx` | Full rewrite (~400 lines) |
| `src/index.css` | Add medal light-sweep keyframe |

No changes to: `Index.tsx`, routing, Navigation, other sections, `package.json`, localStorage, BASE_PATH.

---

## 1. Image Assets

### Gold Cup
- Copy `user-uploads://Golden_soccer_ball_trophy.png` to `src/assets/cup-gold.png`
- Displayed as `<img>` element, centered above title
- Sizing: `max-w-[280px]` desktop, `max-w-[180px]` mobile, generous bottom margin
- Base shadow: `box-shadow: 0 20px 40px rgba(0,0,0,0.45)` on wrapper
- Reflection band: `::after` pseudo-element with `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)` that shifts on hover via `translateX`

### Cup Parallax (desktop only, Guardrail 3 compliant)
- Check `window.matchMedia("(hover:hover)")` before attaching any mouse listener
- If false: no `onMouseMove`, cup stays static
- If true: track mouse via `onMouseMove` on section, throttled with `requestAnimationFrame`
- Apply `transform: perspective(800px) rotateX(max +/-4deg) rotateY(max +/-6deg) translateY(max -3px)`
- Transition: `180ms ease-out` in, `220ms ease-out` out
- No spinning, no bounce

### Medal Assets
- Gold: copy `user-uploads://3d_rendering_medal.png` to `src/assets/medal-gold.png`
- Silver: AI-generate a recolor -- identical silhouette, ribbon shape, camera angle, lighting; only metal hue changes to silver and number changes to "2". Reject and regenerate if shape drifts.
- Bronze: same process, bronze metal hue, number "3"
- All saved as `medal-gold.png`, `medal-silver.png`, `medal-bronze.png` in `src/assets/`
- Displayed as `<img>` elements: ~64px for Rank 1, ~52px for Rank 2-3

---

## 2. Translations Update (`src/lib/translations.ts`)

### Changes (Guardrail 1 compliant)
- `allocation.title`: change from `"FINAL ALLOCATION"` / `"ИТОГОВОЕ РАСПРЕДЕЛЕНИЕ"` to:
  - EN: `"FixAct Sport Grant & Incentive Program"`
  - RU: `"Программа грантовой поддержки ФиксАкт Спорт"`
- Add new `allocation.subtitle` key:
  - EN: `"For every group of 500 participants, the system unlocks a dedicated support fund. Your technical mastery is an asset that translates into tangible rewards."`
  - RU: `"Каждые 500 участников система формирует целевой фонд. Ваша техническая подготовка — это ваш актив, который конвертируется в реальную поддержку."`

All tier data (titles, amounts with ruble sign, descriptors, detail panel lines, B2B paragraph, disclaimer) remain exactly as-is. Zero rewrites. The legacy string "FINAL ALLOCATION" will not appear anywhere in the rendered UI.

---

## 3. AllocationSection Rewrite

### Section Structure (top to bottom)
```text
[bg-black + bg-grid-overlay]
  1. Gold Cup (static image + parallax on hover-capable devices)
  2. Title block (heading + subtitle, centered)
  3. Podium matrix (5 sculpted slabs)
  4. Detail panel (click-to-reveal, below matrix)
  5. Disclaimer
```

### Title Block
- Heading: `text-3xl md:text-4xl lg:text-5xl`, `font-extrabold`, `tracking-wide`, `text-white` (#FFFFFF), centered
- Subtitle below: `text-base md:text-lg`, `text-[#808080]`, `max-w-[720px]`, centered
- No gradient text
- Renders `t(allocation.title, locale)` and `t(allocation.subtitle, locale)` -- no hardcoded brand strings

### Slab Material (brushed steel illusion)
Each slab uses layered CSS backgrounds:
```css
background:
  linear-gradient(180deg, #141414 0%, #0f0f0f 100%),
  repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.02) 0px,
    rgba(255,255,255,0.02) 1px,
    transparent 1px,
    transparent 4px
  );
```
Top-edge highlight: `border-top: 1px solid #505050`
Inner bevel: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.6)`
No outer shadows. Border-radius: 2px max.

Border rules (unchanged):
- Tier 1: gradient wrapper (#00E0C6 to #0047AB), 1px padding
- Tiers 2-4: `1px solid #404040`, active `#505050`
- Tier 5: `1px solid #2a2a2a`

### Medal Embedded Effect
- Medal wrapped in a positioned container
- Below medal: `radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 60%)` pseudo-shadow
- Medal img: `box-shadow: 0 6px 12px rgba(0,0,0,0.6)` for depth

### Medal Hover (desktop only, guarded by hover media query)
- `::after` overlay with animated light sweep:
  ```css
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)
  ```
- Keyframe `medal-light-sweep`: translateX(-100%) to translateX(100%) in 500ms, triggered on hover
- Subtle tilt: `transform: perspective(400px) rotateY(3deg)`
- No bounce, no scale

### Slab Hover Interactions (desktop only)
- Guarded: only applied when `(hover:hover)` media query matches
- Hovered slab: `transform: perspective(900px) rotateX(2deg) rotateY(4deg) translateY(-4px)`
- Non-hovered slabs: `opacity: 0.85`
- Transition: `transform 0.25s ease-out, opacity 0.25s linear`
- All slabs: `will-change: transform` for GPU acceleration
- No scale, no bounce, no shadow pop
- Tracked via React state `hoveredTier`

### Pyramidal Layout (desktop)
- Display order: `[4, 2, 1, 3, 5]`
- Heights: Tier 1 = 480px, Tier 2/3 = 384px, Tier 4/5 = 288px
- Width: Tier 1 = `flex: 0 0 18%`, others = `flex: 0 0 14%`
- `align-items: flex-end`, `justify-content: center`, gap

### Slab Content (top to bottom)
For tiers 1-3: Medal image, title (uppercase), sub-label, amount (tabular-nums), descriptor
For tiers 4-5: Rank number, title, amount, descriptor
Tier 5: wider letter-spacing, inner horizontal accent line

### Mobile Layout
- Vertical stack in natural order (1-5), full width
- No parallax, no hover transforms, no mouse tracking
- Click-to-reveal detail below each tapped slab

### Click-to-Reveal Detail Panel
- Existing framer-motion AnimatePresence preserved
- Panel: `bg-[#0A0A0A]`, `border-top: 1px solid #1a1a1a`
- Linear opacity + height, 300ms
- Content from existing translation detail lines (unchanged)

### Entry Animation
- Framer-motion stagger: cup fades in first, title next, then slabs
- Linear timing, no spring/bounce

---

## 4. CSS Addition (`src/index.css`)

```css
@keyframes medal-light-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

Existing `bg-grid-overlay` stays unchanged.

---

## 5. Performance Rules
- `will-change: transform` on slabs
- `translate3d(0,0,0)` for GPU layer promotion
- Mouse tracking throttled via `requestAnimationFrame` flag
- Mouse listener only attached when `matchMedia("(hover:hover)")` is true
- Medal light sweep only on hover trigger, no idle loops
- Medal images target max ~300-400kb each

---

## Not Changed
- `src/pages/Index.tsx` (import stays the same, `#rewards` anchor preserved)
- Navigation, Footer, HeroSection, SystemSection, PhilosophySection, FlagTicker
- Routing, localStorage, BASE_PATH
- `package.json` (zero new dependencies)
- Existing metallic shimmer CSS classes

