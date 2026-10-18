import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const referenceRoot = path.join(projectRoot, "reference-html");
const outputRoot = path.join(projectRoot, "out");
const evidencePath = path.join(projectRoot, "evidence", "pages", "static-export-verification.json");

const pageFiles = [
  "index.html",
  "about.html",
  "services.html",
  "services-details.html",
  "services-details-CleaningPrevention.html",
  "services-details-FamilyDentistry.html",
  "services-details-ChildrensDentistry.html",
  "services-details-CosmeticDentistry.html",
  "services-details-ToothReplacement.html",
  "services-details-ExtractionsPreservation.html",
  "services-details-Invisalign.html",
  "services-details-OralAppliances.html",
  "services-details-HolisticServices.html",
  "services-details-DentalImplantsCranford.html",
  "before-after.html",
  "team.html",
  "pricing.html",
  "testimonials.html",
  "faq.html",
  "gallery-image.html",
  "gallery-video.html",
  "blog.html",
  "post.html",
  "contact.html",
  "404.html",
];

const comparedTags = [
  "a",
  "button",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "iframe",
  "img",
  "input",
  "li",
  "option",
  "p",
  "select",
  "source",
  "textarea",
  "video",
];

function findElement(node, tagName) {
  if (node.tagName === tagName) return node;
  for (const child of node.childNodes ?? []) {
    const match = findElement(child, tagName);
    if (match) return match;
  }
  return undefined;
}

function walk(node, visit, ignored = false) {
  const isIgnored = ignored || node.tagName === "script" || node.tagName === "style";
  if (!isIgnored) visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit, isIgnored);
}

function pageFacts(html) {
  const document = parse(html);
  const body = findElement(document, "body");
  if (!body) throw new Error("Document has no body");

  const counts = Object.fromEntries(comparedTags.map((tagName) => [tagName, 0]));
  const text = [];
  const links = [];
  const assets = [];

  walk(body, (node) => {
    if (node.tagName && node.tagName in counts) counts[node.tagName] += 1;
    if (node.nodeName === "#text") {
      const normalized = node.value.replace(/\s+/g, " ").trim();
      if (normalized) text.push(normalized);
    }
    if (!node.attrs) return;
    for (const attribute of node.attrs) {
      if (node.tagName === "a" && attribute.name === "href") links.push(attribute.value);
      if (
        ["src", "poster", "data-background", "data-bg", "data-image-src"].includes(
          attribute.name,
        )
      ) {
        assets.push(attribute.value.replace(/^\/wcda-assets\//, ""));
      }
    }
  });

  return {
    counts,
    textSha256: createHash("sha256").update(text.join("\n")).digest("hex"),
    links,
    assets,
  };
}

function exportedPagePath(pageFile) {
  if (pageFile === "index.html") return path.join(outputRoot, "index.html");
  if (pageFile === "404.html") return path.join(outputRoot, "404.html");
  return path.join(outputRoot, pageFile, "index.html");
}

function firstDifference(original, exported) {
  const length = Math.max(original.length, exported.length);
  for (let index = 0; index < length; index += 1) {
    if (original[index] !== exported[index]) {
      return { index, original: original[index] ?? null, exported: exported[index] ?? null };
    }
  }
  return null;
}

async function assetListsEquivalent(originalAssets, exportedAssets) {
  if (originalAssets.length !== exportedAssets.length) return false;
  for (let index = 0; index < originalAssets.length; index += 1) {
    const originalAsset = originalAssets[index];
    const exportedAsset = exportedAssets[index];
    if (originalAsset === exportedAsset) continue;
    if (!exportedAsset.startsWith("/_next/static/media/")) return false;
    try {
      const [originalBytes, exportedBytes] = await Promise.all([
        readFile(path.join(referenceRoot, originalAsset)),
        readFile(path.join(outputRoot, exportedAsset.slice(1))),
      ]);
      const originalHash = createHash("sha256").update(originalBytes).digest("hex");
      const exportedHash = createHash("sha256").update(exportedBytes).digest("hex");
      if (originalHash !== exportedHash) return false;
    } catch {
      return false;
    }
  }
  return true;
}

const pages = [];
for (const pageFile of pageFiles) {
  const original = pageFacts(await readFile(path.join(referenceRoot, pageFile), "utf8"));
  const exported = pageFacts(await readFile(exportedPagePath(pageFile), "utf8"));
  const countsMatch = comparedTags.every(
    (tagName) => original.counts[tagName] === exported.counts[tagName],
  );
  const assetsMatch = JSON.stringify(original.assets) === JSON.stringify(exported.assets);
  pages.push({
    page: pageFile,
    textMatches: original.textSha256 === exported.textSha256,
    semanticCountsMatch: countsMatch,
    linksMatch: JSON.stringify(original.links) === JSON.stringify(exported.links),
    assetsMatch,
    assetsEquivalent: assetsMatch || (await assetListsEquivalent(original.assets, exported.assets)),
    firstAssetDifference: firstDifference(original.assets, exported.assets),
    original: {
      textSha256: original.textSha256,
      counts: original.counts,
    },
    exported: {
      textSha256: exported.textSha256,
      counts: exported.counts,
    },
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  method:
    "parse5 comparison of original and production-exported server HTML; scripts/styles ignored for visible-text extraction",
  summary: {
    pages: pages.length,
    textMatches: pages.filter((page) => page.textMatches).length,
    semanticCountsMatch: pages.filter((page) => page.semanticCountsMatch).length,
    linksMatch: pages.filter((page) => page.linksMatch).length,
    assetsMatch: pages.filter((page) => page.assetsMatch).length,
    assetsEquivalent: pages.filter((page) => page.assetsEquivalent).length,
  },
  pages,
};

await mkdir(path.dirname(evidencePath), { recursive: true });
await writeFile(evidencePath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary));

if (
  report.summary.textMatches !== pages.length ||
  report.summary.semanticCountsMatch !== pages.length ||
  report.summary.linksMatch !== pages.length ||
  report.summary.assetsEquivalent !== pages.length
) {
  process.exitCode = 1;
}
