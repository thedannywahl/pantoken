import type { CdnPickerStrings } from "./theme/cdn";

/** The locales the docs site builds: `root` (English) and `hu` (Hungarian). */
export type DocsLocale = "root" | "hu";

type LocaleMeta = {
  label: string;
  lang: string;
  guidePrefix: string;
  apiPrefix: string;
  description: string;
  nav: { guide: string; packages: string; css: string; api: string };
  sidebar: {
    intro: string;
    guides: string;
    gettingStarted: string;
    packageMap: string;
    architecture: string;
    components: string;
    cdn: string;
    cdnPicker: string;
    cli: string;
    plugins: string;
    generated: string;
    api: string;
    apiOverview: string;
  };
  editText: string;
  // The CSS reference is merged into the TypeDoc sidebar by `@cssdoc/typedoc`, so there's one path.
  typedocSidebarPath: string;
  // The pantoken palette selector injected into the nav by the custom theme (see ThemeSelector.vue).
  // `Canvas` is an Instructure product name and stays as-is per brand rules; only descriptors translate.
  themeSelector: {
    label: string;
    rebrand: string;
    canvas: string;
    canvasHighContrast: string;
  };
  // The interactive CDN combine-URL builder on the CDN guide page (see theme/components/CdnPicker.vue
  // and theme/cdn.ts). Component names and the generated URL are not translated.
  cdnPicker: CdnPickerStrings;
  // Default-theme chrome VitePress renders around the content. Without these the Hungarian site shows
  // English labels (outline heading, prev/next footer, dark-mode toggle, the 404 page, etc.).
  chrome: {
    outlineLabel: string;
    docFooterPrev: string;
    docFooterNext: string;
    darkModeSwitchLabel: string;
    lightModeSwitchTitle: string;
    darkModeSwitchTitle: string;
    sidebarMenuLabel: string;
    returnToTopLabel: string;
    langMenuLabel: string;
    lastUpdatedText: string;
    notFound: {
      code: string;
      title: string;
      quote: string;
      linkLabel: string;
      linkText: string;
    };
  };
  // Local-provider search UI. Wired into the global `themeConfig.search.options.locales` (the search
  // index reads the root themeConfig, not the per-route one), keyed by locale.
  search: {
    buttonText: string;
    displayDetails: string;
    resetButtonTitle: string;
    backButtonTitle: string;
    noResultsText: string;
    footerSelect: string;
    footerNavigate: string;
    footerClose: string;
  };
};

/** Per-locale metadata — route prefixes, nav/sidebar labels, and all translated UI chrome. */
export const LOCALES: Record<DocsLocale, LocaleMeta> = {
  root: {
    label: "English",
    lang: "en-US",
    guidePrefix: "/guide/",
    apiPrefix: "/api/",
    description: "Instructure design tokens and icons, reshaped for every platform and framework.",
    nav: { guide: "Guide", packages: "Packages", css: "CSS", api: "API reference" },
    sidebar: {
      intro: "Introduction",
      guides: "Guides",
      gettingStarted: "Getting started",
      packageMap: "The package map",
      architecture: "Architecture",
      components: "Components",
      cdn: "CDN & distribution",
      cdnPicker: "CDN picker",
      cli: "The pantoken CLI",
      plugins: "Plugins",
      generated: "Generated output",
      api: "API reference",
      apiOverview: "Overview",
    },
    editText: "Edit this page on GitHub",
    typedocSidebarPath: "../api/typedoc-sidebar.json",
    themeSelector: {
      label: "Select theme",
      rebrand: "Rebrand",
      canvas: "Canvas",
      canvasHighContrast: "Canvas high contrast",
    },
    cdnPicker: {
      themeLabel: "Theme",
      themeRebrand: "Rebrand",
      themeCanvas: "Canvas",
      themeCanvasHighContrast: "Canvas high contrast",
      modeLabel: "Rebrand mode",
      modeAdaptive: "Light + dark",
      modeLightOnly: "Light only",
      includeDarkMode: "Include dark mode",
      componentsLabel: "Components",
      allComponents: "All components",
      formatLabel: "Output",
      formatLink: "<link>",
      formatImport: "@import",
      includeBase: "Base",
      baseInfoLabel: "About the base reset",
      baseInfo:
        "The opt-in global reset: box-sizing, the page surface, base text colour and font, color-scheme, and link defaults.",
      includeUtilities: "Utilities",
      utilitiesInfoLabel: "About the utility classes",
      utilitiesInfo:
        "An opt-in layer of cross-cutting classes: a View primitive, spacing on the token scale, and semantic color overrides.",
      copy: "Copy",
      copied: "Copied",
      empty: "Select one or more components to build a URL.",
      fontsNote:
        "Fonts load separately — add a <link> to @pantoken/components/fonts.css when you need them.",
      iconsNote: "component-icons.css is included because a selected component uses icons.",
    },
    chrome: {
      outlineLabel: "On this page",
      docFooterPrev: "Previous page",
      docFooterNext: "Next page",
      darkModeSwitchLabel: "Appearance",
      lightModeSwitchTitle: "Switch to light theme",
      darkModeSwitchTitle: "Switch to dark theme",
      sidebarMenuLabel: "Menu",
      returnToTopLabel: "Return to top",
      langMenuLabel: "Change language",
      lastUpdatedText: "Last updated",
      notFound: {
        code: "404",
        title: "PAGE NOT FOUND",
        quote:
          "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
        linkLabel: "go to home",
        linkText: "Take me home",
      },
    },
    search: {
      buttonText: "Search",
      displayDetails: "Display detailed list",
      resetButtonTitle: "Reset search",
      backButtonTitle: "Close search",
      noResultsText: "No results for",
      footerSelect: "to select",
      footerNavigate: "to navigate",
      footerClose: "to close",
    },
  },
  hu: {
    label: "Magyar",
    lang: "hu-HU",
    guidePrefix: "/hu/guide/",
    apiPrefix: "/hu/api/",
    description: "Instructure design tokenek és ikonok, minden platformhoz és frameworkhöz.",
    nav: { guide: "Útmutató", packages: "Csomagok", css: "CSS", api: "API referencia" },
    sidebar: {
      intro: "Bevezetés",
      guides: "Útmutatók",
      gettingStarted: "Kezdés",
      packageMap: "A csomagtérkép",
      architecture: "Architektúra",
      components: "Komponensek",
      cdn: "CDN és terjesztés",
      cdnPicker: "CDN választó",
      cli: "A pantoken CLI",
      plugins: "Pluginek",
      generated: "Generált kimenet",
      api: "API referencia",
      apiOverview: "Áttekintés",
    },
    editText: "Oldal szerkesztése GitHubon",
    typedocSidebarPath: "../hu/api/typedoc-sidebar.json",
    themeSelector: {
      label: "Téma kiválasztása",
      rebrand: "Rebrand",
      canvas: "Canvas",
      canvasHighContrast: "Canvas nagy kontraszt",
    },
    cdnPicker: {
      themeLabel: "Téma",
      themeRebrand: "Rebrand",
      themeCanvas: "Canvas",
      themeCanvasHighContrast: "Canvas nagy kontraszt",
      modeLabel: "Rebrand mód",
      modeAdaptive: "Világos + sötét",
      modeLightOnly: "Csak világos",
      includeDarkMode: "Sötét mód belefoglalása",
      componentsLabel: "Komponensek",
      allComponents: "Minden komponens",
      formatLabel: "Kimenet",
      formatLink: "<link>",
      formatImport: "@import",
      includeBase: "Alap reset",
      baseInfoLabel: "Információ az alap resetről",
      baseInfo:
        "Az opcionálisan bekapcsolható globális reset: box-sizing, az oldal felülete, az alap szöveg színe és betűtípusa, a color-scheme, és a linkek alapbeállításai.",
      includeUtilities: "Segédeszközök",
      utilitiesInfoLabel: "Információ a segédeszközökről",
      utilitiesInfo:
        "Egy opcionálisan bekapcsolható réteg általános osztályokkal: a View primitív, térköz a token skálán, és szemantikus szín felülírások.",
      copy: "Másolás",
      copied: "Másolva",
      empty: "Válassz ki egy vagy több komponenst az URL felépítéséhez.",
      fontsNote:
        "A betűtípusok külön töltődnek be — adj hozzá egy <link> elemet a @pantoken/components/fonts.css fájlhoz, ha szükséged van rájuk.",
      iconsNote:
        "A component-icons.css azért szerepel, mert egy kiválasztott komponens ikonokat használ.",
    },
    chrome: {
      outlineLabel: "Ezen az oldalon",
      docFooterPrev: "Előző oldal",
      docFooterNext: "Következő oldal",
      darkModeSwitchLabel: "Megjelenés",
      lightModeSwitchTitle: "Váltás világos témára",
      darkModeSwitchTitle: "Váltás sötét témára",
      sidebarMenuLabel: "Menü",
      returnToTopLabel: "Vissza a tetejére",
      langMenuLabel: "Nyelv váltása",
      lastUpdatedText: "Utoljára frissítve",
      notFound: {
        code: "404",
        title: "AZ OLDAL NEM TALÁLHATÓ",
        quote:
          "De ha nem változtatsz az irányodon, és tovább keresel, könnyen ott végezheted, amerre tartasz.",
        linkLabel: "vissza a főoldalra",
        linkText: "Vissza a főoldalra",
      },
    },
    search: {
      buttonText: "Keresés",
      displayDetails: "Részletes lista megjelenítése",
      resetButtonTitle: "Keresés törlése",
      backButtonTitle: "Keresés bezárása",
      noResultsText: "Nincs találat erre:",
      footerSelect: "kiválasztás",
      footerNavigate: "navigálás",
      footerClose: "bezárás",
    },
  },
};
