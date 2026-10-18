# Original pages — migration verification

## Inventory migrated

The production export contains the 25 original documents:

- Home, About, Services and the generic service detail page.
- Ten named service detail pages.
- Before/After, Team, Pricing, Testimonials and FAQ.
- Image Gallery and Video Gallery.
- Blog, Post, Contact and the original 404 presentation.

The generated React components are checked in under `src/generated/pages/`. They
are deterministic JSX derived from the verified source DOM, not runtime HTML
embedding.

## Static HTML comparison

`node scripts/verify-static-export.mjs` compared every original document with its
production-exported server HTML. `static-export-verification.json` records all
25 results:

- 25/25 visible-text hashes match.
- 25/25 semantic element counts match.
- 25/25 ordered link destinations match.
- 25/25 asset sequences are byte-equivalent.

Home's seven approved About/Services images are emitted under Next's hashed
static-media names. Their SHA-256 bytes match the corresponding original images;
the other 24 pages retain the rewritten original asset paths directly.

## Browser comparison

At 1440×900, all 25 original pages and all 25 static-exported pages were loaded
in same-origin 1440×900 frames in the same Chromium instance. For every page,
the following matched:

- title, visible-text SHA-256 and anchor/form/image counts;
- body scroll width and height;
- broken-image list;
- Owl initialization, source item count and dot count;
- video readiness and media error state.

The only discrepancy found was the initial exported 404 title inherited from the
root layout. `src/app/not-found.tsx` now supplies the exact original title; this
is covered by the final rebuild and regression check.

The original and migration both expose the absent Home `img/about5.jpg` in this
browser crawl. The separately approved About implementation also documents the
absent `img/about2.jpg` and `img/about3.jpg`.

## Interactions compared

The same scripted pointer/click sequence was run against the original and static
export:

- FAQ: first panel changed from hidden to visible and received the original
  active classes.
- Before/After: mouse drag moved overlay and handle to `24.8798%`.
- Image Gallery: the second Isotope filter became the only active filter and
  displayed three items; image MagnificPopup created its wrap and backdrop.
- Team: the loaded Owl carousel advanced from Dan Martin to Emily Brown.
- Home button: click toggled the original `active` class.
- Contact `services4`: mouse enter moved the single active state to the second
  of three items.
- Mobile navigation at 390 px: navbar and Pages dropdown both opened.
- Video Gallery: the first click did not open the popup and the second click did,
  with an iframe present. This two-click requirement is an existing defect in
  the original handler and was intentionally retained.

The original form markup contains no action destination or submit handler. The
contact and post forms use `method="post"` against the current document; the
remaining forms use browser defaults. No form was submitted.

## Visual evidence

- Original/migration full-page pairs for a named service detail at 1440×900.
- Original/migration full-page pairs for Before/After at 1440×900.
- Original/migration full-page pairs for Contact at 390×844.
- `migration-gallery-video-1440x900.png` records the retained video popup.

Third-party destination content, email/telephone handlers, map provider behavior
and real form delivery were not exercised.
