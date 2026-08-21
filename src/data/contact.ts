import { siteConfig } from "@/config/site";
import type { ContactDetail } from "@/types/content";
import type { NavItem } from "@/types/navigation";

export function getPublicAddress():
  | {
      formatted: string;
      line1: string;
      line2: string;
      mapsHref: string;
    }
  | undefined {
  if (siteConfig.location.status !== "confirmed") {
    return undefined;
  }

  return {
    formatted: siteConfig.location.formatted,
    line1: siteConfig.location.line1,
    line2: siteConfig.location.line2,
    mapsHref: siteConfig.location.mapsHref,
  };
}

export function getPublicPhone():
  | { display: string; href: string }
  | undefined {
  if (siteConfig.phone.status !== "confirmed") {
    return undefined;
  }

  return {
    display: siteConfig.phone.display,
    href: siteConfig.phone.href,
  };
}

export function getPublicFax(): { display: string } | undefined {
  if (siteConfig.fax.status !== "confirmed" || !siteConfig.fax.publicDisplay) {
    return undefined;
  }

  return { display: siteConfig.fax.display };
}

export function getCallOfficeCta(): NavItem | undefined {
  const phone = getPublicPhone();

  if (!phone) {
    return undefined;
  }

  return {
    href: phone.href,
    label: `Call ${phone.display}`,
  };
}

export function getPublicContactDetails(): ContactDetail[] {
  const details: ContactDetail[] = [];
  const address = getPublicAddress();
  const phone = getPublicPhone();
  const fax = getPublicFax();

  if (address) {
    details.push({
      label: "Address",
      value: address.formatted,
      href: address.mapsHref,
    });
  }

  if (phone) {
    details.push({
      label: "Phone",
      value: phone.display,
      href: phone.href,
    });
  }

  if (fax) {
    details.push({
      label: "Fax",
      value: fax.display,
    });
  }

  return details;
}
