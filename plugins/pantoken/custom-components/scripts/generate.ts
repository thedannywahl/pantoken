/**
 * Emit the custom-components stylesheet, retaining the deprecated Card compatibility alias alongside
 * the plugin-owned records. Card's canonical source and API live in `@pantoken/components`.
 *
 * Run after `scripts/component-styles.ts` (which generates `src/generated/component-styles.ts`).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { breakpointDeclarations } from "../src/declarations/index.ts";
import {
  agentShellRules,
  aiGradientRules,
  bannerRules,
  buttonSetRules,
  cardRules,
  logoRules,
  skeletonLoaderRules,
  segmentedControlRules,
} from "../src/components/index.ts";

const outDir = resolve(import.meta.dirname, "../generated");
const allInstui = [
  breakpointDeclarations(),
  cardRules("instui-"),
  agentShellRules("instui-"),
  aiGradientRules("instui-"),
  bannerRules("instui-"),
  buttonSetRules("instui-"),
  logoRules("instui-"),
  skeletonLoaderRules("instui-"),
  segmentedControlRules("instui-"),
].join("\n");
const allPfx = [
  breakpointDeclarations(),
  cardRules("pfx-"),
  agentShellRules("pfx-"),
  aiGradientRules("pfx-"),
  bannerRules("pfx-"),
  buttonSetRules("pfx-"),
  logoRules("pfx-"),
  skeletonLoaderRules("pfx-"),
  segmentedControlRules("pfx-"),
].join("\n");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "custom-components.css"), `${allInstui}\n`);
writeFileSync(join(outDir, "_records.css"), `${allPfx}\n`);
console.log(`✓ custom-components: wrote custom-components.css + _records.css`);
