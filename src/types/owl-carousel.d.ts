declare module "owl.carousel";

interface JQuery {
  owlCarousel(options?: Record<string, unknown>): JQuery;
}

interface Window {
  $: JQueryStatic;
  jQuery: JQueryStatic;
}
