import type { LabIconColorMode } from "@/config/lab-icon-library";

const FORBIDDEN_TAG =
  /<\/?(?:script|foreignObject|iframe|object|embed|link|meta|base|applet|form|input|button|textarea|select|video|audio|canvas|frame|frameset|html|body|head|style)\b/i;
const ENTITY = /<!ENTITY/i;
const EVENT_ATTR = /\son[a-zA-Z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/g;
const JS_URL = /\s(?:href|xlink:href|src)\s*=\s*(?:"|')\s*javascript:/gi;
const DATA_URL = /\s(?:href|xlink:href|src)\s*=\s*(?:"|')\s*data:/gi;
const EXTERNAL_REF =
  /\s(?:href|xlink:href)\s*=\s*(?:"|')(?!#)[^"']+(?:"|')/gi;
const CSS_EXPRESSION = /expression\s*\(/i;
const CSS_IMPORT = /@import/i;

export function sanitizeSvgSource(input: string):
  | { ok: true; svg: string; colorMode: LabIconColorMode }
  | { ok: false; code: "unsafe" | "unsupported" } {
  const trimmed = input.replace(/^\uFEFF/, "").trim();
  if (!trimmed) {
    return { ok: false, code: "unsupported" };
  }
  if (trimmed.includes("\u0000") || ENTITY.test(trimmed)) {
    return { ok: false, code: "unsafe" };
  }
  const open = trimmed.search(/<svg\b/i);
  const close = trimmed.toLowerCase().lastIndexOf("</svg>");
  if (open < 0 || close < 0 || close < open) {
    return { ok: false, code: "unsupported" };
  }
  let svg = trimmed.slice(open, close + "</svg>".length);
  if (FORBIDDEN_TAG.test(svg) || CSS_EXPRESSION.test(svg) || CSS_IMPORT.test(svg)) {
    return { ok: false, code: "unsafe" };
  }
  svg = svg
    .replace(EVENT_ATTR, "")
    .replace(JS_URL, " data-removed=")
    .replace(DATA_URL, " data-removed=")
    .replace(EXTERNAL_REF, " data-removed=");
  if (FORBIDDEN_TAG.test(svg) || /javascript:/i.test(svg)) {
    return { ok: false, code: "unsafe" };
  }
  if (!/\sxmlns\s*=/.test(svg)) {
    svg = svg.replace(
      /<svg\b/i,
      '<svg xmlns="http://www.w3.org/2000/svg"',
    );
  }
  return {
    ok: true,
    svg: svg.trim(),
    colorMode: inspectSvgColorMode(svg),
  };
}

export function inspectSvgColorMode(svg: string): LabIconColorMode {
  const values: string[] = [];
  const attr = svg.matchAll(/\s(?:fill|stroke)\s*=\s*("([^"]*)"|'([^']*)')/gi);
  for (const match of attr) {
    values.push((match[2] ?? match[3] ?? "").trim());
  }
  const css = svg.matchAll(/(?:fill|stroke)\s*:\s*([^;}]+)/gi);
  for (const match of css) {
    values.push(match[1]?.trim() ?? "");
  }
  const colors = values
    .map(normalizeColorToken)
    .filter((value): value is string => Boolean(value));
  if (colors.length === 0) {
    return "currentColor";
  }
  const unique = new Set(colors);
  if (unique.size === 1 && (unique.has("currentcolor") || unique.has("#000000"))) {
    return "currentColor";
  }
  if ([...unique].every((value) => value === "currentcolor" || value === "#000000")) {
    return "currentColor";
  }
  return unique.has("currentcolor") && unique.size === 1 ? "currentColor" : "fixed";
}

function normalizeColorToken(value: string) {
  const raw = value.trim().toLowerCase();
  if (
    !raw ||
    raw === "none" ||
    raw === "transparent" ||
    raw === "inherit" ||
    raw === "context-fill" ||
    raw === "context-stroke"
  ) {
    return null;
  }
  if (raw === "currentcolor") {
    return "currentcolor";
  }
  if (raw === "black" || raw === "#000" || raw === "#000000" || raw === "rgb(0,0,0)") {
    return "#000000";
  }
  return raw.replace(/\s+/g, "");
}
