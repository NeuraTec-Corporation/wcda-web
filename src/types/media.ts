export type MediaStatus = "available" | "pending" | "disabled";

export type MediaKind = "image" | "portrait" | "logo" | "icon" | "background";

export type MediaFocalPoint = {
  x: number;
  y: number;
};

export type MediaAsset = {
  id: string;
  kind: MediaKind;
  status: MediaStatus;
  src?: string;
  alt: string;
  title?: string;
  credit?: string;
  source?: string;
  focalPoint?: MediaFocalPoint;
  aspectRatio?: string;
};

export type MediaRegistry = Record<string, MediaAsset>;
