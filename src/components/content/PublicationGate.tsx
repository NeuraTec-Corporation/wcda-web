"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  getActivePublicationPatch,
  resolvePageSectionEnabled,
  resolveTreatmentSectionEnabled,
  subscribePublicationPreview,
  type ContentPageId,
} from "@/config/content-publication";
import { useExperience } from "@/components/experience/useExperience";
import {
  scopedSurfaceStyle,
  sectionColorKey,
} from "@/config/scoped-colors";
import type { TreatmentRecord, TreatmentSectionId } from "@/types/content";

export function usePublicationPreview() {
  const [patch, setPatch] = useState(getActivePublicationPatch);

  useEffect(() => {
    const sync = () => setPatch(getActivePublicationPatch());
    sync();
    return subscribePublicationPreview(sync);
  }, []);

  return patch;
}

export function PublicationGate({
  page,
  section,
  children,
}: {
  page: ContentPageId;
  section: string;
  children: ReactNode;
}) {
  const patch = usePublicationPreview();
  const experience = useExperience();
  const sectionHex =
    experience.scopedColors?.sections?.[sectionColorKey(page, section)];
  const style = scopedSurfaceStyle(sectionHex, { isolate: true }) as
    | CSSProperties
    | undefined;
  if (!resolvePageSectionEnabled(patch, page, section)) {
    return null;
  }
  return (
    <div
      data-lab-page-id={page}
      data-lab-section-id={section}
      className="wcda-scope-surface min-w-0"
      style={style}
    >
      {children}
    </div>
  );
}

export function TreatmentSectionGate({
  treatment,
  sectionId,
  children,
}: {
  treatment: TreatmentRecord;
  sectionId: TreatmentSectionId;
  children: ReactNode;
}) {
  const patch = usePublicationPreview();
  const source = treatment.sections[sectionId];
  if (!source) {
    return null;
  }
  if (
    !resolveTreatmentSectionEnabled(
      patch,
      treatment.categorySlug,
      treatment.slug,
      sectionId,
      source.enabled,
    )
  ) {
    return null;
  }
  return children;
}
