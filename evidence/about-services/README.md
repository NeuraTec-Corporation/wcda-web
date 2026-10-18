# About and Services — verification record

## User approval

On 2026-10-18, the user confirmed that About and Services look identical to the
original and approved both sections as the pattern for the remaining migration.
This is a visual acceptance decision by the user. It is distinct from the
technical checks recorded below and does not imply that pending tests were run.
The approved sections must not be redesigned or altered while the remaining
Home sections and original pages are migrated.

## Compared URLs

- Original: `http://127.0.0.1:3000/index.html`
- Next.js development route: `http://127.0.0.1:3001/homologacion/about-services/`
- Static export: `http://127.0.0.1:3002/homologacion/about-services/`

The screenshots compare the original with the static export in the same Chromium
browser, at 100% zoom and device scale factor 1. The original fixed navigation,
cursor and scroll-progress overlays were hidden at runtime only so they would not
cover the isolated sections. Temporary bottom space was added to the migration at
runtime only when necessary to align Services with the top of the viewport. Neither
operation changed files.

## Evidence

Each PNG has the exact dimensions stated in its filename:

- `original-1440x900-about-viewport.png`
- `migration-1440x900-about-viewport.png`
- `original-1440x900-services-viewport.png`
- `migration-1440x900-services-viewport.png`
- `original-768x1024-about-aligned.png`
- `migration-768x1024-about.png`
- `original-768x1024-services.png`
- `migration-768x1024-services.png`
- `original-390x844-about.png`
- `migration-390x844-about.png`
- `original-390x844-services.png`
- `migration-390x844-services.png`

Visual inspection found no migration-only difference in these captures. Section
geometry also matched:

- 1440 px: About `1042.75 px`; Services `639.59375 px`.
- 768 px: About `1838.84375 px`; Services `877.25 px`.
- 390 px: About `1812.453125 px`; Services `969.15625 px`.

Responsive checks confirmed one/two/three carousel cards at the original 0/600/1000
breakpoints and the Bootstrap column change between 991 and 992 px.

## Behavior checked

- Owl Carousel initialized once with the original loop, dots, speed, margin,
  mouse-drag, touch-drag and responsive settings.
- A dot click changed both the active dot and relative slide.
- Twelve consecutive next events wrapped through the ten-item carousel.
- Services hover produced the original image scale, navy arrow, outgoing icon and
  incoming pseudo-icon.
- The About button reproduced the original two-label slide hover.
- The circular seal ran the original `rotateCircle` animation for `20s`.
- The image reveal class activated when its element entered the viewport.
- Native pointer drag could not be completed with the available automation because
  it rejects elements without an HTML `draggable` attribute. Owl's mouse/touch drag
  configuration is present, but direct drag remains pending.
- Link `href` values match the original. Their destination pages are intentionally
  not migrated in this scoped delivery.

## Existing original defects retained

- `img/about2.jpg` and `img/about3.jpg` are absent and return 404 in both versions.
- At 1440 px, both versions retain the original horizontal overflow: body scroll
  width `1617 px` for a `1440 px` viewport.
- The original stylesheet contains syntax that browsers tolerate but Next's CSS
  transformer rejects. The migration serves those verified CSS bytes unchanged,
  in their original order, through statically generated asset routes.

## Build and runtime checks

- TypeScript: passed.
- ESLint: passed without warnings.
- Next.js production build and static export: passed.
- Static server returned 200 for the route, original CSS, plugin CSS, fonts,
  generated JavaScript and present images.
- No Next error overlay appeared and Owl initialized in the static export.
- A complete exported browser-console transcript was not available; console-level
  verification beyond the visible runtime/error-overlay checks remains pending.
