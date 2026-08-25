/**
 * Scan all packages for scaffold presets and generate a registry ledger.
 *
 * Looks for packages exporting `./scaffold-preset` and builds a static registry.
 * Run before build: `node scripts/scan-presets.ts`
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const generatedDir = join(root, "generated");
const ledgerFile = join(generatedDir, "preset-ledger.ts");

// Workspace packages that may export presets (in discovery order)
const PRESET_SCAN_PATHS = [
  "../../formats/components", // CSS-only component library
  "../../formats/react", // React component wrapper
  "../../formats/next", // Next.js preset
  "../../formats/angular", // Angular preset
  "../../formats/web-components", // Web components preset
  "../../formats/vue", // Vue preset
  "../../formats/svelte", // Svelte preset
];

interface PresetRef {
  packageName: string;
  platform: string;
  importPath: string;
  exportName: string;
}

const presets: PresetRef[] = [];

// Scan each potential preset location
for (const relPath of PRESET_SCAN_PATHS) {
  const pkgPath = resolve(root, relPath, "package.json");
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    const exports = pkg.exports || {};

    // Look for ./scaffold-preset export
    if (exports["./scaffold-preset"]) {
      // Example: @pantoken/components exports ./dist/scaffold-preset.mjs
      // We'll import it as: import * from "@pantoken/components/scaffold-preset"
      const scanPath = relPath.split("/").pop();
      const packageName = pkg.name;

      presets.push({
        packageName,
        platform: scanPath || "unknown",
        importPath: `${packageName}/scaffold-preset`,
        exportName: `preset${scanPath ? scanPath[0]!.toUpperCase() + scanPath.slice(1) : "Unknown"}`,
      });
    }
  } catch {
    // Package doesn't exist or has no scaffold preset — skip
  }
}

// Generate the ledger file
const ledgerContent = `/**
 * Auto-generated preset ledger.
 * Do not edit manually — run \`node scripts/scan-presets.ts\` to regenerate.
 *
 * @generated
 */

${presets.map((p) => `import { ${p.exportName} } from "${p.importPath}";`).join("\n")}

/**
 * Registry of all available pantoken scaffold presets, keyed by platform name.
 */
export const PRESET_LEDGER = {
${presets.map((p) => `  "${p.platform}": ${p.exportName},`).join("\n")}
} as const;

/**
 * Available preset platform names.
 */
export type PresetPlatform = keyof typeof PRESET_LEDGER;
`;

mkdirSync(generatedDir, { recursive: true });
writeFileSync(ledgerFile, ledgerContent);

console.log(`✓ scanned presets: ${presets.length} found`);
for (const p of presets) {
  console.log(`  - ${p.packageName} (${p.platform})`);
}
console.log(`✓ wrote ${ledgerFile}`);
