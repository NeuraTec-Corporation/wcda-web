import { siteConfig } from "@/config/site";
import { getPublicPhone } from "@/data/contact";
import type { NavItem } from "@/types/navigation";

export const headerNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/patients", label: "Patients" },
  { href: "/technology", label: "Technology" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about/dr-jonnathan-matute", label: "Dr. Matute" },
  { href: "/services", label: "Services" },
  { href: "/patients", label: "Patients" },
  { href: "/technology", label: "Technology" },
  { href: "/contact", label: "Contact" },
];

export const footerLegalNav: readonly NavItem[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/accessibility", label: "Accessibility" },
];

export const headerCta: NavItem = {
  href: siteConfig.appointmentHref,
  label: "Request Appointment",
};

export function getUtilityLinks(): NavItem[] {
  const phone = getPublicPhone();

  if (!phone) {
    return [];
  }

  return [
    {
      href: phone.href,
      label: phone.display,
    },
  ];
}
