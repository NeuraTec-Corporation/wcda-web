import { siteConfig } from "@/config/site";
import type { DoctorProfile } from "@/types/content";

export const doctorProfile: DoctorProfile = {
  slug: "dr-jonnathan-matute",
  displayName: siteConfig.owner.displayName,
  credential: siteConfig.owner.credential,
  role: "Practice owner",
  href: "/about/dr-jonnathan-matute",
  mediaKey: "50",
  summary:
    "Dr. Jonnathan Matute, DMD, is a general dentist and the owner of West Caldwell Dental Arts.",
  homeParagraphs: [
    "Dr. Jonnathan Matute, DMD, is a general dentist and the owner of West Caldwell Dental Arts. He plans care around each patient: listening first, explaining what an exam shows, and discussing options before treatment begins.",
    "He earned his Doctor of Dental Medicine degree from Rutgers School of Dental Medicine in 2020 and completed a General Practice Residency at Mountainside Hospital in Montclair, New Jersey, in 2021. Born and raised in Ecuador, he moved to the United States in 2010.",
  ],
  biography: [
    "Dr. Jonnathan Matute is a dedicated and compassionate general dentist committed to delivering high-quality, patient-centered care. He earned his Doctor of Dental Medicine degree from the Rutgers School of Dental Medicine in 2020, where he refined his clinical skills and strengthened his passion for serving diverse communities.",
    "Originally born and raised in Ecuador, Dr. Matute moved to the United States in 2010 to pursue his academic and professional goals. He enrolled at Kean University, earning his Bachelor's degree in Biology. His passion for education led him to serve as an Anatomy and Spanish instructor in 2015, reflecting his commitment to mentorship and lifelong learning.",
    "After dental school, Dr. Matute completed a General Practice Residency at Mountainside Hospital in Montclair, NJ, graduating in July 2021. This advanced training provided him with comprehensive experience in all aspects of general dentistry, including restorative, surgical, and emergency care.",
    "He has since served in leadership roles as both a primary dentist and managing doctor, consistently striving to elevate the standard of care within his practices.",
    "Dr. Matute is deeply committed to continuing education and professional growth. He has completed extensive advanced training in implant dentistry, clear aligner therapy, and esthetic dentistry, allowing him to offer modern, minimally invasive, and results-driven treatment options tailored to each patient's needs.",
    "Service to the community remains at the heart of his mission. Dr. Matute participates annually in outreach initiatives providing dental care to underserved communities in the Dominican Republic. He currently serves as a Board Member of World of Smiles and is actively involved in multiple committees with the New York Academy of Dentistry.",
    "As the first in his family to pursue a career in dentistry, Dr. Matute embodies perseverance, leadership, and gratitude. Outside the office, he enjoys spending time with his family, attending sporting events, and cheering for his favorite teams—the New York Red Bulls and the Seattle Seahawks. He also enjoys playing soccer and golf, appreciating classic cars, and mentoring high school and college students as they pursue their own professional dreams.",
    "Dr. Matute's combination of clinical excellence, leadership, and genuine care for others makes him a trusted provider and valued member of the community.",
  ],
  education: [
    {
      title: "Doctor of Dental Medicine",
      institution: "Rutgers School of Dental Medicine",
      year: "2020",
    },
    {
      title: "General Practice Residency",
      institution: "Mountainside Hospital",
      location: "Montclair, NJ",
      year: "July 2021",
    },
    {
      title: "Bachelor's Degree in Biology",
      institution: "Kean University",
    },
    {
      title: "Anatomy and Spanish Instructor",
      year: "2015",
    },
  ],
};
