/**
 * Build the pantoken compatibility manifest: which upstream Instructure UI sources this build resolves
 * from, and which consumers are validated against it. Pure-ish (reads repo files, no network), so the
 * writer (`generate-compatibility.ts`) and the gate (`check-compatibility.ts`) share one source of
 * truth and can't drift.
 *
 * Two upstream tiers, because pantoken consumes Instructure UI two different ways:
 * - `token-ir` / `icons` — the GitHub-only design-tokens source and `@instructure/ui-icons` feed the
 *   resolved token IR that every format, platform, and renderer consumes.
 * - `instui-react` — the eight `@instructure/ui-*` React packages, consumed *only* by
 *   `renderers/react-markdown`, which renders real InstUI components.
 *
 * @module
 */
import fs from "node:fs/promises";
import path from "node:path";
import { loadWorkspacePackages } from "./workspace-packages.ts";

const WORKSPACE_ROOT = path.resolve(new URL("../../", import.meta.url).pathname);

const TOKEN_SOURCE = "@instructure/instructure-design-tokens";
const ICON_SOURCE = "@instructure/ui-icons";
/** The InstUI React packages, consumed only by `renderers/react-markdown`. */
const REACT_PACKAGES = [
  "@instructure/ui-heading",
  "@instructure/ui-text",
  "@instructure/ui-link",
  "@instructure/ui-list",
  "@instructure/ui-table",
  "@instructure/ui-view",
  "@instructure/ui-img",
  "@instructure/ui-alerts",
];

/** Which pantoken layer an upstream package feeds. */
export type Feeds = "token-ir" | "icons" | "instui-react";

/** One upstream dependency's support record. */
export interface UpstreamEntry {
  /** The version range as pinned in the catalog. */
  range: string;
  /** The concrete resolved version/ref this build vendored. */
  resolved: string;
  /** The pantoken layer this source feeds. */
  feeds: Feeds;
}

/** One consumer package's support record. */
export interface ConsumerEntry {
  package: string;
  path: string;
  /** The upstream tier that governs this consumer. */
  governedBy: "token-ir" | "instui-react";
}

/** One deprecated token's lifecycle, surfaced from the ledger for auto-documentation. */
export interface DeprecationRow {
  token: string;
  deprecatedIn: string;
  removeIn: string;
  /** The shim's forward target (`var(...)`), when it forwards rather than freezes a value. */
  replacement?: string;
  note?: string;
}

/** The full compatibility manifest (`compatibility.json`). */
export interface Compatibility {
  upstream: Record<string, UpstreamEntry>;
  consumers: ConsumerEntry[];
  deprecations: DeprecationRow[];
}

/** Provenance written by `@pantoken/tokens`' generate step. */
interface Meta {
  designTokens: { package: string; ref: string; commit: string };
  uiIcons: { package: string; resolved: string };
}

/** The deprecation ledger shape (`formats/tokens/deprecations.json`). */
interface Ledger {
  entries: {
    token: string;
    deprecatedIn: string;
    removeIn: string;
    replacement?: string;
    value?: string;
    note?: string;
  }[];
}

/** The `#ref`-and-value a package is pinned to in the catalog. */
function catalogRange(workspaceYaml: string, pkg: string): string {
  const line = workspaceYaml
    .split("\n")
    .find((l) => l.includes(`"${pkg}":`) || l.trimStart().startsWith(`${pkg}:`));
  if (!line) return "unknown";
  const value = line.slice(line.indexOf(":", line.indexOf(pkg)) + 1).trim();
  return value.replace(/^["']|["']$/gu, "");
}

/** The concrete version a semver-pinned package resolved to, from the lockfile. */
function lockResolved(lockfile: string, pkg: string): string {
  const match = lockfile.match(new RegExp(`'${pkg.replace(/[/@]/gu, (c) => c)}@([^']+)':`, "u"));
  return match?.[1] ?? "unknown";
}

/** Read a package's `@instructure/*` runtime/peer dependency names. */
async function instuiDeps(pkgPath: string): Promise<string[]> {
  try {
    const raw = await fs.readFile(path.join(WORKSPACE_ROOT, pkgPath, "package.json"), "utf8");
    const m = JSON.parse(raw) as {
      dependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };
    return [...Object.keys(m.dependencies ?? {}), ...Object.keys(m.peerDependencies ?? {})].filter(
      (name) => name.startsWith("@instructure/"),
    );
  } catch {
    return [];
  }
}

/**
 * Build the compatibility manifest from the repo's current state (catalog, lockfile, vendored
 * provenance, and the workspace packages).
 *
 * @returns The {@link Compatibility} manifest — deterministic, no timestamps, so the gate can diff it.
 */
export async function buildCompatibility(): Promise<Compatibility> {
  const [workspaceYaml, lockfile, metaRaw, ledgerRaw] = await Promise.all([
    fs.readFile(path.join(WORKSPACE_ROOT, "pnpm-workspace.yaml"), "utf8"),
    fs.readFile(path.join(WORKSPACE_ROOT, "pnpm-lock.yaml"), "utf8"),
    fs.readFile(path.join(WORKSPACE_ROOT, "formats/tokens/generated/meta.json"), "utf8"),
    fs.readFile(path.join(WORKSPACE_ROOT, "formats/tokens/deprecations.json"), "utf8"),
  ]);
  const meta = JSON.parse(metaRaw) as Meta;
  const ledger = JSON.parse(ledgerRaw) as Ledger;

  const upstream: Record<string, UpstreamEntry> = {
    [TOKEN_SOURCE]: {
      range: catalogRange(workspaceYaml, TOKEN_SOURCE),
      resolved: `${meta.designTokens.ref}@${meta.designTokens.commit.slice(0, 12)}`,
      feeds: "token-ir",
    },
    [ICON_SOURCE]: {
      range: catalogRange(workspaceYaml, ICON_SOURCE),
      resolved: meta.uiIcons.resolved,
      feeds: "icons",
    },
  };
  for (const pkg of REACT_PACKAGES) {
    upstream[pkg] = {
      range: catalogRange(workspaceYaml, pkg),
      resolved: lockResolved(lockfile, pkg),
      feeds: "instui-react",
    };
  }

  const { packages } = await loadWorkspacePackages();
  const consumerPkgs = packages.filter(
    (p) => p.path.startsWith("renderers/") || p.path.startsWith("platforms/"),
  );
  const consumers: ConsumerEntry[] = [];
  for (const pkg of consumerPkgs) {
    const deps = await instuiDeps(pkg.path);
    const usesReact = deps.some((d) => REACT_PACKAGES.includes(d));
    consumers.push({
      package: pkg.name,
      path: pkg.path,
      governedBy: usesReact ? "instui-react" : "token-ir",
    });
  }
  consumers.sort((a, b) => a.path.localeCompare(b.path));

  const deprecations: DeprecationRow[] = ledger.entries
    .map((entry) => ({
      token: entry.token,
      deprecatedIn: entry.deprecatedIn,
      removeIn: entry.removeIn,
      ...(entry.replacement ? { replacement: entry.replacement } : {}),
      ...(entry.note ? { note: entry.note } : {}),
    }))
    .sort((a, b) => a.token.localeCompare(b.token));

  return { upstream, consumers, deprecations };
}

/** Render the manifest as a human support-matrix Markdown page. */
export function renderMarkdown(compat: Compatibility): string {
  const upstreamRows = Object.entries(compat.upstream)
    .map(([name, e]) => `| \`${name}\` | ${e.feeds} | \`${e.range}\` | \`${e.resolved}\` |`)
    .join("\n");
  const consumerRows = compat.consumers
    .map((c) => `| \`${c.package}\` | \`${c.path}\` | ${c.governedBy} |`)
    .join("\n");

  const deprecationSection =
    compat.deprecations.length === 0
      ? "_No active token deprecations._"
      : `| Token | Deprecated in | Removed in | Replacement |
| --- | --- | --- | --- |
${compat.deprecations
  .map(
    (d) =>
      `| \`${d.token}\` | \`${d.deprecatedIn}\` | \`${d.removeIn}\` | ${d.replacement ? `\`${d.replacement}\`` : "_frozen value_"} |`,
  )
  .join("\n")}`;

  return `# Compatibility

<!-- Generated by \`vp run sync:compatibility\`. Do not edit by hand; run the writer and commit. -->

This page records the Instructure UI sources this pantoken build resolves from, and which consumers
are validated against it. Regenerate it with \`vp run sync:compatibility\`; the \`gate:compatibility\`
check fails if it drifts.

## Upstream sources

pantoken consumes Instructure UI two ways: the design tokens and icons feed the resolved token IR that
every package consumes, while the \`@instructure/ui-*\` React packages are used only by
\`@pantoken/react-markdown\`.

| Package | Feeds | Range | Resolved |
| --- | --- | --- | --- |
${upstreamRows}

## Consumers

| Package | Path | Governed by |
| --- | --- | --- |
${consumerRows}

## Deprecations

Tokens upstream dropped that pantoken still ships as a compatibility shim. Each is kept working until
its \`Removed in\` upstream minor is adopted, at which point the shim is retired and a consumer minor
is cut. A shim either forwards to a \`Replacement\` token or freezes its last-known value.

${deprecationSection}
`;
}
