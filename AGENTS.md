# WCDA exact-homologation rules

## Immutable source

- `reference-html/` is the verified original and must remain byte-for-byte unchanged.
- Verify the original against `evidence/html-baseline-20261018/manifest.json` before migration work.
- Do not replace missing assets, placeholder links, legacy copy, or existing defects with invented content.

## Implementation

- Use Next.js, React, and TypeScript in this repository; do not create a parallel project.
- Derive migrated markup, class names, styles, assets, and behavior directly from the original source.
- Keep the original CSS load order, fonts, icon fonts, images, SVG, pseudo-elements, clipping, transitions, and responsive behavior.
- Adapt only what JSX and React lifecycle management require.
- Do not redesign, approximate with Tailwind, embed the original through an iframe, use screenshots as UI, or import rejected pilot code.
- Initialize legacy JavaScript dependencies once and clean them up when a React component unmounts.
- Preserve static-export compatibility for Hostinger.

## Current scope

- Migrate only the About and Services sections to the local comparison route.
- Do not migrate the remaining Home sections until this result is reviewed.

## Verification

- Compare the original and migration in the same browser at 1440x900, 768x1024, 390x844, and relevant source breakpoints.
- Verify fonts, resources, hover, click, drag, loop, carousel dots, animation, console errors, and hydration.
- Store real comparison evidence in `evidence/`.
- Record original defects separately; do not silently correct them.

## Safety

- Bind local servers only to `127.0.0.1`.
- Inspect ports before starting servers and never stop unrelated processes.
- Do not publish, push, deploy, or modify Hostinger.
- Never commit credentials or local environment files.
