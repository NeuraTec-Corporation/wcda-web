import type { LabLanguage } from "@/config/lab-ui";
import type { ContentPageId } from "@/config/content-publication";
import type { TreatmentSectionId } from "@/types/content";
import type { PublicationStatus } from "@/types/navigation";

export type ContentSectionDef = {
  id: string;
  label: { en: string; es: string };
};

export type ContentPageDef = {
  id: ContentPageId;
  path: string;
  label: { en: string; es: string };
  sections: readonly ContentSectionDef[];
};

export const TREATMENT_SECTION_LABELS: Record<
  TreatmentSectionId,
  { en: string; es: string }
> = {
  overview: { en: "Overview", es: "Descripción general" },
  whyRecommended: { en: "Why recommended", es: "Por qué se recomienda" },
  evaluation: { en: "Evaluation", es: "Evaluación" },
  howItWorks: { en: "How it works", es: "Cómo funciona" },
  whatToExpect: { en: "What to expect", es: "Qué esperar" },
  benefits: { en: "Benefits", es: "Beneficios" },
  considerations: { en: "Considerations", es: "Consideraciones" },
  recoveryAftercare: { en: "Recovery / Aftercare", es: "Recuperación / Cuidados" },
  maintenance: { en: "Maintenance", es: "Mantenimiento" },
  alternatives: { en: "Alternatives", es: "Alternativas" },
  faq: { en: "FAQ", es: "Preguntas frecuentes" },
  clinicalNote: { en: "Clinical note", es: "Nota clínica" },
  relatedTreatments: { en: "Related treatments", es: "Tratamientos relacionados" },
};

export const PUBLICATION_STATUS_LABELS: Record<
  PublicationStatus,
  { en: string; es: string }
> = {
  draft: { en: "Draft", es: "Borrador" },
  review: { en: "Review", es: "Revisión" },
  approved: { en: "Approved", es: "Aprobada" },
  published: { en: "Published", es: "Publicada" },
};

export const contentPages: readonly ContentPageDef[] = [
  {
    id: "home",
    path: "/",
    label: { en: "Home", es: "Inicio" },
    sections: [
      { id: "hero", label: { en: "Hero", es: "Héroe" } },
      { id: "marquee", label: { en: "Services marquee", es: "Marquee de servicios" } },
      { id: "trust", label: { en: "Approach", es: "Enfoque" } },
      { id: "careAreas", label: { en: "Areas of care", es: "Áreas de cuidado" } },
      { id: "whyChoose", label: { en: "Why this practice", es: "Por qué este consultorio" } },
      { id: "practice", label: { en: "Practice owner", es: "Titular del consultorio" } },
      { id: "patientCta", label: { en: "Patient call to action", es: "Llamado a pacientes" } },
      { id: "contact", label: { en: "Location preview", es: "Vista previa de ubicación" } },
    ],
  },
  {
    id: "about",
    path: "/about",
    label: { en: "About", es: "Acerca de" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "philosophy", label: { en: "Approach", es: "Enfoque" } },
      { id: "independence", label: { en: "Independent practice", es: "Consultorio independiente" } },
      { id: "whyChoose", label: { en: "Why patients choose us", es: "Por qué nos eligen" } },
      { id: "links", label: { en: "Related links", es: "Enlaces relacionados" } },
      { id: "cta", label: { en: "Appointment call to action", es: "Llamado a cita" } },
    ],
  },
  {
    id: "doctor",
    path: "/about/dr-jonnathan-matute",
    label: { en: "Dr. Matute", es: "Dr. Matute" },
    sections: [
      { id: "intro", label: { en: "Profile introduction", es: "Introducción del perfil" } },
      { id: "biography", label: { en: "Biography", es: "Biografía" } },
      { id: "education", label: { en: "Education & training", es: "Formación" } },
      { id: "cta", label: { en: "Appointment call to action", es: "Llamado a cita" } },
    ],
  },
  {
    id: "team",
    path: "/about/team",
    label: { en: "Team", es: "Equipo" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "members", label: { en: "Team members", es: "Miembros del equipo" } },
      { id: "cta", label: { en: "Related action", es: "Acción relacionada" } },
    ],
  },
  {
    id: "services",
    path: "/services",
    label: { en: "Services", es: "Servicios" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "areas", label: { en: "Areas of care", es: "Áreas de cuidado" } },
      { id: "treatments", label: { en: "Treatments catalog", es: "Catálogo de tratamientos" } },
      { id: "cta", label: { en: "Appointment call to action", es: "Llamado a cita" } },
    ],
  },
  {
    id: "patients",
    path: "/patients",
    label: { en: "Patients", es: "Pacientes" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "resources", label: { en: "Patient resources", es: "Recursos para pacientes" } },
      { id: "cta", label: { en: "Appointment call to action", es: "Llamado a cita" } },
    ],
  },
  {
    id: "patients-first-visit",
    path: "/patients/first-visit",
    label: { en: "First visit", es: "Primera visita" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "details", label: { en: "Visit details", es: "Detalles de la visita" } },
    ],
  },
  {
    id: "patients-financial-options",
    path: "/patients/financial-options",
    label: { en: "Financial options", es: "Opciones financieras" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "details", label: { en: "Details", es: "Detalles" } },
    ],
  },
  {
    id: "patients-insurance",
    path: "/patients/insurance",
    label: { en: "Insurance", es: "Seguro" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "details", label: { en: "Details", es: "Detalles" } },
    ],
  },
  {
    id: "patients-forms",
    path: "/patients/forms",
    label: { en: "Patient forms", es: "Formularios" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "details", label: { en: "Details", es: "Detalles" } },
    ],
  },
  {
    id: "technology",
    path: "/technology",
    label: { en: "Technology", es: "Tecnología" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "details", label: { en: "How we use technology", es: "Cómo usamos la tecnología" } },
      { id: "tools", label: { en: "Tools", es: "Herramientas" } },
      { id: "cta", label: { en: "Appointment call to action", es: "Llamado a cita" } },
    ],
  },
  {
    id: "contact",
    path: "/contact",
    label: { en: "Contact", es: "Contacto" },
    sections: [
      { id: "intro", label: { en: "Introduction", es: "Introducción" } },
      { id: "details", label: { en: "Contact details", es: "Datos de contacto" } },
      { id: "form", label: { en: "Message form", es: "Formulario de mensaje" } },
    ],
  },
];

const pagesByPath = new Map(contentPages.map((page) => [page.path, page]));
const pagesById = new Map(contentPages.map((page) => [page.id, page]));

export function getContentPageByPath(path: string) {
  const normalized = path.split("?")[0] || path;
  return pagesByPath.get(normalized);
}

export function getContentPageById(id: ContentPageId) {
  return pagesById.get(id);
}

export function labelForLanguage(
  value: { en: string; es: string },
  language: LabLanguage,
) {
  return value[language];
}

export function parseServicePreviewPath(path: string): {
  categorySlug?: string;
  treatmentSlug?: string;
} {
  const match = path.match(/^\/services(?:\/([^/?#]+))?(?:\/([^/?#]+))?$/);
  if (!match) {
    return {};
  }
  return {
    categorySlug: match[1],
    treatmentSlug: match[2],
  };
}
