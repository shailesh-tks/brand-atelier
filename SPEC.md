# Brand Atelier — Website Specification
**Draft 1 · for approval · 2026-09-09**

---

## 1. Goal and success criteria

**Goal (not the task):** A Brand Director at a mid-size company, sent the link by a
peer, arrives at a first meeting already believing Brand Atelier operates a tier
above its fee bracket.

**The decision the site drives:** not "book a call." The site is a positioning
device. It makes the fee feel low before the fee is mentioned. Contact is
deliberately small.

**Twenty-second test:** they should be able to say, unprompted, *"they do brand
positioning, and they are serious about it."* Nothing more, nothing less.

**Success criteria**
| | Target | How |
|---|---|---|
| Scroll depth past section 3 | > 50% of sessions | analytics |
| Median time on page | > 45s | analytics |
| Bounce under 10s | < 30% | analytics |
| The real one | first meetings start warmer | you tell me |

Out of bounds as a goal: lead volume, form fills, newsletter signups.

---

## 2. Art direction

### 2.1 Palette — cold, dark, monochrome

Derived directly from the logo. There is no chromatic accent. The accent **is
light**: cream on graphite, and one point of it in focus.

| Token | Hex | Use |
|---|---|---|
| `--ground` | `#0A0B0C` | page ground; the logo's own black |
| `--surface` | `#131519` | elevated panels, the offer cards |
| `--graphite` | `#1E2226` | rules, borders, hairlines |
| `--steel` | `#2A3138` | the cold cast in shadows; image grade floor |
| `--cool-mid` | `#767F87` | labels, eyebrows, scroll cue (4.84:1 — passes AA at 10-11px) |
| `--cool-light` | `#A8B0B6` | body copy (9.5:1) |
| `--cream` | `#F2F0EC` | headlines, the mark, the focal point (17.8:1) |

Photography is graded cold: shadows pulled toward `--steel`, highlights toward
`--cream`, saturation near zero with a faint blue cast retained.

### 2.2 Type

| Role | Face | Notes |
|---|---|---|
| Display | **Bodoni Moda** (variable, Google, self-hosted) | matches the AB monogram's high contrast |
| Sans | **Jost** (variable, Google, self-hosted) | matches the wordmark's light geometric tracking |

Two families, both variable, latin subset, ~62KB total. If the logo uses a
licensed face, name it and I match.

**Scale (mobile-first)**

    Display XL   clamp(2.75rem, 11vw, 7.5rem)  Bodoni 400  lh .95  tr -0.02em
    H2           clamp(1.75rem, 6vw, 3.5rem)   Bodoni 400  lh 1.05
    Body         1rem → 1.125rem               Jost 300    lh 1.7   max 62ch
    Eyebrow      0.6875rem                     Jost 400    tr 0.28em  UPPERCASE

The eyebrow treatment is lifted verbatim from the logo's tagline lockup. It is
the site's labelling system: every section is announced this way.

### 2.3 Motion principles

These govern every animation in the document. If a proposed animation breaks
one, it gets cut.

1. **Nothing bounces.** No spring, no overshoot, no elastic. Entrances use
   `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out); moves use
   `cubic-bezier(0.65, 0, 0.35, 1)`.
2. **Slow in, quiet settle.** Entrances are 800–1200ms. Nothing under 300ms
   except hover states.
3. **One thing moves at a time.** Two elements animating together must read as
   one gesture — stagger 60–120ms.
4. **Motion reveals, never decorates.** Every animation carries meaning: focus,
   sequence, or depth. Pretty is not a reason.
5. **The page is never busy.** At rest, only the hero drifts. Every other
   section is completely still once revealed.

### 2.4 Reference notes

**ThreeUI · Sylva "Maple Autumn"** — *your reference.*
Taking: real depth with near/far falloff, continuous ambient drift so the world
is already alive on arrival, slow camera sway, dusk tonality.
Leaving: the naturalism (leaves read decorative for a strategy firm), the warm
crimson-gold, and the full-page canvas — the WebGL is confined to the hero.

**Your moodboard photography** — hard raking light on concrete, deep shadow,
product held still on a shelf. Taking the stillness and the light. Recolouring
cold; the boards are warm sepia and the identity is not.

**The AB logo** — taking the ground colour, the monochrome discipline, and the
tracked-out caps as a system rather than a one-off.

---

## 3. Section by section

### S0 · Entrance (0 – 2.5s)
No preloader, no counter. Page ships as black with the grain layer already
painted. Nothing counts to 100.

### S1 · Hero — *the crowded market resolves*

The one WebGL moment. It is your own thesis rendered literally: a field of
identical points is a crowded market; one resolving into focus is positioning.

**Copy**
- Eyebrow: `DISCOVER YOUR POSITION`
- H1: *Brands. Positioned to Lead.*
- Sub: *We help brands become distinctive, desirable, and worth choosing.*

**Scene** — 900 points desktop / 450 mobile, distributed in a volume z ∈ [-12, +2].
Soft discs, cream at 8–14% opacity scaled by depth. Camera z=6, fov 35.

**Timeline** — time-driven, not scroll-driven; it completes whether or not they scroll.

| t | What | Duration | Easing |
|---|---|---|---|
| 0.0s | black + grain | — | — |
| 0.3s | points fade in, staggered far→near | 1100ms | expo-out |
| 0.6s | ambient drift begins — per-point sine, amp 0.15u, period 8–14s randomised; camera sway ±0.4u x / ±0.2u y, 20s period | ∞ | sine |
| 1.2s | H1 masks up, 2 lines, 90ms stagger, translateY 1.1em → 0 behind overflow clip | 1000ms | expo-out |
| 2.6s | **the resolve** — one point (centre-right, z=-2) scales 1× → 3.2×, opacity 0.12 → 1.0; simultaneously the depth-of-field uniform tightens the focal plane from infinity to z=-2, blurring everything else | 1600ms | expo-out |
| 4.4s | sub + scroll cue fade up | 600ms | expo-out |
| 5.0s+ | rest: focused point holds, field drifts, forever | ∞ | — |

**Parallax** — desktop mouse only, camera target ±0.25u, lerped at 0.04. No gyro
on mobile (it needs an iOS permission prompt; not worth it).

**Exit** — canvas opacity → 0 across the first 60vh of scroll, and the rAF loop
**stops** via IntersectionObserver once off-screen. That is the entire
performance story for the rest of the page.

### S2 · The Proposition
*"We don't just build brands. We build perception."*

Full-bleed statement, single column, serif line capped at 20ch. One photograph
(concrete / raking light, cold-graded) parallaxes translateY across 12% of the
section height, driven by scroll progress, transform-only.

Reveal: line-by-line mask-up at 35% viewport entry, 90ms stagger, 900ms, expo-out.

### S3 · What Is Brand Positioning
The explainer. **No animation**, per your exclusion — the whole block fades in
once, 500ms, opacity only. Five bullets (Stand apart / Attract the right audience
/ Build perceived value / Create consistency / Become memorable) appear together.

> *Flagged:* a 60ms stagger on the bullets would help them land. Your call.

### S4 · The Offer — 01 Uncover · 02 Position · 03 Connect & Grow
Home of the chess image from your board.

Mobile: three stacked panels. Desktop: three columns.
Per panel, staggered 120ms, triggered at 40% entry:
1. hairline rule draws left→right — scaleX 0→1, **1200ms**, `cubic-bezier(0.65,0,0.35,1)`
2. serif title masks up — **900ms**, expo-out
3. body fades — **700ms**, expo-out

Sticky-scroll (left column pins, right steps) is a deliberate phase-2 upgrade,
not built now.

### S5 · Proof — *CMS, empty at launch*
Case studies, client logos, testimonials. Mobile: horizontal scroll strip using
native `overflow-x` + scroll-snap. Desktop: grid. Logos static and greyscale, no
animation. Testimonials stacked, no auto-rotation.

If the CMS returns nothing the section does not render. No placeholder.

### S6 · The Founders
Dhivya Rajendran · Founder. Meenakshi Vaithinathan · Co-Founder.

Portrait reveal: `clip-path: inset(100% 0 0 0)` → `inset(0)`, **1100ms**,
expo-out, with the image scaling 1.06 → 1.0 inside the clip over the same
duration — the photograph settles rather than slides. Text masks up 150ms behind it.

### S7 · Close
*"Where businesses become brands people remember."*

Serif, full-bleed. `mailto:` link in tracked caps below, underline draws from
left on hover, 400ms.

Above the line: a single static cream dot — the hero's focused point, at rest.
A closing rhyme. It does not animate.

### Global · Grain
One tiled noise PNG, 3–4% opacity, `mix-blend-mode: overlay`, `position: fixed`,
`pointer-events: none`. **Static.** An 8fps `steps()` shift is the upgrade path
if it reads too clean.

---

## 4. Technical approach

| Choice | Why | Cost (gz) |
|---|---|---|
| **Next.js 15** (App Router, SSG) | SEO for the journal, Sanity integration, deploys anywhere | ~90KB with React |
| **Tailwind v4** | zero runtime, JIT | ~9KB CSS |
| **Three.js** — hand-picked imports, `dynamic({ssr:false})` | hero only, lazy after paint | ~140KB, separate chunk |
| **Lenis** | smoothed scroll; the one "feel" thing not worth hand-rolling | ~3KB |
| **Sanity** + `next-sanity` | your interface; studio at `/studio`, code-split | ~0 on `/` |
| **next/font** | self-hosted variable fonts, no Google request | ~62KB |

**Deliberately not used**
- **react-three-fiber / drei** — +50KB for one static scene with a custom shader.
  The imperative version is ~120 lines.
- **Framer Motion / GSAP** — mask reveals are `IntersectionObserver` + CSS
  transitions. ~20 lines, 0KB.
- **A scroll-animation library** — the only scroll-driven values are two
  transforms. `scroll` + `transform` covers it.

**Bundle estimate**

    First-load JS on /        ~108KB gz   (Next+React 90 · page 15 · Lenis 3)
    Three.js chunk (lazy)     ~140KB gz
    CSS                       ~9KB
    Fonts (2 variable woff2)  ~62KB
    Grain PNG                 ~6KB
    Hero still (AVIF 1600w)   ~40KB

---

## 5. Performance budget — hard numbers

Your stated ceiling is 5s. These are the actual targets; 5s is the outer wall.

| Metric | Budget |
|---|---|
| LCP — mobile, 4G throttled | ≤ 2.0s |
| LCP — desktop | ≤ 1.2s |
| Hero first animating frame | ≤ 2.5s |
| CLS | ≤ 0.01 |
| TBT — mobile | ≤ 150ms |
| INP | ≤ 200ms |
| First-load JS on `/` | ≤ 120KB gz |
| Total transfer, first view | ≤ 450KB |
| Hero sustained FPS — desktop | ≥ 58 |
| Hero sustained FPS — mobile flagship | ≥ 55 |
| Scroll FPS below the fold | ≥ 58 |
| Lighthouse Performance (mobile) | ≥ 95 |
| Lighthouse Accessibility | 100 |

---

## 6. Accessibility and fallbacks

### `prefers-reduced-motion: reduce`
- Canvas **never initialises** — the Three.js chunk is not downloaded at all.
  The still image renders instead.
- Lenis disabled; native scroll.
- All mask reveals removed. **Content has no `opacity: 0` initial state** — if
  the reveal cannot run, nothing is ever hidden.
- Hover underline appears instantly.

### No WebGL (disabled, or context creation fails)
Feature-detect *before* the dynamic import. If there is no context, render the
still AVIF and never fetch Three. The still is a render of the same scene at its
resolved state — cream point in focus, field blurred — generated once and
committed to the repo.

### Low-power tier
`navigator.hardwareConcurrency < 8` or `deviceMemory < 4` → particle count
halved, DPR capped at 1, drift periods doubled. Same scene, fewer points, no
separate build.

### Semantics
- Hero H1 is a real `<h1>`; canvas is `aria-hidden` + `role="presentation"`.
- Every section is a `<section aria-labelledby>`.
- Focus ring: 1px cream, 2px offset, never removed.
- `--cool-mid` was raised from #6B747C to #767F87 during build: at the 10-11px label sizes it was failing AA at 4.14:1.
- No scroll-jacking; keyboard traverses the page in DOM order.

### Mobile degradation
450 particles · DPR ≤ 2 · no mouse parallax · no gyro · Lenis
`smoothTouch: false` so native momentum is preserved · image parallax amplitude
halved · H1 wraps to three lines.

---

## 7. Build order

Smallest shippable pieces, hero first and finished before anything else exists.

**Chunk 1 — Hero, final quality, alone.** ← *first deliverable*
App shell, fonts, palette tokens, grain. Hero typography working with **no
canvas at all**. Then the canvas: field → drift → resolve. Then reduced-motion,
no-WebGL still, low-power tier. Then every measurable in §5, reported with real
numbers. Ships standing alone at a URL.

**Chunk 2 — Scroll spine.** Lenis, the IntersectionObserver reveal primitive,
S2 and S7. The site becomes something you can scroll end to end.

**Chunk 3 — S4, The Offer.** The most structural section.

**Chunk 4 — S3 Positioning + S6 Founders.** Static content, image reveals.

**Chunk 5 — Sanity.** Four schemas (case study, client, testimonial, journal
post), studio at `/studio`, S5 wired with a clean empty state.

**Chunk 6 — Journal routes.** `/journal`, `/journal/[slug]` — built only when
there is a post to publish.

**Chunk 7 — SEO and polish.** Metadata, OG image generated from the hero still,
sitemap, robots, JSON-LD Organization.

Every chunk ends with §5 re-measured and reported.

---

## 8. Verification criteria

### MEASURABLE — I check these and report actual numbers

1. Hero sustained FPS, 10s sample — desktop ≥ 58, mobile flagship ≥ 55 (min + median).
2. Full-page scroll FPS, 5s sample — ≥ 58.
3. LCP — mobile 4G ≤ 2.0s, desktop ≤ 1.2s.
4. First-load JS on `/` ≤ 120KB gz, from `next build` output.
5. Total transfer, first view ≤ 450KB.
6. TBT ≤ 150ms mobile; INP ≤ 200ms.
7. CLS ≤ 0.01.
8. **Reduced-motion compliance** — Three.js chunk *not present in the network
   waterfall*; all content visible at rest; no transition over 200ms.
9. **WebGL disabled** — still renders, no console error, no layout shift, Three
   chunk not fetched.
10. Lighthouse a11y = 100; axe-core zero violations; every token contrast pair listed.
11. Keyboard traverse to the mailto with no trap, focus visible at every stop.
12. 375px viewport — zero horizontal overflow.

### SUBJECTIVE — I stop and ask. I never mark these passed myself.

1. Does it feel cinematic, or does it feel like a website with effects on it?
2. Is the hero's 4.2s entrance the right length — too slow to hold, or too fast to land?
3. Does the resolve read as **meaning** (one brand emerging from a crowded
   market) or as **decoration** (a dot got bigger)?
4. Does the motion serve the content or compete with it — especially S4, where
   three panels animate in sequence?
5. Is the cold palette right, or has it gone clinical and lost the atelier?
6. Does the serif carry authority at mobile size, or does it look thin and fragile?
7. Does the scroll feel weighted, or does it feel laggy?
8. Does the founders' section feel personal, or corporate?
9. **Does it read a tier above your fee bracket?** — the actual goal.

---

## 9. Confirmed decisions

| # | Decision |
|---|---|
| 1 | Goal: believe they're a tier above the fee bracket. Not lead capture. |
| 2 | Audience: Brand Director, mid-size company, positioning for market entry. |
| 3 | Mobile designed first; desktop must open properly. Both weighted evenly. |
| 4 | Typographic spine + **one** contained WebGL hero. Not a full 3D site. |
| 5 | Hero concept: one point resolves out of a crowd. Not leaves. |
| 6 | Palette: cold, dark, monochrome. |
| 7 | Structure: one long scrolling page. |
| 8 | CMS: Sanity — case studies, client logos, testimonials, journal. |
| 9 | Minimum device: recent flagship, **plus** a free low-power tier. |
| 10 | Load ceiling 5s (targets in §5 are far tighter). |
| 11 | No-WebGL fallback: still image of the same scene. |
| 12 | Serif display + sans body. Studio feel, not agency. |
| 13 | Contact: `mailto:` only. |
| 14 | Maintained by you, with an AI agent reading the code. |

**Out of scope:** sound · custom cursor · preloader with a counter ·
page-transition system · dark/light toggle · hero video · multi-language ·
animation on the Positioning explainer.

---

## 10. Assumptions requiring your confirmation

1. **Hosting.** You said "domain and storage." I've assumed a Node-capable host
   (Vercel or Netlify, free tier) — Next.js + Sanity needs one, and a pure
   static export costs you the journal's incremental builds. Tell me what you
   bought or plan to buy.
2. **Name.** Logo reads "Brand Atelier"; your copy says "The Brand Atelier."
   Using the logo's form as the name, the copy's form in prose.
3. **No chromatic accent** — cream is the only bright thing. Alternative on
   request: one pale steel-blue.
4. **Fonts** are Bodoni Moda + Jost, free and self-hosted. If the logo uses a
   licensed face, name it and I match.
5. **The logo file is not on disk** — drop the SVG (preferred) or PNG into this
   folder.
6. **The Positioning bullets get no stagger**, per your exclusion. I think 60ms
   would help. Your call.
7. **Portraits** — the two jpegs in this folder, cold-graded.
8. **Hero copy** is "Brands. Positioned to Lead." under the eyebrow "DISCOVER
   YOUR POSITION."
