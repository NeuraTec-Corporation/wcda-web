# Complete Home — verification record

## Scope and approval

The remaining Home sections were migrated after the user visually approved About
and Services. That approval is recorded separately in
`evidence/about-services/README.md`; it is not treated as a substitute for the
technical checks below. The approved About and Services implementation was not
redesigned.

## Compared URLs

- Original: `http://127.0.0.1:3000/index.html`
- Next.js development route: `http://127.0.0.1:3001/`
- Static export: `http://127.0.0.1:3002/`

All browser comparisons used the same Chromium instance, 100% zoom and device
scale factor 1.

## Full-page evidence

- `original-1440x900-full.png`
- `react-1440x900-full.png`
- `original-768x1024-full.png`
- `react-768x1024-full.png`
- `original-390x844-full.png`
- `react-390x844-full.png`

The viewport is encoded in each filename. The PNG height is the complete page
height, not merely the viewport height.

## Measured comparison

- 1440×900: both pages measured `8431.3125 px` high and `1617 px` wide.
- 768×1024: both pages measured `11006.140625 px` high and `753 px` wide.
- 390×844: both pages measured `11879.125 px` high and `390 px` wide.
- Every top-level section had the same top offset and height at all three sizes.
- About and Services retained their previously approved dimensions at all sizes.
- The five Owl instances exposed the same responsive item counts:
  `[3,1,4,3,3]`, `[2,1,2,2,2]`, and `[1,1,1,1,1]`.
- The Home video loaded from the verified original MP4 with `readyState 4` and no
  media error in both the development and static-exported versions.

## Existing original defects retained

- The source references absent `img/about2.jpg`, `img/about3.jpg`, and
  `img/about5.jpg`; no replacement image was invented.
- The original 1440 px layout is `1617 px` wide and therefore retains its
  horizontal overflow.
- Placeholder and template destinations remain unchanged.

No form was submitted during verification.
