/**
 * Aggregate the CDN picker's per-source manifests (icon names + logos + custom icons) into one
 * stable, published `icon-manifest.json` — the `component-capabilities.json` treatment, applied to
 * icons/logos, so external tools have a single fetchable index instead of scraping picker JSON.
 * Also refreshes the stale `docs/public/component-capabilities.json` copy from its authoritative
 * source (`@pantoken/interactions`), which nothing was keeping in sync. Runs in `docs:assets`,
 * after `cdn-icon-manifest.ts` and `cdn-plugin-manifest.ts` (reads their generated output).
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

/** An InstUI icon entry from `cdn-icon-manifest-instui.json`. */
interface InstuiIconEntry {
  name: string;
}

/** A Simple Icons entry from `cdn-icon-manifest-simple.json`. */
interface SimpleIconEntry {
  slug: string;
  title: string;
}

/** The combined plugin manifest from `cdn-plugin-manifest.ts` (only the fields this script uses). */
interface PluginManifest {
  customIcons: { name: string }[];
  logos: { product: string; items: { name: string }[] }[];
}

/** One published icon/logo manifest entry, tagged by its source and exact per-item CDN CSS URL. */
type IconManifestEntry =
  | { source: "instui"; name: string; css: string }
  | { source: "simple-icons"; slug: string; title: string; css: string }
  | { source: "custom-icons"; name: string; css: string }
  | { source: "logos"; product: string; name: string; css: string };

const CDN_BASE = "https://cdn.jsdelivr.net/npm";

const readGenerated = <T>(generatedDir: string, file: string): T =>
  JSON.parse(readFileSync(resolve(generatedDir, file), "utf8")) as T;

/** Build the flat, tagged icon/logo manifest from the three generated picker manifests. */
export const buildIconManifest = (
  instuiIcons: readonly InstuiIconEntry[],
  simpleIcons: readonly SimpleIconEntry[],
  pluginManifest: PluginManifest,
): { description: string; icons: IconManifestEntry[] } => {
  const instui: IconManifestEntry[] = instuiIcons.map((icon) => ({
    css: `${CDN_BASE}/@pantoken/components/dist/icons/${icon.name}.css`,
    name: icon.name,
    source: "instui",
  }));

  const simple: IconManifestEntry[] = simpleIcons.map((icon) => ({
    css: `${CDN_BASE}/@pantoken/plugin-simple-icons/dist/icons/${icon.slug}.css`,
    slug: icon.slug,
    source: "simple-icons",
    title: icon.title,
  }));

  const customIcons: IconManifestEntry[] = pluginManifest.customIcons.map((icon) => ({
    css: `${CDN_BASE}/@pantoken/plugin-custom-icons/dist/icons/${icon.name}.css`,
    name: icon.name,
    source: "custom-icons",
  }));

  const logos: IconManifestEntry[] = pluginManifest.logos.flatMap((group) =>
    group.items.map((item) => ({
      css: `${CDN_BASE}/@pantoken/plugin-logos/dist/${item.name}.css`,
      name: item.name,
      product: group.product,
      source: "logos" as const,
    })),
  );

  return {
    description:
      "pantoken icon/logo manifest. Each entry names its source " +
      "(instui | simple-icons | custom-icons | logos) and its exact per-item CDN CSS URL — " +
      "never bulk-import a whole source to get a single icon.",
    icons: [...instui, ...simple, ...customIcons, ...logos],
  };
};

/** Write `docs/public/icon-manifest.json` and refresh the `component-capabilities.json` mirror. */
export const writeIconManifest = (): void => {
  const docsRoot = resolve(import.meta.dirname, "..");
  const generatedDir = resolve(docsRoot, ".vitepress/theme/generated");
  const publicDir = resolve(docsRoot, "public");
  mkdirSync(publicDir, { recursive: true });

  const instuiIcons = readGenerated<InstuiIconEntry[]>(
    generatedDir,
    "cdn-icon-manifest-instui.json",
  );
  const simpleIcons = readGenerated<SimpleIconEntry[]>(
    generatedDir,
    "cdn-icon-manifest-simple.json",
  );
  const pluginManifest = readGenerated<PluginManifest>(generatedDir, "cdn-plugin-manifest.json");

  const manifest = buildIconManifest(instuiIcons, simpleIcons, pluginManifest);
  const out = resolve(publicDir, "icon-manifest.json");
  writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`✓ docs: wrote icon-manifest.json (${manifest.icons.length} entries)`);

  const capabilitiesSrc = resolve(docsRoot, "../formats/interactions/component-capabilities.json");
  copyFileSync(capabilitiesSrc, resolve(publicDir, "component-capabilities.json"));
  console.log("✓ docs: refreshed public/component-capabilities.json from @pantoken/interactions");
};

writeIconManifest();
