import type { ComponentType } from "react";
import IndexOriginalPage from "./pages/IndexOriginalPage";
import AboutOriginalPage from "./pages/AboutOriginalPage";
import ServicesOriginalPage from "./pages/ServicesOriginalPage";
import ServicesDetailsOriginalPage from "./pages/ServicesDetailsOriginalPage";
import ServicesDetailsCleaningPreventionOriginalPage from "./pages/ServicesDetailsCleaningPreventionOriginalPage";
import ServicesDetailsFamilyDentistryOriginalPage from "./pages/ServicesDetailsFamilyDentistryOriginalPage";
import ServicesDetailsChildrensDentistryOriginalPage from "./pages/ServicesDetailsChildrensDentistryOriginalPage";
import ServicesDetailsCosmeticDentistryOriginalPage from "./pages/ServicesDetailsCosmeticDentistryOriginalPage";
import ServicesDetailsToothReplacementOriginalPage from "./pages/ServicesDetailsToothReplacementOriginalPage";
import ServicesDetailsExtractionsPreservationOriginalPage from "./pages/ServicesDetailsExtractionsPreservationOriginalPage";
import ServicesDetailsInvisalignOriginalPage from "./pages/ServicesDetailsInvisalignOriginalPage";
import ServicesDetailsOralAppliancesOriginalPage from "./pages/ServicesDetailsOralAppliancesOriginalPage";
import ServicesDetailsHolisticServicesOriginalPage from "./pages/ServicesDetailsHolisticServicesOriginalPage";
import ServicesDetailsDentalImplantsCranfordOriginalPage from "./pages/ServicesDetailsDentalImplantsCranfordOriginalPage";
import BeforeAfterOriginalPage from "./pages/BeforeAfterOriginalPage";
import TeamOriginalPage from "./pages/TeamOriginalPage";
import PricingOriginalPage from "./pages/PricingOriginalPage";
import TestimonialsOriginalPage from "./pages/TestimonialsOriginalPage";
import FaqOriginalPage from "./pages/FaqOriginalPage";
import GalleryImageOriginalPage from "./pages/GalleryImageOriginalPage";
import GalleryVideoOriginalPage from "./pages/GalleryVideoOriginalPage";
import BlogOriginalPage from "./pages/BlogOriginalPage";
import PostOriginalPage from "./pages/PostOriginalPage";
import ContactOriginalPage from "./pages/ContactOriginalPage";
import Page404OriginalPage from "./pages/Page404OriginalPage";

export const originalPages: Record<string, { component: ComponentType; title: string }> = {
  "index.html": { component: IndexOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "about.html": { component: AboutOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "services.html": { component: ServicesOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "services-details.html": { component: ServicesDetailsOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "services-details-CleaningPrevention.html": { component: ServicesDetailsCleaningPreventionOriginalPage, title: "Denart - Cleaning & Prevention" },
  "services-details-FamilyDentistry.html": { component: ServicesDetailsFamilyDentistryOriginalPage, title: "Denart - Family Dentistry" },
  "services-details-ChildrensDentistry.html": { component: ServicesDetailsChildrensDentistryOriginalPage, title: "Denart - Children's Dentistry" },
  "services-details-CosmeticDentistry.html": { component: ServicesDetailsCosmeticDentistryOriginalPage, title: "Denart - Cosmetic Dentistry" },
  "services-details-ToothReplacement.html": { component: ServicesDetailsToothReplacementOriginalPage, title: "Denart - Tooth Replacement" },
  "services-details-ExtractionsPreservation.html": { component: ServicesDetailsExtractionsPreservationOriginalPage, title: "Denart - Extractions & Preservation" },
  "services-details-Invisalign.html": { component: ServicesDetailsInvisalignOriginalPage, title: "Denart - Invisalign®" },
  "services-details-OralAppliances.html": { component: ServicesDetailsOralAppliancesOriginalPage, title: "Denart - Oral Appliances" },
  "services-details-HolisticServices.html": { component: ServicesDetailsHolisticServicesOriginalPage, title: "Denart - Holistic Services" },
  "services-details-DentalImplantsCranford.html": { component: ServicesDetailsDentalImplantsCranfordOriginalPage, title: "Denart - Dental Implants Cranford" },
  "before-after.html": { component: BeforeAfterOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "team.html": { component: TeamOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "pricing.html": { component: PricingOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "testimonials.html": { component: TestimonialsOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "faq.html": { component: FaqOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "gallery-image.html": { component: GalleryImageOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "gallery-video.html": { component: GalleryVideoOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "blog.html": { component: BlogOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "post.html": { component: PostOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "contact.html": { component: ContactOriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
  "404.html": { component: Page404OriginalPage, title: "Denart - Dentist & Dental Clinic HTML Template" },
};

export const originalPageNames = ["index.html","about.html","services.html","services-details.html","services-details-CleaningPrevention.html","services-details-FamilyDentistry.html","services-details-ChildrensDentistry.html","services-details-CosmeticDentistry.html","services-details-ToothReplacement.html","services-details-ExtractionsPreservation.html","services-details-Invisalign.html","services-details-OralAppliances.html","services-details-HolisticServices.html","services-details-DentalImplantsCranford.html","before-after.html","team.html","pricing.html","testimonials.html","faq.html","gallery-image.html","gallery-video.html","blog.html","post.html","contact.html","404.html"] as const;
