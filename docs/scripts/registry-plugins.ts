import type { RegistryItem } from "../.vitepress/theme/components/registry-types.ts";

const AUTHOR = "pantoken <https://pantoken.app>";

const cssImports = (paths: readonly string[]): Record<string, Record<string, string>> =>
  Object.fromEntries(paths.map((path) => [`@import "${path}"`, {}]));

const styleItem = (options: {
  name: string;
  title: string;
  description: string;
  pkg: string;
  css: string;
  categories: string[];
  docs?: string;
  extraImports?: string[];
}): RegistryItem => ({
  name: options.name,
  type: "registry:style",
  title: options.title,
  description: options.description,
  author: AUTHOR,
  dependencies: [options.pkg],
  registryDependencies: ["@pantoken/base"],
  css: cssImports([options.css, ...(options.extraImports ?? [])]),
  categories: options.categories,
  docs: options.docs,
  meta: { framework: "css", sourcePackage: options.pkg },
});

/** Build the bounded set of public Pantoken plugin assets suitable for registry installation. */
export function buildPluginRegistryItems(): RegistryItem[] {
  const items: RegistryItem[] = [];

  for (const name of ["card", "banner", "agent-shell"]) {
    items.push(
      styleItem({
        name,
        title: name
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        description: `Pantoken ${name} component styles and documented HTML structure.`,
        pkg: "@pantoken/plugin-custom-components",
        css: `@pantoken/plugin-custom-components/${name}.css`,
        categories: ["components", "plugins"],
        docs: `See https://pantoken.app/api/css/plugins/pantoken/custom-components/${name}.`,
      }),
    );
  }

  for (const name of [
    "wrapper",
    "callout",
    "hero",
    "page-layout",
    "rubric-note",
    "testimonial",
    "two-column",
  ]) {
    items.push(
      styleItem({
        name,
        title: `${name
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ")} Layout`,
        description: `Pantoken ${name} layout styles and canonical HTML template.`,
        pkg: "@pantoken/plugin-layouts",
        css: `@pantoken/plugin-layouts/${name}.css`,
        categories: ["layouts", "plugins"],
        docs: `See https://pantoken.app/api/css/plugins/pantoken/layouts/${name}.`,
      }),
    );
  }

  items.push(
    styleItem({
      name: "custom-icons",
      title: "Pantoken Custom Icons",
      description: "Pantoken's curated custom icon tokens for the shared -icon-* painter.",
      pkg: "@pantoken/plugin-custom-icons",
      css: "@pantoken/plugin-custom-icons/custom-icons.css",
      extraImports: ["@pantoken/components/icon.css"],
      categories: ["icons", "plugins"],
      docs: "Use the documented -icon-<name> class on a semantic element.",
    }),
    styleItem({
      name: "simple-icons",
      title: "Simple Icons",
      description: "The complete Simple Icons brand-glyph token collection.",
      pkg: "@pantoken/plugin-simple-icons",
      css: "@pantoken/plugin-simple-icons/simple-icons.css",
      extraImports: ["@pantoken/components/icon.css"],
      categories: ["icons", "plugins"],
      docs: "This is a large aggregate. Prefer per-icon package/CDN CSS for production bundles.",
    }),
    styleItem({
      name: "logos",
      title: "Instructure Product Logos",
      description: "All Instructure product logo image tokens.",
      pkg: "@pantoken/plugin-logos",
      css: "@pantoken/plugin-logos/logos.css",
      categories: ["logos", "plugins"],
    }),
  );

  for (const product of [
    "canvas",
    "igniteai",
    "instructure",
    "learnplatform",
    "mastery",
    "pantoken",
    "parchment",
  ]) {
    items.push(
      styleItem({
        name: `logo-${product}`,
        title: `${product.charAt(0).toUpperCase() + product.slice(1)} Logos`,
        description: `Logo image tokens for ${product}.`,
        pkg: "@pantoken/plugin-logos",
        css: `@pantoken/plugin-logos/${product}.css`,
        categories: ["logos", "plugins"],
      }),
    );
  }

  items.push(
    styleItem({
      name: "theme-colors",
      title: "Custom Theme Colors",
      description: "Selector-driven Pantoken brand-color remapping for 13 color namespaces.",
      pkg: "@pantoken/plugin-custom-theme-colors",
      css: "@pantoken/plugin-custom-theme-colors/custom-theme-colors.css",
      categories: ["themes", "plugins"],
      docs: "Select a color with data-pantoken-color on the document root.",
    }),
    styleItem({
      name: "primitives",
      title: "Primitive Utilities",
      description: "Opt-in utility classes for Pantoken's raw primitive palette.",
      pkg: "@pantoken/plugin-primitives",
      css: "@pantoken/plugin-primitives/primitives.css",
      categories: ["utilities", "plugins"],
      docs: "Prefer semantic utilities; use primitives only when a semantic role does not fit.",
    }),
    styleItem({
      name: "visual-debug",
      title: "Visual Debug",
      description: "Development-only layout outlines for Pantoken components.",
      pkg: "@pantoken/plugin-visual-debug",
      css: "@pantoken/plugin-visual-debug/visual-debug.css",
      categories: ["development", "plugins"],
      docs: "Use -with-visual-debug during development and remove it before production.",
    }),
  );

  return items;
}
