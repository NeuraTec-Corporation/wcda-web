import type { LabLanguage } from "@/config/lab-ui";
import type { ContainerPresetId, VisualTargetId } from "@/config/experience";
import type { PreviewPagePath } from "@/config/theme";

export type { LabLanguage };

export type Bi = { en: string; es: string };

export function labText(value: Bi, language: LabLanguage) {
  return value[language];
}

export type LabControlLayer = "theme" | "experience" | "lab" | "content";
export type LabControlCategory =
  | "brand"
  | "colors"
  | "typography"
  | "media"
  | "position"
  | "containers"
  | "motion"
  | "effects"
  | "content"
  | "recovery"
  | "approval"
  | "chrome";

export type LabControlId =
  | "color-primary"
  | "color-cta"
  | "color-ctaHover"
  | "color-navHover"
  | "color-secondary"
  | "color-accent"
  | "color-background"
  | "color-surface"
  | "color-surfaceMuted"
  | "color-surfaceStrong"
  | "color-foreground"
  | "color-muted"
  | "color-border"
  | "color-pick"
  | "color-hex"
  | "color-apply"
  | "font-heading"
  | "font-body"
  | "slider-headingScale"
  | "slider-bodyScale"
  | "slider-radius"
  | "slider-shadowIntensity"
  | "slider-cardDensity"
  | "slider-sectionSpacing"
  | "slider-contentWidth"
  | "slider-headerDensity"
  | "slider-navHalo"
  | "slider-navHaloActive"
  | "slider-chromeWarmth"
  | "slider-headerBackground"
  | "slider-footerBackground"
  | "preset-factory"
  | "preset-current"
  | "preset-designer"
  | "preset-inspired"
  | "preset-custom"
  | "preview-page"
  | "selected-element"
  | "viewport"
  | "recovery-undo"
  | "recovery-load-current"
  | "recovery-load-factory"
  | "recovery-load-inspired"
  | "recovery-apply"
  | "recovery-reset-all"
  | "recovery-copy-theme"
  | "recovery-copy-experience"
  | "section-apply"
  | "section-reset"
  | "content-page-active"
  | "content-page-status"
  | "content-section-active"
  | "content-category-active"
  | "content-treatment-active"
  | "content-treatment-section-active"
  | "media-asset"
  | "media-scale"
  | "media-x"
  | "media-y"
  | "media-fit"
  | "media-size"
  | "media-logo-width"
  | "media-padding"
  | "media-align"
  | "media-preview-bg"
  | "media-style"
  | "media-aspect"
  | "media-radius"
  | "media-overlay"
  | "container-preset"
  | "container-circle-size"
  | "container-surface-intensity"
  | "motion-entrance"
  | "motion-duration"
  | "motion-intensity"
  | "motion-delay"
  | "marquee-enabled"
  | "marquee-layout"
  | "marquee-spacing"
  | "marquee-height"
  | "marquee-speed"
  | "marquee-dir"
  | "marquee-pause"
  | "marquee-surface"
  | "video-enabled"
  | "video-mode"
  | "video-poster"
  | "video-play"
  | "video-overlay"
  | "video-container"
  | "video-corner"
  | "video-aspect"
  | "carousel-enabled"
  | "carousel-view"
  | "carousel-nav"
  | "carousel-auto"
  | "carousel-transition"
  | "rotating-text"
  | "rotating-icon"
  | "rotating-size"
  | "rotating-speed"
  | "rotating-dir"
  | "rotating-surface"
  | "rotating-color"
  | "rotating-pos"
  | "corner-enabled"
  | "corner-pos"
  | "corner-glyph"
  | "corner-morph"
  | "float-type"
  | "float-pos"
  | "float-overlap"
  | "beforeafter"
  | "cursor"
  | "editorial-icon"
  | "editorial-icon-color"
  | "editorial-icon-size"
  | "editorial-icon-background"
  | "editorial-presentation"
  | "editorial-graphic-size"
  | "badge-center-graphic-size"
  | "editorial-graphic-align"
  | "hero-content-offset-y"
  | "hero-content-offset-x"
  | "hero-content-max-width"
  | "hero-content-reset"
  | "media-position-x"
  | "media-position-y"
  | "media-position-zoom"
  | "media-position-reset"
  | "media-pan-x"
  | "media-pan-y"
  | "media-pan-reset"
  | "media-pan-overflow";

type Help = {
  label: Bi;
  termNote?: Bi;
  what: Bi;
  see: Bi;
  where: Bi;
  compatible: Bi;
  incompatible: Bi;
  persist: Bi;
};

export type LabControlDef = {
  id: LabControlId;
  category: LabControlCategory;
  layer: LabControlLayer;
  help: Help;
};

function themeColor(
  id: LabControlId,
  label: Bi,
  what: Bi,
  see: Bi,
): LabControlDef {
  return {
    id,
    category: "colors",
    layer: "theme",
    help: {
      label,
      what,
      see,
      where: {
        en: "Applies to the entire public website, not one selected element.",
        es: "Aplica a todo el sitio público, no a un solo elemento seleccionado.",
      },
      compatible: {
        en: "Compatible with every page and selected element.",
        es: "Compatible con todas las páginas y elementos.",
      },
      incompatible: {
        en: "Does not restyle a single image independently of the site theme.",
        es: "No restiliza una sola imagen aparte del tema global.",
      },
      persist: {
        en: "Preview immediately. Apply Custom as Current to persist. Reload uses approved theme.",
        es: "Vista previa inmediata. Aplicar Custom como versión actual para persistir. Recargar usa el tema aprobado.",
      },
    },
  };
}

const controls: LabControlDef[] = [
  themeColor(
    "color-primary",
    { en: "Primary", es: "Primario" },
    {
      en: "Sets the main brand color for buttons, links, and strong accents.",
      es: "Define el color principal de marca para botones, enlaces y acentos fuertes.",
    },
    {
      en: "You will see buttons, focus rings, and primary fills change across the site.",
      es: "Verá cambiar botones, anillos de foco y rellenos principales en todo el sitio.",
    },
  ),
  themeColor(
    "color-cta",
    { en: "CTA Soft Blue", es: "Azul suave de CTA" },
    {
      en: "Sets the resting fill of primary CTA buttons. Uses a solid color, not opacity.",
      es: "Define el relleno en reposo de los CTA principales. Usa un color sólido, no opacidad.",
    },
    {
      en: "Primary buttons such as Request Appointment change at rest.",
      es: "Los botones principales como Solicitar cita cambian en reposo.",
    },
  ),
  themeColor(
    "color-ctaHover",
    { en: "CTA Hover", es: "Hover de CTA" },
    {
      en: "Sets the hover fill of primary CTA buttons. Pressed uses a slightly stronger solid blue.",
      es: "Define el relleno hover de los CTA principales. El estado pulsado usa un azul sólido un poco más fuerte.",
    },
    {
      en: "Hover the header appointment button to preview. Brand Blue stays reserved for identity.",
      es: "Pase el cursor por el botón de cita del encabezado para previsualizar. El azul de marca queda reservado para identidad.",
    },
  ),
  themeColor(
    "color-navHover",
    { en: "Nav Hover Text", es: "Texto hover de navegación" },
    {
      en: "Sets the hover and active text color for primary navigation labels.",
      es: "Define el color de texto hover y activo de las etiquetas de navegación principal.",
    },
    {
      en: "Header links Home through Contact change on hover and on the current route.",
      es: "Los enlaces del encabezado de Inicio a Contacto cambian al pasar el cursor y en la ruta actual.",
    },
  ),
  themeColor(
    "color-secondary",
    { en: "Secondary", es: "Secundario" },
    {
      en: "Sets the supporting brand color for secondary actions and surfaces.",
      es: "Define el color de apoyo para acciones y superficies secundarias.",
    },
    {
      en: "Secondary buttons and muted brand fills update immediately.",
      es: "Los botones secundarios y rellenos de marca se actualizan de inmediato.",
    },
  ),
  themeColor(
    "color-accent",
    { en: "Accent", es: "Acento" },
    {
      en: "Sets a highlight color used for emphasis, badges, and selected accents.",
      es: "Define un color de realce para énfasis, insignias y acentos.",
    },
    {
      en: "Accent chips, some icons, and highlight tints change.",
      es: "Cambian chips de acento, algunos iconos y tintes de realce.",
    },
  ),
  themeColor(
    "color-background",
    { en: "Page background", es: "Fondo de página" },
    {
      en: "Sets the page canvas behind all sections.",
      es: "Define el lienzo de página detrás de todas las secciones.",
    },
    {
      en: "The overall page background color changes.",
      es: "Cambia el color de fondo general de la página.",
    },
  ),
  themeColor(
    "color-surface",
    { en: "Surface / cards", es: "Superficie / tarjetas" },
    {
      en: "Sets the fill of cards, panels, and raised surfaces.",
      es: "Define el relleno de tarjetas, paneles y superficies elevadas.",
    },
    {
      en: "Cards and panels pick up the new surface color.",
      es: "Las tarjetas y paneles toman el nuevo color de superficie.",
    },
  ),
  themeColor(
    "color-surfaceMuted",
    { en: "Muted background", es: "Fondo atenuado" },
    {
      en: "Sets quieter nested backgrounds inside sections.",
      es: "Define fondos más suaves dentro de las secciones.",
    },
    {
      en: "Muted bands and inset areas change.",
      es: "Cambian franjas atenuadas y áreas internas.",
    },
  ),
  themeColor(
    "color-surfaceStrong",
    { en: "Dark surface", es: "Superficie oscura" },
    {
      en: "Sets inverted or high-contrast surfaces such as dark bands.",
      es: "Define superficies invertidas o de alto contraste, como franjas oscuras.",
    },
    {
      en: "Dark panels and on-strong text contrast update.",
      es: "Se actualizan paneles oscuros y el contraste del texto sobre ellos.",
    },
  ),
  themeColor(
    "color-foreground",
    { en: "Primary text", es: "Texto principal" },
    {
      en: "Sets the default body and heading text color.",
      es: "Define el color predeterminado del texto y los títulos.",
    },
    {
      en: "Most readable text on the page changes color.",
      es: "La mayor parte del texto legible cambia de color.",
    },
  ),
  themeColor(
    "color-muted",
    { en: "Muted text", es: "Texto atenuado" },
    {
      en: "Sets supporting copy, captions, and quieter labels.",
      es: "Define textos de apoyo, pies y etiquetas más suaves.",
    },
    {
      en: "Secondary sentences and metadata look lighter or darker.",
      es: "Las frases secundarias y metadatos se ven más claros u oscuros.",
    },
  ),
  themeColor(
    "color-border",
    { en: "Border", es: "Borde" },
    {
      en: "Sets hairlines, card outlines, and divider strokes.",
      es: "Define líneas finas, contornos de tarjeta y divisores.",
    },
    {
      en: "Edges around cards, inputs, and rules change.",
      es: "Cambian los bordes de tarjetas, campos y reglas.",
    },
  ),
];

function persistExperience(): Bi {
  return {
    en: "Experience control. Preview now. Apply Custom as Current writes it to the approved public experience. Factory is never overwritten.",
    es: "Control de experiencia. Vista previa ahora. Aplicar Custom como versión actual lo escribe en la experiencia pública. Factory nunca se sobrescribe.",
  };
}

function persistTheme(): Bi {
  return {
    en: "Theme control. Preview now. Apply Custom as Current writes it to the approved public theme. Factory is never overwritten.",
    es: "Control de tema. Vista previa ahora. Aplicar Custom como versión actual lo escribe en el tema público. Factory nunca se sobrescribe.",
  };
}

function persistLabOnly(): Bi {
  return {
    en: "Lab chrome only. It never changes public WCDA content, SEO, or routes.",
    es: "Solo interfaz del laboratorio. No cambia el contenido público, SEO ni rutas.",
  };
}

function persistContent(): Bi {
  return {
    en: "Creates an unsaved Content change. Apply Section stores it on Custom. Apply All as Current writes publication flags only. It does not change Theme, Experience, Factory, or literature.",
    es: "Crea un cambio de Contenido sin guardar. Aplicar sección lo guarda en Custom. Aplicar todo como Current escribe solo los indicadores de publicación. No cambia Tema, Experiencia, Factory ni la literatura.",
  };
}

add("color-pick", "colors", "lab", {
  label: { en: "Pick Color", es: "Elegir color" },
  what: {
    en: "Samples one visible pixel with the browser eyedropper when available. The Lab preview updates immediately as Working. Custom and Current are not written.",
    es: "Muestrea un píxel visible con el cuentagotas del navegador cuando está disponible. La vista previa del Lab se actualiza de inmediato como Working. Custom y Current no se escriben.",
  },
  see: {
    en: "HEX, RGB, and HSL update. The selected surface in the preview changes. Status becomes Unsaved until you Apply.",
    es: "HEX, RGB y HSL se actualizan. La superficie seleccionada en la vista previa cambia. El estado pasa a Sin guardar hasta Aplicar.",
  },
  where: {
    en: "Any visible pixel in the preview or on screen.",
    es: "Cualquier píxel visible en la vista previa o en pantalla.",
  },
  compatible: {
    en: "Works with the native color picker and HEX field if EyeDropper is unavailable.",
    es: "Funciona con el selector nativo y el campo HEX si EyeDropper no está disponible.",
  },
  incompatible: {
    en: "Does not write Custom, Current, or Factory by itself.",
    es: "Por sí solo no escribe Custom, Current ni Factory.",
  },
  persist: persistLabOnly(),
});

add("color-hex", "colors", "lab", {
  label: { en: "HEX / RGB / HSL", es: "HEX / RGB / HSL" },
  what: {
    en: "Shows the sampled or typed color. Accepts #RGB and #RRGGBB and normalizes to uppercase six-digit HEX. A valid HEX updates Working immediately.",
    es: "Muestra el color muestreado o escrito. Acepta #RGB y #RRGGBB y normaliza a HEX de seis dígitos en mayúsculas. Un HEX válido actualiza Working de inmediato.",
  },
  see: {
    en: "Preview swatch, Working value, and Lab preview update. Apply is still required to write Custom.",
    es: "La muestra, el valor Working y la vista previa del Lab se actualizan. Sigue haciendo falta Aplicar para escribir Custom.",
  },
  where: {
    en: "Color Tools Working state until Apply.",
    es: "Estado Working de Herramientas de color hasta Aplicar.",
  },
  compatible: {
    en: "Copy HEX, RGB, or HSL without changing Custom or Current.",
    es: "Copiar HEX, RGB o HSL no cambia Custom ni Current.",
  },
  incompatible: {
    en: "Typing a color does not write Custom or Current.",
    es: "Escribir un color no escribe Custom ni Current.",
  },
  persist: persistLabOnly(),
});

add("color-apply", "colors", "lab", {
  label: { en: "Apply Color", es: "Aplicar color" },
  what: {
    en: "Saves the Working color to Custom at the displayed editing scope only: System global token, page, section, visual family, or selected element instance.",
    es: "Guarda el color Working en Custom solo en el alcance visible: token global de Sistema, página, sección, familia visual o instancia del elemento seleccionado.",
  },
  see: {
    en: "Status becomes Ready to publish. Current stays until you Publish. Factory is never written.",
    es: "El estado pasa a Listo para publicar. Current se mantiene hasta Publicar. Factory nunca se escribe.",
  },
  where: {
    en: "Only the Apply target shown above the button. Explicit local overrides are not overwritten by a global apply.",
    es: "Solo el destino mostrado encima del botón. Un apply global no sobrescribe excepciones locales explícitas.",
  },
  compatible: {
    en: "Respects the puzzle hierarchy. More specific scoped colors keep winning.",
    es: "Respeta la jerarquía. Los colores de alcance más específico siguen ganando.",
  },
  incompatible: {
    en: "Does not leak to sibling instances, Header/Footer when applying a page color, or Factory. Family apply does not overwrite instance fills.",
    es: "No se filtra a instancias hermanas, ni a encabezado/pie al aplicar color de página, ni a Factory. Aplicar a la familia no sobrescribe fondos de instancia.",
  },
  persist: {
    en: "Writes Custom at the active scope. Current is unchanged until you promote. Factory is immutable.",
    es: "Escribe Custom en el alcance activo. Current no cambia hasta promover. Factory es inmutable.",
  },
});

function add(
  id: LabControlId,
  category: LabControlCategory,
  layer: LabControlLayer,
  help: Help,
) {
  controls.push({ id, category, layer, help });
}

add("font-heading", "typography", "theme", {
  label: { en: "Heading font", es: "Fuente de títulos" },
  what: {
    en: "Chooses the typeface family for headings.",
    es: "Elige la familia tipográfica de los títulos.",
  },
  see: {
    en: "H1–H3 and section titles switch font immediately.",
    es: "H1–H3 y títulos de sección cambian de fuente de inmediato.",
  },
  where: {
    en: "Entire website headings.",
    es: "Títulos de todo el sitio.",
  },
  compatible: {
    en: "Works with heading scale. Geist, Montserrat, Arial, Georgia, and system-ui are available.",
    es: "Funciona con la escala de títulos. Hay Geist, Montserrat, Arial, Georgia y system-ui.",
  },
  incompatible: {
    en: "Does not change a single image. Factory and Current keep Geist until you Apply.",
    es: "No cambia una imagen individual. Factory y Current conservan Geist hasta Aplicar.",
  },
  persist: persistTheme(),
});

add("font-body", "typography", "theme", {
  label: { en: "Body font", es: "Fuente de cuerpo" },
  what: {
    en: "Chooses the typeface family for paragraphs and UI copy.",
    es: "Elige la familia tipográfica de párrafos y textos de interfaz.",
  },
  see: {
    en: "Body copy and most labels switch font.",
    es: "El cuerpo de texto y la mayoría de etiquetas cambian de fuente.",
  },
  where: {
    en: "Entire website body text.",
    es: "Texto de cuerpo de todo el sitio.",
  },
  compatible: {
    en: "Works with body scale.",
    es: "Funciona con la escala de cuerpo.",
  },
  incompatible: {
    en: "Does not restyle the logo drawing.",
    es: "No restiliza el dibujo del logo.",
  },
  persist: persistTheme(),
});

add("slider-headingScale", "typography", "theme", {
  label: { en: "Heading scale", es: "Escala de títulos" },
  what: {
    en: "Multiplies heading size without changing the font family.",
    es: "Multiplica el tamaño de los títulos sin cambiar la familia.",
  },
  see: {
    en: "Titles grow or shrink slightly across pages.",
    es: "Los títulos crecen o se reducen ligeramente en las páginas.",
  },
  where: { en: "Global headings.", es: "Títulos globales." },
  compatible: {
    en: "Safe range is modest so layout does not collapse.",
    es: "El rango es moderado para no romper el diseño.",
  },
  incompatible: {
    en: "Does not scale images, logos, or the marquee.",
    es: "No escala imágenes, logos ni el marquee.",
  },
  persist: persistTheme(),
});

add("slider-bodyScale", "typography", "theme", {
  label: { en: "Body scale", es: "Escala de cuerpo" },
  what: {
    en: "Multiplies paragraph size.",
    es: "Multiplica el tamaño de los párrafos.",
  },
  see: {
    en: "Body copy becomes slightly larger or smaller.",
    es: "El texto de cuerpo se ve un poco más grande o más pequeño.",
  },
  where: { en: "Global body text.", es: "Texto de cuerpo global." },
  compatible: {
    en: "Pairs with body font.",
    es: "Se combina con la fuente de cuerpo.",
  },
  incompatible: {
    en: "Does not change media geometry.",
    es: "No cambia la geometría de media.",
  },
  persist: persistTheme(),
});

add("slider-radius", "brand", "theme", {
  label: { en: "Corner radius", es: "Radio de esquina" },
  what: {
    en: "Rounds or squares theme-driven corners on cards and controls.",
    es: "Redondea o escuadra esquinas del tema en tarjetas y controles.",
  },
  see: {
    en: "Buttons, cards, and inputs look rounder or sharper.",
    es: "Botones, tarjetas y campos se ven más redondos o más vivos.",
  },
  where: {
    en: "Global theme radius. Experience containers may still clip with their own radius.",
    es: "Radio global del tema. Los contenedores de experiencia pueden recortar con su propio radio.",
  },
  compatible: {
    en: "Works with every page.",
    es: "Funciona en todas las páginas.",
  },
  incompatible: {
    en: "Inset Badge Cutout uses its own mask and will not fully follow this slider.",
    es: "Recorte con insignia integrada usa su propia máscara y no sigue por completo este control.",
  },
  persist: persistTheme(),
});

add("slider-shadowIntensity", "brand", "theme", {
  label: { en: "Shadow intensity", es: "Intensidad de sombra" },
  what: {
    en: "Strengthens or fades elevation shadows.",
    es: "Aumenta o suaviza las sombras de elevación.",
  },
  see: {
    en: "Cards lift more or flatten.",
    es: "Las tarjetas se elevan más o se aplanan.",
  },
  where: { en: "Global theme shadows.", es: "Sombras globales del tema." },
  compatible: {
    en: "Visible on raised cards and header chrome.",
    es: "Visible en tarjetas elevadas y el encabezado.",
  },
  incompatible: {
    en: "Does not create a new container shape.",
    es: "No crea una nueva forma de contenedor.",
  },
  persist: persistTheme(),
});

add("slider-cardDensity", "brand", "theme", {
  label: { en: "Card density", es: "Densidad de tarjetas" },
  what: {
    en: "Changes inner padding of theme cards.",
    es: "Cambia el relleno interno de las tarjetas del tema.",
  },
  see: {
    en: "Card content sits tighter or airier.",
    es: "El contenido de las tarjetas queda más compacto o más aireado.",
  },
  where: { en: "Global card padding.", es: "Relleno global de tarjetas." },
  compatible: {
    en: "Works with surface colors.",
    es: "Funciona con los colores de superficie.",
  },
  incompatible: {
    en: "Does not change media object-fit.",
    es: "No cambia el object-fit de las imágenes.",
  },
  persist: persistTheme(),
});

add("slider-sectionSpacing", "brand", "theme", {
  label: { en: "Section spacing", es: "Espaciado de secciones" },
  what: {
    en: "Changes vertical rhythm between page sections.",
    es: "Cambia el ritmo vertical entre secciones.",
  },
  see: {
    en: "Sections move closer together or farther apart.",
    es: "Las secciones se acercan o se alejan.",
  },
  where: { en: "Global section spacing.", es: "Espaciado global de secciones." },
  compatible: {
    en: "All public pages.",
    es: "Todas las páginas públicas.",
  },
  incompatible: {
    en: "Does not resize the header logo.",
    es: "No cambia el tamaño del logo.",
  },
  persist: persistTheme(),
});

add("slider-contentWidth", "brand", "theme", {
  label: { en: "Content width", es: "Ancho de contenido" },
  what: {
    en: "Widens or narrows the main content measure.",
    es: "Ensancha o estrecha la medida del contenido principal.",
  },
  see: {
    en: "Centered columns get wider or tighter on large screens.",
    es: "Las columnas centradas se ensanchan o se estrechan en pantallas grandes.",
  },
  where: { en: "Global max content width.", es: "Ancho máximo global de contenido." },
  compatible: {
    en: "Desktop and tablet. Mobile stays full-bleed safe.",
    es: "Escritorio y tablet. El móvil sigue a ancho seguro.",
  },
  incompatible: {
    en: "Does not change marquee track width independently.",
    es: "No cambia por separado el ancho del marquee.",
  },
  persist: persistTheme(),
});

add("slider-headerDensity", "brand", "theme", {
  label: { en: "Header density", es: "Densidad del encabezado" },
  what: {
    en: "Changes header vertical padding.",
    es: "Cambia el relleno vertical del encabezado.",
  },
  see: {
    en: "The top bar becomes shorter or taller.",
    es: "La barra superior se hace más baja o más alta.",
  },
  where: { en: "Site header only.", es: "Solo el encabezado del sitio." },
  compatible: {
    en: "Works with header logo size, which is an Experience control.",
    es: "Funciona con el tamaño del logo, que es un control de experiencia.",
  },
  incompatible: {
    en: "Does not replace logo alignment.",
    es: "No reemplaza la alineación del logo.",
  },
  persist: persistTheme(),
});

add("slider-navHalo", "colors", "theme", {
  label: { en: "Nav hover halo", es: "Halo hover de navegación" },
  what: {
    en: "Sets how strong the subtle blue tint behind a hovered navigation label is.",
    es: "Define la intensidad del tinte azul sutil detrás de una etiqueta de navegación en hover.",
  },
  see: {
    en: "Header links show a quiet rounded halo on hover. Spacing does not change.",
    es: "Los enlaces del encabezado muestran un halo redondeado discreto al pasar el cursor. El espaciado no cambia.",
  },
  where: { en: "Primary header navigation.", es: "Navegación principal del encabezado." },
  compatible: {
    en: "Visible in Designer. Factory and Current keep a transparent halo.",
    es: "Visible en Designer. Factory y Current conservan un halo transparente.",
  },
  incompatible: {
    en: "Does not restyle buttons, headings, or page backgrounds.",
    es: "No restiliza botones, títulos ni fondos de página.",
  },
  persist: persistTheme(),
});

add("slider-navHaloActive", "colors", "theme", {
  label: { en: "Nav active halo", es: "Halo activo de navegación" },
  what: {
    en: "Sets how strong the subtle blue tint behind the current-route navigation label is.",
    es: "Define la intensidad del tinte azul sutil detrás de la etiqueta de la ruta actual.",
  },
  see: {
    en: "The current nav item stays slightly stronger than hover, still quiet.",
    es: "El ítem de navegación actual queda un poco más fuerte que el hover, aún discreto.",
  },
  where: { en: "Primary header navigation.", es: "Navegación principal del encabezado." },
  compatible: {
    en: "Visible in Designer. Factory and Current keep a transparent halo.",
    es: "Visible en Designer. Factory y Current conservan un halo transparente.",
  },
  incompatible: {
    en: "Does not add underlines or solid nav buttons.",
    es: "No añade subrayados ni botones sólidos de navegación.",
  },
  persist: persistTheme(),
});

add("slider-chromeWarmth", "colors", "theme", {
  label: { en: "Page Background", es: "Fondo general" },
  termNote: { en: "Warmth", es: "Calidez" },
  what: {
    en: "Changes only the main website canvas and large page backgrounds that inherit the global canvas. It does not change the Header, Footer, cards, media, or WCDA blue. -100 is more neutral, 0 is the current canvas reference, and +100 is warmer/creamier.",
    es: "Cambia únicamente el fondo general del sitio y las grandes superficies que heredan ese fondo. No cambia la cabecera, el pie de página, las tarjetas, los medios ni el azul WCDA. -100 es más neutro, 0 es la referencia actual del lienzo, y +100 es más cálido/cremoso.",
  },
  see: {
    en: "The page canvas shifts. Header, Footer, and cards stay still. The resulting HEX updates live.",
    es: "Cambia el lienzo de la página. Cabecera, pie y tarjetas no se mueven. El HEX resultante se actualiza en vivo.",
  },
  where: {
    en: "Global page/body canvas. Visible regardless of Preview Page or Selected Element.",
    es: "Lienzo global de la página. Visible sin importar la página de vista previa ni el elemento seleccionado.",
  },
  compatible: {
    en: "Stays inside the official WCDA beige family on the slider. A manual HEX may go custom.",
    es: "El control deslizante permanece en la familia beige oficial de WCDA. Un HEX manual puede ser personalizado.",
  },
  incompatible: {
    en: "Does not change the Header, Footer, cards, media, logo, or WCDA Blue #002774.",
    es: "No cambia la cabecera, el pie de página, las tarjetas, los medios, el logo ni el azul WCDA #002774.",
  },
  persist: persistTheme(),
});

add("slider-headerBackground", "colors", "theme", {
  label: { en: "Header Background", es: "Fondo de cabecera" },
  termNote: { en: "Warmth", es: "Calidez" },
  what: {
    en: "Changes only the Header background. It does not change the page canvas, Footer, logo, navigation, cards, or WCDA blue. -100 is more neutral, 0 is the current canvas reference, and +100 is warmer/creamier.",
    es: "Cambia únicamente el fondo de la cabecera. No cambia el fondo general, el pie de página, el logo, la navegación, las tarjetas ni el azul WCDA. -100 es más neutro, 0 es la referencia actual del lienzo, y +100 es más cálido/cremoso.",
  },
  see: {
    en: "Only the Header surface shifts. Page, Footer, and cards stay still.",
    es: "Solo cambia la superficie de la cabecera. Página, pie y tarjetas no se mueven.",
  },
  where: {
    en: "Site header background only. Global Theme control — not tied to Selected Element.",
    es: "Solo el fondo de la cabecera. Control global de Tema — no depende del elemento seleccionado.",
  },
  compatible: {
    en: "Independent from Page Background and Footer Background.",
    es: "Independiente del fondo general y del pie de página.",
  },
  incompatible: {
    en: "Does not change the page canvas, Footer, logo, navigation, cards, or WCDA Blue #002774.",
    es: "No cambia el fondo general, el pie, el logo, la navegación, las tarjetas ni el azul WCDA #002774.",
  },
  persist: persistTheme(),
});

add("slider-footerBackground", "colors", "theme", {
  label: { en: "Footer Background", es: "Fondo del pie de página" },
  termNote: { en: "Warmth", es: "Calidez" },
  what: {
    en: "Changes only the Footer background. It does not change the page canvas, Header, footer content, cards, or WCDA blue. -100 is more neutral, 0 is the current canvas reference, and +100 is warmer/creamier.",
    es: "Cambia únicamente el fondo del pie de página. No cambia el fondo general, la cabecera, el contenido del pie, las tarjetas ni el azul WCDA. -100 es más neutro, 0 es la referencia actual del lienzo, y +100 es más cálido/cremoso.",
  },
  see: {
    en: "Only the Footer surface shifts. Page, Header, and cards stay still.",
    es: "Solo cambia la superficie del pie. Página, cabecera y tarjetas no se mueven.",
  },
  where: {
    en: "Site footer background only. Global Theme control — not tied to Selected Element.",
    es: "Solo el fondo del pie. Control global de Tema — no depende del elemento seleccionado.",
  },
  compatible: {
    en: "Independent from Page Background and Header Background.",
    es: "Independiente del fondo general y de la cabecera.",
  },
  incompatible: {
    en: "Does not change the page canvas, Header, footer content, cards, or WCDA Blue #002774.",
    es: "No cambia el fondo general, la cabecera, el contenido del pie, las tarjetas ni el azul WCDA #002774.",
  },
  persist: persistTheme(),
});

add("preset-factory", "recovery", "lab", {
  label: { en: "WCDA Factory", es: "WCDA Factory" },
  what: {
    en: "Immutable recovery baseline captured from the approved site before Designer changes.",
    es: "Punto de recuperación inmutable capturado del sitio aprobado antes de los cambios del diseñador.",
  },
  see: {
    en: "Preview shows Factory theme and Factory experience. Current is unchanged until you Apply.",
    es: "La vista previa muestra Factory. Current no cambia hasta Aplicar.",
  },
  where: { en: "Editor only until Apply.", es: "Solo el editor hasta Aplicar." },
  compatible: {
    en: "Safe to load any time. Factory itself cannot be overwritten.",
    es: "Se puede cargar siempre. Factory no puede sobrescribirse.",
  },
  incompatible: {
    en: "Does not save. Unsaved Custom work is discarded if you confirm.",
    es: "No guarda. Si confirma, se descarta el Custom no guardado.",
  },
  persist: {
    en: "Reads Factory constants. Writes nothing unless you later Apply.",
    es: "Lee las constantes Factory. No escribe nada hasta que Aplicar.",
  },
});

add("preset-current", "recovery", "lab", {
  label: { en: "WCDA Current", es: "WCDA Current" },
  what: {
    en: "Current approved public configuration.",
    es: "Configuración pública aprobada actualmente.",
  },
  see: {
    en: "Preview matches the live approved theme and experience.",
    es: "La vista previa coincide con el tema y la experiencia aprobados.",
  },
  where: { en: "Editor working copy.", es: "Copia de trabajo del editor." },
  compatible: {
    en: "Use this to inspect what the public site consumes.",
    es: "Úselo para inspeccionar lo que consume el sitio público.",
  },
  incompatible: {
    en: "Does not modify Factory.",
    es: "No modifica Factory.",
  },
  persist: {
    en: "Reads approved files. Does not save.",
    es: "Lee archivos aprobados. No guarda.",
  },
});

add("preset-inspired", "recovery", "lab", {
  label: { en: "WCDA Inspired", es: "WCDA Inspired" },
  what: {
    en: "Alternative WCDA visual proposal.",
    es: "Propuesta visual alternativa de WCDA.",
  },
  see: {
    en: "Colors shift toward the Inspired recipe. Experience stays at Current unless already edited.",
    es: "Los colores pasan a la receta Inspired. La experiencia permanece en Current salvo ediciones previas.",
  },
  where: { en: "Editor reference only.", es: "Solo referencia del editor." },
  compatible: {
    en: "Replaces the need for JC Dental Inspired and WCDA + JC Mix in the UI.",
    es: "Sustituye en la UI a JC Dental Inspired y WCDA + JC Mix.",
  },
  incompatible: {
    en: "Not a public brand. Does not write Factory.",
    es: "No es marca pública. No escribe Factory.",
  },
  persist: {
    en: "Does not save until Apply.",
    es: "No guarda hasta Aplicar.",
  },
});

add("preset-designer", "recovery", "lab", {
  label: { en: "WCDA Designer", es: "WCDA Designer" },
  what: {
    en: "Official designer-based visual proposal.",
    es: "Propuesta visual basada en la identidad oficial del diseñador.",
  },
  see: {
    en: "Loads Designer Brand Canon colors and Montserrat into Lab preview. Does not write Current or Factory.",
    es: "Carga los colores del Brand Canon y Montserrat en la vista previa. No escribe Current ni Factory.",
  },
  where: { en: "Lab preview only until applied as Current.", es: "Solo vista previa del laboratorio hasta aplicar como Current." },
  compatible: {
    en: "Recorded inputs: Primary Blue #002774, Primary Background #EBE1D8, typeface Montserrat. Logo is not in this phase.",
    es: "Entradas registradas: azul primario #002774, fondo primario #EBE1D8, tipografía Montserrat. El logo no entra en esta fase.",
  },
  incompatible: {
    en: "Does not change Current, Factory, public pages, or logo.",
    es: "No cambia Current, Factory, páginas públicas ni el logo.",
  },
  persist: {
    en: "Lab preview only. Not public Current. Factory cannot be overwritten.",
    es: "Solo vista previa del laboratorio. No es Current público. Factory no se sobrescribe.",
  },
});

add("preset-custom", "recovery", "lab", {
  label: { en: "Custom", es: "Custom" },
  what: {
    en: "Editable working configuration.",
    es: "Configuración de trabajo editable.",
  },
  see: {
    en: "The header shows Custom — Unsaved after you edit a control.",
    es: "El encabezado muestra Custom — No guardado al editar un control.",
  },
  where: { en: "Editor only.", es: "Solo el editor." },
  compatible: {
    en: "All theme and experience controls write into Custom.",
    es: "Todos los controles de tema y experiencia escriben en Custom.",
  },
  incompatible: {
    en: "Custom cannot overwrite Factory.",
    es: "Custom no puede sobrescribir Factory.",
  },
  persist: persistLabOnly(),
});

add("preview-page", "chrome", "lab", {
  label: { en: "Preview page", es: "Página de vista previa" },
  what: {
    en: "Chooses which public route the iframe shows.",
    es: "Elige qué ruta pública muestra el iframe.",
  },
  see: {
    en: "The preview navigates. Selected element list updates to that page.",
    es: "La vista previa navega. La lista de elementos se actualiza a esa página.",
  },
  where: { en: "Lab preview only.", es: "Solo vista previa del laboratorio." },
  compatible: {
    en: "Home, About, Dr. Matute, Services, Patients, Technology, Contact.",
    es: "Inicio, About, Dr. Matute, Servicios, Pacientes, Tecnología, Contacto.",
  },
  incompatible: {
    en: "Does not change routes of the public site.",
    es: "No cambia las rutas del sitio público.",
  },
  persist: persistLabOnly(),
});

add("selected-element", "chrome", "lab", {
  label: { en: "Selected element", es: "Elemento seleccionado" },
  what: {
    en: "Targets which component Media, Containers, and Special Effects edit.",
    es: "Indica qué componente editan Media, Contenedores y Efectos especiales.",
  },
  see: {
    en: "Irrelevant controls hide. The preview outlines the active target.",
    es: "Se ocultan controles irrelevantes. La vista previa marca el destino activo.",
  },
  where: {
    en: "Experience controls are per selected element. Theme colors stay global.",
    es: "Los controles de experiencia son por elemento. Los colores del tema siguen globales.",
  },
  compatible: {
    en: "Only elements listed for the current preview page.",
    es: "Solo los elementos listados para la página de vista previa.",
  },
  incompatible: {
    en: "Cannot select carousel controls on Header Logo.",
    es: "No puede seleccionar controles de carrusel en el Logo del encabezado.",
  },
  persist: persistLabOnly(),
});

add("viewport", "chrome", "lab", {
  label: { en: "Viewport", es: "Dispositivo" },
  what: {
    en: "Resizes the Lab preview frame for manual geometry checks.",
    es: "Cambia el marco de vista previa del Lab para revisar geometría.",
  },
  see: {
    en: "The iframe width changes to Desktop, 1440, 1024, Tablet 768, Mobile 390, or 360. Layout reflows inside the preview only.",
    es: "El iframe cambia a Escritorio, 1440, 1024, Tablet 768, Móvil 390 o 360. Solo reacomoda la vista previa.",
  },
  where: {
    en: "Lab preview chrome only. Public responsive breakpoints are unchanged.",
    es: "Solo el marco del laboratorio. Los breakpoints públicos no cambian.",
  },
  compatible: {
    en: "Any Lab preview page.",
    es: "Cualquier página de vista previa del Lab.",
  },
  incompatible: {
    en: "These buttons do not certify containers visually. They only make 1440 / 1024 / 768 / 390 / 360 easier to inspect in Lab.",
    es: "Estos botones no certifican visualmente los contenedores. Solo facilitan inspeccionar 1440 / 1024 / 768 / 390 / 360 en el Lab.",
  },
  persist: persistLabOnly(),
});

add("recovery-undo", "recovery", "lab", {
  label: { en: "Undo unsaved changes", es: "Deshacer cambios no guardados" },
  what: {
    en: "Restores Custom to the snapshot from when this editing session began or last Load.",
    es: "Devuelve Custom a la instantánea del inicio de sesión o de la última carga.",
  },
  see: {
    en: "Unsaved edits disappear. Nothing is written to disk.",
    es: "Desaparecen las ediciones no guardadas. No se escribe en disco.",
  },
  where: { en: "Custom only.", es: "Solo Custom." },
  compatible: { en: "Always available.", es: "Siempre disponible." },
  incompatible: {
    en: "Does not change Current or Factory.",
    es: "No cambia Current ni Factory.",
  },
  persist: {
    en: "Reads session snapshot. Saves nothing.",
    es: "Lee la instantánea de sesión. No guarda nada.",
  },
});

add("recovery-load-current", "recovery", "lab", {
  label: { en: "Load Current", es: "Cargar versión actual" },
  what: {
    en: "Loads Current into the Lab working preview. Recovery/reference only. Does not publish.",
    es: "Carga Current en la vista previa de trabajo del Lab. Solo recuperación/referencia. No publica.",
  },
  see: {
    en: "Preview matches the live site configuration.",
    es: "La vista previa coincide con la configuración del sitio en vivo.",
  },
  where: { en: "Custom working copy.", es: "Copia de trabajo Custom." },
  compatible: { en: "Safe anytime.", es: "Seguro en cualquier momento." },
  incompatible: {
    en: "Discards unsaved Custom. Does not write Factory.",
    es: "Descarta Custom no guardado. No escribe Factory.",
  },
  persist: {
    en: "Reads approved state. Saves nothing.",
    es: "Lee el estado aprobado. No guarda nada.",
  },
});

add("recovery-load-factory", "recovery", "lab", {
  label: { en: "Load Factory", es: "Cargar WCDA Factory" },
  what: {
    en: "Copies immutable Factory into Custom.",
    es: "Copia Factory inmutable en Custom.",
  },
  see: {
    en: "Preview shows Factory. Current stays until Apply.",
    es: "La vista previa muestra Factory. Current permanece hasta Aplicar.",
  },
  where: { en: "Custom only.", es: "Solo Custom." },
  compatible: { en: "Never mutates Factory.", es: "Nunca muta Factory." },
  incompatible: {
    en: "Does not immediately change the public site.",
    es: "No cambia de inmediato el sitio público.",
  },
  persist: {
    en: "Reads Factory constants. Writes nothing.",
    es: "Lee constantes Factory. No escribe nada.",
  },
});

add("recovery-load-inspired", "recovery", "lab", {
  label: { en: "Load Inspired", es: "Cargar Inspired" },
  what: {
    en: "Copies the Inspired reference theme into Custom.",
    es: "Copia el tema de referencia Inspired en Custom.",
  },
  see: {
    en: "Inspired colors appear in preview.",
    es: "Aparecen los colores Inspired en la vista previa.",
  },
  where: { en: "Custom only.", es: "Solo Custom." },
  compatible: { en: "Reference recipe only.", es: "Solo receta de referencia." },
  incompatible: {
    en: "Not Brand Canon. Does not write Factory.",
    es: "No es Brand Canon. No escribe Factory.",
  },
  persist: {
    en: "Does not save until Apply.",
    es: "No guarda hasta Aplicar.",
  },
});

add("recovery-apply", "approval", "lab", {
  label: { en: "Promote All Custom to Current", es: "Promover todo Custom a Current" },
  what: {
    en: "Promotes every approved Custom change to Current. The only Approval & Publish action that writes all domains together. Factory is never overwritten.",
    es: "Promueve todos los cambios aprobados en Custom a Current. La única acción de Aprobación y publicación que escribe todos los dominios juntos. Factory no se sobrescribe.",
  },
  see: {
    en: "On success: WCDA Current updated successfully. Theme and Experience are synchronized. On failure: Nothing was applied. WCDA Current remains unchanged.",
    es: "Si funciona: WCDA Current se actualizó correctamente. Tema y Experiencia están sincronizados. Si falla: No se aplicó ningún cambio. WCDA Current permanece sin modificaciones.",
  },
  where: {
    en: "Approved theme file and approved experience file, written together by /api/internal/apply.",
    es: "Archivo de tema aprobado y archivo de experiencia aprobado, escritos juntos por /api/internal/apply.",
  },
  compatible: {
    en: "The only explicit public save/approval action.",
    es: "La única acción explícita de guardado/aprobación pública.",
  },
  incompatible: {
    en: "Does not publish unsaved section drafts. Cannot overwrite WCDA Factory. Section Apply never writes Current.",
    es: "No publica borradores de sección sin aplicar. No puede sobrescribir WCDA Factory. Aplicar sección nunca escribe Current.",
  },
  persist: {
    en: "Atomic write with rollback: if Experience fails after Theme was written, Theme is restored. A fresh public page and a fresh Lab preview then both read the same approved files. Lab localStorage drafts cannot override public Current.",
    es: "Escritura atómica con rollback: si Experiencia falla después de escribir Tema, se restaura Tema. Una página pública nueva y el Lab leen los mismos archivos aprobados. El localStorage del Lab no puede anular Current público.",
  },
});

add("recovery-reset-all", "recovery", "lab", {
  label: { en: "Reset All to Current", es: "Restablecer todo a Current" },
  what: {
    en: "Discards Custom and every unsaved section draft, then restores the latest WCDA Current.",
    es: "Descarta Custom y todos los borradores de sección, y restaura la última versión de WCDA Current.",
  },
  see: {
    en: "Preview matches Current. Factory is unchanged. Current files are not written.",
    es: "La vista previa coincide con Current. Factory no cambia. No se escriben archivos de Current.",
  },
  where: { en: "Custom working copy only.", es: "Solo la copia de trabajo Custom." },
  compatible: { en: "Safe anytime. Does not write Current or Factory.", es: "Seguro en cualquier momento. No escribe Current ni Factory." },
  incompatible: {
    en: "Discards staged Custom. Does not publish.",
    es: "Descarta Custom preparado. No publica.",
  },
  persist: persistLabOnly(),
});

add("section-apply", "recovery", "lab", {
  label: { en: "Apply Section", es: "Aplicar sección" },
  what: {
    en: "Section Apply saves this section to Custom only. It does not change WCDA Current.",
    es: "Aplicar sección guarda únicamente esta sección en Custom. No cambia WCDA Current.",
  },
  see: {
    en: "Section status becomes Applied to Custom. Other sections stay as they are.",
    es: "El estado de la sección pasa a Aplicado a Custom. Las demás secciones no cambian.",
  },
  where: { en: "Custom staged snapshot. Not public Current.", es: "Instantánea Custom. No es Current público." },
  compatible: { en: "Brand, Colors, Typography, Media, Containers, Motion, Special Effects.", es: "Marca, Colores, Tipografía, Media, Contenedores, Movimiento, Efectos especiales." },
  incompatible: {
    en: "Does not write Factory or Current.",
    es: "No escribe Factory ni Current.",
  },
  persist: persistLabOnly(),
});

add("section-reset", "recovery", "lab", {
  label: { en: "Reset Section", es: "Restablecer sección" },
  what: {
    en: "Restores only this section to its last Applied-to-Custom snapshot.",
    es: "Restaura solo esta sección a su última instantánea Aplicado a Custom.",
  },
  see: {
    en: "Unsaved edits in this section disappear. Other sections are untouched.",
    es: "Desaparecen las ediciones sin guardar de esta sección. Las demás no se tocan.",
  },
  where: { en: "Custom staged snapshot. Not Current.", es: "Instantánea Custom. No es Current." },
  compatible: { en: "Any staged Lab section.", es: "Cualquier sección del laboratorio." },
  incompatible: {
    en: "Does not write Factory or Current. Does not reset other sections.",
    es: "No escribe Factory ni Current. No restablece otras secciones.",
  },
  persist: persistLabOnly(),
});

add("recovery-copy-theme", "recovery", "lab", {
  label: { en: "Copy theme config", es: "Copiar configuración de tema" },
  what: {
    en: "Copies the current Theme JSON for internal debugging.",
    es: "Copia el JSON de Theme actual para depuración interna.",
  },
  see: { en: "Clipboard updates.", es: "Se actualiza el portapapeles." },
  where: { en: "Internal Theme architecture.", es: "Arquitectura interna de Theme." },
  compatible: { en: "Any Custom state.", es: "Cualquier estado Custom." },
  incompatible: {
    en: "Does not save Current.",
    es: "No guarda Current.",
  },
  persist: persistLabOnly(),
});

add("recovery-copy-experience", "recovery", "lab", {
  label: { en: "Copy experience config", es: "Copiar configuración de experiencia" },
  what: {
    en: "Copies the current Experience JSON for internal debugging.",
    es: "Copia el JSON de Experience actual para depuración interna.",
  },
  see: { en: "Clipboard updates.", es: "Se actualiza el portapapeles." },
  where: {
    en: "Internal Experience architecture.",
    es: "Arquitectura interna de Experience.",
  },
  compatible: { en: "Any Custom state.", es: "Cualquier estado Custom." },
  incompatible: {
    en: "Does not save Current.",
    es: "No guarda Current.",
  },
  persist: persistLabOnly(),
});

add("media-asset", "media", "experience", {
  label: { en: "Change Image", es: "Cambiar imagen" },
  what: {
    en: "Opens the visual picker to drop, choose, or select an image for this target.",
    es: "Elige una imagen para este destino: arrastrar, elegir archivo o seleccionar de la galería.",
  },
  see: {
    en: "The selected image appears immediately in Preview. Apply saves only this image to Custom.",
    es: "La imagen seleccionada aparece de inmediato en Preview. Aplicar guarda solo esta imagen en Custom.",
  },
  where: {
    en: "Only media-composer targets (not marquee, not Primary CTA).",
    es: "Solo destinos con compositor de media (no marquee, no CTA primario).",
  },
  compatible: {
    en: "Header Logo, heroes, doctor, cards, treatments, technology, contact, about media.",
    es: "Logo, héroes, doctor, tarjetas, tratamientos, tecnología, contacto y about.",
  },
  incompatible: {
    en: "Not applicable to Services Marquee or Primary CTA.",
    es: "No aplica al marquee de servicios ni al CTA primario.",
  },
  persist: persistExperience(),
});

add("media-scale", "media", "experience", {
  label: { en: "Scale / zoom", es: "Escala / zoom" },
  termNote: {
    en: "Scale / Zoom enlarges the image inside the container.",
    es: "Scale / Zoom: aumenta o reduce visualmente la imagen dentro de su contenedor.",
  },
  what: {
    en: "Visually enlarges or reduces the image inside its container.",
    es: "Aumenta o reduce visualmente la imagen dentro de su contenedor.",
  },
  see: {
    en: "The picture zooms. The container size does not change.",
    es: "La imagen se acerca. El tamaño físico del contenedor no cambia.",
  },
  where: {
    en: "Selected media-composer element only.",
    es: "Solo el elemento de media seleccionado.",
  },
  compatible: {
    en: "Images and logos.",
    es: "Imágenes y logos.",
  },
  incompatible: {
    en: "Not applicable to text-only, marquee, or non-media targets.",
    es: "No aplica a texto, marquee o elementos sin media.",
  },
  persist: persistExperience(),
});

add("media-x", "media", "experience", {
  label: { en: "Horizontal Position", es: "Posición horizontal" },
  what: {
    en: "Slides the image horizontally inside the frame (object-position).",
    es: "Desliza la imagen en horizontal dentro del marco (object-position).",
  },
  see: {
    en: "The focal point moves left or right.",
    es: "El punto focal se mueve a izquierda o derecha.",
  },
  where: { en: "Selected media slot.", es: "Hueco de media seleccionado." },
  compatible: { en: "Images and logos.", es: "Imágenes y logos." },
  incompatible: {
    en: "Has little effect when Fit is Contain and the image already fits.",
    es: "Casi no se nota si Fit es Contener y la imagen ya cabe.",
  },
  persist: persistExperience(),
});

add("media-y", "media", "experience", {
  label: { en: "Vertical Position", es: "Posición vertical" },
  what: {
    en: "Slides the image vertically inside the frame.",
    es: "Desliza la imagen en vertical dentro del marco.",
  },
  see: {
    en: "The focal point moves up or down.",
    es: "El punto focal sube o baja.",
  },
  where: { en: "Selected media slot.", es: "Hueco de media seleccionado." },
  compatible: { en: "Images and logos.", es: "Imágenes y logos." },
  incompatible: {
    en: "Does not move neighboring text.",
    es: "No mueve el texto vecino.",
  },
  persist: persistExperience(),
});

add("media-fit", "media", "experience", {
  label: { en: "Fit", es: "Ajuste (Fit)" },
  termNote: {
    en: "Object Fit defines how the image fills its box. Cover fills and may crop. Contain shows the whole image and may leave gaps.",
    es: "Object Fit / Ajuste de imagen: define cómo llena la imagen su contenedor. Cover (Cubrir) llena todo y puede recortar bordes. Contain (Contener) muestra la imagen completa aunque deje espacio libre.",
  },
  what: {
    en: "Sets CSS object-fit for the selected image or logo.",
    es: "Define el object-fit CSS de la imagen o logo seleccionado.",
  },
  see: {
    en: "Cover crops to fill. Contain letterboxes the image.",
    es: "Cubrir recorta para llenar. Contener deja bandas si hace falta.",
  },
  where: { en: "Selected media slot.", es: "Hueco de media seleccionado." },
  compatible: { en: "All composer targets.", es: "Todos los destinos con compositor." },
  incompatible: {
    en: "Not shown for marquee or CTA.",
    es: "No se muestra para marquee o CTA.",
  },
  persist: persistExperience(),
});

add("media-size", "media", "experience", {
  label: { en: "Container size", es: "Tamaño del contenedor" },
  what: {
    en: "Chooses a size preset for the media well (small to xl).",
    es: "Elige un preajuste de tamaño del recuadro de media (small a xl).",
  },
  see: {
    en: "The media frame grows or shrinks.",
    es: "El marco de media crece o se reduce.",
  },
  where: {
    en: "Non-logo composer targets.",
    es: "Destinos con compositor que no son logo.",
  },
  compatible: {
    en: "Hero, doctor, cards, treatments, technology, contact, about.",
    es: "Héroe, doctor, tarjetas, tratamientos, tecnología, contacto, about.",
  },
  incompatible: {
    en: "Header Logo uses Logo Width instead.",
    es: "El Logo del encabezado usa Ancho de logo.",
  },
  persist: persistExperience(),
});

add("media-logo-width", "media", "experience", {
  label: { en: "Logo width", es: "Ancho de logo" },
  what: {
    en: "Sets the header logo’s maximum width preset.",
    es: "Define el ancho máximo preajustado del logo del encabezado.",
  },
  see: {
    en: "The logo occupies more or less of the header strip.",
    es: "El logo ocupa más o menos de la franja del encabezado.",
  },
  where: { en: "Header Logo only.", es: "Solo Logo del encabezado." },
  compatible: { en: "Header Logo.", es: "Logo del encabezado." },
  incompatible: {
    en: "Not available for photographs or cards.",
    es: "No disponible para fotografías o tarjetas.",
  },
  persist: persistExperience(),
});

add("media-padding", "media", "experience", {
  label: { en: "Media / logo padding", es: "Relleno de media / logo" },
  what: {
    en: "Insets the image inside its well.",
    es: "Mete la imagen hacia adentro de su recuadro.",
  },
  see: {
    en: "A gap appears or disappears around the asset.",
    es: "Aparece o desaparece un margen alrededor del recurso.",
  },
  where: { en: "Selected composer target.", es: "Destino de compositor seleccionado." },
  compatible: { en: "Images and logos.", es: "Imágenes y logos." },
  incompatible: {
    en: "Does not pad the marquee.",
    es: "No rellena el marquee.",
  },
  persist: persistExperience(),
});

add("media-align", "media", "experience", {
  label: { en: "Logo alignment", es: "Alineación del logo" },
  what: {
    en: "Aligns the header logo left or center and recenters Position X.",
    es: "Alinea el logo a la izquierda o al centro y recentra la Posición X.",
  },
  see: {
    en: "The mark sits left or centered in the header strip.",
    es: "La marca queda a la izquierda o centrada en la franja.",
  },
  where: { en: "Header Logo only.", es: "Solo Logo del encabezado." },
  compatible: { en: "Header Logo.", es: "Logo del encabezado." },
  incompatible: {
    en: "Not shown for photographs.",
    es: "No se muestra para fotografías.",
  },
  persist: persistExperience(),
});

add("media-preview-bg", "media", "experience", {
  label: { en: "Preview background", es: "Fondo de vista previa" },
  what: {
    en: "Sets a Lab-only backdrop (including checkerboard) to judge transparency and contrast.",
    es: "Define un fondo solo de laboratorio (incluido el damero) para juzgar transparencia y contraste.",
  },
  see: {
    en: "Transparent logos reveal checkerboard or brand tints. A contrast warning may appear.",
    es: "Los logos transparentes muestran damero o tintes de marca. Puede aparecer aviso de contraste.",
  },
  where: {
    en: "Lab inspection of the selected asset. Public pages keep their real section backgrounds.",
    es: "Inspección de laboratorio del recurso. Las páginas públicas conservan sus fondos reales.",
  },
  compatible: { en: "Composer targets.", es: "Destinos con compositor." },
  incompatible: {
    en: "Checkerboard is a Lab aid, not a public design.",
    es: "El damero es una ayuda del Lab, no un diseño público.",
  },
  persist: persistExperience(),
});

add("media-style", "media", "experience", {
  label: { en: "Media container style", es: "Estilo de contenedor de media" },
  what: {
    en: "Applies the media-side visual treatment paired with a container preset.",
    es: "Aplica el tratamiento visual de media asociado a un preajuste de contenedor.",
  },
  see: {
    en: "Corners, badge chrome, or video chrome around the image change.",
    es: "Cambian esquinas, insignias o cromado de video alrededor de la imagen.",
  },
  where: { en: "Selected target’s media style.", es: "Estilo de media del destino." },
  compatible: {
    en: "Filtered per target. Header Logo uses strip styles only.",
    es: "Filtrado por destino. El logo usa solo estilos de franja.",
  },
  incompatible: {
    en: "Video/Carousel chrome here is visual only and does not enable those systems. Floating Badge and Rotating Badge are no longer normal container choices — use Inset Badge Cutout in Containers. Action styles appear only on interactive card targets.",
    es: "El cromado Video/Carousel aquí es solo visual y no activa esos sistemas. Floating Badge y Rotating Badge ya no son opciones normales de contenedor — use Recorte con insignia integrada en Contenedores. Los estilos de acción solo aparecen en destinos de tarjeta interactivos.",
  },
  persist: persistExperience(),
});

add("media-aspect", "media", "experience", {
  label: { en: "Aspect ratio (global)", es: "Relación de aspecto (global)" },
  termNote: {
    en: "GLOBAL MEDIA SETTING. This control affects all compatible media elements, not only the currently selected element.",
    es: "CONFIGURACIÓN GLOBAL DE IMÁGENES. Este control afecta todos los elementos de imagen compatibles, no solamente el elemento seleccionado actualmente.",
  },
  what: {
    en: "Sets one aspect ratio for every compatible media well on the site.",
    es: "Define una relación de aspecto para todos los recuadros de media compatibles.",
  },
  see: {
    en: "Compatible photos lock to Auto, 1:1, 4:3, 3:4, or 16:9 after Apply. Auto keeps each component’s own ratio.",
    es: "Las fotos compatibles usan Auto, 1:1, 4:3, 3:4 o 16:9 tras Aplicar. Auto conserva el ratio de cada componente.",
  },
  where: {
    en: "Scope: Global. Stored as experience.media.aspectRatio. Not per selected element.",
    es: "Alcance: Global. Se guarda en experience.media.aspectRatio. No es por elemento.",
  },
  compatible: {
    en: "Hero, doctor, about, service cards, treatments, technology, contact media.",
    es: "Héroe, doctor, about, tarjetas de servicio, tratamientos, tecnología y contacto.",
  },
  incompatible: {
    en: "Header Logo, Services Marquee, Primary CTA. Does not silently no-op: those targets hide this control.",
    es: "Logo del encabezado, marquee y CTA primario. No queda inerte: esos destinos ocultan el control.",
  },
  persist: {
    en: "Saved with Apply Custom as Current. Public and Lab preview both use the approved global value.",
    es: "Se guarda con Aplicar Custom como versión actual. Público y Lab usan el valor global aprobado.",
  },
});

add("media-radius", "media", "experience", {
  label: { en: "Media radius (global)", es: "Radio de media (global)" },
  termNote: {
    en: "GLOBAL MEDIA SETTING. This control affects all compatible media elements, not only the currently selected element.",
    es: "CONFIGURACIÓN GLOBAL DE IMÁGENES. Este control afecta todos los elementos de imagen compatibles, no solamente el elemento seleccionado actualmente.",
  },
  what: {
    en: "Sets one corner radius for compatible media wells.",
    es: "Define un radio de esquina para los recuadros de media compatibles.",
  },
  see: {
    en: "Photographs round more or less across compatible frames after Apply.",
    es: "Las fotografías se redondean más o menos en los marcos compatibles tras Aplicar.",
  },
  where: {
    en: "Scope: Global. Stored as experience.media.radius.",
    es: "Alcance: Global. Se guarda en experience.media.radius.",
  },
  compatible: {
    en: "Hero, doctor, about, service cards, treatments, technology, contact media.",
    es: "Héroe, doctor, about, tarjetas, tratamientos, tecnología y contacto.",
  },
  incompatible: {
    en: "Header Logo, Marquee, Primary CTA. May compete with Inset Badge Cutout’s own mask.",
    es: "Logo, marquee y CTA. Puede competir con la máscara de Recorte con insignia integrada.",
  },
  persist: {
    en: "Saved with Apply. Public pages consume the approved global radius.",
    es: "Se guarda con Aplicar. Las páginas públicas usan el radio global aprobado.",
  },
});

add("media-overlay", "media", "experience", {
  label: { en: "Overlay (global)", es: "Superposición (global)" },
  termNote: {
    en: "GLOBAL MEDIA SETTING. This control affects all compatible media elements, not only the currently selected element.",
    es: "CONFIGURACIÓN GLOBAL DE IMÁGENES. Este control afecta todos los elementos de imagen compatibles, no solamente el elemento seleccionado actualmente.",
  },
  what: {
    en: "Tints every compatible photograph with none, light, dark, or brand wash.",
    es: "Tiñe todas las fotografías compatibles con ninguno, claro, oscuro o tinte de marca.",
  },
  see: {
    en: "A wash appears over compatible photos after Apply when Overlay is not None.",
    es: "Tras Aplicar, un velo cubre las fotos compatibles si Overlay no es Ninguna.",
  },
  where: {
    en: "Scope: Global. Stored as experience.media.overlay. Public html[data-exp-overlay].",
    es: "Alcance: Global. Se guarda en experience.media.overlay. Público html[data-exp-overlay].",
  },
  compatible: {
    en: "Hero, doctor, about, service cards, treatments, technology, contact media.",
    es: "Héroe, doctor, about, tarjetas, tratamientos, tecnología y contacto.",
  },
  incompatible: {
    en: "Header Logo, Marquee, Primary CTA. Separate from Video overlay.",
    es: "Logo, marquee y CTA. Distinto del overlay de Video.",
  },
  persist: {
    en: "Saved with Apply. Public and Lab consume the same approved overlay.",
    es: "Se guarda con Aplicar. Público y Lab usan el mismo overlay aprobado.",
  },
});

add("container-preset", "containers", "experience", {
  label: { en: "Container preset", es: "Preajuste de contenedor" },
  what: {
    en: "Chooses the geometric treatment of the selected media or card. The list is context-aware: only meaningful presets for this target are shown. Lab cycling is diagnostic and unsaved until Apply.",
    es: "Elige el tratamiento geométrico de la media o tarjeta seleccionada. La lista es contextual: solo se muestran preajustes con sentido para este destino. Cambiar preajustes en el Lab es diagnóstico y no se guarda hasta Aplicar.",
  },
  see: {
    en: "Shape, clip, integrated badge silhouette, or chrome around the selected target changes immediately in preview.",
    es: "Cambian forma, recorte, silueta de insignia integrada o cromado alrededor del destino seleccionado en la vista previa.",
  },
  where: {
    en: "Selected element only. Theme colors stay global. Not a public diagnostic control.",
    es: "Solo el elemento seleccionado. Los colores del tema siguen globales. No es un control diagnóstico público.",
  },
  compatible: {
    en: "Only presets listed for that target are offered. Inset Badge Cutout is the canonical badge/media composition for doctor portraits and branded feature media.",
    es: "Solo se ofrecen los preajustes listados para ese destino. Recorte con insignia integrada es la composición canónica de insignia/media para retratos de doctores y contenido destacado de marca.",
  },
  incompatible: {
    en: "Header Logo uses strip styles, not card containers. Marquee has no container presets. Corner/Top/Bottom Action appear only on real links, CTAs, or interactive destinations — never on static portraits. Carousel Card Chrome is only for carousel/card-capable targets. Video Card Chrome is only for video-capable or poster targets. Floating Badge, Badge Card, and Integrated Cutout are hidden from the general list; their useful behavior lives in Inset Badge Cutout.",
    es: "El logo usa franjas, no tarjetas. El marquee no tiene preajustes de contenedor. Corner/Top/Bottom Action solo aparecen en enlaces reales, CTAs o destinos interactivos — nunca en retratos estáticos. Carousel Card Chrome solo aplica a destinos de carrusel/tarjeta. Video Card Chrome solo aplica a media con video o póster. Floating Badge, Badge Card e Integrated Cutout están ocultos de la lista general; su comportamiento útil vive en Recorte con insignia integrada.",
  },
  persist: {
    en: "Preview now. Apply Custom as Current writes the selected target’s preset. Cycling without Apply does not change Current. Container geometry owns visible radius except Clean, which follows Global Media Radius. Media Overlay Chrome owns its gradient; Global Overlay is ignored on that preset.",
    es: "Vista previa inmediata. Aplicar Custom como versión actual escribe el preajuste del destino. Cambiar sin Aplicar no cambia Current. La geometría del contenedor posee el radio visible salvo Clean, que sigue el Radio de media global. Media Overlay Chrome posee su degradado; Overlay global se ignora en ese preajuste.",
  },
});

add("container-circle-size", "containers", "experience", {
  label: { en: "Circle Size", es: "Tamaño del círculo" },
  what: {
    en: "Sets the diameter of Container 05’s integrated circular badge and cutout together.",
    es: "Define el diámetro de la insignia circular integrada y del receso del Contenedor 05 a la vez.",
  },
  see: {
    en: "The badge and the concave cutout scale together in live preview. Left and bottom inset stay the same.",
    es: "La insignia y el receso cóncavo escalan juntos en la vista previa. El inset izquierdo e inferior no cambian.",
  },
  where: {
    en: "Selected element only, and only when Container 05 Inset Badge Cutout is active.",
    es: "Solo el elemento seleccionado, y solo cuando Contenedor 05 Insignia Integrada está activo.",
  },
  compatible: {
    en: "Container 05 on badge-compatible media targets.",
    es: "Contenedor 05 en destinos de media compatibles con insignia.",
  },
  incompatible: {
    en: "Other container presets. Logo, marquee, and targets that do not offer Container 05.",
    es: "Otros preajustes de contenedor. Logo, marquee y destinos que no ofrecen el Contenedor 05.",
  },
  persist: persistExperience(),
});

add("container-surface-intensity", "containers", "experience", {
  label: { en: "Surface lightness", es: "Claridad del fondo" },
  what: {
    en: "Adjusts only the lightness of the selected card background. 0% is the original color. Positive values lighten. Negative values darken. Text, borders, and content remain unchanged.",
    es: "Ajusta únicamente la claridad del fondo de la tarjeta seleccionada. 0% es el color original. Los valores positivos aclaran. Los valores negativos oscurecen. El texto, los bordes y el contenido no cambian.",
  },
  see: {
    en: "The selected card family’s fill gets lighter toward white or darker toward black. 0% matches the original surface exactly.",
    es: "El relleno de la familia de tarjetas se aclara hacia el blanco o se oscurece hacia el negro. 0% coincide exactamente con la superficie original.",
  },
  where: {
    en: "Selected compatible card family only. Not a global recolor of unrelated cards.",
    es: "Solo la familia de tarjetas compatible seleccionada. No recolorea tarjetas no relacionadas.",
  },
  compatible: {
    en: "Patient Resource cards, Service cards, Editorial cards, and other standard card surfaces that use a semantic background fill.",
    es: "Tarjetas de recursos para pacientes, tarjetas de servicio, tarjetas editoriales y otras superficies de tarjeta con relleno semántico.",
  },
  incompatible: {
    en: "Header Logo, transparent media, marquee, Inset Badge Cutout / Integrated Cutout geometry, decorative effects, and elements without a surface background.",
    es: "Logo del encabezado, media transparente, marquee, geometría de Recorte con insignia integrada, efectos decorativos y elementos sin fondo de superficie.",
  },
  persist: {
    en: "Preview now. Apply Section stores it on Custom. Reset Section restores the Custom snapshot. Apply All as Current writes it to the public experience. Factory is never overwritten.",
    es: "Vista previa inmediata. Aplicar sección lo guarda en Custom. Restablecer sección restaura la instantánea Custom. Aplicar todo como versión actual lo escribe en la experiencia pública. Factory nunca se sobrescribe.",
  },
});

add("motion-entrance", "motion", "experience", {
  label: { en: "Entrance", es: "Entrada" },
  what: {
    en: "Chooses the entrance animation for compatible media and cards.",
    es: "Elige la animación de entrada de media y tarjetas compatibles.",
  },
  see: {
    en: "On scroll-in, compatible elements fade, slide, scale, or reveal once. They start visible if JavaScript is off.",
    es: "Al entrar en vista, los elementos compatibles aparecen una vez. Si no hay JavaScript, permanecen visibles.",
  },
  where: {
    en: "Approved Experience motion.entrance on public pages and Lab preview. Not Theme Lab-only.",
    es: "Experience.motion.entrance aprobado en páginas públicas y en el Lab. No es solo del Lab.",
  },
  compatible: {
    en: "Hero, doctor, cards, CTA, treatments, technology, contact, about media.",
    es: "Héroe, doctor, tarjetas, CTA, tratamientos, tecnología, contacto y about.",
  },
  incompatible: {
    en: "Header Logo and Services Marquee. Marquee has its own animation. Reduced-motion disables this.",
    es: "Logo y marquee. El marquee tiene su animación. Reduced-motion lo desactiva.",
  },
  persist: {
    en: "Saved with Apply. After Apply, a fresh public page and Lab preview both play the approved motion. Preview uses live editor values until Apply.",
    es: "Se guarda con Aplicar. Tras Aplicar, una página pública nueva y el Lab usan el motion aprobado. La vista previa usa el editor hasta Aplicar.",
  },
});

add("motion-duration", "motion", "experience", {
  label: { en: "Duration", es: "Duración" },
  what: {
    en: "Sets how long the public entrance transition lasts.",
    es: "Define cuánto dura la transición de entrada pública.",
  },
  see: {
    en: "Compatible elements animate faster or slower on scroll-in. Preview uses the live editor value; public uses approved Current after Apply.",
    es: "Los elementos compatibles animan más rápido o más lento al entrar en vista. La vista previa usa el editor; el público usa Current tras Aplicar.",
  },
  where: {
    en: "Approved Experience motion.duration CSS variable on public pages and Lab preview.",
    es: "Variable CSS de Experience.motion.duration en páginas públicas y en el Lab.",
  },
  compatible: {
    en: "Same targets as Entrance.",
    es: "Los mismos destinos que Entrada.",
  },
  incompatible: {
    en: "No effect when Entrance is None, on Header Logo or Marquee, or when prefers-reduced-motion is reduce.",
    es: "Sin efecto si Entrada es None, en Logo o marquee, o con prefers-reduced-motion.",
  },
  persist: {
    en: "Saved with Apply. Reduced-motion users never see this duration.",
    es: "Se guarda con Aplicar. Quien pide reduced-motion no ve esta duración.",
  },
});

add("motion-intensity", "motion", "experience", {
  label: { en: "Intensity", es: "Intensidad" },
  what: {
    en: "Sets travel distance for slide and fade-up/down public motion.",
    es: "Define la distancia de recorrido en deslizamientos y fade-up/down públicos.",
  },
  see: {
    en: "Elements travel a shorter or longer distance once, then stay put.",
    es: "Los elementos recorren menos o más distancia una vez y se quedan.",
  },
  where: {
    en: "Approved Experience motion.intensity on public pages and Lab preview.",
    es: "Experience.motion.intensity aprobado en páginas públicas y en el Lab.",
  },
  compatible: { en: "Fade-up/down and slides.", es: "Fade-up/down y deslizamientos." },
  incompatible: {
    en: "Barely visible for Fade or None. Disabled under prefers-reduced-motion. Not Header Logo or Marquee.",
    es: "Casi no se nota en Fade o None. Se desactiva con reduced-motion. No Logo ni marquee.",
  },
  persist: {
    en: "Saved with Apply. Public and Lab Current use the same approved intensity.",
    es: "Se guarda con Aplicar. Público y Lab Current usan la misma intensidad aprobada.",
  },
});

add("motion-delay", "motion", "experience", {
  label: { en: "Delay", es: "Retraso" },
  what: {
    en: "Waits before a below-the-fold entrance starts. Already-visible elements stay visible and do not hide first.",
    es: "Espera antes de iniciar una entrada fuera de vista. Los elementos ya visibles no se ocultan primero.",
  },
  see: {
    en: "Off-screen elements wait, then animate once on scroll-in.",
    es: "Los elementos fuera de pantalla esperan y animan una vez al entrar.",
  },
  where: {
    en: "Approved Experience motion.delay on public pages and Lab preview.",
    es: "Experience.motion.delay aprobado en páginas públicas y en el Lab.",
  },
  compatible: { en: "Same targets as Entrance.", es: "Los mismos destinos que Entrada." },
  incompatible: {
    en: "Ignored when Entrance is None or prefers-reduced-motion is reduce. Not Header Logo or Marquee.",
    es: "Se ignora si Entrada es None o hay reduced-motion. No Logo ni marquee.",
  },
  persist: {
    en: "Saved with Apply. Does not create an initial invisible-content trap on first paint.",
    es: "Se guarda con Aplicar. No crea una trampa de contenido invisible en la primera pintura.",
  },
});

add("marquee-enabled", "effects", "experience", {
  label: { en: "Marquee enabled", es: "Marquee activado" },
  what: {
    en: "Turns the services marquee on or off.",
    es: "Enciende o apaga el marquee de servicios.",
  },
  see: {
    en: "The scrolling bar appears or is removed on Home.",
    es: "La barra en movimiento aparece o se quita en Inicio.",
  },
  where: { en: "Services Marquee target / Home.", es: "Destino marquee / Inicio." },
  compatible: { en: "Only the marquee element.", es: "Solo el elemento marquee." },
  incompatible: {
    en: "Not available for Header Logo or cards.",
    es: "No disponible para Logo del encabezado o tarjetas.",
  },
  persist: persistExperience(),
});

add("marquee-layout", "effects", "experience", {
  label: { en: "Marquee layout", es: "Diseño del marquee" },
  what: {
    en: "Text only or icon plus text items.",
    es: "Solo texto o icono más texto.",
  },
  see: {
    en: "Icons appear or hide beside service names.",
    es: "Los iconos aparecen o se ocultan junto a los nombres.",
  },
  where: { en: "Marquee only.", es: "Solo marquee." },
  compatible: { en: "Enabled marquee.", es: "Marquee activado." },
  incompatible: { en: "Requires marquee enabled.", es: "Requiere marquee activo." },
  persist: persistExperience(),
});

add("marquee-spacing", "effects", "experience", {
  label: { en: "Item spacing", es: "Espaciado de ítems" },
  what: { en: "Gaps between marquee items.", es: "Huecos entre ítems del marquee." },
  see: { en: "Items pack tighter or wider.", es: "Los ítems se juntan o se separan." },
  where: { en: "Marquee only.", es: "Solo marquee." },
  compatible: { en: "Enabled marquee.", es: "Marquee activado." },
  incompatible: { en: "Requires marquee enabled.", es: "Requiere marquee activo." },
  persist: persistExperience(),
});

add("marquee-height", "effects", "experience", {
  label: { en: "Bar height", es: "Alto de barra" },
  what: { en: "Vertical size of the marquee bar.", es: "Tamaño vertical de la barra." },
  see: { en: "The bar grows or shrinks.", es: "La barra crece o se reduce." },
  where: { en: "Marquee only.", es: "Solo marquee." },
  compatible: { en: "Enabled marquee.", es: "Marquee activado." },
  incompatible: { en: "Requires marquee enabled.", es: "Requiere marquee activo." },
  persist: persistExperience(),
});

add("marquee-speed", "effects", "experience", {
  label: { en: "Speed", es: "Velocidad" },
  what: { en: "Scroll duration (slow 48s / medium 28s).", es: "Duración del scroll (lenta 48s / media 28s)." },
  see: { en: "Text crawls faster or slower.", es: "El texto se mueve más rápido o más lento." },
  where: { en: "Marquee only.", es: "Solo marquee." },
  compatible: { en: "Enabled marquee.", es: "Marquee activado." },
  incompatible: {
    en: "Reduced-motion disables the animation.",
    es: "Reduced-motion desactiva la animación.",
  },
  persist: persistExperience(),
});

add("marquee-dir", "effects", "experience", {
  label: { en: "Direction", es: "Dirección" },
  what: { en: "Scroll left or right.", es: "Desplaza a izquierda o derecha." },
  see: { en: "The crawl reverses.", es: "El desplazamiento se invierte." },
  where: { en: "Marquee only.", es: "Solo marquee." },
  compatible: { en: "Enabled marquee.", es: "Marquee activado." },
  incompatible: { en: "Requires marquee enabled.", es: "Requiere marquee activo." },
  persist: persistExperience(),
});

add("marquee-pause", "effects", "experience", {
  label: { en: "Pause on hover", es: "Pausar al pasar el cursor" },
  what: { en: "Stops the crawl while the pointer is over the bar.", es: "Detiene el movimiento con el cursor encima." },
  see: { en: "Hover freezes items; leave resumes.", es: "Al pasar el cursor se congelan; al salir siguen." },
  where: { en: "Marquee only.", es: "Solo marquee." },
  compatible: { en: "Pointer devices.", es: "Dispositivos con puntero." },
  incompatible: {
    en: "Touch has no hover; reduced-motion already stops motion.",
    es: "El tacto no tiene hover; reduced-motion ya detiene el movimiento.",
  },
  persist: persistExperience(),
});

add("marquee-surface", "effects", "experience", {
  label: { en: "Surface", es: "Superficie" },
  what: { en: "Paints the bar with primary, secondary, accent, or dark.", es: "Pinta la barra con primario, secundario, acento u oscuro." },
  see: { en: "Bar background color changes.", es: "Cambia el color de fondo de la barra." },
  where: { en: "Marquee only.", es: "Solo marquee." },
  compatible: { en: "Uses Theme colors.", es: "Usa colores del Theme." },
  incompatible: { en: "Requires marquee enabled.", es: "Requiere marquee activo." },
  persist: persistExperience(),
});

add("video-enabled", "effects", "experience", {
  label: { en: "Video enabled", es: "Video activado" },
  what: { en: "Enables the video preview card system.", es: "Activa el sistema de tarjeta de video." },
  see: { en: "Play chrome appears on video-capable media when the component is present.", es: "Aparece el cromado de play en media con video si el componente está presente." },
  where: {
    en: "Home Hero Media and Technology Media (Lab). Public only where VideoPreviewCard is mounted.",
    es: "Home Hero y Technology (Lab). En público solo donde está VideoPreviewCard.",
  },
  compatible: { en: "Video-capable targets.", es: "Destinos con video." },
  incompatible: {
    en: "Not available for Header Logo. Video Card Chrome container does not enable this by itself.",
    es: "No disponible para Logo. El contenedor Video Card Chrome no activa esto por sí solo.",
  },
  persist: persistExperience(),
});

add("video-mode", "effects", "experience", {
  label: { en: "Video mode", es: "Modo de video" },
  what: {
    en: "Modal preview, external YouTube tab, or inline embed.",
    es: "Vista modal, pestaña externa de YouTube o embed en línea.",
  },
  see: {
    en: "Play opens a dialog, a new tab, or an inline frame. ESC closes modal. Focus returns to the opener.",
    es: "Play abre un diálogo, una pestaña o un iframe. ESC cierra el modal. El foco vuelve al origen.",
  },
  where: { en: "Video-capable targets with a URL configured.", es: "Destinos de video con URL configurada." },
  compatible: { en: "Requires Video enabled.", es: "Requiere Video activado." },
  incompatible: {
    en: "Embed without a YouTube URL does nothing.",
    es: "Embed sin URL de YouTube no hace nada.",
  },
  persist: persistExperience(),
});

add("video-poster", "effects", "experience", {
  label: { en: "Poster", es: "Póster" },
  what: { en: "Approved still vs placeholder poster.", es: "Foto aprobada o póster de relleno." },
  see: { en: "The still image behind play changes.", es: "Cambia la imagen fija detrás de play." },
  where: { en: "Video card.", es: "Tarjeta de video." },
  compatible: { en: "Requires Video enabled.", es: "Requiere Video activado." },
  incompatible: { en: "Not a photo composer asset picker.", es: "No es el selector de assets del compositor." },
  persist: persistExperience(),
});

add("video-play", "effects", "experience", {
  label: { en: "Play button style", es: "Estilo del botón play" },
  what: { en: "Solid, outline, or minimal play glyph.", es: "Glifo play sólido, outline o mínimo." },
  see: { en: "The play control’s weight changes.", es: "Cambia el peso visual del control play." },
  where: { en: "Video card.", es: "Tarjeta de video." },
  compatible: { en: "Requires Video enabled.", es: "Requiere Video activado." },
  incompatible: { en: "Hidden when video is off.", es: "Oculto si el video está apagado." },
  persist: persistExperience(),
});

add("video-overlay", "effects", "experience", {
  label: { en: "Video overlay", es: "Superposición de video" },
  what: { en: "Tint over the video poster.", es: "Tinte sobre el póster de video." },
  see: { en: "Poster looks lighter, darker, or brand-tinted.", es: "El póster se ve más claro, oscuro o con tinte de marca." },
  where: { en: "Video card.", es: "Tarjeta de video." },
  compatible: { en: "Requires Video enabled.", es: "Requiere Video activado." },
  incompatible: { en: "Separate from global media overlay.", es: "Es distinto del overlay global de media." },
  persist: persistExperience(),
});

add("video-container", "effects", "experience", {
  label: { en: "Video container variant", es: "Variante de contenedor de video" },
  what: { en: "Video Card, Media Overlay, or Clean around the player.", es: "Video Card, Media Overlay o Clean alrededor del reproductor." },
  see: { en: "Frame chrome around the poster changes.", es: "Cambia el cromado del marco del póster." },
  where: { en: "Video system container field.", es: "Campo de contenedor del sistema de video." },
  compatible: { en: "Requires Video enabled.", es: "Requiere Video activado." },
  incompatible: {
    en: "This is not the same as picking Video Card Chrome on a non-video target.",
    es: "No es lo mismo que elegir Video Card Chrome en un destino sin video.",
  },
  persist: persistExperience(),
});

add("video-corner", "effects", "experience", {
  label: { en: "Video corner action", es: "Acción de esquina del video" },
  what: { en: "None, info, or play glyph on the video card corner.", es: "Ninguna, info o play en la esquina de la tarjeta de video." },
  see: { en: "A corner control appears or hides.", es: "Aparece o se oculta un control de esquina." },
  where: { en: "Video card.", es: "Tarjeta de video." },
  compatible: { en: "Requires Video enabled.", es: "Requiere Video activado." },
  incompatible: {
    en: "Separate from the Corner Action effect used on doctor/cards.",
    es: "Es distinto del efecto Corner Action de doctor/tarjetas.",
  },
  persist: persistExperience(),
});

add("video-aspect", "effects", "experience", {
  label: { en: "Video aspect ratio", es: "Aspecto de video" },
  what: { en: "Locks the player to 16:9, 4:3, or 1:1.", es: "Fija el reproductor a 16:9, 4:3 o 1:1." },
  see: { en: "The poster frame proportion changes.", es: "Cambia la proporción del marco." },
  where: { en: "Video card.", es: "Tarjeta de video." },
  compatible: { en: "Requires Video enabled.", es: "Requiere Video activado." },
  incompatible: { en: "Independent from global media aspect.", es: "Independiente del aspecto global de media." },
  persist: persistExperience(),
});

add("carousel-enabled", "effects", "experience", {
  label: { en: "Carousel enabled", es: "Carrusel activado" },
  what: { en: "Wraps service cards in a carousel when that collection is rendered.", es: "Envuelve las tarjetas de servicio en un carrusel cuando esa colección se renderiza." },
  see: { en: "Cards paginate instead of a static grid.", es: "Las tarjetas se paginan en vez de una grilla estática." },
  where: {
    en: "Service Card Media on Home and Services.",
    es: "Service Card Media en Inicio y Servicios.",
  },
  compatible: { en: "Care-area collections.", es: "Colecciones de áreas de cuidado." },
  incompatible: {
    en: "Not available for Header Logo. Carousel Card Chrome does not enable this.",
    es: "No disponible para Logo. Carousel Card Chrome no activa esto.",
  },
  persist: persistExperience(),
});

add("carousel-view", "effects", "experience", {
  label: { en: "Cards per view", es: "Tarjetas por vista" },
  what: { en: "Requested desktop count. Viewport clamps: <640px → 1, <1024px → max 2.", es: "Cantidad pedida en escritorio. El viewport limita: <640px → 1, <1024px → máx. 2." },
  see: { en: "More or fewer cards visible at once on large screens.", es: "Más o menos tarjetas visibles a la vez en pantallas grandes." },
  where: { en: "Enabled carousel.", es: "Carrusel activado." },
  compatible: { en: "Requires Carousel enabled.", es: "Requiere Carrusel activo." },
  incompatible: {
    en: "Mobile always shows 1. Lab has no separate pause/keyboard/swipe toggles; those exist in the component.",
    es: "El móvil siempre muestra 1. El Lab no tiene toggles de pausa/teclado/swipe; existen en el componente.",
  },
  persist: persistExperience(),
});

add("carousel-nav", "effects", "experience", {
  label: { en: "Navigation", es: "Navegación" },
  what: { en: "Dots, arrows, or both.", es: "Puntos, flechas o ambos." },
  see: { en: "Pager controls appear under the track.", es: "Aparecen controles de página bajo la pista." },
  where: { en: "Enabled carousel.", es: "Carrusel activado." },
  compatible: { en: "Requires Carousel enabled.", es: "Requiere Carrusel activo." },
  incompatible: { en: "No effect if carousel is off.", es: "Sin efecto si el carrusel está apagado." },
  persist: persistExperience(),
});

add("carousel-auto", "effects", "experience", {
  label: { en: "Autoplay", es: "Reproducción automática" },
  what: { en: "Off or slow (6s). Pauses on hover, document hidden, or reduced-motion.", es: "Off o lenta (6s). Pausa con hover, pestaña oculta o reduced-motion." },
  see: { en: "The track advances by itself when Slow.", es: "La pista avanza sola si es Lenta." },
  where: { en: "Enabled carousel.", es: "Carrusel activado." },
  compatible: { en: "Requires Carousel enabled and more cards than per-view.", es: "Requiere Carrusel activo y más tarjetas que las visibles." },
  incompatible: {
    en: "Reduced-motion disables autoplay.",
    es: "Reduced-motion desactiva el autoplay.",
  },
  persist: persistExperience(),
});

add("carousel-transition", "effects", "experience", {
  label: { en: "Carousel Transition Speed", es: "Velocidad de transición del carrusel" },
  termNote: { en: "Transition duration", es: "Duración de la transición" },
  what: {
    en: "Sets how long one Home Areas of Dental Care page movement lasts, in milliseconds. Lower is faster. Higher is slower.",
    es: "Define cuánto dura un movimiento de página del carrusel de Áreas de cuidado dental en Inicio, en milisegundos. Menor es más rápido. Mayor es más lento.",
  },
  see: {
    en: "Only the visible slide duration changes. Loop, clones, easing, and layout stay the same.",
    es: "Solo cambia la duración visible del deslizamiento. El bucle, los clones, la curva y el diseño no cambian.",
  },
  where: {
    en: "Home → Areas of dental care carousel.",
    es: "Inicio → Carrusel de Áreas de cuidado dental.",
  },
  compatible: {
    en: "Home Care carousel only. Working updates immediately. Apply stores Custom. Publish writes Current.",
    es: "Solo el carrusel de cuidado en Inicio. Working se actualiza de inmediato. Aplicar guarda Custom. Publicar escribe Current.",
  },
  incompatible: {
    en: "Does not change easing, loop mechanics, /services grid, or other site animations. Reduced-motion still skips the animation.",
    es: "No cambia la curva, la mecánica del bucle, la grilla de /services ni otras animaciones. Reduced-motion sigue omitiendo la animación.",
  },
  persist: persistExperience(),
});

add("rotating-text", "effects", "experience", {
  label: { en: "Rotating badge text", es: "Texto de insignia rotatoria" },
  what: { en: "Circular caption around the rotating badge.", es: "Leyenda circular de la insignia rotatoria." },
  see: { en: "Words spin around the badge when that badge type is shown.", es: "Las palabras giran alrededor de la insignia cuando ese tipo se muestra." },
  where: {
    en: "Doctor/about/technology media using rotating or badge-card treatments.",
    es: "Media de doctor/about/tecnología con tratamiento rotating o badge-card.",
  },
  compatible: { en: "Badge-compatible targets.", es: "Destinos compatibles con insignia." },
  incompatible: {
    en: "Not available for Header Logo. Hidden unless a badge-capable element is selected.",
    es: "No disponible para Logo. Oculto si el elemento no admite insignia.",
  },
  persist: persistExperience(),
});

add("rotating-icon", "effects", "experience", {
  label: { en: "Center icon", es: "Icono central" },
  what: { en: "Tooth, sparkle, or plus in the badge hub.", es: "Diente, destello o plus en el centro." },
  see: { en: "The hub glyph changes.", es: "Cambia el glifo central." },
  where: { en: "Rotating badge.", es: "Insignia rotatoria." },
  compatible: { en: "Badge-compatible targets.", es: "Destinos con insignia." },
  incompatible: { en: "Not for Header Logo.", es: "No para Logo del encabezado." },
  persist: persistExperience(),
});

add("rotating-size", "effects", "experience", {
  label: { en: "Diameter", es: "Diámetro" },
  what: { en: "Small, medium, or large badge.", es: "Insignia pequeña, mediana o grande." },
  see: { en: "The circle grows or shrinks.", es: "El círculo crece o se reduce." },
  where: { en: "Rotating badge.", es: "Insignia rotatoria." },
  compatible: { en: "Badge-compatible targets.", es: "Destinos con insignia." },
  incompatible: {
    en: "Inset Badge Cutout uses its own cutout diameter, not this control alone.",
    es: "Recorte con insignia integrada usa su propio diámetro de recorte, no solo este control.",
  },
  persist: persistExperience(),
});

add("rotating-speed", "effects", "experience", {
  label: { en: "Rotation speed", es: "Velocidad de rotación" },
  what: { en: "Slow or very slow spin.", es: "Giro lento o muy lento." },
  see: { en: "Caption orbits faster or slower.", es: "La leyenda orbita más rápido o más lento." },
  where: { en: "Rotating badge.", es: "Insignia rotatoria." },
  compatible: { en: "Rotating type.", es: "Tipo rotating." },
  incompatible: {
    en: "Reduced-motion stops the spin.",
    es: "Reduced-motion detiene el giro.",
  },
  persist: persistExperience(),
});

add("rotating-dir", "effects", "experience", {
  label: { en: "Rotation direction", es: "Dirección de rotación" },
  what: { en: "Spin left or right.", es: "Giro a izquierda o derecha." },
  see: { en: "Orbit reverses.", es: "La órbita se invierte." },
  where: { en: "Rotating badge.", es: "Insignia rotatoria." },
  compatible: { en: "Rotating type.", es: "Tipo rotating." },
  incompatible: { en: "Static badges do not spin.", es: "Las insignias estáticas no giran." },
  persist: persistExperience(),
});

add("rotating-surface", "effects", "experience", {
  label: { en: "Badge surface", es: "Superficie de insignia" },
  what: { en: "Primary, secondary, accent, or dark fill.", es: "Relleno primario, secundario, acento u oscuro." },
  see: { en: "Badge color changes.", es: "Cambia el color de la insignia." },
  where: { en: "Rotating badge.", es: "Insignia rotatoria." },
  compatible: { en: "Uses Theme colors.", es: "Usa colores del Theme." },
  incompatible: { en: "Header Logo cannot use this.", es: "El Logo no puede usarlo." },
  persist: persistExperience(),
});

add("rotating-color", "effects", "experience", {
  label: { en: "Badge text color", es: "Color de texto de insignia" },
  what: { en: "Inverse, accent, or muted caption color.", es: "Color de leyenda inverso, acento o atenuado." },
  see: { en: "Spinning text contrast changes.", es: "Cambia el contraste del texto giratorio." },
  where: { en: "Rotating badge.", es: "Insignia rotatoria." },
  compatible: { en: "Rotating type.", es: "Tipo rotating." },
  incompatible: { en: "Does not recolor the logo.", es: "No recolorea el logo." },
  persist: persistExperience(),
});

add("rotating-pos", "effects", "experience", {
  label: { en: "Badge position", es: "Posición de insignia" },
  what: { en: "Bottom left or bottom right.", es: "Abajo izquierda o abajo derecha." },
  see: { en: "The badge jumps to the other corner.", es: "La insignia salta a la otra esquina." },
  where: { en: "Doctor/about/technology media.", es: "Media de doctor/about/tecnología." },
  compatible: { en: "Badge-compatible targets.", es: "Destinos con insignia." },
  incompatible: {
    en: "Inset Badge Cutout defaults to bottom-left inset geometry. Choose that container instead of stacking a second badge system.",
    es: "Recorte con insignia integrada usa geometría interior abajo a la izquierda. Elija ese contenedor en lugar de apilar un segundo sistema de insignia.",
  },
  persist: persistExperience(),
});

add("corner-enabled", "effects", "experience", {
  label: { en: "Corner action enabled", es: "Acción de esquina activada" },
  what: { en: "Shows the circular corner control on compatible interactive cards that have a real destination.", es: "Muestra el control circular de esquina en tarjetas interactivas compatibles que tienen un destino real." },
  see: { en: "A round action button appears only when the card is a real link. Arrows are never decoration.", es: "Aparece un botón circular de acción solo cuando la tarjeta es un enlace real. Las flechas nunca son decoración." },
  where: {
    en: "Service cards with a real destination (Lab scope). Not static Dr. Matute portraits.",
    es: "Tarjetas de servicio con destino real (alcance del Lab). No retratos estáticos de Dr. Matute.",
  },
  compatible: { en: "Targets with corner-action containers or corner scope.", es: "Destinos con contenedor corner-action o alcance de esquina." },
  incompatible: {
    en: "Not available for Header Logo, static Dr. Matute portraits, or any media without a defined action. Mutually exclusive with Inset Badge Cutout.",
    es: "No disponible para Logo, retratos estáticos de Dr. Matute, ni media sin una acción definida. Excluyente frente a Recorte con insignia integrada.",
  },
  persist: persistExperience(),
});

add("corner-pos", "effects", "experience", {
  label: { en: "Corner position", es: "Posición de esquina" },
  what: { en: "Top right, bottom right, or bottom left.", es: "Arriba derecha, abajo derecha o abajo izquierda." },
  see: { en: "The round control moves.", es: "El control circular se mueve." },
  where: { en: "Corner action.", es: "Acción de esquina." },
  compatible: { en: "Requires Corner action enabled.", es: "Requiere acción de esquina activa." },
  incompatible: { en: "Header Logo cannot use this.", es: "El Logo no puede usarlo." },
  persist: persistExperience(),
});

add("corner-glyph", "effects", "experience", {
  label: { en: "Action glyph", es: "Glifo de acción" },
  what: { en: "Info, arrow, play, or plus.", es: "Info, flecha, play o plus." },
  see: { en: "The icon inside the circle changes.", es: "Cambia el icono dentro del círculo." },
  where: { en: "Corner action.", es: "Acción de esquina." },
  compatible: { en: "Requires Corner action enabled.", es: "Requiere acción de esquina activa." },
  incompatible: { en: "Not a video play button.", es: "No es el botón play de video." },
  persist: persistExperience(),
});

add("corner-morph", "effects", "experience", {
  label: { en: "Hover morph", es: "Transformación al hover" },
  what: { en: "None, info→arrow, or emphasize on hover.", es: "Ninguna, info→flecha o énfasis al hover." },
  see: { en: "The glyph reacts to pointer hover.", es: "El glifo reacciona al puntero." },
  where: { en: "Corner action.", es: "Acción de esquina." },
  compatible: { en: "Pointer devices.", es: "Dispositivos con puntero." },
  incompatible: {
    en: "No hover on touch. Reduced-motion should keep the rest state.",
    es: "Sin hover táctil. Reduced-motion debe dejar el estado en reposo.",
  },
  persist: persistExperience(),
});

add("float-type", "effects", "experience", {
  label: { en: "Floating badge type", es: "Tipo de insignia flotante" },
  what: { en: "Static, rotating, or action badge overlay.", es: "Insignia estática, rotatoria o de acción." },
  see: { en: "The overlay badge mode switches.", es: "Cambia el modo de insignia superpuesta." },
  where: { en: "Badge-compatible media.", es: "Media compatible con insignia." },
  compatible: { en: "Doctor, about, technology.", es: "Doctor, about, tecnología." },
  incompatible: {
    en: "Not available for Header Logo. Conflicts with Inset Badge Cutout if that preset is selected instead.",
    es: "No disponible para Logo. Choca con Recorte con insignia integrada si se elige ese preajuste.",
  },
  persist: persistExperience(),
});

add("float-pos", "effects", "experience", {
  label: { en: "Floating badge position", es: "Posición de insignia flotante" },
  what: { en: "Bottom left or bottom right overlay.", es: "Superposición abajo izquierda o derecha." },
  see: { en: "The floating badge moves.", es: "La insignia flotante se mueve." },
  where: { en: "Floating badge.", es: "Insignia flotante." },
  compatible: { en: "Badge-compatible targets.", es: "Destinos con insignia." },
  incompatible: { en: "Header Logo cannot use this.", es: "El Logo no puede usarlo." },
  persist: persistExperience(),
});

add("float-overlap", "effects", "experience", {
  label: { en: "Overlap", es: "Solape" },
  what: { en: "How far the floating badge sits outside the rectangle.", es: "Cuánto se sale la insignia flotante del rectángulo." },
  see: { en: "The badge tucks in or hangs out.", es: "La insignia se mete o se asoma." },
  where: { en: "Floating badge.", es: "Insignia flotante." },
  compatible: { en: "Floating badge type.", es: "Tipo floating." },
  incompatible: {
    en: "Inset Badge Cutout bites the silhouette instead of overlapping a rectangle. Overlap does not apply to that preset.",
    es: "Recorte con insignia integrada recorta la silueta; no superpone un rectángulo. El solape no aplica a ese preajuste.",
  },
  persist: persistExperience(),
});

add("beforeafter", "effects", "experience", {
  label: { en: "Before / after (experimental)", es: "Antes / después (experimental)" },
  termNote: {
    en: "EXPERIMENTAL / NOT CERTIFIED. Hidden from normal Lab controls. Not a selectable functional feature.",
    es: "EXPERIMENTAL / NO CERTIFICADO. Oculto de los controles normales del Lab. No es una función seleccionable certificada.",
  },
  what: {
    en: "Incomplete development placeholder. Kept in code only. Do not treat as a production clinical before/after.",
    es: "Marcador de desarrollo incompleto. Se conserva solo en código. No es un antes/después clínico de producción.",
  },
  see: {
    en: "Not shown in Theme Lab. If a page still mounts the placeholder, it is not a certified control.",
    es: "No se muestra en Theme Lab. Si alguna página aún monta el marcador, no es un control certificado.",
  },
  where: {
    en: "Internal experience.beforeAfter.enabled. Lab scope is always off.",
    es: "Interno experience.beforeAfter.enabled. El alcance del Lab está siempre apagado.",
  },
  compatible: {
    en: "None for Lab users. Not certified on any page.",
    es: "Ninguno para usuarios del Lab. No certificado en ninguna página.",
  },
  incompatible: {
    en: "All selected elements. Header Logo, public WCDA, and Help must not present this as ready.",
    es: "Todos los elementos. Logo, WCDA público y Ayuda no deben presentarlo como listo.",
  },
  persist: {
    en: "Not a certified persist path. Apply does not expose this control.",
    es: "No es una ruta de persistencia certificada. Aplicar no expone este control.",
  },
});

add("cursor", "effects", "experience", {
  label: { en: "Cursor companion", es: "Compañero del cursor" },
  what: {
    en: "Global cursor interaction effect. Off or a subtle follower near the pointer.",
    es: "Efecto global de interacción del cursor. Apagado o un seguidor sutil del puntero.",
  },
  see: { en: "A small companion trails the cursor on pointer devices.", es: "Un compañero pequeño sigue el cursor." },
  where: {
    en: "Always available in Special Effects, independent of Selected Element. It affects the website preview globally, not only the selected media element. Public mounts it from approved experience.",
    es: "Siempre disponible en Efectos especiales, independiente del elemento seleccionado. Afecta la vista previa del sitio de forma global, no solo el elemento de media seleccionado. El público lo monta desde la experiencia aprobada.",
  },
  compatible: { en: "Pointer devices.", es: "Dispositivos con puntero." },
  incompatible: {
    en: "No useful effect on touch-only. Reduced-motion should keep it off or static.",
    es: "Sin efecto útil solo táctil. Reduced-motion debe apagarlo o dejarlo estático.",
  },
  persist: persistExperience(),
});

add("editorial-icon", "effects", "experience", {
  label: { en: "Icon Asset", es: "Recurso del icono" },
  what: {
    en: "Chooses the SVG or PNG shown on the selected editorial card. The Icon Library lists every file in the icon folder.",
    es: "Elige el SVG o PNG de la tarjeta editorial seleccionada. La biblioteca de iconos enumera cada archivo de la carpeta de iconos.",
  },
  see: {
    en: "The selected card icon updates immediately. Sibling cards keep their own icons.",
    es: "El icono de la tarjeta seleccionada se actualiza de inmediato. Las tarjetas vecinas conservan el suyo.",
  },
  where: {
    en: "Editorial cards, Why this practice, InfoCard, BenefitStrip, and other small editorial-icon + title cards.",
    es: "Tarjetas editoriales, Por qué este consultorio, InfoCard, BenefitStrip y otras tarjetas con icono editorial pequeño + título.",
  },
  compatible: {
    en: "Small editorial icons in the editorial-card family.",
    es: "Iconos editoriales pequeños de la familia de tarjetas editoriales.",
  },
  incompatible: {
    en: "Does not change CTA arrows, carousel navigation, Pattern 01 action circles, badges, or media controls.",
    es: "No cambia flechas de CTA, navegación de carrusel, círculos de acción del Patrón 01, insignias ni controles de media.",
  },
  persist: persistExperience(),
});

add("editorial-icon-color", "effects", "experience", {
  label: { en: "Icon Color", es: "Color del icono" },
  what: {
    en: "Sets the glyph color for currentColor-compatible SVG. PNG keeps embedded colors and this control is disabled.",
    es: "Define el color del glifo para SVG compatible con currentColor. El PNG conserva sus colores incrustados y este control se desactiva.",
  },
  see: {
    en: "Compatible SVG on the selected card changes color. PNG and fixed-color SVG are not recolored.",
    es: "El SVG compatible de la tarjeta seleccionada cambia de color. El PNG y el SVG de color fijo no se recolorean.",
  },
  where: {
    en: "Selected editorial card icon. Scoped to the selected itemKey.",
    es: "Icono de la tarjeta editorial seleccionada. Acotado al itemKey seleccionado.",
  },
  compatible: {
    en: "currentColor-compatible SVG editorial icons.",
    es: "Iconos editoriales SVG compatibles con currentColor.",
  },
  incompatible: {
    en: "Not applied to PNG. Does not fake recoloring with CSS filters. Does not change --color-accent or other site chrome.",
    es: "No se aplica a PNG. No simula el recolorido con filtros CSS. No cambia --color-accent ni el resto del cromado del sitio.",
  },
  persist: persistExperience(),
});

add("editorial-icon-size", "effects", "experience", {
  label: { en: "Compact Icon Size", es: "Tamaño del icono compacto" },
  what: {
    en: "Sets the compact icon visual size in pixels for the selected editorial card. Family default is 26 px. Does not change Feature Graphic size.",
    es: "Define el tamaño visual del icono compacto en píxeles para la tarjeta editorial seleccionada. El valor de familia es 26 px. No cambia el tamaño del gráfico destacado.",
  },
  see: {
    en: "The selected compact icon scales. Title alignment stays beside the icon. Other cards keep their own size.",
    es: "El icono compacto seleccionado escala. El título permanece alineado junto al icono. Las otras tarjetas conservan su tamaño.",
  },
  where: {
    en: "Home > Why this practice > selected editorial card, Compact Icon mode.",
    es: "Inicio > Por qué este consultorio > tarjeta editorial seleccionada, modo Icono compacto.",
  },
  compatible: {
    en: "Compact Icon mode on Home Why this practice cards.",
    es: "Modo Icono compacto en las tarjetas de Por qué este consultorio.",
  },
  incompatible: {
    en: "Does not change Feature Graphic size, CTA circles, or other cards unless they have their own override.",
    es: "No cambia el tamaño del gráfico destacado, los círculos de CTA ni otras tarjetas, salvo que tengan su propio ajuste.",
  },
  persist: persistExperience(),
});

add("editorial-icon-background", "effects", "experience", {
  label: { en: "Icon Background", es: "Fondo del icono" },
  what: {
    en: "Shows the selected editorial icon with no well (None) or inside a circular surface (Circle). Family default is None.",
    es: "Muestra el icono editorial seleccionado sin pozo (Ninguno) o dentro de una superficie circular (Círculo). El valor de familia es Ninguno.",
  },
  see: {
    en: "Only the selected card well appears or disappears. Circle remains available from Inspector.",
    es: "Solo aparece o desaparece el pozo de la tarjeta seleccionada. Círculo sigue disponible en el Inspector.",
  },
  where: {
    en: "Selected editorial card icon. Scoped to the selected itemKey.",
    es: "Icono de la tarjeta editorial seleccionada. Acotado al itemKey seleccionado.",
  },
  compatible: {
    en: "Small editorial icons in the editorial-card family.",
    es: "Iconos editoriales pequeños de la familia de tarjetas editoriales.",
  },
  incompatible: {
    en: "Does not remove CTA circular arrows, carousel navigation, Pattern 01 action circles, badges, or media controls.",
    es: "No quita flechas circulares de CTA, navegación de carrusel, círculos de acción del Patrón 01, insignias ni controles de media.",
  },
  persist: persistExperience(),
});

add("editorial-presentation", "effects", "experience", {
  label: { en: "Presentation", es: "Presentación" },
  what: {
    en: "Chooses Compact Icon or Feature Graphic for the selected card. The same asset is used in both modes.",
    es: "Elige Icono compacto o Gráfico destacado para la tarjeta seleccionada. El mismo recurso se usa en ambos modos.",
  },
  see: {
    en: "The selected Home Why this practice card switches between a small title icon and a left graphic region. Sibling cards keep their own mode.",
    es: "La tarjeta seleccionada de Por qué este consultorio cambia entre un icono pequeño junto al título y una región gráfica a la izquierda. Las tarjetas vecinas conservan su modo.",
  },
  where: {
    en: "Home > Why this practice > selected editorial card.",
    es: "Inicio > Por qué este consultorio > tarjeta editorial seleccionada.",
  },
  compatible: {
    en: "Home Why this practice editorial cards.",
    es: "Tarjetas editoriales de Por qué este consultorio en inicio.",
  },
  incompatible: {
    en: "Does not change About, Patients, Contact, Technology, treatments, carousel arrows, or Pattern 01.",
    es: "No cambia About, Pacientes, Contacto, Tecnología, tratamientos, flechas de carrusel ni el Patrón 01.",
  },
  persist: persistExperience(),
});

add("editorial-graphic-size", "effects", "experience", {
  label: { en: "Feature Graphic Size", es: "Tamaño del gráfico destacado" },
  what: {
    en: "Sets the desktop reference size of the left graphic region. CSS scales it at tablet and mobile. Does not change Compact Icon Size.",
    es: "Define el tamaño de referencia de escritorio de la región gráfica izquierda. El CSS lo escala en tablet y móvil. No cambia el tamaño del icono compacto.",
  },
  see: {
    en: "The selected card graphic region scales. The image stays contained and is not cropped.",
    es: "La región gráfica de la tarjeta seleccionada escala. La imagen permanece contenida y no se recorta.",
  },
  where: {
    en: "Home > Why this practice > selected editorial card, Feature Graphic mode.",
    es: "Inicio > Por qué este consultorio > tarjeta editorial seleccionada, modo Gráfico destacado.",
  },
  compatible: {
    en: "Feature Graphic mode on Home Why this practice cards.",
    es: "Modo Gráfico destacado en las tarjetas de Por qué este consultorio.",
  },
  incompatible: {
    en: "Does not change Compact Icon Size or other cards unless they have their own override.",
    es: "No cambia el tamaño del icono compacto ni otras tarjetas, salvo que tengan su propio ajuste.",
  },
  persist: persistExperience(),
});

add("badge-center-graphic-size", "effects", "experience", {
  label: { en: "Center Graphic Size", es: "Tamaño del gráfico central" },
  what: {
    en: "Scales only the transparent X-ray overlay on the Free Exam & X-Ray badge. Size is relative to the badge, not the inner circle. Stored on home-practice-badge-center.",
    es: "Escala solo el gráfico transparente de radiografía en la insignia. El tamaño es relativo a la insignia, no al círculo interior. Se guarda en home-practice-badge-center.",
  },
  see: {
    en: "The X-ray graphic grows or shrinks over the fixed center circle and can extend beyond it. The ring, rotation, and portrait stay put.",
    es: "El gráfico de radiografía crece o se reduce sobre el círculo fijo y puede extenderse más allá. El anillo, la rotación y el retrato no se mueven.",
  },
  where: {
    en: "Home > Practice owner > Free Exam & X-Ray Badge > Center Graphic.",
    es: "Inicio > Dueño de la práctica > Insignia de examen y radiografía gratis > Gráfico central.",
  },
  compatible: {
    en: "Only this badge center itemKey.",
    es: "Solo este itemKey del gráfico central de la insignia.",
  },
  incompatible: {
    en: "Does not change Feature Graphic size, Why this practice icons, badge geometry, or Color Tools fills.",
    es: "No cambia el tamaño del gráfico destacado, los iconos de Por qué este consultorio, la geometría de la insignia ni los fondos de Color Tools.",
  },
  persist: persistExperience(),
});

add("editorial-graphic-align", "effects", "experience", {
  label: { en: "Graphic Alignment", es: "Alineación del gráfico" },
  what: {
    en: "Aligns the graphic left or center inside its allocated left region. Does not crop.",
    es: "Alinea el gráfico a la izquierda o al centro dentro de su región izquierda. No recorta.",
  },
  see: {
    en: "Only the selected card graphic shifts inside its box. Sibling cards keep their alignment.",
    es: "Solo el gráfico de la tarjeta seleccionada se desplaza dentro de su caja. Las tarjetas vecinas conservan su alineación.",
  },
  where: {
    en: "Home > Why this practice > selected editorial card, Feature Graphic mode.",
    es: "Inicio > Por qué este consultorio > tarjeta editorial seleccionada, modo Gráfico destacado.",
  },
  compatible: {
    en: "Feature Graphic mode on Home Why this practice cards.",
    es: "Modo Gráfico destacado en las tarjetas de Por qué este consultorio.",
  },
  incompatible: {
    en: "Does not change Compact Icon layout or other cards.",
    es: "No cambia el diseño de Icono compacto ni otras tarjetas.",
  },
  persist: persistExperience(),
});

add("hero-content-offset-y", "position", "experience", {
  label: { en: "Vertical Position", es: "Posición vertical" },
  what: {
    en: "Moves the Home Hero Content group up or down as one block. 0 is the approved baseline.",
    es: "Mueve el grupo de Contenido del héroe hacia arriba o abajo como un solo bloque. 0 es la base aprobada.",
  },
  see: {
    en: "Headline, paragraph, buttons, and PREVENT / TREAT / PROTECT move together.",
    es: "El titular, el párrafo, los botones y PREVENT / TREAT / PROTECT se mueven juntos.",
  },
  where: {
    en: "Home > Hero > Hero Content only.",
    es: "Solo Inicio > Héroe > Contenido del héroe.",
  },
  compatible: {
    en: "Home Hero Content.",
    es: "Contenido del héroe de inicio.",
  },
  incompatible: {
    en: "Does not move Hero Media, Header, or other sections.",
    es: "No mueve Hero Media, el encabezado ni otras secciones.",
  },
  persist: persistExperience(),
});

add("hero-content-offset-x", "position", "experience", {
  label: { en: "Horizontal Position", es: "Posición horizontal" },
  what: {
    en: "Moves the Home Hero Content group left or right as one block. 0 is the approved baseline.",
    es: "Mueve el grupo de Contenido del héroe a izquierda o derecha como un solo bloque. 0 es la base aprobada.",
  },
  see: {
    en: "The entire content stack shifts horizontally over the photograph.",
    es: "Toda la pila de contenido se desplaza en horizontal sobre la fotografía.",
  },
  where: {
    en: "Home > Hero > Hero Content only.",
    es: "Solo Inicio > Héroe > Contenido del héroe.",
  },
  compatible: {
    en: "Home Hero Content.",
    es: "Contenido del héroe de inicio.",
  },
  incompatible: {
    en: "Does not crop or reposition the photograph.",
    es: "No recorta ni reposiciona la fotografía.",
  },
  persist: persistExperience(),
});

add("hero-content-max-width", "position", "experience", {
  label: { en: "Content Width", es: "Ancho del contenido" },
  what: {
    en: "Sets the max width of the Home Hero Content block. It does not change global typography or button size independently.",
    es: "Define el ancho máximo del bloque de Contenido del héroe. No cambia la tipografía global ni el tamaño de los botones por separado.",
  },
  see: {
    en: "The text column gets narrower or wider. Buttons wrap with the column.",
    es: "La columna de texto se estrecha o ensancha. Los botones se ajustan con la columna.",
  },
  where: {
    en: "Home > Hero > Hero Content only.",
    es: "Solo Inicio > Héroe > Contenido del héroe.",
  },
  compatible: {
    en: "Home Hero Content.",
    es: "Contenido del héroe de inicio.",
  },
  incompatible: {
    en: "Does not change heading font, heading scale, or other pages.",
    es: "No cambia la fuente de títulos, la escala ni otras páginas.",
  },
  persist: persistExperience(),
});

add("hero-content-reset", "position", "experience", {
  label: { en: "Reset Position", es: "Restablecer posición" },
  what: {
    en: "Restores Vertical Position, Horizontal Position, and Content Width to the Current/approved baseline for Hero Content.",
    es: "Restablece Posición vertical, Posición horizontal y Ancho del contenido a la base Current/aprobada de Contenido del héroe.",
  },
  see: {
    en: "Only these three Hero Content values return to 0 / default width.",
    es: "Solo estos tres valores de Contenido del héroe vuelven a 0 / ancho predeterminado.",
  },
  where: {
    en: "Home > Hero > Hero Content only.",
    es: "Solo Inicio > Héroe > Contenido del héroe.",
  },
  compatible: {
    en: "Home Hero Content.",
    es: "Contenido del héroe de inicio.",
  },
  incompatible: {
    en: "Does not reset Hero Media, copy, or other elements.",
    es: "No restablece Hero Media, el texto ni otros elementos.",
  },
  persist: persistExperience(),
});

add("media-position-x", "position", "experience", {
  label: { en: "Horizontal Position", es: "Posición Horizontal" },
  what: {
    en: "Moves the image left or right inside its container.",
    es: "Mueve la imagen hacia la izquierda o derecha dentro de su contenedor.",
  },
  see: {
    en: "0 shows the left of the image, 50 centers it, 100 shows the right. The container does not move.",
    es: "0 muestra la izquierda de la imagen, 50 la centra, 100 muestra la derecha. El contenedor no se mueve.",
  },
  where: {
    en: "Selected Service Card Media only.",
    es: "Solo la media de tarjeta de servicio seleccionada.",
  },
  compatible: {
    en: "Home and Services service-category images.",
    es: "Imágenes de categoría de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not change container size, radius, grid, Learn more, sibling cards, or Factory.",
    es: "No cambia tamaño del contenedor, radio, cuadrícula, Learn more, tarjetas hermanas ni Factory.",
  },
  persist: persistExperience(),
});

add("media-position-y", "position", "experience", {
  label: { en: "Vertical Position", es: "Posición Vertical" },
  what: {
    en: "Moves the image up or down inside its container.",
    es: "Mueve la imagen hacia arriba o abajo dentro de su contenedor.",
  },
  see: {
    en: "0 shows the top of the image, 50 centers it, 100 shows the bottom. The container does not move.",
    es: "0 muestra la parte superior de la imagen, 50 la centra, 100 muestra la inferior. El contenedor no se mueve.",
  },
  where: {
    en: "Selected Service Card Media only.",
    es: "Solo la media de tarjeta de servicio seleccionada.",
  },
  compatible: {
    en: "Home and Services service-category images.",
    es: "Imágenes de categoría de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not change container size, radius, grid, Learn more, sibling cards, or Factory.",
    es: "No cambia tamaño del contenedor, radio, cuadrícula, Learn more, tarjetas hermanas ni Factory.",
  },
  persist: persistExperience(),
});

add("media-position-zoom", "position", "experience", {
  label: { en: "Zoom", es: "Zoom" },
  what: {
    en: "Enlarges or reduces the image inside its container.",
    es: "Amplía o reduce la imagen dentro de su contenedor.",
  },
  see: {
    en: "The photograph scales inside the same viewport. Aspect ratio is preserved. The frame does not resize.",
    es: "La imagen cambia de escala dentro del mismo recuadro. Se conserva la proporción. El marco no cambia de tamaño.",
  },
  where: {
    en: "Selected Service Card Media only. Uses the existing media scale state.",
    es: "Solo la media de tarjeta de servicio seleccionada.",
  },
  compatible: {
    en: "Home and Services service-category images.",
    es: "Imágenes de categoría de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not stretch the image, change container geometry, or affect sibling cards.",
    es: "No estira la imagen, no cambia la geometría del contenedor ni afecta tarjetas hermanas.",
  },
  persist: persistExperience(),
});

add("media-position-reset", "position", "experience", {
  label: { en: "Reset Position", es: "Restablecer posición" },
  what: {
    en: "Restores Horizontal Position, Vertical Position, and Zoom to the Current/approved values for the selected service card image.",
    es: "Restablece Posición Horizontal, Posición Vertical y Zoom a los valores Current/aprobados de la imagen de tarjeta seleccionada.",
  },
  see: {
    en: "Only this card’s crop returns to Current. Factory is not overwritten. Container shape is unchanged.",
    es: "Solo el recorte de esta tarjeta vuelve a Current. Factory no se sobrescribe.",
  },
  where: {
    en: "Home or Services > Service Card Media.",
    es: "Inicio o Servicios > Media de tarjetas de servicio.",
  },
  compatible: {
    en: "Service Card Media on Home and Services.",
    es: "Media de tarjetas de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not change sibling cards, container shape, Factory, or unrelated visual properties.",
    es: "No cambia tarjetas hermanas, la forma del contenedor, Factory ni propiedades visuales ajenas.",
  },
  persist: persistExperience(),
});

add("media-pan-x", "position", "experience", {
  label: { en: "Horizontal Pan", es: "Pan horizontal" },
  what: {
    en: "Slides the image left or right inside the same frame.",
    es: "Desliza la imagen a la izquierda o derecha dentro del mismo recuadro.",
  },
  see: {
    en: "0 is centered. Positive values move the image right. Negative values move it left. The frame stays still.",
    es: "0 es el centro. Valores positivos mueven la imagen a la derecha. Los negativos, a la izquierda. El recuadro no se mueve.",
  },
  where: {
    en: "Selected Service Card Media only. Same value as dragging the image in Preview.",
    es: "Solo la media de tarjeta de servicio seleccionada. El mismo valor que al arrastrar la imagen en Preview.",
  },
  compatible: {
    en: "Home and Services service-category images.",
    es: "Imágenes de categoría de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not change Zoom, object position, container size, sibling cards, or Factory.",
    es: "No cambia Zoom, posición del recorte, tamaño del contenedor, tarjetas hermanas ni Factory.",
  },
  persist: persistExperience(),
});

add("media-pan-y", "position", "experience", {
  label: { en: "Vertical Pan", es: "Pan vertical" },
  what: {
    en: "Slides the image up or down inside the same frame.",
    es: "Desliza la imagen hacia arriba o abajo dentro del mismo recuadro.",
  },
  see: {
    en: "0 is centered. Positive values move the image down. Negative values move it up. The frame stays still.",
    es: "0 es el centro. Valores positivos mueven la imagen hacia abajo. Los negativos, hacia arriba. El recuadro no se mueve.",
  },
  where: {
    en: "Selected Service Card Media only. Same value as dragging the image in Preview.",
    es: "Solo la media de tarjeta de servicio seleccionada. El mismo valor que al arrastrar la imagen en Preview.",
  },
  compatible: {
    en: "Home and Services service-category images.",
    es: "Imágenes de categoría de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not change Zoom, object position, container size, sibling cards, or Factory.",
    es: "No cambia Zoom, posición del recorte, tamaño del contenedor, tarjetas hermanas ni Factory.",
  },
  persist: persistExperience(),
});

add("media-pan-reset", "position", "experience", {
  label: { en: "Reset Pan", es: "Restablecer pan" },
  what: {
    en: "Restores Horizontal Pan and Vertical Pan to Current for this image only.",
    es: "Restablece Pan horizontal y Pan vertical a Current solo para esta imagen.",
  },
  see: {
    en: "Zoom, object position, fit, container, and the photograph stay as they are.",
    es: "Zoom, posición del recorte, ajuste, contenedor y fotografía se quedan como están.",
  },
  where: {
    en: "Home or Services > Service Card Media.",
    es: "Inicio o Servicios > Media de tarjetas de servicio.",
  },
  compatible: {
    en: "Service Card Media on Home and Services.",
    es: "Media de tarjetas de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not reset Zoom, object position, fit, sibling cards, Factory, or Current.",
    es: "No restablece Zoom, posición del recorte, ajuste, tarjetas hermanas, Factory ni Current.",
  },
  persist: persistExperience(),
});

add("media-pan-overflow", "position", "experience", {
  label: { en: "Allow Free Overflow", es: "Permitir desbordamiento libre" },
  what: {
    en: "Lets the image move past the usual limits, which can show empty space inside the frame.",
    es: "Permite mover la imagen más allá de los límites habituales, lo que puede dejar espacio vacío en el recuadro.",
  },
  see: {
    en: "Off keeps the crop modest. On allows the full pan range.",
    es: "Desactivado mantiene el recorte moderado. Activado permite todo el rango de pan.",
  },
  where: {
    en: "Selected Service Card Media. Advanced option under Free Pan.",
    es: "Media de tarjeta de servicio seleccionada. Opción avanzada bajo Pan libre.",
  },
  compatible: {
    en: "Home and Services service-category images.",
    es: "Imágenes de categoría de servicio en Inicio y Servicios.",
  },
  incompatible: {
    en: "Does not change Zoom, object position, or container geometry.",
    es: "No cambia Zoom, posición del recorte ni la geometría del contenedor.",
  },
  persist: persistExperience(),
});

add("content-page-active", "content", "content", {
  label: { en: "Page active", es: "Página activa" },
  what: {
    en: "Turns the selected public page on or off. Inactive means it is not publicly visible.",
    es: "Activa o desactiva la página pública seleccionada. Inactiva significa que no es visible al público.",
  },
  see: {
    en: "An inactive page 404s on the public site and is omitted from the sitemap and navigation. Lab preview can still open it.",
    es: "Una página inactiva da 404 en el sitio público y se omite del sitemap y la navegación. La vista previa del Lab aún puede abrirla.",
  },
  where: {
    en: "The currently previewed manageable page only.",
    es: "Solo la página administrable en vista previa.",
  },
  compatible: {
    en: "Works with page section switches on the same page.",
    es: "Funciona con los interruptores de sección de la misma página.",
  },
  incompatible: {
    en: "Does not delete copy, routes, media, Theme, Experience, or Factory. Does not change publication status (Draft/Published).",
    es: "No borra textos, rutas, media, Tema, Experiencia ni Factory. No cambia el estado de publicación (Borrador/Publicada).",
  },
  persist: persistContent(),
});

add("content-page-status", "content", "content", {
  label: { en: "Publication status", es: "Estado de publicación" },
  what: {
    en: "Shows the stored publication status. It is informational in this panel.",
    es: "Muestra el estado de publicación almacenado. En este panel es informativo.",
  },
  see: {
    en: "Draft, Review, Approved, or Published. Active/Inactive never promotes Draft to Published.",
    es: "Borrador, Revisión, Aprobada o Publicada. Activa/Inactiva nunca pasa un Borrador a Publicada.",
  },
  where: {
    en: "The selected page, category, or treatment.",
    es: "La página, categoría o tratamiento seleccionado.",
  },
  compatible: {
    en: "Displayed next to Active/Inactive.",
    es: "Se muestra junto a Activa/Inactiva.",
  },
  incompatible: {
    en: "This control cannot rewrite literature or silently publish.",
    es: "Este control no reescribe literatura ni publica en silencio.",
  },
  persist: persistContent(),
});

add("content-section-active", "content", "content", {
  label: { en: "Page section active", es: "Sección de página activa" },
  what: {
    en: "Shows or hides one section of the selected page. The rest of the page stays available.",
    es: "Muestra u oculta una sección de la página seleccionada. El resto de la página sigue disponible.",
  },
  see: {
    en: "Only that section is omitted from the public page. Copy for the section is kept.",
    es: "Solo esa sección se omite de la página pública. Su texto se conserva.",
  },
  where: {
    en: "The currently previewed page’s listed sections.",
    es: "Las secciones listadas de la página en vista previa.",
  },
  compatible: {
    en: "Page can remain Active while a section is Inactive.",
    es: "La página puede permanecer Activa con una sección Inactiva.",
  },
  incompatible: {
    en: "Does not delete the section record, media, or literature.",
    es: "No borra el registro de la sección, media ni literatura.",
  },
  persist: persistContent(),
});

add("content-category-active", "content", "content", {
  label: { en: "Category active", es: "Categoría activa" },
  what: {
    en: "Turns a service category on or off using the existing enabled flag. Status is not changed.",
    es: "Activa o desactiva una categoría de servicios con el indicador enabled existente. El estado no cambia.",
  },
  see: {
    en: "An inactive or unpublished category is absent from public lists, sitemap, and category routes. Child treatments are not exposed.",
    es: "Una categoría inactiva o no publicada no aparece en listas públicas, sitemap ni rutas de categoría. No se exponen tratamientos hijos.",
  },
  where: {
    en: "The category shown for the current Services preview.",
    es: "La categoría mostrada en la vista previa de Servicios actual.",
  },
  compatible: {
    en: "Uses source-of-truth enabled + status. Public only when enabled and status is published.",
    es: "Usa enabled + status como fuente de verdad. Público solo si enabled y status es published.",
  },
  incompatible: {
    en: "Does not rewrite category copy, media keys, or child literature. Does not promote Draft to Published.",
    es: "No reescribe textos, claves de media ni literatura hija. No pasa Borrador a Publicada.",
  },
  persist: persistContent(),
});

add("content-treatment-active", "content", "content", {
  label: { en: "Treatment active", es: "Tratamiento activo" },
  what: {
    en: "Turns a treatment on or off using the existing enabled flag. Status stays as stored.",
    es: "Activa o desactiva un tratamiento con el indicador enabled existente. El estado permanece como está almacenado.",
  },
  see: {
    en: "Public only when enabled is true and status is published. Inactive/draft treatments are absent from lists, sitemap, and public routes (404).",
    es: "Público solo si enabled es true y status es published. Los tratamientos inactivos o borrador no aparecen en listas, sitemap ni rutas públicas (404).",
  },
  where: {
    en: "The treatment in the current Services preview.",
    es: "El tratamiento de la vista previa de Servicios actual.",
  },
  compatible: {
    en: "Reactivating a published treatment restores the same stored literature.",
    es: "Reactivar un tratamiento publicado restaura la misma literatura almacenada.",
  },
  incompatible: {
    en: "Does not delete FAQs, metadata, media keys, or copy. Does not silently publish drafts such as unconfirmed aligner or Botox records.",
    es: "No borra preguntas frecuentes, metadatos, claves de media ni textos. No publica en silencio borradores como alineadores no confirmados o Botox.",
  },
  persist: persistContent(),
});

add("content-treatment-section-active", "content", "content", {
  label: { en: "Treatment section active", es: "Sección de tratamiento activa" },
  what: {
    en: "Toggles sections.<id>.enabled for the selected treatment. The treatment page can stay public.",
    es: "Cambia sections.<id>.enabled del tratamiento seleccionado. La página del tratamiento puede seguir pública.",
  },
  see: {
    en: "Only that section is omitted. Overview, FAQ, and other literature remain stored.",
    es: "Solo se omite esa sección. Descripción general, FAQ y el resto de la literatura siguen almacenadas.",
  },
  where: {
    en: "Existing section records on the selected treatment. Missing sections are not invented.",
    es: "Registros de sección existentes del tratamiento seleccionado. No se inventan secciones faltantes.",
  },
  compatible: {
    en: "Uses the existing sections.<section>.enabled field. No second publication store for copy.",
    es: "Usa el campo existente sections.<section>.enabled. No hay un segundo almacén de publicación para el texto.",
  },
  incompatible: {
    en: "Does not delete the section or its literature. Does not change Theme or Experience.",
    es: "No borra la sección ni su literatura. No cambia Tema ni Experiencia.",
  },
  persist: persistContent(),
});

export const labControls: Record<LabControlId, LabControlDef> = Object.fromEntries(
  controls.map((item) => [item.id, item]),
) as Record<LabControlId, LabControlDef>;

export const labControlIds = controls.map((item) => item.id);

export const SERVICE_CARD_POSITION_CONTROL_IDS = [
  "media-position-x",
  "media-position-y",
  "media-position-zoom",
  "media-position-reset",
  "media-pan-x",
  "media-pan-y",
  "media-pan-reset",
  "media-pan-overflow",
] as const satisfies ReadonlyArray<LabControlId>;

for (const id of SERVICE_CARD_POSITION_CONTROL_IDS) {
  const item = labControls[id];
  if (!item || !item.help || !item.help.label) {
    throw new Error(
      `Lab control "${id}" is not registered with bilingual help in labControls.`,
    );
  }
}

export const labWords: Record<LabLanguage, Record<string, string>> = {
  en: {
    contain: "Contain",
    cover: "Cover",
    left: "Left",
    center: "Center",
    right: "Right",
    none: "None",
    fade: "Fade",
    fadeUp: "Fade up",
    fadeDown: "Fade down",
    slideLeft: "Slide left",
    slideRight: "Slide right",
    scaleIn: "Scale in",
    reveal: "Reveal",
    fast: "Fast",
    medium: "Medium",
    slow: "Slow",
    subtle: "Subtle",
    normal: "Normal",
    enabled: "Enabled",
    textOnly: "Text only",
    iconText: "Icon + text",
    compact: "Compact",
    comfortable: "Comfortable",
    wide: "Wide",
    standard: "Standard",
    large: "Large",
    pauseHover: "Pause on hover",
    primary: "Primary",
    secondary: "Secondary",
    accent: "Accent",
    cyan: "WCDA Cyan",
    circle: "Circle",
    compactIcon: "Compact Icon",
    featureGraphic: "Feature Graphic",
    independentOwnership: "Independent Ownership",
    westCaldwellCommunity: "West Caldwell Community",
    clearNextSteps: "Clear Next Steps",
    shield: "Shield",
    heart: "Heart",
    homeIcon: "Home",
    check: "Check",
    target: "Target",
    calendar: "Calendar",
    dark: "Dark",
    modal: "Modal preview",
    external: "External YouTube link",
    embed: "Inline embed",
    approved: "Approved asset",
    placeholder: "Placeholder",
    solid: "Solid",
    outline: "Outline",
    minimal: "Minimal",
    light: "Light",
    brandTint: "Brand tint",
    info: "Info",
    play: "Play",
    dots: "Dots",
    arrows: "Arrows",
    both: "Dots + arrows",
    off: "Off",
    tooth: "Tooth",
    sparkle: "Sparkle",
    plus: "Plus",
    small: "Small",
    verySlow: "Very slow",
    inverse: "Inverse",
    muted: "Muted",
    foreground: "Foreground",
    bottomLeft: "Bottom left",
    bottomRight: "Bottom right",
    topRight: "Top right",
    arrow: "Arrow",
    infoArrow: "Info → arrow",
    emphasize: "Emphasize",
    staticBadge: "Static badge",
    rotatingBadge: "Rotating badge",
    actionBadge: "Action badge",
    help: "Help",
    helpEs: "Ayuda",
    noComposer: "This selected element has no image composer. Use Containers or Special Effects if they appear for this target.",
    headerStrip: "Header Logo uses a dedicated strip. Card containers are not applied.",
    noContainer: "This target has no container presets. Use Special Effects for marquee controls.",
    chromeOnly: "Media Overlay Chrome, Carousel Card Chrome, and Video Card Chrome are visual treatments only. They do not enable overlay, carousel, or video systems.",
    cutoutNote: "Circular badge integrated into the lower-left media geometry. The container curves around the badge instead of placing the badge on top of a rectangle. Preview now. Apply Custom as Current to persist.",
    unavailableActions: "Corner Action, Top Action, and Bottom Action are hidden here because this media is not a real link, CTA, or interactive destination. Arrows are action indicators, not decoration.",
    unavailableCarousel: "Carousel Card Chrome is available only for carousel/card-capable targets, not as a normal portrait style.",
    unavailableVideo: "Video Card Chrome is available only for video-capable media and poster/video preview targets.",
    mediaIntro: "Change the selected image, then position it. Apply saves this target only.",
    copyTheme: "Copy theme config",
    copyExperience: "Copy experience config",
    defaultAsset: "Component default",
    noAssets: "No approved assets yet",
    auto: "Auto",
    videoCard: "Video card",
    mediaOverlay: "Media overlay",
    clean: "Clean",
    beforeAfterShow: "Show development placeholder",
    short: "Short",
    delay0: "0",
    branding: "Branding",
    home: "Home",
    doctor: "Doctor",
    services: "Services",
    contact: "Contact",
    technology: "Technology",
    tight: "Tight",
    xl: "XL",
    full: "Full",
    checkerboard: "Checkerboard",
    lowContrast: "Low contrast against the current preview background.",
  },
  es: {
    contain: "Contener",
    cover: "Cubrir",
    left: "Izquierda",
    center: "Centro",
    right: "Derecha",
    none: "Ninguna",
    fade: "Fundido",
    fadeUp: "Fundido hacia arriba",
    fadeDown: "Fundido hacia abajo",
    slideLeft: "Deslizar a la izquierda",
    slideRight: "Deslizar a la derecha",
    scaleIn: "Escalar hacia adentro",
    reveal: "Revelar",
    fast: "Rápida",
    medium: "Media",
    slow: "Lenta",
    subtle: "Sutil",
    normal: "Normal",
    enabled: "Activado",
    textOnly: "Solo texto",
    iconText: "Icono + texto",
    compact: "Compacto",
    comfortable: "Cómodo",
    wide: "Amplio",
    standard: "Estándar",
    large: "Grande",
    pauseHover: "Pausar al pasar el cursor",
    primary: "Primario",
    secondary: "Secundario",
    accent: "Acento",
    cyan: "WCDA Cyan",
    circle: "Círculo",
    compactIcon: "Icono compacto",
    featureGraphic: "Gráfico destacado",
    independentOwnership: "Propiedad independiente",
    westCaldwellCommunity: "Comunidad de West Caldwell",
    clearNextSteps: "Próximos pasos claros",
    shield: "Escudo",
    heart: "Corazón",
    homeIcon: "Casa",
    check: "Check",
    target: "Objetivo",
    calendar: "Calendario",
    dark: "Oscuro",
    modal: "Vista modal",
    external: "Enlace externo de YouTube",
    embed: "Embed en línea",
    approved: "Recurso aprobado",
    placeholder: "Marcador",
    solid: "Sólido",
    outline: "Contorno",
    minimal: "Mínimo",
    light: "Claro",
    brandTint: "Tinte de marca",
    info: "Info",
    play: "Play",
    dots: "Puntos",
    arrows: "Flechas",
    both: "Puntos + flechas",
    off: "Apagado",
    tooth: "Diente",
    sparkle: "Destello",
    plus: "Plus",
    small: "Pequeño",
    verySlow: "Muy lenta",
    inverse: "Inverso",
    muted: "Atenuado",
    foreground: "Texto",
    bottomLeft: "Abajo izquierda",
    bottomRight: "Abajo derecha",
    topRight: "Arriba derecha",
    arrow: "Flecha",
    infoArrow: "Info → flecha",
    emphasize: "Énfasis",
    staticBadge: "Insignia estática",
    rotatingBadge: "Insignia rotatoria",
    actionBadge: "Insignia de acción",
    help: "Help",
    helpEs: "Ayuda",
    noComposer: "Este elemento no tiene compositor de imagen. Use Contenedores o Efectos especiales si aparecen para este destino.",
    headerStrip: "El Logo del encabezado usa una franja dedicada. No se aplican contenedores de tarjeta.",
    noContainer: "Este destino no tiene preajustes de contenedor. Use Efectos especiales para el marquee.",
    chromeOnly: "Media Overlay Chrome, Carousel Card Chrome y Video Card Chrome son solo tratamientos visuales. No activan esos sistemas.",
    cutoutNote: "Insignia circular integrada en la geometría inferior izquierda de la media. El contenedor se curva alrededor de la insignia en lugar de colocarla sobre un rectángulo. Vista previa inmediata. Aplicar Custom como versión actual para persistir.",
    unavailableActions: "Corner Action, Top Action y Bottom Action están ocultos aquí porque esta media no es un enlace, CTA o destino interactivo real. Las flechas indican acción, no son decoración.",
    unavailableCarousel: "Carousel Card Chrome solo está disponible en destinos de carrusel/tarjeta, no como estilo normal de retrato.",
    unavailableVideo: "Video Card Chrome solo está disponible en media con video y destinos de póster/vista previa.",
    mediaIntro: "Cambie la imagen seleccionada y luego posicione. Aplicar guarda solo este destino.",
    copyTheme: "Copiar configuración de tema",
    copyExperience: "Copiar configuración de experiencia",
    defaultAsset: "Predeterminado del componente",
    noAssets: "Aún no hay recursos aprobados",
    auto: "Auto",
    videoCard: "Tarjeta de video",
    mediaOverlay: "Superposición de media",
    clean: "Clean",
    beforeAfterShow: "Mostrar marcador de desarrollo",
    short: "Corto",
    delay0: "0",
    branding: "Marca",
    home: "Inicio",
    doctor: "Doctor",
    services: "Servicios",
    contact: "Contacto",
    technology: "Tecnología",
    tight: "Ajustado",
    xl: "XL",
    full: "Completo",
    checkerboard: "Tablero (transparencia)",
    lowContrast: "Bajo contraste contra el fondo de vista previa actual.",
  },
};

export const labTargetLabels: Record<LabLanguage, Record<VisualTargetId, string>> = {
  en: {
    "header-logo": "Header Logo",
    "home-hero-media": "Home Hero Media",
    "home-hero-content": "Hero Content",
    "home-doctor-media": "Dr. Matute Media",
    "home-care-areas": "Service Card Media",
    "home-cta": "Primary CTA",
    "home-marquee": "Services Marquee",
    "about-doctor-media": "Dr. Matute Media",
    "about-content": "About Media",
    "services-care-cards": "Service Card Media",
    "services-treatment-media": "Treatment Media",
    "contact-media": "Contact Media",
    "technology-media": "Technology Media",
    "patients-resource-cards": "Patient Resource Cards",
    "editorial-cards": "Editorial Cards",
  },
  es: {
    "header-logo": "Logo del encabezado",
    "home-hero-media": "Media del héroe (inicio)",
    "home-hero-content": "Contenido del héroe",
    "home-doctor-media": "Media del Dr. Matute",
    "home-care-areas": "Media de tarjetas de servicio",
    "home-cta": "CTA primario",
    "home-marquee": "Marquee de servicios",
    "about-doctor-media": "Media del Dr. Matute",
    "about-content": "Media de About",
    "services-care-cards": "Media de tarjetas de servicio",
    "services-treatment-media": "Media de tratamientos",
    "contact-media": "Media de contacto",
    "technology-media": "Media de tecnología",
    "patients-resource-cards": "Tarjetas de recursos para pacientes",
    "editorial-cards": "Tarjetas editoriales",
  },
};

export const labPageLabels: Record<LabLanguage, Record<PreviewPagePath, string>> = {
  en: {
    "/": "Home",
    "/about": "About",
    "/about/dr-jonnathan-matute": "Dr. Matute",
    "/about/team": "Team",
    "/services": "Services",
    "/patients": "Patients",
    "/patients/first-visit": "First visit",
    "/patients/financial-options": "Financial options",
    "/patients/insurance": "Insurance",
    "/patients/forms": "Patient forms",
    "/technology": "Technology",
    "/contact": "Contact",
  },
  es: {
    "/": "Inicio",
    "/about": "Acerca de",
    "/about/dr-jonnathan-matute": "Dr. Matute",
    "/about/team": "Equipo",
    "/services": "Servicios",
    "/patients": "Pacientes",
    "/patients/first-visit": "Primera visita",
    "/patients/financial-options": "Opciones financieras",
    "/patients/insurance": "Seguro",
    "/patients/forms": "Formularios",
    "/technology": "Tecnología",
    "/contact": "Contacto",
  },
};

export type ContainerGuide = {
  id: ContainerPresetId;
  purpose: Bi;
  shape: Bi;
  compatible: Bi;
  incompatible: Bi;
  badge: Bi;
  clip: Bi;
  radius: Bi;
  globalRadius: Bi;
  overlay: Bi;
  externalSpace: Bi;
  motion: Bi;
  effects: Bi;
};

export const containerGuides: ContainerGuide[] = [
  {
    id: "clean",
    purpose: { en: "The simplest media container: one rectangle, no decorative frame.", es: "El contenedor de media más simple: un rectángulo, sin marco decorativo." },
    shape: { en: "One media rectangle. No offset layer, no badge, no double border.", es: "Un rectángulo de media. Sin capa offset, sin insignia, sin doble borde." },
    compatible: { en: "Most media, cards, CTA, treatments.", es: "Casi toda media, tarjetas, CTA, tratamientos." },
    incompatible: { en: "Not listed for Header Logo or Marquee.", es: "No aplica a Logo ni Marquee." },
    badge: { en: "No badge reserved.", es: "Sin espacio de insignia." },
    clip: { en: "Standard overflow clip.", es: "Recorte estándar." },
    radius: { en: "One radius: Global Media Radius.", es: "Un solo radio: Radio de media global." },
    globalRadius: { en: "Clean uses Global Media Radius as the only visible corner radius. No nested radii.", es: "Clean usa el Radio de media global como único radio visible. Sin radios anidados." },
    overlay: { en: "Global Overlay tints the photograph. Clean has no extra chrome overlay.", es: "Overlay global tiñe la foto. Clean no añade otro overlay de cromado." },
    externalSpace: { en: "No extra outset.", es: "Sin outset extra." },
    motion: { en: "Can combine with Lab motion on the active target.", es: "Puede combinarse con motion del Lab en el destino activo." },
    effects: { en: "No special effect required.", es: "No requiere efecto especial." },
  },
  {
    id: "soft-card",
    purpose: { en: "A subtle premium card around media. One card silhouette.", es: "Una tarjeta premium sutil alrededor de la media. Una sola silueta." },
    shape: { en: "One card surface containing the photo. No second card behind it.", es: "Una superficie de tarjeta que contiene la foto. Sin segunda tarjeta detrás." },
    compatible: { en: "Media, cards, CTA, treatments.", es: "Media, tarjetas, CTA, tratamientos." },
    incompatible: { en: "Header Logo / Marquee.", es: "Logo / Marquee." },
    badge: { en: "No badge reserved.", es: "Sin insignia reservada." },
    clip: { en: "Clips media to the card.", es: "Recorta la media a la tarjeta." },
    radius: { en: "Card owns 1rem radius and ignores Global Media Radius.", es: "La tarjeta posee radio 1rem e ignora el Radio de media global." },
    globalRadius: { en: "Global Media Radius does not change Soft Card corners. The card is the radius owner.", es: "El Radio de media global no cambia las esquinas de Soft Card. La tarjeta posee el radio." },
    overlay: { en: "Global Overlay tints the photo inside the single card. No second overlay frame.", es: "Overlay global tiñe la foto dentro de una sola tarjeta. Sin segundo marco de overlay." },
    externalSpace: { en: "Card padding only.", es: "Solo padding de tarjeta." },
    motion: { en: "Compatible.", es: "Compatible." },
    effects: { en: "Compatible with motion; not a badge system.", es: "Compatible con motion; no es sistema de insignia." },
  },
  {
    id: "editorial",
    purpose: { en: "Editorial framed photograph.", es: "Fotografía con marco editorial." },
    shape: { en: "Inset frame / editorial crop.", es: "Marco interior / recorte editorial." },
    compatible: { en: "Media, cards, CTA, treatments.", es: "Media, tarjetas, CTA, tratamientos." },
    incompatible: { en: "Header Logo / Marquee.", es: "Logo / Marquee." },
    badge: { en: "No badge reserved.", es: "Sin insignia." },
    clip: { en: "Stronger inner crop.", es: "Recorte interior más marcado." },
    radius: { en: "May differ from theme radius.", es: "Puede diferir del radio del tema." },
    globalRadius: { en: "Editorial keeps square corners. Global Media Radius does not round this preset.", es: "Editorial conserva esquinas rectas. El Radio de media global no redondea este preajuste." },
    overlay: { en: "Global Overlay may tint the photo. Editorial chrome is the left rule only.", es: "Overlay global puede teñir la foto. El cromado editorial es solo la raya izquierda." },
    externalSpace: { en: "Frame inset, not a hanging badge.", es: "Inset de marco, no insignia colgante." },
    motion: { en: "Compatible.", es: "Compatible." },
    effects: { en: "Compatible.", es: "Compatible." },
  },
  {
    id: "offset-frame",
    purpose: { en: "Offset outline sitting outside the photo.", es: "Contorno desplazado fuera de la foto." },
    shape: { en: "Photo plus outset outline.", es: "Foto más contorno exterior." },
    compatible: { en: "Media, cards, CTA, treatments.", es: "Media, tarjetas, CTA, tratamientos." },
    incompatible: { en: "Header Logo / Marquee.", es: "Logo / Marquee." },
    badge: { en: "No badge reserved.", es: "Sin insignia." },
    clip: { en: "Media clips; outline sits outside.", es: "La media se recorta; el contorno queda fuera." },
    radius: { en: "Outline follows radius.", es: "El contorno sigue el radio." },
    globalRadius: { en: "Offset Frame uses its own small radius. Global Media Radius does not add a second corner.", es: "Offset Frame usa su radio propio pequeño. El Radio de media global no añade una segunda esquina." },
    overlay: { en: "Global Overlay tints the photo. The outset outline is the decorative layer, not an overlay wash.", es: "Overlay global tiñe la foto. El contorno desplazado es la capa decorativa, no un velo." },
    externalSpace: { en: "Yes — frame outset (~0.375rem, tighter on small screens).", es: "Sí — outset de marco (~0.375rem, menor en pantallas chicas)." },
    motion: { en: "Compatible.", es: "Compatible." },
    effects: { en: "Watch overlap with neighboring text because of outset.", es: "Vigilar solape con texto vecino por el outset." },
  },
  {
    id: "floating-badge",
    purpose: { en: "Hidden from the general container list. Useful behavior is consolidated into Inset Badge Cutout.", es: "Oculto de la lista general de contenedores. El comportamiento útil se consolidó en Recorte con insignia integrada." },
    shape: { en: "One media rectangle plus a floating circle in reserved space. No ghost card under the badge.", es: "Un rectángulo de media más un círculo flotante en espacio reservado. Sin tarjeta fantasma bajo la insignia." },
    compatible: { en: "Only badge-compatible targets (doctor, about, technology).", es: "Solo destinos con insignia (doctor, about, tecnología)." },
    incompatible: { en: "Cards, treatments, CTA, logo, marquee. Mutually exclusive vs Integrated Cutout.", es: "Tarjetas, tratamientos, CTA, logo, marquee. Excluyente frente a Integrated Cutout." },
    badge: { en: "Floating overlay badge.", es: "Insignia superpuesta flotante." },
    clip: { en: "Photo clips; badge may hang outside.", es: "La foto se recorta; la insignia puede asomarse." },
    radius: { en: "Media body owns 1.25rem. Badge is a separate circle.", es: "El cuerpo de media posee 1.25rem. La insignia es un círculo aparte." },
    globalRadius: { en: "Floating Badge overrides Global Media Radius on the photo body so wrapper and media cannot mismatch.", es: "Floating Badge anula el Radio de media global en el cuerpo para que wrapper y media no desentonen." },
    overlay: { en: "Global Overlay tints the photo only. It does not draw a frame under the badge.", es: "Overlay global tiñe solo la foto. No dibuja un marco bajo la insignia." },
    externalSpace: { en: "Yes — overlap hangs outside.", es: "Sí — el solape sale del rectángulo." },
    motion: { en: "Compatible.", es: "Compatible." },
    effects: { en: "Uses floating/rotating badge effects.", es: "Usa efectos de insignia flotante/rotatoria." },
  },
  {
    id: "rounded-portrait",
    purpose: { en: "Portrait-friendly rounded media.", es: "Media redondeada tipo retrato." },
    shape: { en: "More circular/soft portrait crop.", es: "Recorte de retrato más circular/suave." },
    compatible: { en: "Media, cards, treatments.", es: "Media, tarjetas, tratamientos." },
    incompatible: { en: "Not in CTA/section list. Not logo/marquee. Conflicts with Full Bleed as an alternate preset.", es: "No está en CTA. No logo/marquee. Choca con Full Bleed como preajuste alterno." },
    badge: { en: "No badge reserved unless combined via badge-capable target + badge preset instead.", es: "Sin insignia a menos que se elija un preajuste de insignia." },
    clip: { en: "Strong rounded clip.", es: "Recorte redondeado fuerte." },
    radius: { en: "Larger than theme default.", es: "Mayor que el radio del tema." },
    globalRadius: { en: "Rounded Portrait owns its radius, including the circular desktop crop. Global Media Radius is ignored.", es: "Rounded Portrait posee su radio, incluido el recorte circular en escritorio. Se ignora el Radio de media global." },
    overlay: { en: "Global Overlay tints the portrait. No extra overlay chrome.", es: "Overlay global tiñe el retrato. Sin cromado extra de overlay." },
    externalSpace: { en: "No hanging chrome.", es: "Sin cromado colgante." },
    motion: { en: "Compatible.", es: "Compatible." },
    effects: { en: "Compatible.", es: "Compatible." },
  },
  {
    id: "full-bleed",
    purpose: { en: "Edge-to-edge media, no inner pad.", es: "Media a sangre, sin pad interior." },
    shape: { en: "Flush rectangle.", es: "Rectángulo a tope." },
    compatible: { en: "Photographic media and treatments. Not care-area cards.", es: "Media fotográfica y tratamientos. No tarjetas de cuidado." },
    incompatible: { en: "Header Logo, marquee, service cards, CTA. Alternate to Rounded Portrait.", es: "Logo, marquee, tarjetas de servicio, CTA. Alterno a Rounded Portrait." },
    badge: { en: "No badge reserved.", es: "Sin insignia." },
    clip: { en: "May bleed to container edges.", es: "Puede llegar a los bordes del contenedor." },
    radius: { en: "Often square/flush.", es: "A menudo recto." },
    globalRadius: { en: "Full Bleed forces radius 0. Global Media Radius cannot round it.", es: "Full Bleed fuerza radio 0. El Radio de media global no puede redondearlo." },
    overlay: { en: "Global Overlay tints the flush photo.", es: "Overlay global tiñe la foto a sangre." },
    externalSpace: { en: "No extra outset.", es: "Sin outset extra." },
    motion: { en: "Compatible.", es: "Compatible." },
    effects: { en: "Watch neighboring text collisions.", es: "Vigilar colisión con texto vecino." },
  },
  {
    id: "feature-card",
    purpose: { en: "A stronger premium media card. One silhouette, distinct from Soft Card.", es: "Tarjeta de media premium más marcada. Una silueta, distinta de Soft Card." },
    shape: { en: "One elevated card with accent border and stronger shadow.", es: "Una tarjeta elevada con borde de acento y sombra más fuerte." },
    compatible: { en: "Media, cards, CTA, treatments.", es: "Media, tarjetas, CTA, tratamientos." },
    incompatible: { en: "Logo / marquee. No badge.", es: "Logo / marquee. Sin insignia." },
    badge: { en: "Does not combine with Badge. Choose Inset Badge Cutout instead.", es: "No se combina con insignia. Elija Recorte con insignia integrada." },
    clip: { en: "Clips media to the card.", es: "Recorta la media a la tarjeta." },
    radius: { en: "Card owns 1.25rem.", es: "La tarjeta posee 1.25rem." },
    globalRadius: { en: "Feature Card overrides Global Media Radius.", es: "Feature Card anula el Radio de media global." },
    overlay: { en: "Global Overlay tints the photo inside the card. No second frame.", es: "Overlay global tiñe la foto dentro de la tarjeta. Sin segundo marco." },
    externalSpace: { en: "No hanging chrome.", es: "Sin cromado colgante." },
    motion: { en: "Compatible with Motion.", es: "Compatible con Motion." },
    effects: { en: "No badge or action. Not a video/carousel enable.", es: "Sin insignia ni acción. No activa video/carrusel." },
  },
  {
    id: "corner-action",
    purpose: { en: "Media body plus a circular action reserved outside a corner. Not Integrated Cutout.", es: "Cuerpo de media más una acción circular reservada fuera de una esquina. No es Integrated Cutout." },
    shape: { en: "One media rectangle; action sits in reserved corner space, not on top of the border.", es: "Un rectángulo de media; la acción vive en espacio de esquina reservado, no encima del borde." },
    compatible: { en: "Service cards and other truly interactive linked cards. Not static portraits.", es: "Tarjetas de servicio y otras tarjetas enlazadas realmente interactivas. No retratos estáticos." },
    incompatible: { en: "Dr. Matute Media, decorative images, treatments, logo, marquee, CTA. Hidden unless the target has a real link or CTA. Exclusive vs Inset Badge Cutout.", es: "Media de Dr. Matute, imágenes decorativas, tratamientos, logo, marquee, CTA. Oculto salvo que el destino tenga un enlace o CTA real. Excluyente frente a Recorte con insignia integrada." },
    badge: { en: "Does not combine with Badge. Action glyph is not a badge.", es: "No se combina con insignia. El glifo de acción no es una insignia." },
    clip: { en: "Photo clips; action is never clipped.", es: "La foto se recorta; la acción no se recorta." },
    radius: { en: "Media owns an asymmetric corner radius. Action is a separate circle.", es: "La media posee un radio de esquina asimétrico. La acción es un círculo aparte." },
    globalRadius: { en: "Corner Action overrides Global Media Radius so nested radii cannot ghost.", es: "Corner Action anula el Radio de media global para que no haya radios fantasma." },
    overlay: { en: "Global Overlay tints the photo only.", es: "Overlay global tiñe solo la foto." },
    externalSpace: { en: "Reserved corner padding. Action stays outside the media border.", es: "Padding de esquina reservado. La acción queda fuera del borde de la media." },
    motion: { en: "Compatible with Motion on the media body.", es: "Compatible con Motion en el cuerpo de media." },
    effects: { en: "Uses the shared action-container system. Glyph/morph follow Corner Action controls.", es: "Usa el sistema compartido de contenedor de acción. Glifo/morph siguen los controles de Corner Action." },
  },
  {
    id: "top-action",
    purpose: { en: "Action control on the upper edge, centered. Same family as Corner and Bottom Action, not identical.", es: "Control de acción en el borde superior, centrado. Misma familia que Corner y Bottom Action, no idéntico." },
    shape: { en: "Media with tighter top corners; action reserved above the top edge.", es: "Media con esquinas superiores más cerradas; acción reservada sobre el borde superior." },
    compatible: { en: "Interactive linked cards that include top-action. Not static portraits.", es: "Tarjetas enlazadas interactivas que incluyen top-action. No retratos estáticos." },
    incompatible: { en: "Dr. Matute Media, treatments, logo, marquee. Hidden when there is no real destination. Exclusive vs Inset Badge Cutout.", es: "Media de Dr. Matute, tratamientos, logo, marquee. Oculto cuando no hay destino real. Excluyente frente a Recorte con insignia integrada." },
    badge: { en: "Does not combine with Badge.", es: "No se combina con insignia." },
    clip: { en: "Photo clips; top control is never clipped.", es: "La foto se recorta; el control superior no se recorta." },
    radius: { en: "Heavier bottom radius, tighter top. Overrides Global Media Radius.", es: "Radio inferior más marcado, superior más cerrado. Anula el Radio de media global." },
    globalRadius: { en: "Top Action owns radius. Global Media Radius is ignored.", es: "Top Action posee el radio. Se ignora el Radio de media global." },
    overlay: { en: "Global Overlay tints the photo only.", es: "Overlay global tiñe solo la foto." },
    externalSpace: { en: "Reserved top padding. Action sits on the upper edge, not on the border line.", es: "Padding superior reservado. La acción vive en el borde superior, no sobre la línea del marco." },
    motion: { en: "Compatible with Motion.", es: "Compatible con Motion." },
    effects: { en: "Shared action-container system, top anchor.", es: "Sistema compartido de acción, ancla superior." },
  },
  {
    id: "bottom-action",
    purpose: { en: "Action control on the lower edge, centered. Distinct from Corner and Top Action.", es: "Control de acción en el borde inferior, centrado. Distinto de Corner y Top Action." },
    shape: { en: "Media with tighter bottom corners; action reserved below the bottom edge.", es: "Media con esquinas inferiores más cerradas; acción reservada bajo el borde inferior." },
    compatible: { en: "Interactive linked cards that include bottom-action. Not static portraits.", es: "Tarjetas enlazadas interactivas que incluyen bottom-action. No retratos estáticos." },
    incompatible: { en: "Dr. Matute Media, treatments, logo, marquee. Hidden when there is no real destination. Exclusive vs Inset Badge Cutout.", es: "Media de Dr. Matute, tratamientos, logo, marquee. Oculto cuando no hay destino real. Excluyente frente a Recorte con insignia integrada." },
    badge: { en: "Does not combine with Badge.", es: "No se combina con insignia." },
    clip: { en: "Photo clips; bottom control is never clipped.", es: "La foto se recorta; el control inferior no se recorta." },
    radius: { en: "Heavier top radius, tighter bottom. Overrides Global Media Radius.", es: "Radio superior más marcado, inferior más cerrado. Anula el Radio de media global." },
    globalRadius: { en: "Bottom Action owns radius. Global Media Radius is ignored.", es: "Bottom Action posee el radio. Se ignora el Radio de media global." },
    overlay: { en: "Global Overlay tints the photo only.", es: "Overlay global tiñe solo la foto." },
    externalSpace: { en: "Reserved bottom padding. Action sits on the lower edge.", es: "Padding inferior reservado. La acción vive en el borde inferior." },
    motion: { en: "Compatible with Motion.", es: "Compatible con Motion." },
    effects: { en: "Shared action-container system, bottom anchor.", es: "Sistema compartido de acción, ancla inferior." },
  },
  {
    id: "media-overlay",
    purpose: { en: "One media silhouette with a gradient wash on the photo. Visual chrome only.", es: "Una silueta de media con velo degradado sobre la foto. Solo cromado visual." },
    shape: { en: "Single media rectangle, no extra card frame.", es: "Un solo rectángulo de media, sin tarjeta extra." },
    compatible: { en: "Photographic media where overlay styling is semantically useful (hero, doctor, about, technology, contact).", es: "Media fotográfica donde un overlay tiene sentido semántico (héroe, doctor, about, tecnología, contacto)." },
    incompatible: { en: "Service cards, treatments, CTA, logo, marquee. Does not turn on video or carousel.", es: "Tarjetas de servicio, tratamientos, CTA, logo, marquee. No enciende video ni carrusel." },
    badge: { en: "Does not combine with Badge.", es: "No se combina con insignia." },
    clip: { en: "Clips media. Gradient lives on the photo.", es: "Recorta la media. El degradado vive en la foto." },
    radius: { en: "Preset owns 1rem. Overrides Global Media Radius.", es: "El preajuste posee 1rem. Anula el Radio de media global." },
    globalRadius: { en: "Media Overlay Chrome ignores Global Media Radius to keep one silhouette.", es: "Media Overlay Chrome ignora el Radio de media global para conservar una silueta." },
    overlay: { en: "This preset owns the gradient. Global Overlay is disabled here so two washes cannot stack.", es: "Este preajuste posee el degradado. Overlay global se desactiva aquí para que no se apilen dos velos." },
    externalSpace: { en: "No hanging chrome.", es: "Sin cromado colgante." },
    motion: { en: "Compatible with Motion.", es: "Compatible con Motion." },
    effects: { en: "Chrome only — use Special Effects Video to enable playback.", es: "Solo cromado — use Video en Efectos para activar reproducción." },
  },
  {
    id: "carousel-card",
    purpose: { en: "One clean card silhouette suitable for a carousel. Does not enable Carousel.", es: "Una silueta de tarjeta limpia apta para carrusel. No activa Carrusel." },
    shape: { en: "Single card chrome. No arrows or dots.", es: "Un solo cromado de tarjeta. Sin flechas ni puntos." },
    compatible: { en: "Carousel/card-capable targets (service cards) or Lab card-chrome preview on those targets.", es: "Destinos de carrusel/tarjeta (tarjetas de servicio) o vista previa de cromado de tarjeta en el Lab en esos destinos." },
    incompatible: { en: "Dr. Matute portraits and other static media. Logo/marquee no. This is not a normal doctor portrait style.", es: "Retratos de Dr. Matute y otra media estática. Logo/marquee no. No es un estilo normal de retrato." },
    badge: { en: "Does not combine with Badge.", es: "No se combina con insignia." },
    clip: { en: "Card clips media.", es: "La tarjeta recorta la media." },
    radius: { en: "Card owns 1.1rem.", es: "La tarjeta posee 1.1rem." },
    globalRadius: { en: "Carousel Card Chrome overrides Global Media Radius.", es: "Carousel Card Chrome anula el Radio de media global." },
    overlay: { en: "Global Overlay tints the photo inside the card. This preset does not add a second overlay frame.", es: "Overlay global tiñe la foto dentro de la tarjeta. Este preajuste no añade un segundo marco de overlay." },
    externalSpace: { en: "No hanging chrome. No carousel controls.", es: "Sin cromado colgante. Sin controles de carrusel." },
    motion: { en: "Compatible with Motion.", es: "Compatible con Motion." },
    effects: { en: "Enable Carousel in Special Effects to paginate service cards. This preset does not do that.", es: "Active Carrusel en Efectos especiales para paginar tarjetas. Este preajuste no lo hace." },
  },
  {
    id: "media-card-modern",
    purpose: { en: "Near-square photographic service card with a bottom title overlay and an independent top-right action.", es: "Tarjeta fotográfica casi cuadrada con título inferior y una acción independiente en la esquina superior derecha." },
    shape: { en: "Rounded media body with a transparent top-right recess. The circular arrow is a separate element, not part of the photograph.", es: "Cuerpo de media redondeado con un receso transparente superior derecho. La flecha circular es un elemento aparte, no parte de la fotografía." },
    compatible: { en: "Home and Services care-area cards.", es: "Tarjetas de áreas de cuidado en Inicio y Servicios." },
    incompatible: { en: "Header logo, marquee, doctor portraits, treatments, CTA blocks.", es: "Logo, marquee, retratos, tratamientos, bloques CTA." },
    badge: { en: "Does not use the badge system. The action arrow is an independent control.", es: "No usa el sistema de insignia. La flecha de acción es un control independiente." },
    clip: { en: "Media clips to the rounded, notched silhouette. Image zoom stays inside the card.", es: "La media se recorta a la silueta redondeada con receso. El zoom de imagen permanece dentro de la tarjeta." },
    radius: { en: "Card owns 28px corners. Overrides Global Media Radius.", es: "La tarjeta posee esquinas de 28px. Anula el Radio de media global." },
    globalRadius: { en: "Media Card Modern owns radius. Global Media Radius is ignored.", es: "Media Card Modern posee el radio. Se ignora el Radio de media global." },
    overlay: { en: "A modest navy readability wash at the bottom is presentation chrome, not part of the media file. It should recede into the photo. Global Overlay still tints the photo only.", es: "Un velo navy modesto en la parte inferior es cromado de presentación, no parte del archivo. Debe fundirse con la foto. Overlay global tiñe solo la foto." },
    externalSpace: { en: "Top-right recess lets page background show around the independent action button.", es: "El receso superior derecho deja ver el fondo de página alrededor del botón de acción independiente." },
    motion: { en: "Pointer hover zooms only the image layer (~1.03). The card size does not change.", es: "Hover de puntero hace zoom solo de la imagen (~1.03). El tamaño de la tarjeta no cambia." },
    effects: { en: "Independent circular action. Learn more under the card is not used with this preset.", es: "Acción circular independiente. Learn more bajo la tarjeta no se usa con este preajuste." },
  },
  {
    id: "video-card",
    purpose: { en: "Poster-like media card. Stronger frame. Does not enable Video.", es: "Tarjeta de media tipo póster. Marco más marcado. No activa Video." },
    shape: { en: "One poster silhouette with a heavier border.", es: "Una silueta de póster con borde más grueso." },
    compatible: { en: "Video-capable media and poster/video preview targets (hero, technology).", es: "Media con video y destinos de póster/vista previa (héroe, tecnología)." },
    incompatible: { en: "Static Dr. Matute portraits unless video capability exists. Service cards, treatments, logo, marquee no.", es: "Retratos estáticos de Dr. Matute salvo que exista capacidad de video. Tarjetas de servicio, tratamientos, logo, marquee no." },
    badge: { en: "Does not combine with Badge. Play behavior is a separate Video effect.", es: "No se combina con insignia. Play es un efecto Video aparte." },
    clip: { en: "Poster clips media.", es: "El póster recorta la media." },
    radius: { en: "Poster owns 0.9rem.", es: "El póster posee 0.9rem." },
    globalRadius: { en: "Video Card Chrome overrides Global Media Radius.", es: "Video Card Chrome anula el Radio de media global." },
    overlay: { en: "Global Overlay tints the poster photo. No extra overlay frame from this preset.", es: "Overlay global tiñe la foto del póster. Este preajuste no añade otro marco de overlay." },
    externalSpace: { en: "No hanging chrome.", es: "Sin cromado colgante." },
    motion: { en: "Compatible with Motion.", es: "Compatible con Motion." },
    effects: { en: "Turn on Video in Special Effects on hero/technology to enable playback.", es: "Active Video en Efectos en héroe/tecnología para reproducir." },
  },
  {
    id: "badge-card",
    purpose: { en: "Hidden from the general container list. Useful behavior is consolidated into Inset Badge Cutout.", es: "Oculto de la lista general de contenedores. El comportamiento útil se consolidó en Recorte con insignia integrada." },
    shape: { en: "One card silhouette with a docked circular badge.", es: "Una silueta de tarjeta con insignia circular adosada." },
    compatible: { en: "Badge-compatible targets only.", es: "Solo destinos con insignia." },
    incompatible: { en: "Service cards, treatments, CTA, logo, marquee. Exclusive vs Integrated Cutout and Floating Badge.", es: "Tarjetas de servicio, tratamientos, CTA, logo, marquee. Excluyente frente a Integrated Cutout y Floating Badge." },
    badge: { en: "Attached/docked badge. Does not notch the card silhouette.", es: "Insignia adosada. No recorta la silueta de la tarjeta." },
    clip: { en: "Photo clips to the card; badge sits in reserved space and is not clipped.", es: "La foto se recorta a la tarjeta; la insignia vive en espacio reservado y no se recorta." },
    radius: { en: "Card owns 1.5rem. Badge is a separate circle.", es: "La tarjeta posee 1.5rem. La insignia es un círculo aparte." },
    globalRadius: { en: "Badge Card overrides Global Media Radius on the card body.", es: "Badge Card anula el Radio de media global en el cuerpo de la tarjeta." },
    overlay: { en: "Global Overlay tints the photo inside the card, not a frame under the badge.", es: "Overlay global tiñe la foto dentro de la tarjeta, no un marco bajo la insignia." },
    externalSpace: { en: "Reserved dock so the badge is not a circle sitting on an unchanged rectangle.", es: "Muelle reservado para que la insignia no sea un círculo sobre un rectángulo intacto." },
    motion: { en: "Compatible with Motion on the card body.", es: "Compatible con Motion en el cuerpo de la tarjeta." },
    effects: { en: "Uses rotating/static badge controls. Not a silhouette cutout.", es: "Usa controles de insignia rotatoria/estática. No es un recorte de silueta." },
  },
  {
    id: "integrated-cutout",
    purpose: { en: "Hidden from the general container list. Useful bite geometry is consolidated into Inset Badge Cutout.", es: "Oculto de la lista general de contenedores. La geometría de recorte útil se consolidó en Recorte con insignia integrada." },
    shape: { en: "Notched rectangle with integrated circle — not a badge on a rectangle.", es: "Rectángulo dentado con círculo integrado — no una insignia sobre un rectángulo." },
    compatible: { en: "Doctor media and service cards (and other media lists that include it).", es: "Media de doctor y tarjetas de servicio (y otras listas de media que lo incluyen)." },
    incompatible: { en: "Treatments, CTA section list, logo, marquee. Cannot combine with Badge Card or Floating Badge as a second preset.", es: "Tratamientos, CTA, logo, marquee. No se combina con Badge Card o Floating Badge como segundo preajuste." },
    badge: { en: "Integrated circular control, not overlay badge.", es: "Control circular integrado, no insignia superpuesta." },
    clip: { en: "Mask uses a circle cut; broken mask is a critical defect.", es: "La máscara usa un recorte circular; una máscara rota es un defecto crítico." },
    radius: { en: "Cutout radius is derived from badge size + gap, not the theme slider alone.", es: "El radio del recorte sale del tamaño de insignia + hueco, no solo del slider del tema." },
    globalRadius: { en: "Integrated Cutout ignores Global Media Radius. The bite geometry owns the silhouette.", es: "Integrated Cutout ignora el Radio de media global. La geometría del recorte posee la silueta." },
    overlay: { en: "Global Overlay may tint the photo inside the masked body. It must not restore a ghost rectangle.", es: "Overlay global puede teñir la foto dentro del cuerpo enmascarado. No debe devolver un rectángulo fantasma." },
    externalSpace: { en: "Padding reserved on the cutout side so the circle is not clipped.", es: "Hay padding en el lado del recorte para no cortar el círculo." },
    motion: { en: "Compatible, but transform on the masked node can break the bite — inspect after motion.", es: "Compatible, pero un transform en el nodo enmascarado puede romper el recorte." },
    effects: { en: "Pairs with corner/cutout control; not with hanging floating badge overlay.", es: "Se junta con el control de recorte; no con insignia flotante colgante." },
  },
  {
    id: "inset-badge-cutout",
    purpose: {
      en: "Circular badge integrated into the lower-left media geometry. The container curves around the badge instead of placing the badge on top of a rectangle.",
      es: "Insignia circular integrada en la geometría inferior izquierda de la media. El contenedor se curva alrededor de la insignia en lugar de colocarla sobre un rectángulo.",
    },
    shape: {
      en: "One composed silhouette: media + circular badge + concave circular recess. Left edge flows into the recess, then into the bottom edge. No rectangular notch.",
      es: "Una silueta compuesta: media + insignia circular + receso cóncavo circular. El borde izquierdo fluye al receso y luego al borde inferior. Sin muesca rectangular.",
    },
    compatible: {
      en: "Media targets that support Container presets and the existing WCDA badge.",
      es: "Destinos de media que admiten preajustes de contenedor y la insignia WCDA existente.",
    },
    incompatible: {
      en: "Logo, marquee, CTA, and non-media targets unless already supported by the current compatibility matrix.",
      es: "Logo, marquee, CTA y destinos que no son media, salvo que la matriz de compatibilidad actual ya los admita.",
    },
    badge: {
      en: "Canonical WCDA badge/media composition. Supports static icon, rotating text, info icon, or WCDA symbol by target. Decorative unless the target is actually interactive.",
      es: "Composición canónica de insignia/media WCDA. Admite icono estático, texto rotatorio, icono de información o símbolo WCDA según el destino. Decorativa salvo que el destino sea realmente interactivo.",
    },
    clip: {
      en: "A radial mask bites a circular recess into the rounded media body. Nearby corners stay smooth.",
      es: "Una máscara radial recorta un receso circular en el cuerpo de media redondeado. Las esquinas cercanas siguen suaves.",
    },
    radius: {
      en: "Upper-left, upper-right, and lower-right follow Global Media Radius. Lower-left is the inset-badge concave. Desktop baseline: 96px badge, 16px left/bottom inset.",
      es: "Arriba izquierda, arriba derecha y abajo derecha siguen el Radio de media global. Abajo izquierda es el receso de la insignia. Base de escritorio: insignia 96px, inset izquierdo/inferior 16px.",
    },
    globalRadius: {
      en: "Global Media Radius still governs the three ordinary corners. The lower-left cutout is Container 05 geometry.",
      es: "El Radio de media global sigue gobernando las tres esquinas ordinarias. El receso inferior izquierdo es geometría del Contenedor 05.",
    },
    overlay: {
      en: "Global Overlay may tint the photo inside the masked body. It must not restore a ghost rectangle behind the badge.",
      es: "Overlay global puede teñir la foto dentro del cuerpo enmascarado. No debe devolver un rectángulo fantasma detrás de la insignia.",
    },
    externalSpace: {
      en: "Desktop baseline keeps ~16px left and ~16px bottom inset so the badge sits inside the composition. It does not hang as a floating control. Persistence: Custom preview now; Apply Custom as Current writes the selected target.",
      es: "La base de escritorio mantiene ~16px a la izquierda y ~16px abajo para que la insignia quede dentro de la composición. No cuelga como un control flotante. Persistencia: vista previa Custom ahora; Aplicar Custom como versión actual escribe el destino.",
    },
    motion: {
      en: "Compatible, but transform on the masked node can break the bite — inspect after motion.",
      es: "Compatible, pero un transform en el nodo enmascarado puede romper el recorte.",
    },
    effects: {
      en: "Doctor portraits may keep the decorative rotating badge. The badge does not imply navigation unless the target is interactive. Action arrows stay on Corner/Top/Bottom Action only.",
      es: "Los retratos de doctor pueden conservar la insignia rotatoria decorativa. La insignia no implica navegación salvo que el destino sea interactivo. Las flechas de acción quedan solo en Corner/Top/Bottom Action.",
    },
  },
];

export const selectedElementMatrix: Array<{
  id: VisualTargetId;
  page: PreviewPagePath;
  component: string;
  brand: boolean;
  colors: boolean;
  typography: boolean;
  media: boolean;
  containers: boolean;
  motion: boolean;
  effects: Bi;
}> = [
  { id: "header-logo", page: "/", component: "HeaderLogo / SiteHeader", brand: true, colors: true, typography: true, media: true, containers: true, motion: false, effects: { en: "Cursor companion", es: "Compañero de cursor" } },
  { id: "home-hero-media", page: "/", component: "Hero ExperienceSlot", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "Video", es: "Video" } },
  { id: "home-hero-content", page: "/", component: "Hero Content", brand: true, colors: true, typography: true, media: false, containers: false, motion: false, effects: { en: "Position", es: "Posición" } },
  { id: "home-doctor-media", page: "/", component: "PracticeIntroduction / ExperienceMedia", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "Badges (Inset Badge Cutout). No action arrows.", es: "Insignias (Recorte con insignia integrada). Sin flechas de acción." } },
  { id: "home-care-areas", page: "/", component: "CareAreaCollection", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "Carousel, corner action", es: "Carrusel, acción de esquina" } },
  { id: "home-cta", page: "/", component: "PatientCta", brand: true, colors: true, typography: true, media: false, containers: true, motion: true, effects: { en: "None", es: "Ninguno" } },
  { id: "home-marquee", page: "/", component: "ServiceMarquee", brand: true, colors: true, typography: true, media: false, containers: false, motion: false, effects: { en: "Marquee", es: "Marquee" } },
  { id: "about-content", page: "/about", component: "AboutPage media slot", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "Badges if style allows", es: "Insignias si el estilo lo permite" } },
  { id: "about-doctor-media", page: "/about/dr-jonnathan-matute", component: "DoctorProfileSection", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "Badges (Inset Badge Cutout). No action arrows.", es: "Insignias (Recorte con insignia integrada). Sin flechas de acción." } },
  { id: "services-care-cards", page: "/services", component: "CareAreaCollection", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "Carousel, corner action", es: "Carrusel, acción de esquina" } },
  { id: "services-treatment-media", page: "/services", component: "TreatmentItem / groups", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "None (no video/carousel chrome)", es: "Ninguno (sin cromado de video/carrusel)" } },
  { id: "technology-media", page: "/technology", component: "TechnologyPage slot", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "Video, badges. Before/after is experimental and hidden.", es: "Video, insignias. Antes/después es experimental y está oculto." } },
  { id: "contact-media", page: "/contact", component: "ContactMediaStage", brand: true, colors: true, typography: true, media: true, containers: true, motion: true, effects: { en: "None special by default", es: "Ningún efecto especial por defecto" } },
  { id: "patients-resource-cards", page: "/patients", component: "CardGridSection / PatientsHub", brand: true, colors: true, typography: true, media: false, containers: true, motion: false, effects: { en: "Surface lightness", es: "Claridad del fondo" } },
  { id: "editorial-cards", page: "/services", component: "InfoCard / editorial-card", brand: true, colors: true, typography: true, media: false, containers: true, motion: false, effects: { en: "Surface lightness. 0% = WCDA Surface #E4D9D1.", es: "Claridad del fondo. 0% = Superficie WCDA #E4D9D1." } },
];

export const unavailableNotes = {
  headerLogoCarousel: {
    en: "Not available for Header Logo.",
    es: "No disponible para Logo del encabezado.",
  },
  requiresMedia: {
    en: "Requires a media target.",
    es: "Requiere un elemento de imagen/video.",
  },
  cutoutConflict: {
    en: "Cannot be combined with Inset Badge Cutout. Choose one container preset.",
    es: "No puede combinarse con Recorte con insignia integrada. Elija un solo preajuste de contenedor.",
  },
  carouselOnly: {
    en: "Carousel controls apply only when Carousel is enabled and a service-card element is selected.",
    es: "Los controles de carrusel solo aplican cuando Carousel está activo y hay un elemento de tarjetas de servicio.",
  },
  marqueeOnly: {
    en: "These controls apply only to Services Marquee.",
    es: "Estos controles solo aplican al marquee de servicios.",
  },
  marqueeDisabled: {
    en: "Marquee layout, speed, and surface apply only when Marquee is enabled.",
    es: "Diseño, velocidad y superficie del marquee solo aplican cuando Marquee está activo.",
  },
  videoDisabled: {
    en: "Video mode, poster, and play controls apply only when Video is enabled.",
    es: "Modo, póster y controles de reproducción solo aplican cuando Video está activo.",
  },
  carouselDisabled: {
    en: "Carousel controls apply only when Carousel is enabled.",
    es: "Los controles de carrusel solo aplican cuando Carousel está activo.",
  },
  cornerDisabled: {
    en: "Position, glyph, and hover morph apply only when Corner Action is enabled.",
    es: "Posición, glifo y morph al pasar el cursor solo aplican cuando Corner Action está activo.",
  },
};

export type LabWordKey = string;
