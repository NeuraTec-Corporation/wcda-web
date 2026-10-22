# Approved editorial batch — review build

Authority: https://app.notion.com/p/3b9839ef36028138b8d7f75c06c93a7a
Baseline: 8ce1f2ae6f5105cfa34b9178c0f82288be0268e5, homologacion-original.
Work branch: ajustes-aprobados-20261021.

## Preservation

Original reference-html unchanged from Git. 141 files match manifest bytes; 12 HTML files match after reconstructing CRLF line endings normalized by Git. Not a 153/153 raw-byte match on Linux.
EVOLUCION preserves 382569da98ed64d23bfb921f32cf608eff0c4f9c; main and feature/wcda-visual-final untouched.
Historical Vercel: dpl_33X2W1NVEB9TziyoVMSdstWnpbMw, https://wcda-i3ulv9m7i-neuratec-corporation.vercel.app . API reports READY; preserved without changes. Historical reference, not active review. No guarantee of indefinite deployment retention.
Disabled JSX remains behind src/content/editorial-visibility.ts flags. No DOM/CSS hiding. No Hostinger, DNS, paid plans or production promotion.

## Checklist

| ID | Implementation | Pending |
|---|---|---|
| H01 | Dental Clinic badge disabled | Visual review |
| H02 | Exact approved hero text | Visual review |
| H03 | Rotating text updated; original tooth retained | Faithful chair asset: supplied screenshot includes WhatsApp frame; AI extraction altered details and was rejected, not used |
| H04 | Dental Care title and paragraph | Visual review |
| H05 | Oral Surgery label, same URL | Visual review |
| H06 | Dental Implants label, same URL | Visual review |
| H07 | Three stock cards, approved names/roles; extras disabled | Visual review |
| H08 | Pricing moved to Trusted position; Trusted disabled | Visual review |
| H09 | In House Plans | Visual review |
| H10 | Core Values appointment row disabled, capture confirmed | Visual review |
| H11 | Insurance clone immediately before Core Values | Other team/FAQ sections retain original relative order |
| H12 | Insurance copy/list in original two-column composition | Visual review |
| A01 | Vega duplicate with unique SVG path ID | Biography pending approval; no Matute credentials attributed to Vega |
| A02 | Trusted/What We Do disabled | Visual review |
| A03 | Our Team heading | Visual review |
| A04 | Three staff cards, stock photos | Visual review |
| A05 | FAQ disabled | Visual review |
| G01 | Blog menu disabled; pages and Home articles retained | Browser menu |
| G02 | Contact/links/schedules synchronized | Browser responsive |

## Verification

Commands: npm run typecheck; npm run lint; npm run build; node scripts/verify-editorial.mjs.
Evidence: evidence/editorial-20261021/static-checks.json.
Static checks cover 25 pages, contact consistency, disabled menu/sections, approved copy, card counts, ordering and original integrity with explicit Git line-ending accounting.
Browser visual/interaction validation remains pending until explicitly documented. Chromium install failed in this environment; do not claim visual parity from static assertions.
Original missing images and nonfunctional form backends remain unchanged. Old static-equivalence test is historical and intentionally incompatible with approved content edits.

## Editing / Cursor

Edit scripts/approved-editorial.mjs and AboutServicesHomologation.tsx, not generated pages; regenerate using node scripts/generate-original-pages.mjs.
Save local changes before fetching and switching to ajustes-aprobados-20261021 in the existing Windows repository. Remote work does not automatically update its running servers.
