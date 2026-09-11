import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BLUE = "#002774";
const BLUE_SOFT = "#3B568D";
const WARM = "#F1E8DC";
const SURFACE = "#F4EEE8";

/** @typedef {"hero" | "support" | "category" | "page" | "portrait"} Slot */
/** @typedef {"home" | "doctor" | "services" | "technology" | "about"} LabCategory */

/**
 * @typedef {object} CatalogItem
 * @property {string} id
 * @property {string} file
 * @property {Slot} slot
 * @property {string} route
 * @property {string} contentSubject
 * @property {string} visualSubject
 * @property {string} alt
 * @property {string} motif
 * @property {LabCategory} labCategory
 * @property {string} [aspectRatio]
 * @property {boolean} [photograph]
 */

/** @type {CatalogItem[]} */
const catalog = [
  { id: "90", file: "public/media/home/hero/wcda-home-hero-master-v01.png", slot: "page", route: "/", contentSubject: "Independent West Caldwell practice", visualSubject: "Cinematic treatment-room photograph of Dr. Matute with a patient", alt: "Dr. Jonnathan Matute examining a patient at West Caldwell Dental Arts", motif: "practice", labCategory: "home", aspectRatio: "16 / 9", photograph: true },
  { id: "91", file: "public/media/practice/about-approach.svg", slot: "page", route: "/about", contentSubject: "Care that starts with listening", visualSubject: "Quiet conversation / listening mark", alt: "Abstract mark suggesting a listening dental consultation", motif: "listening", labCategory: "about", aspectRatio: "4 / 3" },
  { id: "80", file: "public/media/technology/practice-technology.svg", slot: "page", route: "/technology", contentSubject: "Imaging and visit tools", visualSubject: "Conservative digital imaging concept", alt: "Simple illustration of conservative dental imaging technology", motif: "technology", labCategory: "technology", aspectRatio: "16 / 9" },
  { id: "50", file: "public/images/wcda/doctor/wcda-drmatute.png", slot: "portrait", route: "/about/dr-jonnathan-matute", contentSubject: "Dr. Jonnathan Matute, DMD", visualSubject: "Existing approved portrait", alt: "Dr. Jonnathan Matute, DMD", motif: "portrait", labCategory: "doctor", aspectRatio: "3 / 4", photograph: true },

  { id: "01", file: "public/media/services/preventive-general/category-hero.svg", slot: "category", route: "/services/preventive-general", contentSubject: "Preventive & General Dentistry", visualSubject: "Hygiene and exam shield", alt: "Illustration of preventive dental hygiene and exam care", motif: "shield", labCategory: "services" },
  { id: "92", file: "public/media/services/preventive-general/wcda-category-hero.png", slot: "category", route: "/services/preventive-general", contentSubject: "Preventive & General Dentistry", visualSubject: "Approved category photograph", alt: "Preventive and general dentistry at West Caldwell Dental Arts", motif: "practice", labCategory: "services", aspectRatio: "4 / 3", photograph: true },
  { id: "02", file: "public/media/services/family-children/category-hero.svg", slot: "category", route: "/services/family-children", contentSubject: "Family & Children's Dentistry", visualSubject: "Child-friendly care mark", alt: "Illustration of child-friendly family dental care", motif: "child", labCategory: "services" },
  { id: "03", file: "public/media/services/cosmetic/category-hero.svg", slot: "category", route: "/services/cosmetic", contentSubject: "Cosmetic Dentistry", visualSubject: "Even, healthy smile outline", alt: "Illustration of a calm cosmetic smile evaluation", motif: "sparkle", labCategory: "services" },
  { id: "04", file: "public/media/services/restorative/category-hero.svg", slot: "category", route: "/services/restorative", contentSubject: "Restorative & Tooth Replacement", visualSubject: "Restored tooth form", alt: "Illustration of a restored tooth form", motif: "crown", labCategory: "services" },
  { id: "05", file: "public/media/services/dental-implants/category-hero.svg", slot: "category", route: "/services/dental-implants", contentSubject: "Dental Implants", visualSubject: "Implant post and crown concept", alt: "Illustration of a dental implant supporting a crown", motif: "implant", labCategory: "services" },
  { id: "06", file: "public/media/services/root-canal/category-hero.svg", slot: "category", route: "/services/root-canal", contentSubject: "Root Canal & Tooth Preservation", visualSubject: "Tooth with roots, preservation context", alt: "Illustration of a tooth and roots in an endodontic context", motif: "roots", labCategory: "services" },
  { id: "07", file: "public/media/services/oral-surgery/category-hero.svg", slot: "category", route: "/services/oral-surgery", contentSubject: "Oral Surgery / Extractions", visualSubject: "Calm surgical planning mark", alt: "Illustration suggesting planned oral surgery in a calm clinical setting", motif: "extraction", labCategory: "services" },
  { id: "08", file: "public/media/services/clear-aligners/category-hero.svg", slot: "category", route: "/services/clear-aligners", contentSubject: "Clear Aligners", visualSubject: "Transparent aligner tray", alt: "Illustration of a clear dental aligner tray", motif: "aligner", labCategory: "services" },
  { id: "09", file: "public/media/services/oral-appliances/category-hero.svg", slot: "category", route: "/services/oral-appliances", contentSubject: "Oral Appliances / Bruxism", visualSubject: "Nightguard appliance", alt: "Illustration of a custom nightguard dental appliance", motif: "guard", labCategory: "services" },
  { id: "10", file: "public/media/services/periodontal/category-hero.svg", slot: "category", route: "/services/periodontal", contentSubject: "Periodontal / Gum Care", visualSubject: "Healthy gum contour", alt: "Illustration of healthy gum contour and periodontal evaluation", motif: "gums", labCategory: "services" },
  { id: "11", file: "public/media/services/minimally-invasive-biological/category-hero.svg", slot: "category", route: "/services/minimally-invasive-biological", contentSubject: "Minimally Invasive & Biological Dentistry", visualSubject: "Conservative technology mark", alt: "Illustration of conservative, technology-assisted dental care", motif: "biomimetic", labCategory: "services" },

  tx("home-care", "preventive-general", "Home Care", "Daily brushing and flossing guidance", "brush", false),
  tx("teeth-cleaning", "preventive-general", "Teeth Cleaning", "Preventive hygiene / cleaning context", "cleaning", true),
  tx("oral-cancer-screening", "preventive-general", "Oral Cancer Screening", "Soft-tissue screening context", "screening", false),
  tx("ortho-screenings", "preventive-general", "Ortho Screenings", "Growth and alignment screening", "exam", false),
  tx("sealants", "preventive-general", "Sealants", "Protective molar coating concept", "sealant", false),
  tx("adults-dentistry", "preventive-general", "Adult Dentistry", "Adult exam and maintenance", "exam", false),
  tx("fluoride", "preventive-general", "Fluoride", "Fluoride varnish / enamel support", "fluoride", false),
  tx("dental-exams", "preventive-general", "Dental Exams", "Comprehensive oral exam", "exam", false),
  tx("dental-x-rays", "preventive-general", "Dental X-Rays", "Diagnostic imaging when indicated", "xray", false),

  tx("teens-dentistry", "family-children", "Teen Dentistry", "Age-appropriate teen dental care", "child", false),
  tx("infant-oral-exams", "family-children", "Infant Oral Exams", "Gentle first dental visit", "child", false),
  tx("childrens-cleanings-exams", "family-children", "Children's Cleanings & Exams", "Child-friendly cleaning and exam", "child", true),
  tx("pediatric-x-rays", "family-children", "Pediatric X-Rays", "Child-sized imaging when needed", "xray", false),
  tx("sports-mouthguards", "family-children", "Sports Mouthguards", "Athletic mouth protection", "sports", false),

  tx("porcelain-veneers", "cosmetic", "Porcelain Veneers", "Porcelain veneer shade / facing concept", "veneer", true),
  tx("teeth-whitening", "cosmetic", "Teeth Whitening", "Professional shade evaluation", "sparkle", true),
  tx("botox", "cosmetic", "BOTOX", "Calm facial contour planning", "contour", false),
  tx("gum-contouring", "cosmetic", "Gum Contouring", "Gumline shape planning", "gums", false),
  tx("dental-bonding", "cosmetic", "Dental Bonding", "Conservative tooth-colored repair", "bonding", false),

  tx("restorative-dentistry", "restorative", "Restorative Dentistry", "Repairing damaged tooth form", "crown", false),
  tx("tooth-colored-fillings", "restorative", "Tooth-Colored Fillings", "Tooth-colored restoration", "filling", false),
  tx("composite-fillings", "restorative", "Composite Fillings", "Composite filling context", "filling", false),
  tx("porcelain-crowns", "restorative", "Porcelain Crowns", "Full-coverage porcelain crown", "crown", false),
  tx("onlays", "restorative", "Onlays", "Partial coverage onlay", "onlay", false),
  tx("porcelain-bridges", "restorative", "Porcelain Bridges", "Bridge replacing a missing tooth", "bridge", false),
  tx("dentures", "restorative", "Full or Partial Dentures", "Removable denture form", "denture", false),
  tx("inlays", "restorative", "Inlays", "Inlay within tooth cusps", "onlay", false),

  tx("implants", "dental-implants", "Implants", "Implant fixture and restoration", "implant", true),
  tx("implant-crowns", "dental-implants", "Implant Crowns", "Crown on an implant abutment", "implant", false),
  tx("implant-supported-dentures", "dental-implants", "Implant-Supported Dentures", "Denture supported by implants", "denture", false),

  tx("root-canals", "root-canal", "Root Canals", "Endodontic tooth-preservation concept", "roots", true),

  tx("tooth-extractions", "oral-surgery", "Tooth Extractions", "Planned tooth removal context", "extraction", true),
  tx("oral-surgery", "oral-surgery", "Oral Surgery", "Calm surgical visit planning", "extraction", false),
  tx("bone-grafting", "oral-surgery", "Bone Grafting", "Bone support concept", "bone", false),
  tx("wisdom-tooth-extraction", "oral-surgery", "Wisdom Tooth Extraction", "Third-molar planning", "extraction", false),

  tx("invisalign", "clear-aligners", "Invisalign", "Clear aligner tray on a model", "aligner", false),
  tx("clear-aligner-treatment", "clear-aligners", "Clear Aligner Treatment", "Transparent aligner planning", "aligner", false),
  tx("retainers", "clear-aligners", "Retainers", "Retainer holding alignment", "aligner", false),

  tx("oral-appliances", "oral-appliances", "Oral Appliances", "Custom protective appliance", "guard", true),
  tx("teeth-grinding", "oral-appliances", "Teeth Grinding", "Nightguard for bruxism", "guard", false),

  tx("periodontal-therapy", "periodontal", "Periodontal Therapy", "Gum and supporting-bone care", "gums", true),
  tx("scaling-root-planing", "periodontal", "Scaling and Root Planing", "Deep cleaning of root surfaces", "gums", false),

  tx("biomimetic-dentistry", "minimally-invasive-biological", "Biomimetic Dentistry", "Conserving natural tooth structure", "biomimetic", true),
  tx("dental-ozone", "minimally-invasive-biological", "Dental Ozone", "Ozone as adjunctive technology", "ozone", false),
  tx("air-abrasion", "minimally-invasive-biological", "Air Abrasion / No-Drill Cavity Repair", "Particle abrasion, no-drill concept", "air", false),
  tx("fotona-laser-dentistry", "minimally-invasive-biological", "Fotona Laser Dentistry", "Soft laser dentistry context", "laser", false),
  tx("nightlase", "minimally-invasive-biological", "NightLase", "Non-invasive airway-related laser context", "laser", false),
  tx("safe-amalgam-removal", "minimally-invasive-biological", "Safe Amalgam Removal / IAOMT Protocol", "Isolation-focused amalgam removal", "amalgam", false),
  tx("ceramic-implants", "minimally-invasive-biological", "Ceramic Implants", "Metal-free ceramic implant", "ceramic", false),
  tx("metal-free-dentistry", "minimally-invasive-biological", "Metal-Free Dentistry", "Ceramic restoration materials", "ceramic", false),
  tx("digital-cavity-detection", "minimally-invasive-biological", "Digital Cavity Detection", "Digital decay detection", "detect", false),
  tx("laser-dentistry", "minimally-invasive-biological", "Laser Dentistry", "Laser-assisted conservative care", "laser", false),

  tx("holistic-services", "advanced-holistic", "Holistic Services", "Deferred catalog placeholder, conservative mark", "biomimetic", false),
];

/**
 * @param {string} slug
 * @param {string} category
 * @param {string} title
 * @param {string} visual
 * @param {string} motif
 * @param {boolean} support
 */
function tx(slug, category, title, visual, motif, support) {
  const id = `tx-${slug}`;
  const items = [
    {
      id,
      file: `public/media/services/${category}/${slug}-hero.svg`,
      slot: "hero",
      route: `/services/${category}/${slug}`,
      contentSubject: title,
      visualSubject: visual,
      alt: `${title} — ${visual.toLowerCase()}`,
      motif,
      labCategory: "services",
      aspectRatio: "4 / 5",
    },
  ];
  if (support) {
    items.push({
      id: `${id}-support`,
      file: `public/media/services/${category}/${slug}-support.svg`,
      slot: "support",
      route: `/services/${category}/${slug}`,
      contentSubject: title,
      visualSubject: `${visual} (supporting view)`,
      alt: `Supporting illustration for ${title}`,
      motif: `${motif}-support`,
      labCategory: "services",
      aspectRatio: "4 / 3",
    });
  }
  return items;
}

const flat = catalog.flat();

function motifGroup(name) {
  const key = name.replace(/-support$/, "");
  const support = name.endsWith("-support");
  const icons = {
    practice: `<circle cx="800" cy="560" r="210" fill="none" stroke="${BLUE}" stroke-width="18"/><rect x="680" y="470" width="240" height="180" rx="28" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M740 470 V430 H860 V470" fill="none" stroke="${BLUE}" stroke-width="14" stroke-linejoin="round"/><circle cx="800" cy="560" r="18" fill="${BLUE}"/>`,
    listening: `<circle cx="640" cy="560" r="150" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><circle cx="960" cy="560" r="150" fill="none" stroke="${BLUE_SOFT}" stroke-width="14"/><path d="M790 560 H810" stroke="${BLUE}" stroke-width="18" stroke-linecap="round"/>`,
    technology: `<rect x="560" y="380" width="480" height="340" rx="36" fill="${SURFACE}" stroke="${BLUE}" stroke-width="16"/><rect x="620" y="440" width="360" height="180" rx="16" fill="${WARM}" stroke="${BLUE_SOFT}" stroke-width="10"/><path d="M700 530 H900 M700 580 H820" stroke="${BLUE}" stroke-width="12" stroke-linecap="round"/>`,
    shield: `<path d="M800 300 L1040 400 V620 C1040 760 800 860 800 860 C800 860 560 760 560 620 V400 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="16"/><path d="M800 430 V690" stroke="${BLUE}" stroke-width="14" stroke-linecap="round"/><path d="M700 560 H900" stroke="${BLUE_SOFT}" stroke-width="14" stroke-linecap="round"/>`,
    child: `<circle cx="800" cy="430" r="110" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M640 720 C640 590 960 590 960 720" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M760 430 Q800 470 840 430" fill="none" stroke="${BLUE_SOFT}" stroke-width="12" stroke-linecap="round"/>`,
    sparkle: `<path d="M800 320 C860 430 930 500 1040 560 C930 620 860 690 800 800 C740 690 670 620 560 560 C670 500 740 430 800 320 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="16"/><path d="M800 430 V690 M680 560 H920" stroke="${BLUE_SOFT}" stroke-width="12" stroke-linecap="round"/>`,
    crown: `<path d="M640 430 L690 620 H910 L960 430 L860 500 L800 390 L740 500 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14" stroke-linejoin="round"/><rect x="690" y="620" width="220" height="90" rx="16" fill="${WARM}" stroke="${BLUE}" stroke-width="14"/>`,
    implant: `<rect x="770" y="340" width="60" height="160" rx="10" fill="${BLUE}"/><path d="M800 500 L800 760" stroke="${BLUE}" stroke-width="28" stroke-linecap="round"/><path d="M760 560 L840 560 M750 620 L850 620 M760 680 L840 680" stroke="${BLUE_SOFT}" stroke-width="10" stroke-linecap="round"/><path d="M700 340 H900 L860 500 H740 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="12"/>`,
    roots: `<path d="M720 340 H880 C910 340 920 380 900 420 L840 520 V640 C840 720 800 820 800 820 C800 820 760 720 760 640 V520 L700 420 C680 380 690 340 720 340 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M760 520 L730 700 M840 520 L870 700" fill="none" stroke="${BLUE_SOFT}" stroke-width="12" stroke-linecap="round"/>`,
    extraction: `<circle cx="800" cy="560" r="220" fill="none" stroke="${BLUE}" stroke-width="12" opacity="0.35"/><path d="M740 360 C780 340 820 340 860 360 L880 500 C840 540 760 540 720 500 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M760 500 V700 M840 500 V700" stroke="${BLUE_SOFT}" stroke-width="12" stroke-linecap="round"/>`,
    aligner: `<ellipse cx="800" cy="560" rx="280" ry="120" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><ellipse cx="800" cy="530" rx="230" ry="70" fill="none" stroke="${BLUE_SOFT}" stroke-width="10"/><path d="M580 560 Q800 640 1020 560" fill="none" stroke="${BLUE}" stroke-width="12"/>`,
    guard: `<path d="M560 500 Q800 420 1040 500 L1000 640 Q800 700 600 640 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M620 540 Q800 490 980 540" fill="none" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    gums: `<path d="M560 640 Q800 500 1040 640 L1040 760 Q800 680 560 760 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M680 420 C700 520 720 560 740 640 M800 390 C800 520 800 560 800 640 M920 420 C900 520 880 560 860 640" fill="none" stroke="${BLUE_SOFT}" stroke-width="14" stroke-linecap="round"/>`,
    biomimetic: `<circle cx="800" cy="560" r="200" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M800 400 C880 480 880 640 800 720 C720 640 720 480 800 400 Z" fill="none" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    brush: `<rect x="760" y="360" width="80" height="360" rx="18" fill="${SURFACE}" stroke="${BLUE}" stroke-width="12"/><path d="M760 360 H840 V300 H760 Z" fill="${BLUE_SOFT}"/><path d="M740 300 H860" stroke="${BLUE}" stroke-width="10"/>`,
    cleaning: `<ellipse cx="800" cy="620" rx="260" ry="90" fill="${SURFACE}" stroke="${BLUE}" stroke-width="12"/><path d="M640 420 C720 520 880 520 960 420" fill="none" stroke="${BLUE_SOFT}" stroke-width="16" stroke-linecap="round"/>`,
    screening: `<circle cx="800" cy="500" r="140" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M900 600 L1020 740" stroke="${BLUE}" stroke-width="18" stroke-linecap="round"/>`,
    exam: `<rect x="620" y="400" width="360" height="280" rx="24" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><circle cx="800" cy="540" r="70" fill="none" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    sealant: `<path d="M700 360 H900 L860 720 H740 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M760 480 H840 M750 560 H850 M760 640 H840" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    fluoride: `<circle cx="800" cy="560" r="180" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M800 420 C860 500 860 620 800 700 C740 620 740 500 800 420 Z" fill="${BLUE_SOFT}" opacity="0.35"/>`,
    xray: `<rect x="580" y="380" width="440" height="360" rx="20" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M700 460 V660 M800 460 V660 M900 460 V660" stroke="${BLUE_SOFT}" stroke-width="10"/><circle cx="800" cy="560" r="40" fill="none" stroke="${BLUE}" stroke-width="10"/>`,
    sports: `<path d="M560 560 Q800 360 1040 560 Q800 760 560 560 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M680 560 H920" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    veneer: `<path d="M740 360 C790 340 810 340 860 360 L890 620 C840 680 760 680 710 620 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M760 400 C800 390 820 390 850 400" fill="none" stroke="${BLUE_SOFT}" stroke-width="10"/>`,
    contour: `<path d="M680 380 Q800 320 920 380 Q980 560 800 780 Q620 560 680 380 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M720 500 Q800 470 880 500" fill="none" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    bonding: `<path d="M720 360 H880 L900 700 H700 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M760 480 Q800 520 840 480" fill="none" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    filling: `<path d="M700 360 H900 L870 720 H730 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><circle cx="800" cy="560" r="70" fill="${WARM}" stroke="${BLUE_SOFT}" stroke-width="10"/>`,
    onlay: `<path d="M680 420 H920 L880 700 H720 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M720 500 H880 V620 H720 Z" fill="${WARM}" stroke="${BLUE_SOFT}" stroke-width="10"/>`,
    bridge: `<rect x="560" y="500" width="140" height="180" rx="16" fill="${SURFACE}" stroke="${BLUE}" stroke-width="12"/><rect x="900" y="500" width="140" height="180" rx="16" fill="${SURFACE}" stroke="${BLUE}" stroke-width="12"/><rect x="700" y="470" width="200" height="80" rx="16" fill="${BLUE_SOFT}"/>`,
    denture: `<ellipse cx="800" cy="600" rx="300" ry="110" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M560 600 Q800 500 1040 600" fill="none" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    bone: `<path d="M700 360 C760 360 780 420 800 500 C820 420 840 360 900 360 C960 360 980 520 900 720 C840 780 760 780 700 720 C620 520 640 360 700 360 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/>`,
    ozone: `<circle cx="720" cy="520" r="70" fill="${SURFACE}" stroke="${BLUE}" stroke-width="10"/><circle cx="880" cy="500" r="90" fill="none" stroke="${BLUE_SOFT}" stroke-width="10"/><circle cx="800" cy="660" r="60" fill="${WARM}" stroke="${BLUE}" stroke-width="10"/>`,
    air: `<path d="M560 560 H900" stroke="${BLUE}" stroke-width="16" stroke-linecap="round"/><path d="M860 500 L960 560 L860 620" fill="none" stroke="${BLUE_SOFT}" stroke-width="14" stroke-linejoin="round"/><circle cx="640" cy="500" r="16" fill="${BLUE}"/><circle cx="700" cy="620" r="12" fill="${BLUE_SOFT}"/>`,
    laser: `<path d="M560 560 H1040" stroke="${BLUE}" stroke-width="8"/><circle cx="800" cy="560" r="18" fill="${BLUE}"/><path d="M800 360 L800 760" stroke="${BLUE_SOFT}" stroke-width="8" opacity="0.6"/>`,
    amalgam: `<rect x="640" y="400" width="320" height="320" rx="28" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><path d="M700 480 H900 M700 560 H900 M700 640 H820" stroke="${BLUE_SOFT}" stroke-width="12"/>`,
    ceramic: `<path d="M800 340 L980 620 H620 Z" fill="${SURFACE}" stroke="${BLUE}" stroke-width="14"/><circle cx="800" cy="560" r="40" fill="${WARM}" stroke="${BLUE_SOFT}" stroke-width="8"/>`,
    detect: `<circle cx="800" cy="560" r="160" fill="none" stroke="${BLUE}" stroke-width="14"/><circle cx="800" cy="560" r="40" fill="${BLUE}"/><path d="M920 680 L1040 800" stroke="${BLUE_SOFT}" stroke-width="16" stroke-linecap="round"/>`,
  };
  const body = icons[key] ?? icons.exam;
  const offset = support ? ` transform="translate(0 24) scale(0.92)" transform-origin="800 560"` : "";
  return `<g${offset}>${body}</g>`;
}

function svgFor(item) {
  const wide = item.aspectRatio === "16 / 9";
  const portrait = item.aspectRatio === "4 / 5" || item.aspectRatio === "3 / 4";
  const w = wide ? 1600 : portrait ? 1200 : 1600;
  const h = wide ? 900 : portrait ? 1500 : 1200;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true">
  <rect width="100%" height="100%" fill="${WARM}"/>
  <circle cx="${w * 0.18}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.28}" fill="${BLUE}" opacity="0.05"/>
  <circle cx="${w * 0.86}" cy="${h * 0.78}" r="${Math.min(w, h) * 0.32}" fill="${BLUE_SOFT}" opacity="0.06"/>
  <rect x="${w * 0.08}" y="${h * 0.08}" width="${w * 0.84}" height="${h * 0.84}" rx="48" fill="none" stroke="${BLUE}" stroke-width="3" opacity="0.18"/>
  <g transform="translate(${(w - 1600) / 2} ${(h - 1200) / 2})">
    ${motifGroup(item.motif)}
  </g>
</svg>
`;
}

function toTs() {
  const rows = flat.map((item) => {
    const src = `/${item.file.replace(/^public\//, "")}`;
    const status = item.photograph ? "approved" : "generated";
    const ownerApproved = Boolean(item.photograph);
    return `  {
    id: ${JSON.stringify(item.id)},
    slot: ${JSON.stringify(item.slot)},
    route: ${JSON.stringify(item.route)},
    src: ${JSON.stringify(src)},
    alt: ${JSON.stringify(item.alt)},
    contentSubject: ${JSON.stringify(item.contentSubject)},
    visualSubject: ${JSON.stringify(item.visualSubject)},
    status: ${JSON.stringify(status)},
    sourceType: ${JSON.stringify(item.photograph ? "photograph" : "illustration")},
    ownerApproved: ${ownerApproved},
    labCategory: ${JSON.stringify(item.labCategory)},
    aspectRatio: ${JSON.stringify(item.aspectRatio ?? "4 / 3")},
    kind: ${JSON.stringify(item.motif === "portrait" ? "portrait" : "image")},
  }`;
  });
  return `/* Generated by scripts/generate-wcda-media.mjs — do not edit by hand. */

export type MediaManifestSlot = "hero" | "support" | "category" | "page" | "portrait";
export type MediaManifestStatus = "generated" | "candidate" | "approved" | "replace";
export type MediaSourceType = "photograph" | "illustration";
export type MediaLabCategory = "home" | "doctor" | "services" | "technology" | "about";

export type MediaManifestEntry = {
  id: string;
  slot: MediaManifestSlot;
  route: string;
  src: string;
  alt: string;
  contentSubject: string;
  visualSubject: string;
  status: MediaManifestStatus;
  sourceType: MediaSourceType;
  ownerApproved: boolean;
  labCategory: MediaLabCategory;
  aspectRatio: string;
  kind: "image" | "portrait";
};

export const mediaManifest = [
${rows.join(",\n")},
] as const satisfies readonly MediaManifestEntry[];
`;
}

for (const item of flat) {
  if (item.photograph) continue;
  const abs = join(root, item.file);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, svgFor(item));
}

writeFileSync(join(root, "src/config/media-manifest.generated.ts"), toTs());
console.log(`wrote ${flat.filter((item) => !item.photograph).length} svg files and media-manifest.generated.ts`);
