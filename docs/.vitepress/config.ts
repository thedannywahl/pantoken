import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type DefaultTheme, defineConfig } from "vitepress";
import { workspaceOrchestrator } from "@pantoken/vite-workspace-orchestrator";
import { demoMarkdownIt } from "@pantoken/demo";
import llmstxt from "vitepress-plugin-llms";
import { LOCALES, type DocsLocale } from "./i18n.js";
import { mermaidPlugin } from "./plugins/vitepress-mermaid/index.js";

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
// NOTE: `@pantoken/web-components`' `register()` bundle needs `vp pack`, which likewise can't run nested
// under `vpr`, so it is NOT auto-rebuilt here. Rebuild it manually in a separate top-level shell
// (`vpr @pantoken/web-components#build`) when you change web-component behavior; `outputWatchPaths` then
// bridges the new `dist` into HMR.
const orchestrator = workspaceOrchestrator({
  upstream: [
    {
      name: "@pantoken/css",
      dir: at("formats/css"),
      watchPaths: [at("formats/css/src")],
      build: ["node", "scripts/generate.ts"],
      dependents: [],
    },
    {
      name: "@pantoken/components",
      dir: at("formats/components"),
      watchPaths: [at("formats/components/src")],
      build: ["node", "scripts/generate.ts"],
      dependents: ["@pantoken/docs#docs:api:css"],
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
    at("formats/css/generated"),
    at("formats/components/generated"),
    at("renderers/web-components/dist"),
  ],
});

const localeEntries = Object.entries(LOCALES) as [DocsLocale, (typeof LOCALES)[DocsLocale]][];

const loadSidebar = (relativePath: string): DefaultTheme.SidebarItem[] => {
  const sidebarPath = fileURLToPath(new URL(relativePath, import.meta.url));
  return existsSync(sidebarPath)
    ? (JSON.parse(readFileSync(sidebarPath, "utf8")) as DefaultTheme.SidebarItem[])
    : [];
};

const typedocSidebarByLocale = Object.fromEntries(
  localeEntries.map(([localeKey, locale]) => [localeKey, loadSidebar(locale.typedocSidebarPath)]),
) as Record<DocsLocale, DefaultTheme.SidebarItem[]>;

/**
 * `@cssdoc/typedoc` appends a top-level "CSS" section to the merged TypeDoc sidebar. Nest the TS package
 * groups back under an `apiLabel` ("API reference") heading and keep that CSS section top-level after it,
 * so the API nav reads `[ API reference › packages…, CSS › … ]` rather than hoisting every group.
 */
const splitApiSidebar = (
  merged: DefaultTheme.SidebarItem[],
  apiLabel: string,
  apiPrefix: string,
  apiOverviewLabel: string,
): DefaultTheme.SidebarItem[] => {
  const isCssSection = (item: DefaultTheme.SidebarItem): boolean => item.text === "CSS";

  const collapseTree = (item: DefaultTheme.SidebarItem): DefaultTheme.SidebarItem => {
    if (!item.items) return item;
    return {
      ...item,
      collapsed: true,
      items: item.items.map(collapseTree),
    };
  };

  const normalizeCssSection = (item: DefaultTheme.SidebarItem): DefaultTheme.SidebarItem => {
    if (!item.items) return item;
    return {
      ...item,
      collapsed: false,
      items: item.items.map(collapseTree),
    };
  };

  const cssSections = merged.filter(isCssSection).map(normalizeCssSection);
  const typedocSections = merged.filter((item) => !isCssSection(item));

  const apiOverview: DefaultTheme.SidebarItem = { text: apiOverviewLabel, link: apiPrefix };

  if (cssSections.length === 0) return [{ text: apiLabel, items: [apiOverview, ...merged] }];

  return [{ text: apiLabel, items: [apiOverview, ...typedocSections] }, ...cssSections];
};

const localesConfig = Object.fromEntries(
  localeEntries.map(([localeKey, locale]) => [
    localeKey,
    {
      label: locale.label,
      lang: locale.lang,
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
                { text: locale.sidebar.cli, link: `${locale.guidePrefix}cli` },
                { text: locale.sidebar.plugins, link: `${locale.guidePrefix}plugins` },
                {
                  text: locale.sidebar.generated,
                  link: `${locale.guidePrefix}generated-output`,
                },
              ],
            },
          ],
          // `@cssdoc/typedoc` appends a "CSS" section to the TypeDoc sidebar. Keep that as its own
          // top-level section, and nest the TS package groups back under an "API reference" heading (the
          // merge would otherwise hoist them all to the top level).
          [locale.apiPrefix]: splitApiSidebar(
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

const rawHostname = process.env.DOCS_HOSTNAME ?? "https://pantoken.iywahl.com/";
const hostname = rawHostname.endsWith("/") ? rawHostname : `${rawHostname}/`;

const description =
  "Instructure design tokens and icons, reshaped for every platform and framework.";

export default defineConfig({
  base,
  title: "pantoken",
  description,
  // The focus-outline ring and the transition/stacking/visual-debug classes live in plugins, not the
  // source tokens, so layer their generated sheets (staged once by scripts/demos.ts) over the site's
  // token sheet. `.instui-card` (the shared example/demo surface) is bundled via the theme instead.
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
    ["link", { rel: "stylesheet", href: `${base}demos-assets/transition.css` }],
    ["link", { rel: "stylesheet", href: `${base}demos-assets/stacking.css` }],
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
    // LinkedIn, Discord, Facebook). Per-page title/description/url/locale are layered on in
    // transformHead; the constant image + card type live here. The card lives in public/ (served at
    // the base root), regenerated by `vp run docs:og`.
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "pantoken" }],
    ["meta", { property: "og:image", content: `${hostname}og.png` }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    [
      "meta",
      { property: "og:image:alt", content: "pantoken — Instructure design tokens, everywhere" },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@thedannywahl" }],
    ["meta", { name: "twitter:creator", content: "@thedannywahl" }],
    ["meta", { name: "twitter:image", content: `${hostname}og.png` }],
    [
      "meta",
      { name: "twitter:image:alt", content: "pantoken — Instructure design tokens, everywhere" },
    ],
    // Schema.org structured data describing the site and its author.
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "pantoken",
        url: hostname,
        description,
        image: `${hostname}og.png`,
        author: { "@type": "Person", name: "Danny Wahl", url: "https://iywahl.com" },
      }),
    ],
  ],
  // Layer per-page Open Graph / Twitter tags, a canonical link, and the page locale on top of the head
  // defaults, so each shared URL previews with its own title, description, address, and language rather
  // than the site-wide default. The `hu/` tree mirrors the root, so detect the locale from the path.
  transformHead: ({ pageData, siteData }) => {
    const isHu = pageData.relativePath.startsWith("hu/");
    const locale = isHu ? LOCALES.hu : LOCALES.root;
    // The home page has no title of its own (the hero renders it), so give it the wordmark plus the
    // hero line — home is the most-shared URL and unfurls better with the tagline attached.
    const title =
      pageData.frontmatter.layout === "home"
        ? isHu
          ? "pantoken — Instructure design tokenek, mindenhol"
          : "pantoken — Instructure design tokens, everywhere"
        : pageData.frontmatter.title || pageData.title || siteData.title;
    const pageDescription =
      pageData.frontmatter.description || pageData.description || locale.description;
    // relativePath is like "guide/getting-started.md" or "hu/index.md"; cleanUrls drops the extension
    // and index files map to their directory root. hostname already ends with the base path slash.
    const url = `${hostname}${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");
    return [
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: pageDescription }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:locale", content: isHu ? "hu_HU" : "en_US" }],
      ["meta", { property: "og:locale:alternate", content: isHu ? "en_US" : "hu_HU" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: pageDescription }],
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
      ],
    },
  },
  markdown: {
    config: (md) => {
      md.use(mermaidPlugin);
      md.use(demoMarkdownIt, {
        base,
        // Everything the runner injects, all served static files: the component sheets, the one
        // multi-theme token sheet (themed by the `data-pantoken-theme` attribute), the plugin sheets,
        // and the shared `.instui-card` surface.
        cssUrls: [
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
        ],
        // Seam a live preview onto each `@example` HTML fence at compile time: the same markup inside
        // the shared `.instui-card`, wrapped in `.css-example` (styled by the theme). One mechanism for
        // both surfaces that carry live HTML examples — the CSS-API class pages (`api/css/`) and the
        // web-components variable pages (`api/renderers/web-components/src/variables/`) — plus the cloned
        // locale pages (`hu/…`). Overlay examples (`<dialog>`, `[popover]`) are skipped inside the plugin.
        liveExample: {
          match: (relativePath: string) =>
            /(^|\/)api\/(css|renderers\/web-components\/src\/variables)\//.test(relativePath),
          wrap: (html: string) =>
            `<div class="css-example">\n<div class="instui-card">\n${html}\n</div>\n</div>`,
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
