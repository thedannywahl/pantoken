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

// During `vitepress dev`, rebuild the token-driven CSS packages the docs consume whenever their
// source changes, so edits to the libraries show up live instead of only at the next full build.
// Each build runs through `vp` (never pnpm scripts directly) from the repo root.
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
      dependents: [],
    },
  ],
  hmrWatchPaths: [at("formats/css/generated"), at("formats/components/generated")],
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
          [locale.apiPrefix]: [
            { text: locale.sidebar.api, items: typedocSidebarByLocale[localeKey] },
          ],
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
    ["link", { rel: "stylesheet", href: `${base}demos-assets/elevation.css` }],
    ["link", { rel: "stylesheet", href: `${base}demos-assets/transition.css` }],
  ],
  locales: localesConfig,
  cleanUrls: true,
  lastUpdated: true,
  // The generated API pages cross-link heavily; don't fail the build on a link TypeDoc emitted.
  ignoreDeadLinks: true,
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
