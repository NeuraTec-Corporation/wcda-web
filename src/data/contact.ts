import { siteConfig } from "@/config/site";
import type { ContactDetail } from "@/types/content";
import type {
  PublicAddress,
  PublicEmail,
  PublicGoogleMaps,
  PublicHours,
  PublicPhone,
  SiteCredits,
  SocialLink,
} from "@/types/contact";
import type { NavItem } from "@/types/navigation";

export const contactIntro = {
  headingId: "contact-heading",
  eyebrow: "Get in Touch",
  title: "Contact West Caldwell Dental Arts",
  description:
    "Questions about scheduling, your visit, or general office information can be directed to our team. Use the options below or request an appointment.",
} as const;

export const contactFormConfig = {
  acceptsOnlineSubmission: false,
  phiCollectionEnabled: false,
  privacyNotice:
    "Please do not include sensitive medical or health information in this form.",
  unavailableNotice:
    "Online messages are not sent from this page yet. Please request an appointment to reach the office.",
  submitLabel: "Send message",
  reasons: [
    { value: "appointment-question", label: "Appointment question" },
    { value: "office-information", label: "Office information" },
    { value: "insurance-financial", label: "Insurance / financial question" },
    { value: "existing-appointment", label: "Existing appointment" },
    { value: "other", label: "Other" },
  ],
} as const;

export function getPublicAddress(): PublicAddress | undefined {
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

export function getPublicPhone(): PublicPhone | undefined {
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

export function getPublicEmail(): PublicEmail | undefined {
  if (
    siteConfig.email.status !== "confirmed" ||
    !siteConfig.email.display ||
    !siteConfig.email.href
  ) {
    return undefined;
  }

  return {
    display: siteConfig.email.display,
    href: siteConfig.email.href,
  };
}

export function getPublicHours(): PublicHours | undefined {
  if (siteConfig.hours.status !== "confirmed") {
    return undefined;
  }

  const summary = siteConfig.hours.summary;
  const lines = siteConfig.hours.lines;

  if (!summary && (!lines || lines.length === 0)) {
    return undefined;
  }

  return { summary, lines };
}

export function getPublicGoogleMaps(): PublicGoogleMaps | undefined {
  if (siteConfig.googleMaps.status !== "confirmed") {
    return undefined;
  }

  return {
    title: siteConfig.googleMaps.title ?? siteConfig.name,
    embedUrl: siteConfig.googleMaps.embedUrl,
    directionsUrl: siteConfig.googleMaps.directionsUrl,
    reviewsUrl: siteConfig.googleMaps.reviewsUrl,
    businessProfileUrl: siteConfig.googleMaps.businessProfileUrl,
  };
}

export function getPublicSocialLinks(): Array<SocialLink & { url: string }> {
  return siteConfig.socialLinks.filter(
    (link): link is SocialLink & { url: string } =>
      link.status === "confirmed" &&
      typeof link.url === "string" &&
      link.url.length > 0,
  );
}

export function getPublicSiteCredits(): SiteCredits | undefined {
  if (siteConfig.siteCredits.status !== "confirmed") {
    return undefined;
  }

  if (
    !siteConfig.siteCredits.developerName &&
    !siteConfig.siteCredits.partnerName
  ) {
    return undefined;
  }

  return siteConfig.siteCredits;
}

export function getGoogleReviewsCta(): NavItem | undefined {
  const maps = getPublicGoogleMaps();
  const href = maps?.reviewsUrl ?? maps?.businessProfileUrl;

  if (!href) {
    return undefined;
  }

  return {
    href,
    label: "View Reviews on Google",
  };
}

export function getMapsDirectionsCta(): NavItem | undefined {
  const maps = getPublicGoogleMaps();
  const href = maps?.directionsUrl ?? maps?.businessProfileUrl;

  if (!href) {
    return undefined;
  }

  return {
    href,
    label: "Open in Google Maps",
  };
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

export function getCopyrightYear(): number {
  return new Date().getFullYear();
}

export function getPublicContactDetails(): ContactDetail[] {
  const details: ContactDetail[] = [];
  const address = getPublicAddress();
  const phone = getPublicPhone();
  const hours = getPublicHours();
  const email = getPublicEmail();
  const fax = getPublicFax();

  if (address) {
    details.push({
      label: "Office location",
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

  if (hours) {
    details.push({
      label: "Office hours",
      value: hours.summary ?? hours.lines?.join(" · ") ?? "",
    });
  }

  if (email) {
    details.push({
      label: "Email",
      value: email.display,
      href: email.href,
    });
  }

  if (fax) {
    details.push({
      label: "Fax",
      value: fax.display,
    });
  }

  return details.filter((detail) => detail.value.length > 0);
}
