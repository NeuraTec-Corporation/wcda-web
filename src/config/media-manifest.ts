import { mediaManifest } from "@/config/media-manifest.generated";

export {
  mediaManifest,
  type MediaLabCategory,
  type MediaManifestEntry,
  type MediaManifestSlot,
  type MediaManifestStatus,
  type MediaSourceType,
} from "@/config/media-manifest.generated";

export function mediaManifestById() {
  return new Map(
    mediaManifest.map((entry) => [entry.id, entry] as const),
  );
}
