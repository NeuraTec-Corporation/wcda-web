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

- About and Services were visually approved by the user on 2026-10-18 and are
  the immutable migration pattern. Do not redesign or alter them.
- Migrate the remaining Home sections, then every original HTML page, in this
  same project using the approved exact-homologation method.
- Keep user visual approval distinct from technical tests actually executed.
- Save evidence and local commits by verified blocks; do not claim unrun tests.

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

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
