import { parseHexColorInput } from "@/config/theme";

export type ColorChannels = {
  hex: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
};

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const l = (max + min) / 2;
  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === nr) {
    h = (ng - nb) / d + (ng < nb ? 6 : 0);
  } else if (max === ng) {
    h = (nb - nr) / d + 2;
  } else {
    h = (nr - ng) / d + 4;
  }
  return {
    h: Math.round(h * 60),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function colorChannelsFromHex(raw: string): ColorChannels | null {
  const hex = parseHexColorInput(raw);
  if (!hex) {
    return null;
  }
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return { hex, r, g, b, h, s, l };
}

export function formatRgb({ r, g, b }: ColorChannels) {
  return `rgb(${r}, ${g}, ${b})`;
}

export function formatHsl({ h, s, l }: ColorChannels) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function eyeDropperSupported() {
  return typeof window !== "undefined" && "EyeDropper" in window;
}
