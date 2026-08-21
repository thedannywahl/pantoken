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
import { buildTokens } from "@pantoken/core";
import { themeTokens } from "@instructure/instructure-design-tokens";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import { syntaxMismatches } from "@pantoken/utils/token-syntax";
import { defineToken } from "@pantoken/model";
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

/** A build-failing upstream syntax bug we've already triaged, pending an upstream fix. */
interface KnownSyntaxIssue {
  /** The token name, e.g. `--instui-component-text-content-quote-font-weight`. */
  name: string;
  /** The exact bad value observed upstream — if it changes, the patch stops applying (see below). */
  upstreamValue: string;
  /** The value to patch in instead — defaults to the `unset` CSS-wide keyword when omitted. */
  rewriteValue?: string | number;
  /** Extra tokens to add to the IR, e.g. when upstream collapsed two properties into one bad string. */
  supplemental?: { name: string; value: string }[];
  /** Why the value is invalid. */
  note?: string;
}

/**
 * Known, already-triaged upstream syntax bugs (`formats/tokens/known-syntax-issues.json`): rather than
 * failing the build on a value we can't fix ourselves, patch it to `rewriteValue` (or the `unset`
 * CSS-wide keyword, valid for any property, when unset) and warn instead. Matched on the EXACT recorded
 * bad value, not just the name — if upstream changes the value to something else, it's no longer the
 * same known issue (see below).
 *
 * The ledger is self-maintaining: this file rewrites it every run — untouched entries whose value
 * still reproduces are kept as-is (so a hand-authored `rewriteValue`/`note`/`supplemental` survives),
 * an entry whose value no longer reproduces anywhere is dropped (upstream fixed it), and any grammar
 * mismatch not already covered is appended as a new entry (defaulting to `unset` until someone reviews
 * and gives it a real `rewriteValue`). Review the resulting git diff like any other generated-but-
 * committed file. `supplemental` is for the "upstream squashed two properties into one bad string"
 * case (e.g. a `font-weight` token holding `"Medium Italic"`): it adds a new token to the IR rather
 * than just patching the offending one, and is never auto-populated — a human adds it once triaged.
 */
const knownSyntaxIssuesPath = resolve(import.meta.dirname, "../known-syntax-issues.json");
const knownSyntaxIssues = JSON.parse(
  readFileSync(knownSyntaxIssuesPath, "utf8"),
) as KnownSyntaxIssue[];
const patchedIssues = new Set<string>();
const newIssues = new Map<string, KnownSyntaxIssue>();

const THEMES: Theme[] = ["rebrand", "canvas", "canvasHighContrast"];

// The deprecation shims append a compatibility token (a `var()` forwarder or a frozen value) for every
// ledger entry, baking the compatibility layer into the vendored IR so every downstream format ships it
// with no extra wiring. Applied as a post-build step (rather than via `buildTokens({ plugins })`) so
// this tokens-only plugin never runs through the icon stage, which would log a noisy "no icons hook".
const shims = deprecationShims(ledger);

for (const theme of THEMES) {
  const base = buildTokens({ theme });
  const tokens = shims.tokens?.({ tokens: base, theme }) ?? base;
  const supplementalTokens = [];
  for (const token of tokens) {
    const known = knownSyntaxIssues.find(
      (k) => k.name === token.name && k.upstreamValue === token.value,
    );
    if (known) {
      patchedIssues.add(known.name);
      const rewrite = String(known.rewriteValue ?? "unset");
      console.warn(
        `[pantoken] ${theme}: "${known.name}" patched to "${rewrite}" — known upstream issue`,
      );
      token.value = rewrite;
      for (const supp of known.supplemental ?? []) {
        if (tokens.some((t) => t.name === supp.name)) continue;
        supplementalTokens.push(defineToken(supp));
        console.warn(
          `[pantoken] ${theme}: added supplemental token "${supp.name}": "${supp.value}" (split from "${known.name}")`,
        );
      }
    }
  }
  tokens.push(...supplementalTokens);
  // Catches upstream data corruption (a value that doesn't match its property's real CSS grammar)
  // before it ships as an invalid `@property`/declaration — see syntaxMismatches' doc comment. A
  // mismatch not already covered above is a NEW issue: patch it to `unset` and record it, rather than
  // failing the build — the ledger rewrite below is what surfaces it for review.
  for (const issue of syntaxMismatches(tokens)) {
    if (issue.kind === "mismatch") {
      if (!newIssues.has(issue.name))
        newIssues.set(issue.name, { name: issue.name, upstreamValue: issue.value });
      console.warn(
        `[pantoken] ${theme}: "${issue.name}" patched to "unset" — newly discovered upstream issue, added to known-syntax-issues.json`,
      );
      const token = tokens.find((t) => t.name === issue.name);
      if (token) token.value = "unset";
    } else {
      console.warn(
        `[pantoken] ${theme}: "${issue.name}" maps to no known CSS property (unmodeled)`,
      );
    }
  }
  writeFileSync(join(outDir, `${theme}.json`), `${JSON.stringify(tokens)}\n`);
  console.log(`✓ ${theme}: ${tokens.length} tokens`);
}

for (const known of knownSyntaxIssues) {
  if (!patchedIssues.has(known.name)) {
    console.warn(
      `[pantoken] known-syntax-issues.json: removed "${known.name}" — no longer reproduces (resolved upstream)`,
    );
  }
}

writeFileSync(
  knownSyntaxIssuesPath,
  `${JSON.stringify(
    [...knownSyntaxIssues.filter((k) => patchedIssues.has(k.name)), ...newIssues.values()],
    null,
    2,
  )}\n`,
);

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
