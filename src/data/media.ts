import type { MediaAsset, MediaRegistry } from "@/types/media";
import { mediaManifest } from "@/config/media-manifest";

/**
 * Media keys are logical IDs, not filenames.
 * Updating src/status here updates every mediaKey consumer.
 *
 * Legacy numeric ranges remain as aliases:
 * 01–19  Areas of Care
 * 50–59  Doctor / clinician
 * 80–89  Technology
 * 90–99  Practice / location / branding
 *
 * Treatment heroes use tx-{slug}. Supporting views use tx-{slug}-support.
 */
export const mediaNamespaces = {
  careAreas: { start: "01", end: "19" },
  treatments: { prefix: "tx-" },
  doctors: { start: "50", end: "59" },
  team: { start: "60", end: "79" },
  technology: { start: "80", end: "89" },
  practice: { start: "90", end: "99" },
} as const;

function toMediaAsset(
  entry: (typeof mediaManifest)[number],
): MediaAsset {
  return {
    id: entry.id,
    kind: entry.kind,
    status: "available",
    src: entry.src,
    alt: entry.alt,
    title: entry.contentSubject,
    source: entry.sourceType,
    aspectRatio: entry.aspectRatio,
  };
}

export const mediaAssets: MediaRegistry = Object.fromEntries(
  mediaManifest.map((entry) => [entry.id, toMediaAsset(entry)]),
);

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
