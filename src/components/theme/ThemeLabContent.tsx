"use client";

import { LabControlHelp } from "@/components/theme/LabControlHelp";
import {
  isPubliclyVisible,
  resolveCategoryEnabled,
  resolvePageEnabled,
  resolvePageSectionEnabled,
  resolveTreatmentEnabled,
  resolveTreatmentSectionEnabled,
  setCategoryEnabled,
  setPageEnabled,
  setPageSectionEnabled,
  setTreatmentEnabled,
  setTreatmentSectionEnabled,
  type ContentPublicationPatch,
} from "@/config/content-publication";
import {
  TREATMENT_SECTION_LABELS,
  getContentPageByPath,
  labelForLanguage,
  parseServicePreviewPath,
  PUBLICATION_STATUS_LABELS,
} from "@/config/publication-catalog";
import type { LabLanguage } from "@/config/lab-ui";
import {
  getCategoryBySlug,
  getManagedCategories,
  getManagedTreatmentsByCategory,
  getTreatmentBySlugs,
} from "@/data/services";
import type { TreatmentRecord, TreatmentSectionId } from "@/types/content";
import type { PublicationStatus } from "@/types/navigation";

const copy = {
  en: {
    pageStatus: "Page status",
    sections: "Sections",
    services: "Services",
    category: "Category",
    treatment: "Treatment",
    treatments: "Treatments",
    section: "Section",
    active: "Active",
    inactive: "Inactive",
    preview: "Preview",
    draftWarning:
      "Active does not publish a draft. Status stays Draft until an owner changes it separately.",
    reviewWarning:
      "Active does not promote Review to Published. Status is display-only here.",
    inactivePublic:
      "Inactive removes this item from public lists and public routing. Literature is kept.",
    sectionPublic:
      "Inactive hides only this section. The page and its literature remain stored.",
  },
  es: {
    pageStatus: "Estado de página",
    sections: "Secciones",
    services: "Servicios",
    category: "Categoría",
    treatment: "Tratamiento",
    treatments: "Tratamientos",
    section: "Sección",
    active: "Activa",
    inactive: "Inactiva",
    preview: "Vista previa",
    draftWarning:
      "Activa no publica un borrador. El estado permanece Borrador hasta que el titular lo cambie por separado.",
    reviewWarning:
      "Activa no pasa Revisión a Publicada. El estado aquí es solo informativo.",
    inactivePublic:
      "Inactiva lo quita de listas y rutas públicas. La literatura se conserva.",
    sectionPublic:
      "Inactiva oculta solo esta sección. La página y su literatura siguen almacenadas.",
  },
} as const;

type ThemeLabContentProps = {
  language: LabLanguage;
  publication: ContentPublicationPatch;
  previewPath: string;
  onChange: (next: ContentPublicationPatch) => void;
  onPreviewPath: (path: string) => void;
  focusedSectionId?: string;
};

function StatusBadge({
  status,
  language,
}: {
  status: PublicationStatus;
  language: LabLanguage;
}) {
  const tone =
    status === "published"
      ? "text-emerald-300"
      : status === "approved"
        ? "text-cyan-300"
        : "text-amber-300";
  return (
    <span className={`text-[0.65rem] font-medium uppercase tracking-[0.12em] ${tone}`}>
      {PUBLICATION_STATUS_LABELS[status][language]}
    </span>
  );
}

function ActiveSwitch({
  checked,
  onChange,
  language,
  helpId,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  language: LabLanguage;
  helpId?: "content-page-active" | "content-section-active" | "content-category-active" | "content-treatment-active" | "content-treatment-section-active";
}) {
  const text = copy[language];
  return (
    <div className="min-w-0">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-3 text-left text-sm ${
          checked
            ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-100"
            : "border-zinc-700 bg-zinc-900 text-zinc-300"
        }`}
      >
        <span>{checked ? text.active : text.inactive}</span>
        <span
          className={`size-2.5 shrink-0 rounded-full ${
            checked ? "bg-emerald-400" : "bg-zinc-500"
          }`}
          aria-hidden
        />
      </button>
      {helpId ? <LabControlHelp id={helpId} /> : null}
    </div>
  );
}

function KindLabel({
  kind,
  language,
}: {
  kind: "category" | "treatment" | "section";
  language: LabLanguage;
}) {
  const text = copy[language];
  const label =
    kind === "category"
      ? text.category
      : kind === "treatment"
        ? text.treatment
        : text.section;
  return (
    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
      {label}
    </p>
  );
}

function storedSectionIds(treatment: TreatmentRecord): TreatmentSectionId[] {
  return (Object.keys(treatment.sections) as TreatmentSectionId[]).filter(
    (id) => treatment.sections[id],
  );
}

export function ThemeLabContent({
  language,
  publication,
  previewPath,
  onChange,
  onPreviewPath,
  focusedSectionId,
}: ThemeLabContentProps) {
  const text = copy[language];
  const page = getContentPageByPath(previewPath);
  const servicePath = parseServicePreviewPath(previewPath);
  const showServicesHierarchy = previewPath === "/services" || Boolean(servicePath.categorySlug);
  const focusedCategory = servicePath.categorySlug
    ? getCategoryBySlug(servicePath.categorySlug)
    : undefined;
  const focusedTreatment =
    servicePath.categorySlug && servicePath.treatmentSlug
      ? getTreatmentBySlugs(servicePath.categorySlug, servicePath.treatmentSlug)
      : undefined;
  const categories = focusedCategory
    ? [focusedCategory]
    : showServicesHierarchy
      ? getManagedCategories()
      : [];

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {page ? (
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
            {text.pageStatus}
          </p>
          <p className="mt-2 text-sm text-zinc-200">
            {labelForLanguage(page.label, language)}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <StatusBadge status="published" language={language} />
          </div>
          {!focusedSectionId ? (
          <div className="mt-3">
            <ActiveSwitch
              checked={resolvePageEnabled(publication, page.id)}
              language={language}
              helpId="content-page-active"
              onChange={(enabled) =>
                onChange(setPageEnabled(publication, page.id, enabled))
              }
            />
          </div>
          ) : null}
          <LabControlHelp id="content-page-status" />
        </section>
      ) : null}

      {page && !focusedTreatment ? (
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
            {text.sections}
          </p>
          <ul className="mt-3 flex min-w-0 flex-col gap-3">
            {page.sections
              .filter((section) =>
                focusedSectionId ? section.id === focusedSectionId : true,
              )
              .map((section) => (
              <li key={section.id} className="min-w-0 rounded-md border border-zinc-800 px-3 py-3">
                <KindLabel kind="section" language={language} />
                <p className="mt-1 text-sm text-zinc-100">
                  {labelForLanguage(section.label, language)}
                </p>
                <div className="mt-2">
                  <ActiveSwitch
                    checked={resolvePageSectionEnabled(
                      publication,
                      page.id,
                      section.id,
                    )}
                    language={language}
                    helpId="content-section-active"
                    onChange={(enabled) =>
                      onChange(
                        setPageSectionEnabled(
                          publication,
                          page.id,
                          section.id,
                          enabled,
                        ),
                      )
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showServicesHierarchy && !focusedSectionId ? (
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
            {text.services}
          </p>
          <ul className="mt-3 flex min-w-0 flex-col gap-4">
            {categories.map((category) => {
              const enabled = resolveCategoryEnabled(
                publication,
                category.slug,
                category.enabled,
              );
              const treatments = focusedTreatment
                ? [focusedTreatment]
                : getManagedTreatmentsByCategory(category.slug);
              return (
                <li
                  key={category.slug}
                  className="min-w-0 rounded-md border border-zinc-800 px-3 py-3"
                >
                  <KindLabel kind="category" language={language} />
                  <div className="mt-1 flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-100">
                        {category.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <StatusBadge status={category.status} language={language} />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 text-[0.7rem] text-cyan-300 hover:text-cyan-200"
                      onClick={() => onPreviewPath(`/services/${category.slug}`)}
                    >
                      {text.preview}
                    </button>
                  </div>
                  <div className="mt-3">
                    <ActiveSwitch
                      checked={enabled}
                      language={language}
                      helpId="content-category-active"
                      onChange={(next) =>
                        onChange(
                          setCategoryEnabled(
                            publication,
                            category.slug,
                            next,
                            category.enabled,
                          ),
                        )
                      }
                    />
                  </div>
                  {category.status === "draft" || category.status === "review" ? (
                    <p className="mt-2 text-[0.7rem] leading-relaxed text-amber-200/80">
                      {category.status === "draft"
                        ? text.draftWarning
                        : text.reviewWarning}
                    </p>
                  ) : (
                    <p className="mt-2 text-[0.7rem] leading-relaxed text-zinc-500">
                      {text.inactivePublic}
                    </p>
                  )}
                  {treatments.length > 0 ? (
                    <div className="mt-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                        {text.treatments}
                      </p>
                      <ul className="mt-2 flex min-w-0 flex-col gap-3">
                        {treatments.map((treatment) => (
                          <TreatmentControls
                            key={`${treatment.categorySlug}/${treatment.slug}`}
                            treatment={treatment}
                            language={language}
                            publication={publication}
                            expanded={
                              focusedTreatment?.slug === treatment.slug ||
                              Boolean(focusedTreatment) ||
                              previewPath === `/services/${category.slug}`
                            }
                            onChange={onChange}
                            onPreviewPath={onPreviewPath}
                          />
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function TreatmentControls({
  treatment,
  language,
  publication,
  expanded,
  onChange,
  onPreviewPath,
}: {
  treatment: TreatmentRecord;
  language: LabLanguage;
  publication: ContentPublicationPatch;
  expanded: boolean;
  onChange: (next: ContentPublicationPatch) => void;
  onPreviewPath: (path: string) => void;
}) {
  const text = copy[language];
  const enabled = resolveTreatmentEnabled(
    publication,
    treatment.categorySlug,
    treatment.slug,
    treatment.enabled,
  );
  const publicVisible = isPubliclyVisible({
    enabled,
    status: treatment.status,
  });
  const sections = storedSectionIds(treatment);

  return (
    <li className="min-w-0 rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-3">
      <KindLabel kind="treatment" language={language} />
      <div className="mt-1 flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-zinc-100">{treatment.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <StatusBadge status={treatment.status} language={language} />
            {!publicVisible ? (
              <span className="text-[0.65rem] uppercase tracking-[0.12em] text-zinc-500">
                {text.inactive}
              </span>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 text-[0.7rem] text-cyan-300 hover:text-cyan-200"
          onClick={() =>
            onPreviewPath(
              `/services/${treatment.categorySlug}/${treatment.slug}`,
            )
          }
        >
          {text.preview}
        </button>
      </div>
      <div className="mt-3">
        <ActiveSwitch
          checked={enabled}
          language={language}
          helpId="content-treatment-active"
          onChange={(next) =>
            onChange(
              setTreatmentEnabled(
                publication,
                treatment.categorySlug,
                treatment.slug,
                next,
                treatment.enabled,
              ),
            )
          }
        />
      </div>
      {treatment.status === "draft" || treatment.status === "review" ? (
        <p className="mt-2 text-[0.7rem] leading-relaxed text-amber-200/80">
          {treatment.status === "draft" ? text.draftWarning : text.reviewWarning}
        </p>
      ) : null}
      {expanded ? (
        <div className="mt-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {text.sections}
          </p>
          <ul className="mt-2 flex min-w-0 flex-col gap-2">
            {sections.map((sectionId) => {
              const source = treatment.sections[sectionId];
              if (!source) {
                return null;
              }
              const sectionEnabled = resolveTreatmentSectionEnabled(
                publication,
                treatment.categorySlug,
                treatment.slug,
                sectionId,
                source.enabled,
              );
              return (
                <li
                  key={sectionId}
                  className="min-w-0 rounded-md border border-zinc-800 px-3 py-2"
                >
                  <KindLabel kind="section" language={language} />
                  <p className="mt-1 text-sm text-zinc-200">
                    {TREATMENT_SECTION_LABELS[sectionId][language]}
                  </p>
                  <div className="mt-2">
                    <ActiveSwitch
                      checked={sectionEnabled}
                      language={language}
                      helpId="content-treatment-section-active"
                      onChange={(next) =>
                        onChange(
                          setTreatmentSectionEnabled(
                            publication,
                            treatment.categorySlug,
                            treatment.slug,
                            sectionId,
                            next,
                            source.enabled,
                          ),
                        )
                      }
                    />
                  </div>
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-zinc-500">
                    {text.sectionPublic}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </li>
  );
}
