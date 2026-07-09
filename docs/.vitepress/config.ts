import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type DefaultTheme, defineConfig } from "vitepress";
import { workspaceOrchestrator } from "@pantoken/vite-workspace-orchestrator";
import { demoMarkdownIt } from "@pantoken/demo";
import { LOCALES, type DocsLocale } from "./i18n.js";
import { mermaidPlugin } from "./plugins/vitepress-mermaid/index.js";

// The repo root, two levels up from docs/.vitepress/.
const repoRoot = fileURLToPath(new URL("../../", import.meta.url));
const at = (relative: string): string =>
  fileURLToPath(new URL(`../../${relative}`, import.meta.url));

// During `vitepress dev`, rebuild the workspace packages the docs consume whenever their source
// changes, so edits to the libraries show up live instead of only at the next full build. Each build
// runs through `vp` (never pnpm scripts directly) from the repo root.
//
// Two output shapes have to reach the browser: the generated CSS that the theme imports (watched via
// `hmrWatchPaths` — a plain chokidar file change → HMR) and the web-components bundle the theme loads
// for `register()` (watched via `reloadWatchPaths` — a pnpm-symlinked `dist`, which needs the native
// fs.watch bridge to invalidate). `@pantoken/web-components` inlines `@pantoken/components`' CSS, so a
// components edit must cascade into a web-components rebuild too (`dependents`).
const orchestrator = workspaceOrchestrator({
  upstream: [
    {
      name: "@pantoken/css",
      dir: repoRoot,
      watchPaths: [at("formats/css/src")],
      build: ["pnpm", "exec", "vp", "run", "@pantoken/css#build"],
      dependents: [],
    },
    {
      name: "@pantoken/components",
      dir: repoRoot,
      watchPaths: [at("formats/components/src")],
      build: ["pnpm", "exec", "vp", "run", "@pantoken/components#build"],
      dependents: ["@pantoken/web-components"],
    },
    {
      name: "@pantoken/web-components",
      dir: repoRoot,
      watchPaths: [at("renderers/web-components/src")],
      build: ["pnpm", "exec", "vp", "run", "@pantoken/web-components#build"],
      dependents: [],
    },
  ],
  hmrWatchPaths: [at("formats/css/generated"), at("formats/components/generated")],
  reloadWatchPaths: [at("renderers/web-components/dist")],
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
 * groups back under an `apiLabel` ("API reference") heading and keep the "CSS" section top-level after it,
 * so the API nav reads `[ API reference › packages…, CSS › … ]` rather than hoisting every group.
 */
const splitApiSidebar = (
  merged: DefaultTheme.SidebarItem[],
  apiLabel: string,
): DefaultTheme.SidebarItem[] => {
  const cssIndex = merged.findIndex((item) => item.text === "CSS");
  if (cssIndex < 0) return [{ text: apiLabel, items: merged }];
  return [{ text: apiLabel, items: merged.filter((_, i) => i !== cssIndex) }, merged[cssIndex]];
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
          ),
        },
        editLink: {
          pattern: "https://github.com/instructure/pantoken/edit/main/docs/:path",
          text: locale.editText,
        },
      },
    },
  ]),
);

// The site is served from https://<user>.github.io/pantoken/ (a GitHub Pages project site),
// so every asset and link is prefixed with the repo name. Override with DOCS_BASE if you deploy
// to a user site or a custom domain (set it to "/").
const base = process.env.DOCS_BASE ?? "/pantoken/";

export default defineConfig({
  base,
  title: "pantoken",
  description: "Instructure design tokens and icons, reshaped for every platform and framework.",
  // The focus-outline ring lives in a plugin, not the source tokens, so layer its generated sheet
  // (staged by scripts/demos.ts) over the site's @pantoken/css token sheet.
  head: [
    ["link", { rel: "stylesheet", href: `${base}demos-assets/focus-outline.css` }],
    ["link", { rel: "stylesheet", href: `${base}demos-assets/transition.css` }],
    ["link", { rel: "stylesheet", href: `${base}demos-assets/stacking.css` }],
    ["link", { rel: "stylesheet", href: `${base}demos-assets/visual-debug.css` }],
    // `.instui-card` — the surface the /demos and the CSS-API live examples share (see build-css-api.ts).
    ["link", { rel: "stylesheet", href: `${base}demos-assets/demo-overrides.css` }],
  ],
  locales: localesConfig,
  cleanUrls: true,
  lastUpdated: true,
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
    plugins: [orchestrator],
  },
  markdown: {
    config: (md) => {
      md.use(mermaidPlugin);
      md.use(demoMarkdownIt, {
        base,
        cssUrls: [
          `${base}demos-assets/base.css`,
          `${base}demos-assets/components.css`,
          `${base}demos-assets/prose.css`,
          `${base}demos-assets/icons.css`,
          `${base}demos-assets/utilities.css`,
          `${base}demos-assets/select.css`,
          `${base}demos-assets/demo-overrides.css`,
        ],
        themes: [
          { name: "rebrand", label: "Rebrand", css: `${base}demos-assets/tokens-rebrand.css` },
          { name: "canvas", label: "Canvas", css: `${base}demos-assets/tokens-canvas.css` },
          {
            name: "canvasHighContrast",
            label: "Canvas high contrast",
            css: `${base}demos-assets/tokens-canvasHighContrast.css`,
          },
        ],
      });
    },
  },
  themeConfig: {
    siteTitle: false,
    logo: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
    search: { provider: "local" },
    outline: { level: [2, 3] },
  },
});
