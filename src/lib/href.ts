export function isNativeHref(href: string): boolean {
  return /^(https?:|tel:|mailto:)/i.test(href);
}
