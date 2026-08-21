import type { MediaAsset, MediaRegistry } from "@/types/media";

/**
 * Media keys are logical IDs, not filenames.
 * Updating src/status here updates every mediaKey consumer.
 *
 * Reserved ranges:
 * 01–19  Areas of Care
 * 20–49  Treatments (assign later; do not invent keys)
 * 50–59  Doctor / clinician
 * 60–79  Team
 * 80–89  Technology
 * 90–99  Practice / location / branding
 */
export const mediaNamespaces = {
  careAreas: { start: "01", end: "19" },
  treatments: { start: "20", end: "49" },
  doctors: { start: "50", end: "59" },
  team: { start: "60", end: "79" },
  technology: { start: "80", end: "89" },
  practice: { start: "90", end: "99" },
} as const;

export const mediaAssets: MediaRegistry = {
  "01": {
    id: "01",
    kind: "image",
    status: "pending",
    alt: "Preventive and general dentistry",
    title: "Preventive & General Dentistry",
    aspectRatio: "4 / 3",
  },
  "02": {
    id: "02",
    kind: "image",
    status: "pending",
    alt: "Family and children's dentistry",
    title: "Family & Children's Dentistry",
    aspectRatio: "4 / 3",
  },
  "03": {
    id: "03",
    kind: "image",
    status: "pending",
    alt: "Cosmetic dentistry",
    title: "Cosmetic Dentistry",
    aspectRatio: "4 / 3",
  },
  "04": {
    id: "04",
    kind: "image",
    status: "pending",
    alt: "Restorative dentistry and tooth replacement",
    title: "Restorative & Tooth Replacement",
    aspectRatio: "4 / 3",
  },
  "05": {
    id: "05",
    kind: "image",
    status: "pending",
    alt: "Dental implants",
    title: "Dental Implants",
    aspectRatio: "4 / 3",
  },
  "06": {
    id: "06",
    kind: "image",
    status: "pending",
    alt: "Root canal and tooth preservation",
    title: "Root Canal & Tooth Preservation",
    aspectRatio: "4 / 3",
  },
  "07": {
    id: "07",
    kind: "image",
    status: "pending",
    alt: "Oral surgery and extractions",
    title: "Oral Surgery / Extractions",
    aspectRatio: "4 / 3",
  },
  "08": {
    id: "08",
    kind: "image",
    status: "pending",
    alt: "Clear aligner care",
    title: "Clear Aligners",
    aspectRatio: "4 / 3",
  },
  "09": {
    id: "09",
    kind: "image",
    status: "pending",
    alt: "Oral appliances and bruxism care",
    title: "Oral Appliances / Bruxism",
    aspectRatio: "4 / 3",
  },
  "10": {
    id: "10",
    kind: "image",
    status: "pending",
    alt: "Periodontal and gum care",
    title: "Periodontal / Gum Care",
    aspectRatio: "4 / 3",
  },
  "50": {
    id: "50",
    kind: "portrait",
    status: "pending",
    alt: "Dr. Jonnathan Matute, DMD",
    title: "Dr. Jonnathan Matute",
    aspectRatio: "3 / 4",
  },
  "80": {
    id: "80",
    kind: "image",
    status: "pending",
    alt: "Dental technology at West Caldwell Dental Arts",
    title: "Practice technology",
    aspectRatio: "16 / 9",
  },
  "90": {
    id: "90",
    kind: "image",
    status: "pending",
    alt: "West Caldwell Dental Arts practice",
    title: "Practice",
    aspectRatio: "4 / 3",
  },
};

export function getMediaAsset(
  mediaKey: string | undefined,
): MediaAsset | undefined {
  if (!mediaKey) {
    return undefined;
  }

  return mediaAssets[mediaKey];
}

export function isRenderableMedia(
  asset: MediaAsset | undefined,
): asset is MediaAsset & { src: string } {
  return Boolean(
    asset && asset.status === "available" && asset.src && asset.src.length > 0,
  );
}
