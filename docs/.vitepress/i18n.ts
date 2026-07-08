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
    cli: string;
    plugins: string;
    generated: string;
    api: string;
  };
  editText: string;
  typedocSidebarPath: string;
  cssSidebarPath: string;
};

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
      cli: "The pantoken CLI",
      plugins: "Plugins",
      generated: "Generated output",
      api: "API reference",
    },
    editText: "Edit this page on GitHub",
    typedocSidebarPath: "../api/typedoc-sidebar.json",
    cssSidebarPath: "../api/css/css-sidebar.json",
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
      cli: "A pantoken CLI",
      plugins: "Pluginek",
      generated: "Generált kimenet",
      api: "API referencia",
    },
    editText: "Oldal szerkesztése GitHubon",
    typedocSidebarPath: "../hu/api/typedoc-sidebar.json",
    cssSidebarPath: "../hu/api/css/css-sidebar.json",
  },
};
