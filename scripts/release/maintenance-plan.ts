import { createHash } from "node:crypto";
import { parseDocument } from "yaml";
import type { WorkspacePackage } from "./workspace-packages.ts";

/** A Renovate-proposed dependency change, captured before branch preparation. */
export interface MaintenanceUpgrade {
  depName: string;
  packageFile: string;
  manager: string;
  currentValue?: string;
  newValue: string;
  newDigest?: string;
}

/** A candidate or infrastructure failure that remains outside the passing branch. */
export interface MaintenanceFailure {
  id: string;
  package: string;
  version: string;
  error: string;
  upgrades: MaintenanceUpgrade[];
}

/** Package release levels generated from verified output and support changes. */
export type MaintenanceBumps = Record<string, "patch" | "minor" | "major">;

/** Reject untrusted proposal paths before reading or writing any candidate files. */
export function safeMaintenancePath(file: string): string {
  if (
    !file ||
    file.startsWith("/") ||
    file.includes("\\") ||
    file.split("/").some((part) => !part || part === "." || part === "..") ||
    !/^[\w./@-]+$/u.test(file)
  ) {
    throw new Error(`Unsafe maintenance path: ${file}`);
  }
  return file;
}

/** Normalize Renovate's JSON metadata without interpolating dependency data into a shell. */
export function parseMaintenanceUpgrades(input: unknown): MaintenanceUpgrade[] {
  if (!Array.isArray(input)) throw new Error("Renovate proposal must be an array");
  return input.map((raw: unknown) => {
    if (!raw || typeof raw !== "object") throw new Error("Invalid Renovate proposal");
    const record = raw as Record<string, unknown>;
    for (const key of ["depName", "packageFile", "manager", "newValue"]) {
      if (typeof record[key] !== "string" || !(record[key] as string).length)
        throw new Error(`Missing proposal ${key}`);
    }
    for (const key of ["currentValue", "newDigest"]) {
      if (record[key] !== undefined && typeof record[key] !== "string")
        throw new Error(`Invalid proposal ${key}`);
    }
    return {
      depName: record.depName as string,
      packageFile: safeMaintenancePath(record.packageFile as string),
      manager: record.manager as string,
      newValue: record.newValue as string,
      ...(record.currentValue === undefined ? {} : { currentValue: record.currentValue as string }),
      ...(record.newDigest === undefined ? {} : { newDigest: record.newDigest as string }),
    };
  });
}

/** Stable identifiers for retries and issue reconciliation. */
export function maintenanceId(packageName: string, version: string): string {
  return createHash("sha256").update(`${packageName}\n${version}`).digest("hex").slice(0, 20);
}

/** Keep dependency families and non-npm edits to the same file atomic during partitioning. */
export function groupMaintenanceUpgrades(
  upgrades: readonly MaintenanceUpgrade[],
): MaintenanceUpgrade[][] {
  const groups = new Map<string, MaintenanceUpgrade[]>();
  for (const upgrade of upgrades) {
    const family = upgrade.depName.startsWith("@instructure/")
      ? "instructure"
      : /^(?:react(?:-dom)?|@types\/react(?:-dom)?)$/u.test(upgrade.depName)
        ? "react"
        : /^(?:vite|vite-plus|vitest|@vitest\/|@voidzero-dev\/)/u.test(upgrade.depName)
          ? "vite"
          : upgrade.manager !== "npm"
            ? upgrade.packageFile
            : upgrade.depName;
    const group = groups.get(family) ?? [];
    group.push(upgrade);
    groups.set(family, group);
  }
  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, group]) => group);
}

function replacementValue(current: unknown, upgrade: MaintenanceUpgrade): string | undefined {
  if (typeof current !== "string" || current === "catalog:" || current.startsWith("workspace:"))
    return undefined;
  if (upgrade.currentValue !== undefined && current !== upgrade.currentValue) {
    if (!current.startsWith("github:") || !current.endsWith(`#${upgrade.currentValue}`))
      return undefined;
  }
  if (current.startsWith("github:") && !upgrade.newValue.startsWith("github:")) {
    return `${current.slice(0, current.lastIndexOf("#") + 1)}${upgrade.newValue}`;
  }
  return upgrade.newValue;
}

/** Apply one npm/catalog update with structured parsers, preserving unrelated dependency entries. */
export function editMaintenanceDependency(source: string, upgrade: MaintenanceUpgrade): string {
  let changed = false;
  if (upgrade.packageFile.endsWith("pnpm-workspace.yaml")) {
    const document = parseDocument(source);
    if (document.errors.length) throw new Error("Invalid workspace YAML");
    const data = document.toJS() as {
      catalog?: Record<string, unknown>;
      catalogs?: Record<string, Record<string, unknown>>;
    };
    const catalogs: Array<[string[], Record<string, unknown>]> = [
      [["catalog"], data.catalog ?? {}],
      ...Object.entries(data.catalogs ?? {}).map(
        ([name, values]): [string[], Record<string, unknown>] => [["catalogs", name], values],
      ),
    ];
    for (const [prefix, values] of catalogs) {
      const value = replacementValue(values[upgrade.depName], upgrade);
      if (value !== undefined) {
        document.setIn([...prefix, upgrade.depName], value);
        changed = true;
      }
    }
    if (!changed) throw new Error(`Catalog proposal does not match ${upgrade.depName}`);
    return document.toString();
  }
  if (!upgrade.packageFile.endsWith("package.json"))
    throw new Error(`Unsupported npm proposal file: ${upgrade.packageFile}`);
  const manifest = JSON.parse(source) as Record<string, Record<string, unknown>>;
  for (const field of [
    "dependencies",
    "optionalDependencies",
    "peerDependencies",
    "devDependencies",
    "overrides",
    "resolutions",
  ]) {
    const values = manifest[field];
    if (!values) continue;
    const value = replacementValue(values[upgrade.depName], upgrade);
    if (value !== undefined) {
      values[upgrade.depName] = value;
      changed = true;
    }
  }
  if (!changed) throw new Error(`Manifest proposal does not match ${upgrade.depName}`);
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

/** Upgrade a package's planned bump, never lowering an already required release level. */
export function requireMaintenanceBump(
  bumps: MaintenanceBumps,
  packageName: string,
  level: "patch" | "minor" | "major",
): void {
  const order = { patch: 0, minor: 1, major: 2 };
  if (!bumps[packageName] || order[level] > order[bumps[packageName]]) bumps[packageName] = level;
}

/** Breaking changes during 0.x follow the repository's pre-stable minor convention. */
export function breakingMaintenanceBump(pkg: Pick<WorkspacePackage, "version">): "minor" | "major" {
  return pkg.version.startsWith("0.") ? "minor" : "major";
}

/** Render deterministic Changesets only for actual package release effects. */
export function renderMaintenanceChangeset(
  bumps: MaintenanceBumps,
  notes: readonly string[],
): string {
  const releases = Object.entries(bumps).sort(([left], [right]) => left.localeCompare(right));
  if (!releases.length) return "";
  return `---\n${releases.map(([name, level]) => `${JSON.stringify(name)}: ${level}`).join("\n")}\n---\n\n${[...new Set(notes)].sort().join("\n\n")}\n`;
}
