import { LOCALES } from "@pantoken/web-components";
import chromeSource from "./i18n.json" with { type: "json" };
import type { CdnPickerStrings } from "./theme/cdn.ts";
import type { GetStartedTabsStrings } from "./theme/get-started.ts";
import { loadConfig, resolveMessagesForLocale } from "@pantoken/i18n-engine";

/**
 * Every locale the docs site builds: `root` (English) plus every non-`en` locale from
 * `@pantoken/web-components`'s `LOCALES` (44 BCP47 tags — `en` is dropped since `root` already covers
 * US English). English regional variants (`en-AU`, `en-CA`, `en-GB`) get their own route prefix AND
 * their own translated UI strings — British/Australian/Canadian spelling and phrasing differ from US
 * English (colour/centre, -ise vs. -ize, etc.), so they go through the same translation pipeline as
 * every other locale rather than passing through the `root` English source untouched.
 * `LOCALES` is typed as `Record<string, LocaleInfo>` (its keys aren't a literal union), so
 * `DocsLocale` is a plain `string`.
 */
export type DocsLocale = string;

/** The non-`root` locale keys, in `LOCALES` order. */
export const NON_ROOT_LOCALES = Object.keys(LOCALES).filter((key) => key !== "en");

/** Every docs locale, `root` first. */
const ALL_DOCS_LOCALES: readonly DocsLocale[] = ["root", ...NON_ROOT_LOCALES];

// Non-Latin scripts ship a purpose-drawn wordmark (`docs/public/logo-{light,dark}-<code>.svg`,
// hand-added) instead of the bundled Latin logo, and are skipped by the OG-image text renderer
// (`docs/scripts/gen-og.ts`), which only bundles a Latin webfont. `zh-Hans`/`zh-Hant` share one
// Han-script mark; the Japanese file is suffixed `jp`.
export const NON_LATIN_LOCALES: Partial<Record<DocsLocale, string>> = {
  ar: "ar",
  el: "el",
  fa: "fa",
  he: "he",
  hi: "hi",
  hy: "hy",
  ja: "jp",
  ko: "ko",
  ru: "ru",
  th: "th",
  uk: "uk",
  "zh-Hans": "zh",
  "zh-Hant": "zh",
};

/**
 * Translatable UI chrome — everything that gets translated into the `docs.chrome` PO catalog (see
 * `docs/.vitepress/i18n.json`). Structural, non-translated metadata (route prefixes, the
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
const sourceUiStrings = Object.fromEntries(
  Object.entries(chromeSource)
    .filter(([key]) => key !== "$schema")
    .map(([key, entry]) => [key, (entry as { message: string }).message]),
);

function unflattenStrings(flat: Record<string, string>): UiStrings {
  const result: Record<string, unknown> = {};
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let target = result;
    for (const part of parts.slice(0, -1)) {
      target[part] ??= {};
      target = target[part] as Record<string, unknown>;
    }
    target[parts.at(-1)!] = value;
  }
  return result as unknown as UiStrings;
}

/** English UI strings used as the fallback for localized documentation chrome. */
export const ENGLISH_UI_STRINGS: UiStrings = unflattenStrings(sourceUiStrings);

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
  const meta = LOCALES[locale];
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

// Every UI leaf, computed once — reused by the docs chrome renderer and drift checker.
const ENGLISH_UI_LEAVES = flattenStrings(ENGLISH_UI_STRINGS);

/**
 * Resolve the locale's `docs.chrome` PO catalog over the English defaults, so untranslated strings
 * fall back to English rather than disappearing.
 */
const uiStringsFor = (locale: DocsLocale): UiStrings => {
  if (locale === "root") return ENGLISH_UI_STRINGS;
  const config = loadConfig(new URL("../../i18n.config.json", import.meta.url).pathname);
  const resolved = resolveMessagesForLocale(
    config,
    new URL("../../", import.meta.url).pathname,
    "docs.chrome",
    locale,
  );
  const overrides = new Map(ENGLISH_UI_LEAVES.map(({ path }) => [path, resolved.strings[path]]));
  return applyOverrides(ENGLISH_UI_STRINGS, overrides);
};

/** Per-locale route structure plus all translated UI chrome strings. */
export type LocaleTheme = LocaleStructure & UiStrings;

// Computed lazily (and memoized) behind a Proxy: merely importing this module — e.g. for
// `NON_ROOT_LOCALES`/`ENGLISH_UI_STRINGS`/`flattenStrings` stay cheap to import; PO resolution only
// runs once something actually reads a `LOCALE_THEMES` property (the real docs build).
let computedLocales: Record<DocsLocale, LocaleTheme> | undefined;
const computeLocales = (): Record<DocsLocale, LocaleTheme> => {
  computedLocales ??= Object.fromEntries(
    ALL_DOCS_LOCALES.map((locale) => [
      locale,
      { ...structureFor(locale), ...uiStringsFor(locale) },
    ]),
  ) as Record<DocsLocale, LocaleTheme>;
  return computedLocales;
};

/** Per-locale metadata — route prefixes, nav/sidebar labels, and all translated UI chrome. */
export const LOCALE_THEMES: Record<DocsLocale, LocaleTheme> = new Proxy(
  {} as Record<DocsLocale, LocaleTheme>,
  {
    get: (_target, prop) => computeLocales()[prop as DocsLocale],
    has: (_target, prop) => prop in computeLocales(),
    ownKeys: () => Reflect.ownKeys(computeLocales()),
    getOwnPropertyDescriptor: (_target, prop) =>
      Object.getOwnPropertyDescriptor(computeLocales(), prop),
  },
);
