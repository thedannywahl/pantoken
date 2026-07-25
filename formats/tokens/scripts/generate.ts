/**
 * Build-time generator for `@pantoken/tokens`. Resolves the IR for every theme and vendors it —
 * plus the raw Tokens Studio JSON and upstream provenance — as static JSON under `generated`.
 * This is what lets the published package ship with no dependency on the (GitHub-only) upstream.
 *
 * Provenance records the *pinned ref + resolved commit* of the GitHub-only design-tokens source and
 * the *resolved version* of `@instructure/ui-icons`. It deliberately does NOT trust the design-tokens
 * `package.json` version: that field is stuck at `1.0.0` across every upstream tag, so the tag pin
 * (from the catalog) and the commit (from the lockfile) are the only reliable provenance.
 */
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { buildTokens, defineToken } from "@pantoken/core";
import { themeTokens } from "@instructure/instructure-design-tokens";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import type { DeprecationLedger, Theme } from "@pantoken/model";

const require = createRequire(import.meta.url);
const outDir = resolve(import.meta.dirname, "../generated");
const repoRoot = resolve(import.meta.dirname, "../../..");
mkdirSync(outDir, { recursive: true });

const DESIGN_TOKENS = "@instructure/instructure-design-tokens";
const UI_ICONS = "@instructure/ui-icons";

/** The ledger of removed/renamed upstream tokens and pantoken's policy for each. */
const ledger = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../deprecations.json"), "utf8"),
) as DeprecationLedger;

const THEMES: Theme[] = ["rebrand", "canvas", "canvasHighContrast"];

// The deprecation shims append a compatibility token (a `var()` forwarder or a frozen value) for every
// ledger entry, baking the compatibility layer into the vendored IR so every downstream format ships it
// with no extra wiring. Applied as a post-build step (rather than via `buildTokens({ plugins })`) so
// this tokens-only plugin never runs through the icon stage, which would log a noisy "no icons hook".
const shims = deprecationShims(ledger);

for (const theme of THEMES) {
  const base = buildTokens({ theme });
  const tokens = shims.tokens?.({ tokens: base, theme, define: defineToken }) ?? base;
  writeFileSync(join(outDir, `${theme}.json`), `${JSON.stringify(tokens)}\n`);
  console.log(`✓ ${theme}: ${tokens.length} tokens`);
}

// Raw Tokens Studio JSON, re-published verbatim (npm + semver access without GitHub pinning).
writeFileSync(join(outDir, "raw.json"), `${JSON.stringify(themeTokens)}\n`);

/** The `#ref` a package is pinned to in the catalog (e.g. `v1.5.0`), or `unpinned`. */
export function catalogRef(pkg: string): string {
  try {
    const ws = readFileSync(join(repoRoot, "pnpm-workspace.yaml"), "utf8");
    const line = ws
      .split("\n")
      .find((l) => l.includes(`"${pkg}"`) || l.trimStart().startsWith(`${pkg}:`));
    const hash = line?.indexOf("#");
    if (line && hash !== undefined && hash >= 0)
      return line
        .slice(hash + 1)
        .replace(/["']/gu, "")
        .trim();
  } catch {
    // best-effort
  }
  return "unpinned";
}

/** The commit sha a GitHub-hosted package resolved to, read from the lockfile tarball URL. */
export function lockCommit(repo: string): string {
  try {
    const lock = readFileSync(join(repoRoot, "pnpm-lock.yaml"), "utf8");
    const re = new RegExp(`${repo}/tar\\.gz/([0-9a-f]{7,40})`, "u");
    return lock.match(re)?.[1] ?? "unknown";
  } catch {
    return "unknown";
  }
}

/** A published package's resolved version, from its installed `package.json`. */
export function resolvedVersion(pkg: string): string {
  try {
    return (
      JSON.parse(readFileSync(require.resolve(`${pkg}/package.json`), "utf8")).version ?? "unknown"
    );
  } catch {
    // Not all packages export `./package.json`; walk up from the resolved entry.
  }
  try {
    let dir = dirname(require.resolve(pkg));
    for (let i = 0; i < 6; i++) {
      const candidate = join(dir, "package.json");
      if (existsSync(candidate)) {
        const json = JSON.parse(readFileSync(candidate, "utf8")) as {
          name?: string;
          version?: string;
        };
        if (json.name === pkg) return json.version ?? "unknown";
      }
      dir = dirname(dir);
    }
  } catch {
    // best-effort
  }
  return "unknown";
}

const meta = {
  designTokens: {
    package: DESIGN_TOKENS,
    ref: catalogRef(DESIGN_TOKENS),
    commit: lockCommit("instructure-design-tokens"),
  },
  uiIcons: {
    package: UI_ICONS,
    resolved: resolvedVersion(UI_ICONS),
  },
};
writeFileSync(join(outDir, "meta.json"), `${JSON.stringify(meta)}\n`);
console.log(
  `✓ raw.json + meta.json (design-tokens ${meta.designTokens.ref}@${meta.designTokens.commit.slice(0, 7)}, ui-icons ${meta.uiIcons.resolved})`,
);
