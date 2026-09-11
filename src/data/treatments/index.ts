import type { TreatmentRecord } from "@/types/content";
import { advancedHolisticTreatments } from "@/data/treatments/advanced-holistic";
import { clearAlignerTreatments } from "@/data/treatments/clear-aligners";
import { cosmeticTreatments } from "@/data/treatments/cosmetic";
import { dentalImplantTreatments } from "@/data/treatments/dental-implants";
import { familyChildrenTreatments } from "@/data/treatments/family-children";
import { minimallyInvasiveBiologicalTreatments } from "@/data/treatments/minimally-invasive-biological";
import { oralApplianceTreatments } from "@/data/treatments/oral-appliances";
import { oralSurgeryTreatments } from "@/data/treatments/oral-surgery";
import { periodontalTreatments } from "@/data/treatments/periodontal";
import { preventiveGeneralTreatments } from "@/data/treatments/preventive-general";
import { restorativeTreatments } from "@/data/treatments/restorative";
import { rootCanalTreatments } from "@/data/treatments/root-canal";

export const treatmentRecords: readonly TreatmentRecord[] = [
  ...preventiveGeneralTreatments,
  ...familyChildrenTreatments,
  ...cosmeticTreatments,
  ...restorativeTreatments,
  ...dentalImplantTreatments,
  ...rootCanalTreatments,
  ...oralSurgeryTreatments,
  ...clearAlignerTreatments,
  ...oralApplianceTreatments,
  ...periodontalTreatments,
  ...minimallyInvasiveBiologicalTreatments,
  ...advancedHolisticTreatments,
];
