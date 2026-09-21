import {
  pickExperienceValues,
  wcdaFactoryExperience,
  HOME_PRACTICE_BADGE_CENTER_KEY,
  badgeCenterGraphicFillPercent,
  graphicSizeFromBadgeCenterFillPercent,
  updateEditorialIconItem,
  type ExperienceValues,
} from "@/config/experience";
import { pickThemeValues, wcdaFactoryTheme } from "@/config/theme";
import {
  resolvePageSectionFlag,
  setPageSectionEnabled,
  type ContentPublicationPatch,
} from "@/config/content-publication";
import {
  mergeElementIntoCurrent,
  mergeSectionPublicationIntoCurrent,
  mergeSectionVisualIntoCurrent,
  mergeSystemFamilyIntoCurrent,
  listPendingCustomScopes,
} from "@/config/lab-scoped-merge";
import { labPages } from "@/config/lab-registry";
import {
  applyContentSlice,
  approvedSiteContent,
  clearContentSlice,
  CONTENT_FIELD_IDS,
  contentAppliedNotCurrent,
  contentLiveUnsaved,
  dirtyContentFieldIds,
  HOME_PRACTICE_FIELD_IDS,
  listPendingContentScopes,
  pickSiteContentPatch,
  resolveHomePractice,
  resolveHomeWhyChoose,
} from "@/config/site-content";
import { applyElementSlice } from "@/config/lab-section-state";
import {
  elementScopedColorKey,
  resolveScopedElementFill,
  scopedElementFillCss,
} from "@/config/scoped-colors";

function cloneExp(value: ExperienceValues) {
  return pickExperienceValues(value);
}

function fail(message: string): never {
  throw new Error(message);
}

function run() {
  const currentTheme = pickThemeValues(wcdaFactoryTheme);
  const currentExp = cloneExp(wcdaFactoryExperience);
  const customTheme = pickThemeValues({
    ...currentTheme,
    headingScale: 1.12,
    headerBackground: "#112233",
  });
  const doctor = currentExp.components["home.doctor"];
  const hero = currentExp.components["home.hero"];
  if (!doctor || !hero) {
    fail("factory slots missing");
  }
  const customExp = cloneExp({
    ...currentExp,
    components: {
      ...currentExp.components,
      "home.doctor": { ...doctor, scale: 1.25 },
      "home.hero": { ...hero, scale: 1.18 },
    },
  });
  const currentPub: ContentPublicationPatch = {
    pages: { home: { sections: { contact: false, hero: true } } },
  };
  const customPub: ContentPublicationPatch = setPageSectionEnabled(
    currentPub,
    "home",
    "contact",
    true,
  );

  const promotedDoctor = mergeElementIntoCurrent(
    currentTheme,
    currentExp,
    customExp,
    "home-doctor-media",
  );
  if (promotedDoctor.experience.components["home.doctor"].scale !== 1.25) {
    fail("doctor scale was not promoted");
  }
  if (promotedDoctor.experience.components["home.hero"].scale !== hero.scale) {
    fail("hero scale leaked into element promote");
  }
  if (promotedDoctor.theme.headingScale !== currentTheme.headingScale) {
    fail("typography leaked into element promote");
  }

  const home = labPages.find((page) => page.id === "home");
  const location = home?.sections.find((section) => section.id === "contact");
  if (!home || !location) {
    fail("home location section missing");
  }
  const promotedLocation = mergeSectionPublicationIntoCurrent(
    currentPub,
    customPub,
    "home",
    "contact",
  );
  if (resolvePageSectionFlag(promotedLocation, "home", "contact") !== true) {
    fail("location section was not promoted");
  }
  if (resolvePageSectionFlag(promotedLocation, "home", "hero") !== true) {
    fail("unrelated home section publication changed");
  }

  const heroContent = currentExp.components["home.heroContent"];
  if (!heroContent) {
    fail("hero content slot missing");
  }
  const customWithHeroContent = cloneExp({
    ...customExp,
    components: {
      ...customExp.components,
      "home.heroContent": {
        ...heroContent,
        layoutOffsetX: 18,
        layoutOffsetY: -24,
        layoutMaxWidth: 30,
      },
    },
  });

  const promotedHeroContent = mergeElementIntoCurrent(
    currentTheme,
    currentExp,
    customWithHeroContent,
    "home-hero-content",
  );
  if (promotedHeroContent.experience.components["home.heroContent"].layoutOffsetY !== -24) {
    fail("hero content offset was not promoted");
  }
  if (promotedHeroContent.experience.components["home.hero"].scale !== hero.scale) {
    fail("hero media leaked into hero content promote");
  }

  const promotedHeroMedia = mergeElementIntoCurrent(
    currentTheme,
    currentExp,
    customWithHeroContent,
    "home-hero-media",
  );
  if (promotedHeroMedia.experience.components["home.hero"].scale !== 1.18) {
    fail("hero media scale was not promoted");
  }
  if (
    promotedHeroMedia.experience.components["home.heroContent"].layoutOffsetY !==
    heroContent.layoutOffsetY
  ) {
    fail("hero content leaked into hero media promote");
  }

  const promotedHeroSection = mergeSectionVisualIntoCurrent(
    currentTheme,
    currentExp,
    customWithHeroContent,
    home.sections.find((section) => section.id === "hero")!,
  );
  if (promotedHeroSection.experience.components["home.hero"].scale !== 1.18) {
    fail("hero section visual was not promoted");
  }
  if (promotedHeroSection.experience.components["home.heroContent"].layoutOffsetY !== -24) {
    fail("hero section did not promote hero content");
  }
  if (promotedHeroSection.experience.components["home.doctor"].scale !== doctor.scale) {
    fail("doctor leaked into hero section promote");
  }

  const promotedHeader = mergeSystemFamilyIntoCurrent(
    "header",
    currentTheme,
    currentExp,
    customTheme,
    customExp,
  );
  if (promotedHeader.theme.headerBackground !== "#112233") {
    fail("header background was not promoted");
  }
  if (promotedHeader.theme.headingScale !== currentTheme.headingScale) {
    fail("typography leaked into header promote");
  }

  const promotedType = mergeSystemFamilyIntoCurrent(
    "typography",
    currentTheme,
    currentExp,
    customTheme,
    customExp,
  );
  if (promotedType.theme.headingScale !== 1.12) {
    fail("typography was not promoted");
  }
  if (promotedType.theme.headerBackground !== currentTheme.headerBackground) {
    fail("header leaked into typography promote");
  }

  const customWithColors = cloneExp({
    ...customExp,
    scopedColors: {
      pages: { home: "#EFE3D5", about: "#111111" },
      sections: { "home/whyChoose": "#E8DDD2" },
      elements: { "home-care-areas": "#D9CDBF", "home-cta": "#CCCCCC" },
    },
  });
  const customThemeSurfaces = pickThemeValues({
    ...currentTheme,
    pageBackground: "#F2E8DC",
  });
  const promotedSurfaces = mergeSystemFamilyIntoCurrent(
    "surfaces",
    currentTheme,
    currentExp,
    customThemeSurfaces,
    customWithColors,
  );
  if (promotedSurfaces.theme.pageBackground !== "#F2E8DC") {
    fail("global page background was not promoted");
  }
  if (promotedSurfaces.experience.scopedColors?.pages?.home) {
    fail("system surfaces leaked page color overrides");
  }
  if (promotedSurfaces.experience.scopedColors?.elements?.["home-care-areas"]) {
    fail("system surfaces leaked element colors");
  }

  const promotedCareCard = mergeElementIntoCurrent(
    currentTheme,
    currentExp,
    customWithColors,
    "home-care-areas",
  );
  if (
    promotedCareCard.experience.scopedColors?.elements?.["home-care-areas"] !==
    "#D9CDBF"
  ) {
    fail("element color was not promoted");
  }
  if (promotedCareCard.experience.scopedColors?.elements?.["home-cta"]) {
    fail("sibling element color leaked");
  }
  if (promotedCareCard.experience.scopedColors?.pages?.home) {
    fail("page color leaked into element promote");
  }

  const approach = home.sections.find((section) => section.id === "whyChoose");
  if (!approach) {
    fail("home whyChoose section missing");
  }
  const promotedApproach = mergeSectionVisualIntoCurrent(
    currentTheme,
    currentExp,
    customWithColors,
    approach,
    "home",
  );
  if (
    promotedApproach.experience.scopedColors?.sections?.["home/whyChoose"] !==
    "#E8DDD2"
  ) {
    fail("section color was not promoted");
  }
  if (promotedApproach.experience.scopedColors?.pages?.home) {
    fail("page color leaked into section promote");
  }
  if (promotedApproach.experience.scopedColors?.elements?.["home-cta"]) {
    fail("unrelated element color leaked into section promote");
  }

  const currentContent = pickSiteContentPatch(approvedSiteContent);
  const contentPub: ContentPublicationPatch = {};
  const falseUnsaved = listPendingCustomScopes(
    currentTheme,
    currentExp,
    contentPub,
    currentTheme,
    currentExp,
    contentPub,
    {},
    currentContent,
    currentContent,
  );
  if (falseUnsaved.some((item) => item.id === "copy:home.hero")) {
    fail("sparse working inherit of custom/current must not report Content unsaved");
  }

  const headingWorking = { "home.hero.heading": "Temp diagnostic heading" };
  const realUnsaved = listPendingCustomScopes(
    currentTheme,
    currentExp,
    contentPub,
    currentTheme,
    currentExp,
    contentPub,
    headingWorking,
    currentContent,
    currentContent,
  );
  if (!realUnsaved.some((item) => item.id === "copy:home.hero")) {
    fail("working heading overlay must report Content unsaved");
  }

  const dirtyIds = dirtyContentFieldIds(
    CONTENT_FIELD_IDS,
    headingWorking,
    currentContent,
    currentContent,
  );
  if (dirtyIds.length !== 1 || dirtyIds[0] !== "home.hero.heading") {
    fail("only the overlay heading should be dirty");
  }

  const appliedCustom = applyContentSlice(
    currentContent,
    headingWorking,
    dirtyIds,
    currentContent,
  );
  const appliedWorking = clearContentSlice(headingWorking, CONTENT_FIELD_IDS);
  if (
    contentLiveUnsaved(
      CONTENT_FIELD_IDS,
      appliedWorking,
      appliedCustom,
      currentContent,
    )
  ) {
    fail("apply must clear semantic Content unsaved");
  }
  if (
    !contentAppliedNotCurrent(
      CONTENT_FIELD_IDS,
      appliedWorking,
      appliedCustom,
      currentContent,
    )
  ) {
    fail("applied heading must be ready to publish");
  }
  if (listPendingContentScopes(appliedWorking, appliedCustom, currentContent).length) {
    fail("aggregate Content pending must disappear after apply");
  }

  const descriptionWorking = {
    "home.hero.description": "Temp diagnostic description",
  };
  const dirtyDescription = dirtyContentFieldIds(
    CONTENT_FIELD_IDS,
    descriptionWorking,
    appliedCustom,
    currentContent,
  );
  if (
    dirtyDescription.length !== 1 ||
    dirtyDescription[0] !== "home.hero.description"
  ) {
    fail("apply-all must target only the dirty Content field");
  }
  const appliedAllCustom = applyContentSlice(
    appliedCustom,
    descriptionWorking,
    dirtyDescription,
    currentContent,
  );
  const appliedAllWorking = clearContentSlice(
    descriptionWorking,
    CONTENT_FIELD_IDS,
  );
  if (
    contentLiveUnsaved(
      CONTENT_FIELD_IDS,
      appliedAllWorking,
      appliedAllCustom,
      currentContent,
    )
  ) {
    fail("apply-all must clear semantic Content unsaved");
  }
  if (
    listPendingContentScopes(appliedAllWorking, appliedAllCustom, currentContent)
      .length
  ) {
    fail("aggregate Content pending must disappear after apply-all");
  }

  const homeServices = currentExp.components["home.services"];
  const servicesCards = currentExp.components["services.cards"];
  if (!homeServices || !servicesCards) {
    fail("care card slots missing");
  }
  const customWithCardMedia = cloneExp({
    ...currentExp,
    components: {
      ...currentExp.components,
      "home.services": {
        ...homeServices,
        scale: 1.35,
        itemMedia: {
          "preventive-general": {
            scale: 1.2,
            positionX: 18,
            positionY: 82,
            panX: 20,
            panY: -8,
          },
          cosmetic: {
            scale: 1.45,
            positionX: 8,
            positionY: 12,
          },
        },
      },
      "services.cards": {
        ...servicesCards,
        itemMedia: {
          "preventive-general": {
            scale: 1.15,
            positionX: 70,
            positionY: 30,
          },
        },
      },
    },
  });
  const appliedHomeCard = applyElementSlice(
    "home-care-areas",
    currentExp,
    customWithCardMedia,
    "preventive-general",
  );
  if (
    appliedHomeCard.components["home.services"].itemMedia?.[
      "preventive-general"
    ]?.positionX !== 18 ||
    appliedHomeCard.components["home.services"].itemMedia?.[
      "preventive-general"
    ]?.positionY !== 82 ||
    appliedHomeCard.components["home.services"].itemMedia?.[
      "preventive-general"
    ]?.scale !== 1.2 ||
    appliedHomeCard.components["home.services"].itemMedia?.[
      "preventive-general"
    ]?.panX !== 20 ||
    appliedHomeCard.components["home.services"].itemMedia?.[
      "preventive-general"
    ]?.panY !== -8
  ) {
    fail("selected home service card media position was not applied");
  }
  if (appliedHomeCard.components["home.services"].itemMedia?.cosmetic) {
    fail("sibling home service card media leaked");
  }
  if (appliedHomeCard.components["home.services"].scale !== homeServices.scale) {
    fail("slot-wide scale leaked from per-item home apply");
  }
  const promotedHomeCard = mergeElementIntoCurrent(
    currentTheme,
    currentExp,
    customWithCardMedia,
    "home-care-areas",
    "preventive-general",
  );
  if (
    promotedHomeCard.experience.components["home.services"].itemMedia?.[
      "preventive-general"
    ]?.positionX !== 18
  ) {
    fail("selected home service card media was not published");
  }
  if (promotedHomeCard.experience.components["home.services"].itemMedia?.cosmetic) {
    fail("sibling home service card media leaked on publish");
  }
  const appliedServicesCard = applyElementSlice(
    "services-care-cards",
    currentExp,
    customWithCardMedia,
    "preventive-general",
  );
  if (
    appliedServicesCard.components["services.cards"].itemMedia?.[
      "preventive-general"
    ]?.positionX !== 70
  ) {
    fail("selected services card media position was not applied");
  }
  if (
    appliedServicesCard.components["services.cards"].scale !==
    servicesCards.scale
  ) {
    fail("slot-wide scale leaked from per-item services apply");
  }

  const instanceKey = "editorial-cards__west-caldwell-community";
  const siblingInstanceKey = "editorial-cards__independent-ownership";
  const customWithInstanceColor = cloneExp({
    ...currentExp,
    scopedColors: {
      elements: {
        "editorial-cards": "#F1F0EF",
        [instanceKey]: "#AABBCC",
        [siblingInstanceKey]: "#112233",
        "home-care-areas": "#D9CDBF",
      },
    },
  });
  const appliedInstanceColor = applyElementSlice(
    "editorial-cards",
    currentExp,
    customWithInstanceColor,
    "west-caldwell-community",
  );
  if (appliedInstanceColor.scopedColors?.elements?.[instanceKey] !== "#AABBCC") {
    fail("instance color was not applied");
  }
  if (
    appliedInstanceColor.scopedColors?.elements?.["editorial-cards"] !==
    currentExp.scopedColors?.elements?.["editorial-cards"]
  ) {
    fail("family color leaked from instance apply");
  }
  if (appliedInstanceColor.scopedColors?.elements?.[siblingInstanceKey]) {
    fail("sibling instance color leaked from instance apply");
  }
  if (appliedInstanceColor.scopedColors?.elements?.["home-care-areas"]) {
    fail("unrelated family color leaked from instance apply");
  }
  const restoredInstanceColor = applyElementSlice(
    "editorial-cards",
    customWithInstanceColor,
    currentExp,
    "west-caldwell-community",
  );
  if (restoredInstanceColor.scopedColors?.elements?.[instanceKey]) {
    fail("instance restore current did not remove missing approved key");
  }
  if (
    restoredInstanceColor.scopedColors?.elements?.["editorial-cards"] !==
    "#F1F0EF"
  ) {
    fail("family color was altered by instance restore current");
  }
  if (
    restoredInstanceColor.scopedColors?.elements?.[siblingInstanceKey] !==
    "#112233"
  ) {
    fail("sibling instance color was altered by instance restore current");
  }
  const familyApply = applyElementSlice(
    "editorial-cards",
    currentExp,
    customWithInstanceColor,
  );
  if (familyApply.scopedColors?.elements?.["editorial-cards"] !== "#F1F0EF") {
    fail("family color was not applied");
  }
  if (familyApply.scopedColors?.elements?.[instanceKey]) {
    fail("instance color leaked from family apply");
  }
  if (
    elementScopedColorKey("editorial-cards", "west-caldwell-community") !==
    instanceKey
  ) {
    fail("instance key format is wrong");
  }
  if (
    resolveScopedElementFill(
      customWithInstanceColor.scopedColors,
      "editorial-cards",
      "west-caldwell-community",
    ) !== "#AABBCC"
  ) {
    fail("instance fill did not win over family");
  }
  if (
    resolveScopedElementFill(
      customWithInstanceColor.scopedColors,
      "editorial-cards",
      "clear-next-steps",
    ) !== "#F1F0EF"
  ) {
    fail("missing instance did not fall back to family");
  }
  const css = scopedElementFillCss(customWithInstanceColor.scopedColors);
  const familySelector = 'html [data-visual-target="editorial-cards"]{';
  const instanceSelector =
    'html [data-visual-target="editorial-cards"][data-lab-item-id="west-caldwell-community"]{';
  if (!css.includes(familySelector)) {
    fail("family CSS selector missing");
  }
  if (!css.includes(instanceSelector)) {
    fail("instance CSS selector missing");
  }
  if (css.indexOf(instanceSelector) < css.indexOf(familySelector)) {
    fail("instance CSS must follow family CSS");
  }

  if (badgeCenterGraphicFillPercent(undefined) !== 32) {
    fail("unset badge graphic size must keep the unset badge overlay size");
  }
  if (badgeCenterGraphicFillPercent(48) !== 22) {
    fail("graphicSize 48 must map to 22% of badge");
  }
  if (badgeCenterGraphicFillPercent(96) !== 68) {
    fail("graphicSize 96 must map to 68% of badge");
  }
  if (graphicSizeFromBadgeCenterFillPercent(22) !== 48) {
    fail("22% badge overlay must store graphicSize 48");
  }
  if (graphicSizeFromBadgeCenterFillPercent(68) !== 96) {
    fail("68% badge overlay must store graphicSize 96");
  }
  const siblingGraphicSize =
    currentExp.editorialIcons.items?.["west-caldwell-community"]?.graphicSize;
  const customBadgeSize = updateEditorialIconItem(
    currentExp,
    HOME_PRACTICE_BADGE_CENTER_KEY,
    { graphicSize: 96 },
  );
  if (
    customBadgeSize.editorialIcons.items?.["west-caldwell-community"]
      ?.graphicSize !== siblingGraphicSize
  ) {
    fail("badge graphicSize mutated a sibling editorial icon");
  }
  const appliedBadgeSize = applyElementSlice(
    "editorial-cards",
    currentExp,
    customBadgeSize,
    HOME_PRACTICE_BADGE_CENTER_KEY,
  );
  if (
    appliedBadgeSize.editorialIcons.items?.[HOME_PRACTICE_BADGE_CENTER_KEY]
      ?.graphicSize !== 96
  ) {
    fail("badge center graphicSize was not applied for this itemKey");
  }
  if (
    appliedBadgeSize.editorialIcons.items?.["west-caldwell-community"]
      ?.graphicSize !== siblingGraphicSize
  ) {
    fail("sibling graphicSize leaked from badge-center apply");
  }
  if (
    JSON.stringify(appliedBadgeSize.scopedColors) !==
    JSON.stringify(currentExp.scopedColors)
  ) {
    fail("badge graphicSize apply mutated scopedColors");
  }

  const practiceBaseline = resolveHomePractice(currentContent);
  const practiceWorking = { "home.practice.title": "Temp practice title" };
  const practiceDirty = dirtyContentFieldIds(
    CONTENT_FIELD_IDS,
    practiceWorking,
    currentContent,
    currentContent,
  );
  if (
    practiceDirty.length !== 1 ||
    practiceDirty[0] !== "home.practice.title"
  ) {
    fail("practice title overlay leaked into other content fields");
  }
  if (resolveHomePractice(practiceWorking).title !== "Temp practice title") {
    fail("practice title overlay was not applied");
  }
  if (resolveHomePractice(practiceWorking).eyebrow !== practiceBaseline.eyebrow) {
    fail("practice title overlay changed eyebrow");
  }
  if (
    JSON.stringify(resolveHomePractice(practiceWorking).paragraphs) !==
    JSON.stringify(practiceBaseline.paragraphs)
  ) {
    fail("practice title overlay changed body paragraphs");
  }
  const practiceApplied = applyContentSlice(
    currentContent,
    practiceWorking,
    HOME_PRACTICE_FIELD_IDS,
    currentContent,
  );
  if (practiceApplied["home.hero.heading"] !== currentContent["home.hero.heading"]) {
    fail("practice apply mutated hero content");
  }
  if (
    resolveHomeWhyChoose(practiceApplied).items[0]?.title !==
    resolveHomeWhyChoose(currentContent).items[0]?.title
  ) {
    fail("practice apply mutated why-choose copy");
  }
  const practicePending = listPendingContentScopes(
    practiceWorking,
    currentContent,
    currentContent,
  );
  if (!practicePending.some((item) => item.id === "copy:home.practice")) {
    fail("practice working overlay must report Content unsaved");
  }

  console.log("lab scoped merge selftest: pass");
}

run();
