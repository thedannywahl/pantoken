/**
 * Generate static shadcn/ui registry files under `docs/public/r/` conforming to
 * the registry JSON schema specification (https://ui.shadcn.com/schema/registry.json and
 * https://ui.shadcn.com/schema/registry-item.json).
 *
 * Emits:
 * - `docs/public/r/registry.json` (the full catalog)
 * - `docs/public/r/[name].json` (individual item manifests for all themes, components, and hooks)
 * - `docs/.vitepress/theme/generated/registry.json` (the catalog imported by the docs app)
 */
import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { COMPONENTS } from "../../formats/components/src/components/index.ts";
import type {
  RegistryCatalog,
  RegistryItem,
} from "../.vitepress/theme/components/registry-types.ts";
import { buildPluginRegistryItems } from "./registry-plugins.ts";

const defaultOutDir = resolve(import.meta.dirname, "../public/r");
const defaultSourceDir = resolve(import.meta.dirname, "../.vitepress/theme/generated");
const AUTHOR = "pantoken <https://pantoken.app>";

function cssImports(paths: readonly string[]): Record<string, Record<string, string>> {
  return Object.fromEntries(paths.map((path) => [`@import "${path}"`, {}]));
}

/** Build the complete shadcn/ui registry catalog object in-memory. */
export function buildRegistryCatalog(): RegistryCatalog {
  const items: RegistryItem[] = [];

  // 1. Base / Theme items
  items.push({
    name: "theme-canvas",
    type: "registry:theme",
    title: "Canvas LMS Theme",
    description: "Instructure Canvas LMS theme variables bridging to shadcn/ui custom properties.",
    author: AUTHOR,
    dependencies: ["@pantoken/css", "@pantoken/shadcn"],
    registryDependencies: ["@pantoken/base"],
    css: cssImports(["@pantoken/css/style.canvas.css"]),
  });

  items.push({
    name: "theme-canvas-high-contrast",
    type: "registry:theme",
    title: "Canvas High Contrast Theme",
    description: "Canvas LMS High Contrast theme variables for WCAG AAA compliance.",
    author: AUTHOR,
    dependencies: ["@pantoken/css", "@pantoken/shadcn"],
    registryDependencies: ["@pantoken/base"],
    css: cssImports(["@pantoken/css/style.canvas-high-contrast.css"]),
  });

  items.push({
    name: "theme-rebrand",
    type: "registry:theme",
    title: "Instructure Next gen Theme",
    description: "Modern Instructure brand theme variables.",
    author: AUTHOR,
    dependencies: ["@pantoken/css", "@pantoken/shadcn"],
    registryDependencies: ["@pantoken/base"],
    css: cssImports(["@pantoken/css/style.css"]),
  });

  items.push({
    name: "base",
    type: "registry:base",
    title: "Pantoken Base System",
    description:
      "Pantoken core design token system, CSS custom properties, and semantic components.",
    author: AUTHOR,
    dependencies: ["@pantoken/css", "@pantoken/components", "@pantoken/shadcn"],
    css: cssImports([
      "@pantoken/css/style.css",
      "@pantoken/components/base.css",
      "@pantoken/shadcn/theme.css",
      "@pantoken/shadcn/tailwind-v4.css",
    ]),
  });

  // 2. CSS component items. Member records are installed with their owning root component.
  for (const comp of COMPONENTS.filter(({ name }) => !name.includes("."))) {
    const name = comp.name;
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    const description = `Instructure ${title} component styled with semantic .instui-${name} classes.`;
    const members = COMPONENTS.filter(({ name: candidate }) =>
      candidate.startsWith(`${name}.`),
    ).map(({ name: member }) => member);

    items.push({
      name,
      type: "registry:style",
      title,
      description,
      author: AUTHOR,
      dependencies: ["@pantoken/components"],
      registryDependencies: ["@pantoken/base"],
      css: cssImports([
        `@pantoken/components/${name}.css`,
        ...members.map((member) => `@pantoken/components/${member}.css`),
      ]),
      docs: `Apply \`class="instui-${name}"\` to semantic HTML. See https://pantoken.app/api/css/components/${name}.`,
      categories: ["components"],
      meta: {
        className: `instui-${name}`,
        members,
        framework: "css",
      },
    });
  }

  items.push(...buildPluginRegistryItems());

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "pantoken",
    homepage: "https://pantoken.app",
    items,
  };
}

/** Write registry catalog and individual item JSON manifests to disk. */
export function writeRegistry(options?: { outDir?: string; sourceDir?: string }): {
  catalogPath: string;
  count: number;
} {
  const outDir = options?.outDir ?? defaultOutDir;
  const sourceDir = options?.sourceDir ?? defaultSourceDir;
  mkdirSync(outDir, { recursive: true });
  mkdirSync(sourceDir, { recursive: true });

  const catalog = buildRegistryCatalog();
  const catalogPath = resolve(outDir, "registry.json");
  const sourceCatalogPath = resolve(sourceDir, "registry.json");
  // The public directory index must omit file contents. Keep them in the
  // browser's source catalog and individual manifests for previews and installs.
  const publicCatalog = {
    ...catalog,
    items: catalog.items.map((item) => ({
      ...item,
      ...(item.files && {
        files: item.files.map(({ content: _content, ...file }) => file),
      }),
    })),
  };
  writeFileSync(catalogPath, JSON.stringify(publicCatalog, null, 2) + "\n");
  writeFileSync(sourceCatalogPath, JSON.stringify(catalog, null, 2) + "\n");

  // Write individual item files
  for (const item of catalog.items) {
    const itemPayload = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      ...item,
    };
    const itemPath = resolve(outDir, `${item.name}.json`);
    writeFileSync(itemPath, JSON.stringify(itemPayload, null, 2) + "\n");
  }

  const expectedFiles = new Set([
    "registry.json",
    ...catalog.items.map(({ name }) => `${name}.json`),
  ]);
  for (const file of readdirSync(outDir)) {
    if (file.endsWith(".json") && !expectedFiles.has(file)) unlinkSync(resolve(outDir, file));
  }

  return { catalogPath, count: catalog.items.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { catalogPath, count } = writeRegistry();
  console.log(`✓ registry: wrote ${catalogPath} (${count} items)`);
  console.log(`✓ registry: wrote ${count} item files to ${defaultOutDir}`);
}
