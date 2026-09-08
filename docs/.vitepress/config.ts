import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type DefaultTheme, defineConfig } from "vitepress";
import { workspaceOrchestrator } from "@pantoken/vite-workspace-orchestrator";
import {
  demoMarkdownIt,
  buildExampleSrcdoc,
  escapeSrcdoc,
  FULLSCREEN_BUTTON_HTML,
} from "@pantoken/demo";
import llmstxt from "vitepress-plugin-llms";
import type { HeadConfig } from "vitepress";
import { partitionApiSidebar } from "./api-sidebar.js";
import { LOCALE_THEMES, NON_LATIN_LOCALES, NON_ROOT_LOCALES, type DocsLocale } from "./i18n.js";
import { mermaidPlugin } from "./plugins/vitepress-mermaid/index.js";
import { tokenValuePreview } from "./plugins/token-value-preview/index.js";

// Absolute path to a repo-relative location, from docs/.vitepress/.
const at = (relative: string): string =>
  fileURLToPath(new URL(`../../${relative}`, import.meta.url));

// During `vitepress dev`, rebuild the workspace packages the docs consume whenever their source
// changes, so edits to the libraries show up live instead of only at the next full build.
//
// Builds invoke each package's `node` script DIRECTLY, not `vp run …`. `vpr docs:dev` runs vitepress
// under `vp`, and vite-plus cannot spawn a nested `vp` from inside that process — it dies with
// "Failed to spawn process: os error 22". A direct `node` invocation is unaffected. The generated CSS
// the theme imports comes from each package's `generate` script; the CSS API pages come from docs'
// `build-css-api`. Two outputs reach the browser: the generated CSS (watched via `outputWatchPaths` →
// HMR) and the CSS API `.md` (rebuilt by the `docs:api:css` node — VitePress watches the emitted files
// itself). A components edit regenerates the sheet, then cascades (`dependents`) into a CSS-API rebuild.
//
// NOTE: `@pantoken/web-components` is imported from SOURCE by the docs theme (theme/index.ts), not its
// `dist` — so Vite hot-reloads element `.ts` + co-located `.css` edits directly, with no `vp pack` and
// no orchestrator node. Its source graph is Node-free and codegen-free (CSS via Vite `?inline`), so
// there's nothing to build here. The plugin decoration sheets, the docs demo snippets, and the token
// sheet each get a node below so their previews/`@example` pages stay live too.
const orchestrator = workspaceOrchestrator({
  upstream: [
    {
      name: "@pantoken/css",
      dir: at("formats/css"),
      watchPaths: [at("formats/css/src")],
      build: ["node", "scripts/generate.ts"],
      // A `toCss` emitter change should re-theme the site sheet too (site-themes.ts imports it).
      dependents: ["@pantoken/docs#site-themes"],
    },
    {
      // Rewrite the whole-site token sheet (theme/generated/site-themes.css + the demos-assets copy) from
      // SOURCE (site-themes.ts imports @pantoken/css + @pantoken/tokens from src). Watches the resolved
      // token IR (`formats/tokens/generated/*.json`, what the tokens barrel reads) and the tokens src so
      // a token-value edit re-themes every preview live; also cascaded by @pantoken/css for emitter edits.
      // The theme imports the sheet (module-graph HMR); the demos-assets copy drives the /play iframes.
      name: "@pantoken/docs#site-themes",
      dir: at("docs"),
      watchPaths: [at("formats/tokens/generated"), at("formats/tokens/src")],
      build: ["node", "scripts/site-themes.ts"],
      dependents: [],
    },
    {
      // A component edit (`formats/components/src/**`) must recompile the per-theme string module
      // (`src/generated/component-styles.ts`) FIRST — `generate.ts` only consumes it. This node runs
      // that recompile, then cascades to the `generate` + docs-sheet nodes below. The orchestrator
      // can't run the package's `generate` npm task (it'd `vp run …`, which can't spawn nested here),
      // so the two steps are wired as separate direct-`node` nodes.
      name: "@pantoken/components#styles",
      dir: at("formats/components"),
      watchPaths: [at("formats/components/src")],
      // Loop guard: component-styles.ts rewrites src/generated/component-styles.ts (unconditionally),
      // and generate.ts rewrites src/generated/_records.css — both under the watched src dir. Without
      // this the recompile would retrigger itself forever.
      ignore: ["generated/**"],
      build: ["node", "scripts/component-styles.ts"],
      dependents: ["@pantoken/components"],
    },
    {
      // Regenerate the shipped `generated/*.css` (the CSS-API `.md` pages parse `generated/components.css`).
      // Dependent-only: the scheduler resolves it by name from `#styles` above. `outputWatchPaths`
      // (`formats/components/generated`) bridges the result into HMR.
      name: "@pantoken/components",
      dir: at("formats/components"),
      watchPaths: [],
      build: ["node", "scripts/generate.ts"],
      dependents: [
        "@pantoken/docs#components-sheet",
        "@pantoken/docs#component-assets",
        "@pantoken/docs#docs:api:css",
      ],
    },
    {
      // Pendo's source CSS is embedded before the demo asset imports `buildPendoCss`; keeping these
      // as separate nodes avoids nested `vp` calls and refreshes the runner iframe on source edits.
      name: "@pantoken/pendo#docs",
      dir: at("renderers/pendo"),
      watchPaths: [at("renderers/pendo/src")],
      build: ["node", "scripts/embed.ts"],
      dependents: ["@pantoken/docs#pendo-asset"],
    },
    {
      name: "@pantoken/docs#pendo-asset",
      dir: at("docs"),
      watchPaths: [],
      build: ["node", "scripts/stage-pendo-asset.ts"],
      dependents: [],
    },
    {
      // Rewrite the docs-only multi-theme component sheet the previews/demos actually load
      // (theme/generated/components.css + public/demos-assets/components.css). It reads the components
      // SOURCE barrel (see scope-components.ts), so it reflects the recompiled module. The theme copy is
      // in Vite's module graph, so Vite hot-updates it on rewrite. Dependent-only.
      name: "@pantoken/docs#components-sheet",
      dir: at("docs"),
      watchPaths: [],
      build: ["node", "scripts/components-sheet.ts"],
      dependents: [],
    },
    {
      // Re-stage the single-theme component sheets (base/prose/icons/select/utilities) the `/play` runner
      // loads into public/demos-assets/, copied from the freshly-regenerated `formats/components/generated`.
      // The main-doc theme imports those generated sheets directly (HMR via outputWatchPaths); the `/play`
      // iframes load them by URL from public/, so writing here triggers a Vite full reload. Dependent-only.
      name: "@pantoken/docs#component-assets",
      dir: at("docs"),
      watchPaths: [],
      build: ["node", "scripts/stage-component-assets.ts"],
      dependents: [],
    },
    // The decoration plugins each regenerate their `generated/<name>.css` from source with a plain
    // `node scripts/generate.ts` (no `vp pack`; the sheet is a sibling of `src`, so no watch loop). The
    // three with a demo sheet re-stage it into demos-assets AND rebuild their CSS-API `@example` pages;
    // logos/primitives have `@example` pages but no demo sheet, so they only cascade to the CSS-API build.
    // `transition`/`stacking` are tokens-only plugins now (no generated CSS) — their CSS lives in, and
    // rebuilds via, `@pantoken/components` above.
    {
      name: "@pantoken/plugin-visual-debug",
      dir: at("plugins/pantoken/visual-debug"),
      watchPaths: [at("plugins/pantoken/visual-debug/src")],
      build: ["node", "scripts/generate.ts"],
      dependents: ["@pantoken/docs#plugin-assets", "@pantoken/docs#docs:api:css"],
    },
    {
      name: "@pantoken/plugin-logos",
      dir: at("plugins/pantoken/logos"),
      watchPaths: [at("plugins/pantoken/logos/src")],
      build: ["node", "scripts/generate.ts"],
      dependents: ["@pantoken/docs#docs:api:css"],
    },
    {
      name: "@pantoken/plugin-primitives",
      dir: at("plugins/pantoken/primitives"),
      watchPaths: [at("plugins/pantoken/primitives/src")],
      build: ["node", "scripts/generate.ts"],
      dependents: ["@pantoken/docs#docs:api:css"],
    },
    {
      name: "@pantoken/plugin-custom-components#styles",
      dir: at("plugins/pantoken/custom-components"),
      watchPaths: [at("plugins/pantoken/custom-components/src")],
      ignore: ["generated/**"],
      build: ["node", "scripts/component-styles.ts"],
      dependents: ["@pantoken/plugin-custom-components"],
    },
    {
      name: "@pantoken/plugin-custom-components",
      dir: at("plugins/pantoken/custom-components"),
      watchPaths: [],
      build: ["node", "scripts/generate.ts"],
      dependents: ["@pantoken/docs#docs:api:css", "@pantoken/docs#plugin-assets"],
    },
    {
      name: "@pantoken/plugin-layouts",
      dir: at("plugins/pantoken/layouts"),
      watchPaths: [at("plugins/pantoken/layouts/src")],
      build: ["node", "scripts/generate.ts"],
      dependents: ["@pantoken/docs#docs:api:css"],
    },
    {
      // Re-stage the visual-debug decoration sheet into public/demos-assets/ from the plugin's
      // freshly-generated sheet. Dependent-only; writing into public/ triggers a Vite full reload so the
      // <head>-linked chrome and the /play iframes refetch. See stage-plugin-assets.ts.
      name: "@pantoken/docs#plugin-assets",
      dir: at("docs"),
      watchPaths: [],
      build: ["node", "scripts/stage-plugin-assets.ts"],
      dependents: [],
    },
    {
      // Re-render the committed demo templates (docs/demos/<component>/index.html) into public/demos/ on
      // edit. Full reload
      // (public/ write) refreshes an open /play demo. See stage-demo-snippets.ts.
      name: "@pantoken/docs#demo-snippets",
      dir: at("docs"),
      watchPaths: [at("docs/demos")],
      build: ["node", "scripts/stage-demo-snippets.ts"],
      dependents: [],
    },
    {
      // Re-stage the create-pantoken-app skill (ai/pantoken-ai/skills/create-pantoken-app/SKILL.md) into
      // public/create-pantoken-app.md on edit, so the fetchable copy an agent CLI reads never drifts
      // from the local .claude/skills/ install. See stage-create-pantoken-app-skill.ts.
      name: "@pantoken/docs#create-pantoken-app-skill",
      dir: at("docs"),
      watchPaths: [at("ai/pantoken-ai/skills/create-pantoken-app")],
      build: ["node", "scripts/stage-create-pantoken-app-skill.ts"],
      dependents: [],
    },
    {
      // Re-stage the same skill into the ai/create-pantoken-app-site/ submodule, which GitHub Pages
      // serves at create.pantoken.app. Only stages the submodule's working tree — committing and
      // pushing that repo is a separate, manual step. See stage-create-pantoken-app-domain.ts.
      name: "@pantoken/docs#create-pantoken-app-domain",
      dir: at("docs"),
      watchPaths: [at("ai/pantoken-ai/skills/create-pantoken-app")],
      build: ["node", "scripts/stage-create-pantoken-app-domain.ts"],
      dependents: [],
    },
    {
      // Rebuild the TypeDoc API pages so TSDoc `@example` markup edits go live (the web-component element
      // `@example` blocks render on api/renderers/web-components/**). Scoped to the RENDERER TS sources:
      // TypeDoc reparses the whole entry-point set on any run, so a broader watch would make every
      // component/plugin/token edit pay for a full-monorepo typedoc — kept narrow to protect those fast
      // loops. `.css`/dist/generated changes are filtered out. VitePress watches the emitted
      // docs/api/**/*.md, so the pages hot-reload on their own.
      name: "@pantoken/docs#api:en",
      dir: at("docs"),
      watchPaths: [at("renderers")],
      include: ["**/src/**/*.ts", "**/src/**/*.tsx"],
      ignore: ["**/dist/**", "**/generated/**", "**/node_modules/**"],
      build: ["node", "scripts/build-api-en.ts"],
      dependents: [],
    },
    {
      // The CSS API reference (docs/api/css/**) is parsed from the generated components sheet and
      // rendered per the shared root cssdoc.json. Rebuild it after the component sheet regenerates
      // (via @pantoken/components' `dependents`) and whenever cssdoc.json changes (it drives the parse
      // model + section order). VitePress watches the emitted `.md` under its source tree, so the
      // pages hot-reload on their own.
      name: "@pantoken/docs#docs:api:css",
      dir: at("docs"),
      watchPaths: [at("cssdoc.json")],
      build: ["node", "scripts/build-css-api.ts"],
      dependents: [],
    },
  ],
  outputWatchPaths: [
    // The generated CSS the theme imports via `@fs` — bridged into HMR. (Web components are imported from
    // source now, so their `dist` no longer needs bridging; the plugin/demo sheets land in public/ and
    // reload on their own.)
    at("formats/css/generated"),
    at("formats/components/generated"),
    at("plugins/pantoken/custom-components/generated"),
  ],
});

const localeEntries = Object.entries(LOCALE_THEMES) as [
  DocsLocale,
  (typeof LOCALE_THEMES)[DocsLocale],
][];

const rootLocaleOnly = process.env.DOCS_ROOT_LOCALE_ONLY === "1";

const loadSidebar = (relativePath: string): DefaultTheme.SidebarItem[] => {
  const sidebarPath = fileURLToPath(new URL(relativePath, import.meta.url));
  return existsSync(sidebarPath)
    ? (JSON.parse(readFileSync(sidebarPath, "utf8")) as DefaultTheme.SidebarItem[])
    : [];
};

const typedocSidebarByLocale = Object.fromEntries(
  localeEntries.map(([localeKey, locale]) => [localeKey, loadSidebar(locale.typedocSidebarPath)]),
) as Record<DocsLocale, DefaultTheme.SidebarItem[]>;

// A script-specific wordmark, when one exists (see `NON_LATIN_LOCALES` in i18n.ts); every other
// locale falls back to the default Latin logo set below.
const localesConfig = Object.fromEntries(
  localeEntries.map(([localeKey, locale]) => [
    localeKey,
    {
      label: locale.label,
      lang: locale.lang,
      dir: locale.dir,
      title: "pantoken",
      description: locale.description,
      themeConfig: {
        nav: [
          { text: locale.nav.guide, link: `${locale.guidePrefix}getting-started` },
          { text: locale.nav.packages, link: `${locale.guidePrefix}packages` },
          { text: locale.nav.css, link: `${locale.apiPrefix}css` },
          { text: locale.nav.api, link: locale.apiPrefix },
        ],
        sidebar: {
          [locale.guidePrefix]: [
            {
              text: locale.sidebar.intro,
              items: [
                {
                  text: locale.sidebar.gettingStarted,
                  link: `${locale.guidePrefix}getting-started`,
                },
                {
                  text: locale.sidebar.packageMap,
                  link: `${locale.guidePrefix}packages`,
                },
                {
                  text: locale.sidebar.architecture,
                  link: `${locale.guidePrefix}architecture`,
                },
                {
                  text: locale.sidebar.components,
                  link: `${locale.guidePrefix}components`,
                },
              ],
            },
            {
              text: locale.sidebar.guides,
              items: [
                { text: locale.sidebar.cdn, link: `${locale.guidePrefix}cdn` },
                {
                  text: locale.sidebar.cdnPicker,
                  link: `${locale.guidePrefix}cdn-picker`,
                },
                { text: locale.sidebar.cli, link: `${locale.guidePrefix}cli` },
                { text: locale.sidebar.plugins, link: `${locale.guidePrefix}plugins` },
                {
                  text: locale.sidebar.generated,
                  link: `${locale.guidePrefix}generated-output`,
                },
              ],
            },
          ],
          // TypeDoc emits one monorepo-wide tree. Partition it by package/CSS route so VitePress doesn't
          // server-render all API symbols into every generated page.
          ...partitionApiSidebar(
            typedocSidebarByLocale[localeKey],
            locale.sidebar.api,
            locale.apiPrefix,
            locale.sidebar.apiOverview,
          ),
        },
        editLink: {
          pattern: "https://github.com/thedannywahl/pantoken/edit/main/docs/:path",
          text: locale.editText,
        },
        // A script-specific wordmark, when one exists (see `NON_LATIN_LOCALES` above); VitePress
        // stacks this over the root `themeConfig.logo` set below.
        ...(NON_LATIN_LOCALES[localeKey] && {
          logo: {
            light: `/logo-light-${NON_LATIN_LOCALES[localeKey]}.svg`,
            dark: `/logo-dark-${NON_LATIN_LOCALES[localeKey]}.svg`,
          },
        }),
        // Localized default-theme chrome. `outline.label` merges over the global `outline.level`
        // (VitePress stacks per-locale themeConfig recursively over the root), so the level survives.
        outline: { label: locale.chrome.outlineLabel },
        docFooter: { prev: locale.chrome.docFooterPrev, next: locale.chrome.docFooterNext },
        darkModeSwitchLabel: locale.chrome.darkModeSwitchLabel,
        lightModeSwitchTitle: locale.chrome.lightModeSwitchTitle,
        darkModeSwitchTitle: locale.chrome.darkModeSwitchTitle,
        sidebarMenuLabel: locale.chrome.sidebarMenuLabel,
        returnToTopLabel: locale.chrome.returnToTopLabel,
        langMenuLabel: locale.chrome.langMenuLabel,
        // `lastUpdated: true` is set globally below, so localize its label here.
        lastUpdated: { text: locale.chrome.lastUpdatedText },
        notFound: locale.chrome.notFound,
        // Read by the custom palette selector (ThemeSelector.vue) via `useData().theme`.
        themeSelector: locale.themeSelector,
        // Read by the CDN picker (CdnPicker.vue) via `useData().theme`.
        cdnPicker: locale.cdnPicker,
        // Read by the "Get started" scaffold tabs (GetStartedTabs.vue) via `useData().theme`.
        getStartedTabs: locale.getStartedTabs,
      },
    },
  ]),
);

// The local-search index reads the *root* themeConfig (not the per-route one), so its per-locale UI
// strings live here under `options.locales`, keyed by locale index, rather than in each locale's
// themeConfig. VitePress merges these with its English defaults, so only translated keys are set.
const searchLocales = Object.fromEntries(
  localeEntries.map(([localeKey, locale]) => [
    localeKey,
    {
      translations: {
        button: { buttonText: locale.search.buttonText },
        modal: {
          displayDetails: locale.search.displayDetails,
          resetButtonTitle: locale.search.resetButtonTitle,
          backButtonTitle: locale.search.backButtonTitle,
          noResultsText: locale.search.noResultsText,
          footer: {
            selectText: locale.search.footerSelect,
            navigateText: locale.search.footerNavigate,
            closeText: locale.search.footerClose,
          },
        },
      },
    },
  ]),
);

// The site is served on a custom domain by default. Override DOCS_BASE and DOCS_HOSTNAME when
// building for alternative environments (for example, a project-site path on github.io).
const base = process.env.DOCS_BASE ?? "/";

const rawHostname = process.env.DOCS_HOSTNAME ?? "https://pantoken.app/";
const hostname = rawHostname.endsWith("/") ? rawHostname : `${rawHostname}/`;

/** The canonical URL for a page from its source-relative path (cleanUrls drops the extension). */
function canonicalUrl(relativePath: string): string {
  return `${hostname}${relativePath}`.replace(/index\.md$/, "").replace(/\.md$/, "");
}

/**
 * The Open Graph title: the wordmark plus the hero tagline on the home page (which has no title of
 * its own and is the most-shared URL), otherwise the page's own title, then the site title.
 */
function homeOgTitle(locale: (typeof LOCALE_THEMES)[DocsLocale]): string {
  return locale === LOCALE_THEMES.root
    ? "pantoken — Instructure design tokens, everywhere"
    : `pantoken — ${locale.description}`;
}

function ogTitle(
  frontmatter: { layout?: string; title?: string },
  pageTitle: string,
  siteTitle: string,
  locale: (typeof LOCALE_THEMES)[DocsLocale],
): string {
  if (frontmatter.layout === "home") return homeOgTitle(locale);
  return frontmatter.title || pageTitle || siteTitle;
}

// Best-effort `og:locale` tag (`language_TERRITORY`) from a BCP47 tag: a region subtag maps directly
// (`en-GB` → `en_GB`); a bare language code doesn't carry a territory, so it's doubled as a plausible
// guess (`hu` → `hu_HU`) — good enough for a non-critical SEO tag, not a real locale-to-territory table.
function ogLocaleFor(lang: string): string {
  return lang.includes("-") ? lang.replace("-", "_") : `${lang}_${lang.toUpperCase()}`;
}

/** Locale and Open Graph locale tags derived from a page path. */
function localeHeadInfo(relativePath: string): {
  localeKey: DocsLocale;
  locale: (typeof LOCALE_THEMES)[DocsLocale];
  ogLocale: string;
  alternateOgLocale: string;
} {
  const localeKey = NON_ROOT_LOCALES.find((key) => relativePath.startsWith(`${key}/`)) ?? "root";
  const locale = LOCALE_THEMES[localeKey];
  return {
    localeKey,
    locale,
    ogLocale: ogLocaleFor(locale.lang),
    alternateOgLocale: ogLocaleFor(LOCALE_THEMES.root.lang),
  };
}

// `gen-og.ts` writes one card per locale, so every non-root locale has its own `og-<locale>.png`.
function ogImageUrl(localeKey: DocsLocale): string {
  return `${hostname}og${localeKey === "root" ? "" : `-${localeKey}`}.png`;
}

/**
 * `hreflang` alternate links for every locale of this page, plus one `x-default` entry pointing at the
 * root (English) URL — lets search engines serve a native-language searcher the matching localized
 * URL instead of the English one. Locale routing is a symmetric prefix swap with full content parity
 * across locales (enforced by `scripts/check-locale-parity.ts`), so every locale's URL is derived by
 * prefix-swapping this page's own relative path rather than needing a per-page lookup table.
 */
function alternateLinks(relativePath: string): HeadConfig[] {
  const currentLocaleKey =
    NON_ROOT_LOCALES.find((key) => relativePath.startsWith(`${key}/`)) ?? "root";
  const suffix =
    currentLocaleKey === "root" ? relativePath : relativePath.slice(`${currentLocaleKey}/`.length);
  // Non-root API pages aren't built at all under `DOCS_ROOT_LOCALE_ONLY=1` (see `srcExclude` below),
  // so linking to them would 404.
  const isNonRootExcluded = rootLocaleOnly && suffix.startsWith("api/");
  const entries = isNonRootExcluded
    ? localeEntries.filter(([key]) => key === "root")
    : localeEntries;
  const links: HeadConfig[] = entries.map(([key, locale]) => [
    "link",
    {
      rel: "alternate",
      hreflang: locale.lang,
      href: canonicalUrl(key === "root" ? suffix : `${key}/${suffix}`),
    },
  ]);
  links.push(["link", { rel: "alternate", hreflang: "x-default", href: canonicalUrl(suffix) }]);
  return links;
}

/** Per-page social/canonical head tags layered on top of site defaults. */
function pageSocialHead(params: {
  title: string;
  description: string;
  canonical: string;
  ogLocale: string;
  alternateOgLocale: string;
  image: string;
  imageAlt: string;
}): HeadConfig[] {
  return [
    ["link", { rel: "canonical", href: params.canonical }],
    ["meta", { property: "og:title", content: params.title }],
    ["meta", { property: "og:description", content: params.description }],
    ["meta", { property: "og:url", content: params.canonical }],
    ["meta", { property: "og:locale", content: params.ogLocale }],
    ["meta", { property: "og:locale:alternate", content: params.alternateOgLocale }],
    ["meta", { property: "og:image", content: params.image }],
    ["meta", { property: "og:image:alt", content: params.imageAlt }],
    ["meta", { name: "twitter:title", content: params.title }],
    ["meta", { name: "twitter:description", content: params.description }],
    ["meta", { name: "twitter:image", content: params.image }],
    ["meta", { name: "twitter:image:alt", content: params.imageAlt }],
  ];
}

/** Schema.org `WebSite` structured data, translated per locale. */
function websiteJsonLd(params: {
  localeKey: DocsLocale;
  locale: (typeof LOCALE_THEMES)[DocsLocale];
  image: string;
}): HeadConfig {
  return [
    "script",
    { type: "application/ld+json" },
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "pantoken",
      url: params.localeKey === "root" ? hostname : `${hostname}${params.localeKey}/`,
      description: params.locale.description,
      inLanguage: params.locale.lang,
      image: params.image,
      author: { "@type": "Person", name: "Danny Wahl", url: "https://iywahl.com" },
    }),
  ];
}

const description =
  "Instructure design tokens and icons, reshaped for every platform and framework.";

// @ts-ignore TS2321 — VitePress alpha.18 UserConfig generic recursion can overflow TS depth.
export default defineConfig({
  base,
  title: "pantoken",
  description,
  // The focus-outline ring and visual-debug classes live in plugins, not the source tokens, so layer
  // their generated sheets (staged once by scripts/demos.ts) over the site's token sheet. Transition
  // and stacking classes ship inside `@pantoken/components`' own utilities.css (imported by the theme)
  // now that those plugins are tokens-only. `.instui-card` (the shared example/demo surface) is bundled
  // via the theme instead.
  head: [
    // Apply the stored pantoken theme before first paint (no flash). The palette selector in the nav
    // writes `pantoken-theme`; non-rebrand themes have no light/dark, so drop `.dark` for them.
    [
      "script",
      {},
      `(function(){try{var t=localStorage.getItem("pantoken-theme")||"rebrand";var d=document.documentElement;d.dataset.pantokenTheme=t;if(t!=="rebrand")d.classList.remove("dark");}catch(e){}})();`,
    ],
    ["link", { rel: "icon", type: "image/png", href: `${base}favicon.png` }],
    ["link", { rel: "stylesheet", href: `${base}demos-assets/focus-outline.css` }],
    ["link", { rel: "stylesheet", href: `${base}demos-assets/visual-debug.css` }],
    ["meta", { name: "author", content: "Danny Wahl" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "design tokens, Instructure, Canvas, design system, CSS, SCSS, React, Vue, Svelte, Tailwind, Panda, Swift, Kotlin, Figma, icons, cross-platform",
      },
    ],
    // Social-card defaults so pantoken docs links unfurl into rich previews (Slack, iMessage, X,
    // LinkedIn, Discord, Facebook). Per-locale title/description/url/locale/image and the structured
    // data are layered on in transformHead (see `pageSocialHead`/`websiteJsonLd`); only the locale-
    // independent card dimensions and card type live here.
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "pantoken" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@thedannywahl" }],
    ["meta", { name: "twitter:creator", content: "@thedannywahl" }],
  ],
  // Layer per-page Open Graph / Twitter tags, a canonical link, the page locale, and translated
  // structured data on top of the head defaults, so each shared URL previews with its own title,
  // description, social-card image, address, and language rather than the site-wide English default.
  transformHead: ({ pageData, siteData }) => {
    const localeInfo = localeHeadInfo(pageData.relativePath);
    const title = ogTitle(pageData.frontmatter, pageData.title, siteData.title, localeInfo.locale);
    const pageDescription =
      pageData.frontmatter.description || pageData.description || localeInfo.locale.description;
    const image = ogImageUrl(localeInfo.localeKey);
    return [
      ...pageSocialHead({
        title,
        description: pageDescription,
        canonical: canonicalUrl(pageData.relativePath),
        ogLocale: localeInfo.ogLocale,
        alternateOgLocale: localeInfo.alternateOgLocale,
        image,
        imageAlt: homeOgTitle(localeInfo.locale),
      }),
      websiteJsonLd({ localeKey: localeInfo.localeKey, locale: localeInfo.locale, image }),
      ...alternateLinks(pageData.relativePath),
    ];
  },
  // i18n routing audit (VitePress 2.0.0-alpha.18 / PR #5239): `themeConfig.i18nRouting` now accepts a
  // function to build custom locale links. We deliberately don't set one — our locales are a symmetric
  // prefix swap (`/…` ↔ `/hu/…`, including `/api/` ↔ `/hu/api/`), which VitePress's default already
  // handles: its nav switchers call `useLangs({ correspondingLink: true })`, so switching maps to the
  // corresponding page, and with `cleanUrls: true` the default emits clean URLs (no `.html`). A custom
  // function would only re-implement that. The one case it would help — a graceful fallback when a page
  // exists in one locale but not the other — is instead prevented by keeping the `hu/` tree in parity
  // (see scripts/check-locale-parity.ts).
  locales: localesConfig,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname },
  // Only index.md belongs in the public site at the docs root; all others are repo-internal.
  srcExclude: [
    "CHANGELOG.md",
    "compatibility.md",
    "engineering-log.md",
    ...(rootLocaleOnly ? NON_ROOT_LOCALES.map((locale) => `${locale}/api/**`) : []),
  ],
  // The generated API pages cross-link heavily; don't fail the build on a link TypeDoc emitted.
  ignoreDeadLinks: true,
  // Treat `instui-*` tags as custom elements, not Vue components — so the web-components API pages can
  // render their `<instui-…>` `@example` markup live (the theme registers the elements).
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith("instui-"),
      },
    },
  },
  vite: {
    // Emit llms.txt (an agent-legible index) and llms-full.txt (the whole site as one document) so AI
    // agents can read the guides and generated API reference without scraping HTML. The repo aliases
    // `vite` to vite-plus-core, while VitePress and this plugin each carry distinct Vite plugin types;
    // cast through the bottom type to bridge those compatible runtime values.
    plugins: [
      orchestrator,
      llmstxt({
        title: "pantoken",
        description,
        // Non-root locales (docs/<locale>/**) are machine-translated mirrors of the English source.
        // Keep them out of the aggregate indexes so llms.txt / llms-full.txt stay canonical-English (the
        // plugin author's own guidance), but leave per-page .md generation on so a locale page can still
        // be fetched as markdown. Patterns are minimatch against paths relative to workDir (docs/).
        details:
          "This index covers the canonical English documentation. Translations of every page are " +
          "available under each locale's route prefix (for example /hu/).",
        ignoreFilesPerOutput: {
          llmsTxt: [
            ...NON_ROOT_LOCALES.map((locale) => `${locale}/**`),
            "CHANGELOG.md",
            "compatibility.md",
            "engineering-log.md",
          ],
          llmsFullTxt: [
            ...NON_ROOT_LOCALES.map((locale) => `${locale}/**`),
            "CHANGELOG.md",
            "compatibility.md",
            "engineering-log.md",
          ],
        },
      }) as never,
    ],
    resolve: {
      alias: [
        {
          // Override VitePress's built-in VPNavBarExtra with our custom version that
          // includes the ThemeSelector as an inline group inside the extra flyout menu.
          //
          // VPNavBar.vue imports this component with a RELATIVE specifier
          // (`import VPNavBarExtra from './VPNavBarExtra.vue'`), and Vite's alias plugin tests
          // `find` against the specifier as written — never the resolved absolute path. So a
          // pattern anchored on the `vitepress/dist/...` path can't match, and the built-in
          // component wins. Match the trailing `[…/]VPNavBarExtra.vue` instead. The `^.*` makes
          // the match span the WHOLE specifier: the plugin does `importee.replace(find, replacement)`,
          // so anything left unmatched (e.g. a leading `./`) would be prepended to our absolute
          // replacement path and break resolution.
          find: /^.*[/\\]VPNavBarExtra\.vue$/,
          replacement: fileURLToPath(
            new URL("theme/components/VPNavBarExtra.vue", import.meta.url),
          ),
        },
        {
          // Override the default home hero so GetStartedTabs can mount as a sibling right after
          // `.main` inside the hero `.container`.
          find: /^.*[/\\]VPHomeHero\.vue$/,
          replacement: fileURLToPath(new URL("theme/components/VPHomeHero.vue", import.meta.url)),
        },
      ],
    },
  },
  markdown: {
    languageAlias: { prompt: "txt" },
    config: (md) => {
      mermaidPlugin(md);
      tokenValuePreview(md);
      // Everything the runner (and the isolated `.css-example` srcdoc previews) inject, all served
      // static files: the component sheets, the one multi-theme token sheet (themed by the
      // `data-pantoken-theme` attribute), the plugin sheets, and the shared `.instui-card` surface.
      const cssUrls = [
        `${base}demos-assets/base.css`,
        `${base}demos-assets/components.css`,
        `${base}demos-assets/prose.css`,
        `${base}demos-assets/icons.css`,
        `${base}demos-assets/utilities.css`,
        `${base}demos-assets/select.css`,
        `${base}demos-assets/site-themes.css`,
        `${base}demos-assets/focus-outline.css`,
        `${base}demos-assets/transition.css`,
        `${base}demos-assets/stacking.css`,
        `${base}demos-assets/visual-debug.css`,
        `${base}demos-assets/card.css`,
        `${base}demos-assets/custom-components.css`,
        `${base}demos-assets/logos.css`,
        `${base}demos-assets/pendo.css`,
      ];
      demoMarkdownIt(md, {
        base,
        cssUrls,
        // Route a locale page's `demo:self:<name>` fence to its translated clone
        // (`docs/<locale>/demos/<name>.html`, staged by stage-demo-snippets.ts into
        // `public/<locale>/demos/`) instead of the English source. See translate-demos.ts.
        localePrefix: (relativePath: string) => {
          const locale = NON_ROOT_LOCALES.find((key) => relativePath.startsWith(`${key}/`));
          return locale ? `${locale}/` : "";
        },
        // Seam a live preview onto each `@example` HTML fence at compile time: the same markup,
        // rendered in an isolated `<iframe srcdoc>` so none of the page's own `.vp-doc` styles (ours or
        // VitePress's native theme CSS) can reach it, wrapped in `.css-example` (framed by the theme).
        // One mechanism for both surfaces that carry live HTML examples — the CSS-API class pages
        // (`api/css/`) and the web-components variable pages
        // (`api/renderers/web-components/src/variables/`) — plus the cloned locale pages (`hu/…`).
        // Overlay examples (`<dialog>`, `[popover]`) are skipped inside the plugin.
        liveExample: {
          match: (relativePath: string) =>
            /(^|\/)api\/(css|renderers\/web-components\/src\/variables)\//.test(relativePath),
          wrap: (html: string, flags: Set<string>, relativePath: string) => {
            const locale =
              NON_ROOT_LOCALES.find((key) => relativePath.startsWith(`${key}/`)) ?? "root";
            const doc = buildExampleSrcdoc(html, {
              cssUrls,
              card: !flags.has("-nocard"),
              dir: LOCALE_THEMES[locale].dir,
            });
            return (
              `<div class="css-example-frame">` +
              `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" ` +
              `title="Live example" loading="lazy" srcdoc="${escapeSrcdoc(doc)}"></iframe>` +
              `${FULLSCREEN_BUTTON_HTML}</div>`
            );
          },
        },
      });
    },
  },
  themeConfig: {
    siteTitle: false,
    logo: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
    search: { provider: "local", options: { locales: searchLocales } },
    outline: { level: [2, 3] },
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
        },
        link: `${base}llms.txt`,
        ariaLabel: "llms.txt — documentation for AI agents",
      },
      { icon: "github", link: "https://github.com/thedannywahl/pantoken" },
    ],
  },
});
