import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";
import { applyEditorial } from "./approved-editorial.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const referenceRoot = path.join(projectRoot, "reference-html");
const outputRoot = path.join(projectRoot, "src", "generated", "pages");

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

const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const attributeNames = new Map([
  ["class", "className"],
  ["for", "htmlFor"],
  ["accept-charset", "acceptCharset"],
  ["allowfullscreen", "allowFullScreen"],
  ["autofocus", "autoFocus"],
  ["autoplay", "autoPlay"],
  ["charset", "charSet"],
  ["cellpadding", "cellPadding"],
  ["cellspacing", "cellSpacing"],
  ["colspan", "colSpan"],
  ["contenteditable", "contentEditable"],
  ["crossorigin", "crossOrigin"],
  ["datetime", "dateTime"],
  ["enctype", "encType"],
  ["formaction", "formAction"],
  ["frameborder", "frameBorder"],
  ["http-equiv", "httpEquiv"],
  ["maxlength", "maxLength"],
  ["minlength", "minLength"],
  ["novalidate", "noValidate"],
  ["playsinline", "playsInline"],
  ["readonly", "readOnly"],
  ["referrerpolicy", "referrerPolicy"],
  ["rowspan", "rowSpan"],
  ["spellcheck", "spellCheck"],
  ["srcset", "srcSet"],
  ["tabindex", "tabIndex"],
  ["usemap", "useMap"],
  ["xlink:href", "xlinkHref"],
  ["fill-rule", "fillRule"],
  ["clip-rule", "clipRule"],
  ["stroke-linecap", "strokeLinecap"],
  ["stroke-linejoin", "strokeLinejoin"],
  ["stroke-width", "strokeWidth"],
  ["stroke-miterlimit", "strokeMiterlimit"],
]);

const booleanAttributes = new Set([
  "allowFullScreen",
  "async",
  "autoFocus",
  "autoPlay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formNoValidate",
  "hidden",
  "loop",
  "multiple",
  "muted",
  "noValidate",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "reversed",
  "selected",
]);

const assetAttributes = new Set([
  "src",
  "poster",
  "data-background",
  "data-bg",
  "data-image-src",
]);

const numericAttributes = new Set(["cols", "rows"]);

function componentName(fileName) {
  const baseName = fileName
    .replace(/\.html$/, "")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
  return `${/^\d/.test(baseName) ? "Page" : ""}${baseName}OriginalPage`;
}

function findElement(node, predicate) {
  if (node.tagName && predicate(node)) return node;
  for (const child of node.childNodes ?? []) {
    const match = findElement(child, predicate);
    if (match) return match;
  }
  return undefined;
}

function getAttribute(node, name) {
  return node.attrs?.find((attribute) => attribute.name === name)?.value;
}

function hasClasses(node, ...classNames) {
  const classes = new Set((getAttribute(node, "class") ?? "").split(/\s+/));
  return classNames.every((className) => classes.has(className));
}

function rewriteAsset(value) {
  if (!value || /^(?:[a-z]+:|\/|#)/i.test(value)) return value;
  if (/^(?:img|css|js|fonts|video)\//.test(value)) return `/wcda-assets/${value}`;
  return value;
}

function rewriteStyleAsset(value) {
  return value.replace(
    /url\((['"]?)(?!data:|https?:|\/)([^)'"]+)\1\)/gi,
    (_match, quote, assetPath) => `url(${quote}/wcda-assets/${assetPath}${quote})`,
  );
}

function splitStyle(style) {
  const declarations = [];
  let current = "";
  let depth = 0;
  let quote = "";

  for (const character of style) {
    if (quote) {
      current += character;
      if (character === quote) quote = "";
      continue;
    }
    if (character === "'" || character === '"') {
      quote = character;
      current += character;
    } else if (character === "(") {
      depth += 1;
      current += character;
    } else if (character === ")") {
      depth -= 1;
      current += character;
    } else if (character === ";" && depth === 0) {
      declarations.push(current);
      current = "";
    } else {
      current += character;
    }
  }
  if (current.trim()) declarations.push(current);
  return declarations;
}

function styleExpression(style) {
  const properties = splitStyle(style)
    .map((declaration) => {
      const separator = declaration.indexOf(":");
      if (separator === -1) return undefined;
      const property = declaration.slice(0, separator).trim();
      const value = rewriteStyleAsset(declaration.slice(separator + 1).trim());
      if (!property || !value) return undefined;
      const reactProperty = property.startsWith("--")
        ? property
        : property.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, (_match, letter) =>
            letter.toUpperCase(),
          );
      return `${JSON.stringify(reactProperty)}: ${JSON.stringify(value)}`;
    })
    .filter(Boolean);

  return `{{ ${properties.join(", ")} }}`;
}

function jsxAttribute(attribute) {
  const qualifiedName = attribute.prefix
    ? `${attribute.prefix}:${attribute.name}`
    : attribute.name;
  const name = attributeNames.get(qualifiedName) ?? attributeNames.get(attribute.name) ?? attribute.name;
  let value = attribute.value;

  if (assetAttributes.has(attribute.name)) value = rewriteAsset(value);
  if (attribute.name === "style") return `style=${styleExpression(value)}`;
  if (booleanAttributes.has(name)) return name;
  if (numericAttributes.has(name)) return `${name}={${Number(value)}}`;
  return `${name}={${JSON.stringify(value)}}`;
}

function textExpression(value) {
  if (!value) return "";
  return `{${JSON.stringify(value)}}`;
}

function jsxNode(node, context, depth = 0) {
  if (node.editorialFlag) {
    const key = node.editorialFlag;
    delete node.editorialFlag;
    const markup = jsxNode(node, context, depth);
    node.editorialFlag = key;
    return `{editorialVisibility.${key} && (${markup})}`;
  }
  if (node.nodeName === "#text") return textExpression(node.value);
  if (node.nodeName === "#comment" || node.tagName === "script") return "";
  if (!node.tagName) {
    return (node.childNodes ?? []).map((child) => jsxNode(child, context, depth)).join("");
  }

  if (
    context.isHome &&
    !context.approvedSectionsInserted &&
    node.tagName === "div" &&
    hasClasses(node, "about", "section-padding")
  ) {
    context.approvedSectionsInserted = true;
    return "<AboutServicesHomologation managedByLegacyRuntime />";
  }
  if (
    context.isHome &&
    context.approvedSectionsInserted &&
    !context.servicesSkipped &&
    node.tagName === "section" &&
    hasClasses(node, "services3")
  ) {
    context.servicesSkipped = true;
    return "";
  }

  const tagName = node.tagName === "textpath" ? "textPath" : node.tagName;
  const attributes = (node.attrs ?? []).map(jsxAttribute).join(" ");
  const opening = attributes ? `<${tagName} ${attributes}` : `<${tagName}`;
  if (voidElements.has(tagName)) return `${opening} />`;

  const children = (node.childNodes ?? [])
    .map((child) => jsxNode(child, context, depth + 1))
    .join("");
  return `${opening}>${children}</${tagName}>`;
}

function pageTitle(document) {
  const title = findElement(document, (node) => node.tagName === "title");
  return title?.childNodes?.map((node) => node.value ?? "").join("").trim() ?? "";
}

async function generatePage(fileName) {
  const html = await readFile(path.join(referenceRoot, fileName), "utf8");
  const document = parse(html);
  const body = findElement(document, (node) => node.tagName === "body");
  if (!body) throw new Error(`No body found in ${fileName}`);

  applyEditorial(body, fileName);
  const name = componentName(fileName);
  const context = {
    isHome: fileName === "index.html",
    approvedSectionsInserted: false,
    servicesSkipped: false,
  };
  const bodyJsx = body.childNodes.map((node) => jsxNode(node, context)).join("");
  if (context.isHome && (!context.approvedSectionsInserted || !context.servicesSkipped)) {
    throw new Error("Could not replace the approved Home About and Services sections");
  }

  const imports = context.isHome
    ? 'import AboutServicesHomologation from "@/components/AboutServicesHomologation";\n\n'
    : "";
  const source = `import { editorialVisibility } from "@/content/editorial-visibility";\n${imports}export const originalFile = ${JSON.stringify(fileName)};\nexport const originalTitle = ${JSON.stringify(pageTitle(document))};\n\nexport default function ${name}() {\n  return (\n    <>\n      ${bodyJsx}\n    </>\n  );\n}\n`;

  await writeFile(path.join(outputRoot, `${name}.tsx`), source);
  return { fileName, name, title: pageTitle(document) };
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
const pages = [];
for (const fileName of pageFiles) pages.push(await generatePage(fileName));

const imports = pages
  .map(({ name }) => `import ${name} from "./pages/${name}";`)
  .join("\n");
const records = pages
  .map(
    ({ fileName, name, title }) =>
      `  ${JSON.stringify(fileName)}: { component: ${name}, title: ${JSON.stringify(title)} },`,
  )
  .join("\n");
const registry = `import type { ComponentType } from "react";\n${imports}\n\nexport const originalPages: Record<string, { component: ComponentType; title: string }> = {\n${records}\n};\n\nexport const originalPageNames = ${JSON.stringify(pageFiles)} as const;\n`;
await writeFile(path.join(outputRoot, "..", "page-registry.ts"), registry);

console.log(`Generated ${pages.length} React page components from the verified original.`);
