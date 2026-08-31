import { CANVAS_LOCALES } from "@pantoken/i18n";
import { CDN_PICKER_DEFAULTS, type CdnPickerStrings } from "./theme/cdn.ts";
import type { GetStartedTabsStrings } from "./theme/get-started.ts";
import { TranslationMemory } from "../scripts/translation-memory.ts";

/**
 * Every locale the docs site builds: `root` (English) plus every non-`en` Canvas locale from
 * `@pantoken/i18n`'s `CANVAS_LOCALES` (44 BCP47 tags — `en` is dropped since `root` already covers
 * US English). English regional variants (`en-AU`, `en-CA`, `en-GB`) get their own route prefix AND
 * their own translated UI strings — British/Australian/Canadian spelling and phrasing differ from US
 * English (colour/centre, -ise vs. -ize, etc.), so they go through the same translation pipeline as
 * every other locale rather than passing through the `root` English source untouched.
 * `CANVAS_LOCALES` is typed as `Record<string, LocaleMeta>` (its keys aren't a literal union), so
 * `DocsLocale` is a plain `string`.
 */
export type DocsLocale = string;

/** The non-`root` locale keys, in `CANVAS_LOCALES` order. */
export const NON_ROOT_LOCALES = Object.keys(CANVAS_LOCALES).filter((key) => key !== "en");

/** Every docs locale, `root` first. */
export const ALL_DOCS_LOCALES: readonly DocsLocale[] = ["root", ...NON_ROOT_LOCALES];

/**
 * Translatable UI chrome — everything that gets machine-translated into the per-locale cache (see
 * `docs/scripts/translate-chrome.ts`). Structural, non-translated metadata (route prefixes, the
 * TypeDoc sidebar path, the BCP47 tag, text direction) lives in {@link LocaleStructure} instead.
 */
export interface UiStrings {
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
  // The "Get started" scaffold tabs (see theme/components/GetStartedTabs.vue and theme/get-started.ts).
  // Only the AI tab's instructions are prose; the other tabs' `npx …` commands are not translated.
  getStartedTabs: GetStartedTabsStrings;
  // Default-theme chrome VitePress renders around the content. Without these an untranslated locale
  // shows English labels (outline heading, prev/next footer, dark-mode toggle, the 404 page, etc.).
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
}

/** The English source of truth for every translatable UI string in {@link UiStrings}. */
export const ENGLISH_UI_STRINGS: UiStrings = {
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
  themeSelector: {
    label: "Select theme",
    rebrand: "Rebrand",
    canvas: "Canvas",
    canvasHighContrast: "Canvas high contrast",
  },
  // Identical to CDN_PICKER_DEFAULTS by design — this *is* the component's fallback (see
  // theme/cdn.ts's docblock) — imported rather than re-typed so the two can't drift apart.
  cdnPicker: CDN_PICKER_DEFAULTS,
  getStartedTabs: {
    copied: "Copied",
    cliInstall: "CLI install",
    aiInstall: "AI install",
    pauseAnimation: "Pause animation",
    playAnimation: "Resume animation",
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
};

/** Structural, non-translated per-locale metadata: route prefixes, BCP47 tag, direction, sidebar path. */
export interface LocaleStructure {
  label: string;
  lang: string;
  dir: "ltr" | "rtl";
  guidePrefix: string;
  apiPrefix: string;
  // The CSS reference is merged into the TypeDoc sidebar by `@cssdoc/typedoc`, so there's one path.
  typedocSidebarPath: string;
}

const structureFor = (locale: DocsLocale): LocaleStructure => {
  if (locale === "root") {
    return {
      label: "English",
      lang: "en-US",
      dir: "ltr",
      guidePrefix: "/guide/",
      apiPrefix: "/api/",
      typedocSidebarPath: "../api/typedoc-sidebar.json",
    };
  }
  const meta = CANVAS_LOCALES[locale];
  return {
    label: meta.label,
    lang: locale,
    dir: meta.dir,
    guidePrefix: `/${locale}/guide/`,
    apiPrefix: `/${locale}/api/`,
    typedocSidebarPath: `../${locale}/api/typedoc-sidebar.json`,
  };
};

/** Recursively collect every leaf string in an object tree, keyed by its dotted path. */
export function flattenStrings(value: unknown, prefix = ""): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path: prefix, text: value }];
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      flattenStrings(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

/** Deep-clone `base`, overwriting each leaf whose dotted path is in `overrides`. */
function applyOverrides<T>(base: T, overrides: ReadonlyMap<string, string>, prefix = ""): T {
  if (typeof base === "string") {
    return (overrides.get(prefix) ?? base) as T;
  }
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, child] of Object.entries(base as Record<string, unknown>)) {
      out[key] = applyOverrides(child, overrides, prefix ? `${prefix}.${key}` : key);
    }
    return out as T;
  }
  return base;
}

// Every UI leaf, computed once — reused for both the cache lookup below and `translate-chrome.ts`.
const ENGLISH_UI_LEAVES = flattenStrings(ENGLISH_UI_STRINGS);

/**
 * Merge the committed `<locale>.chrome.json` translation memory (content-addressed by English text,
 * same convention as the guides/API caches — see `docs/scripts/translate-chrome.ts`) over the English
 * defaults, so an untranslated string renders in English rather than as a missing key.
 */
const uiStringsFor = (locale: DocsLocale): UiStrings => {
  if (locale === "root") return ENGLISH_UI_STRINGS;
  const memory = TranslationMemory.load(locale, "chrome");
  const overrides = new Map<string, string>();
  for (const { path, text } of ENGLISH_UI_LEAVES) {
    const cached = memory.get("text", text);
    if (cached !== undefined) overrides.set(path, cached);
  }
  return applyOverrides(ENGLISH_UI_STRINGS, overrides);
};

/** Per-locale route structure plus all translated UI chrome strings. */
export type LocaleMeta = LocaleStructure & UiStrings;

// Computed lazily (and memoized) behind a Proxy: merely importing this module — e.g. for
// `NON_ROOT_LOCALES`/`ENGLISH_UI_STRINGS`/`flattenStrings` — must stay I/O-free (several scripts and
// their tests only need those). `uiStringsFor` reads a `<locale>.chrome.json` translation-memory file
// per locale, so it only runs once something actually reads a `LOCALES` property (the real docs build).
let computedLocales: Record<DocsLocale, LocaleMeta> | undefined;
const computeLocales = (): Record<DocsLocale, LocaleMeta> => {
  computedLocales ??= Object.fromEntries(
    ALL_DOCS_LOCALES.map((locale) => [
      locale,
      { ...structureFor(locale), ...uiStringsFor(locale) },
    ]),
  ) as Record<DocsLocale, LocaleMeta>;
  return computedLocales;
};

/** Per-locale metadata — route prefixes, nav/sidebar labels, and all translated UI chrome. */
export const LOCALES: Record<DocsLocale, LocaleMeta> = new Proxy(
  {} as Record<DocsLocale, LocaleMeta>,
  {
    get: (_target, prop) => computeLocales()[prop as DocsLocale],
    has: (_target, prop) => prop in computeLocales(),
    ownKeys: () => Reflect.ownKeys(computeLocales()),
    getOwnPropertyDescriptor: (_target, prop) =>
      Object.getOwnPropertyDescriptor(computeLocales(), prop),
  },
);
