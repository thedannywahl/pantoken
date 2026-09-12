import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

type Provider = "claude" | "agy" | "copilot";

interface Finding {
  surface: string;
  locale: string;
  file: string;
  detail: string;
  line?: number;
}

const repoRoot = join(import.meta.dirname, "..");
const i18nDir = join(repoRoot, ".i18n");
const i18nCli = join(repoRoot, "tools/i18n-engine/bin/i18n.mjs");
const docsDriftCheck = join(repoRoot, "docs/scripts/check-locale-drift.ts");
const allSpaces = [
  "ui.strings",
  "cli.scaffold",
  "scaffold.readme",
  "cli.ai",
  "docs.guides",
  "docs.api",
  "docs.home",
  "docs.chrome",
  "docs.demos",
] as const;
const messageSpaces = new Set(["ui.strings", "cli.scaffold", "cli.ai"]);
const docsSpaces = new Set(["docs.guides", "docs.api", "docs.home", "docs.chrome", "docs.demos"]);
const contentSpaces = new Set(["scaffold.readme"]);

const providerOf = (argv: readonly string[]): Provider => {
  const index = argv.indexOf("--provider");
  const value = index >= 0 ? argv[index + 1] : undefined;
  if (value === "claude" || value === "agy" || value === "copilot") return value;
  if (value !== undefined) throw new Error(`Unknown provider "${value}"`);
  return "claude";
};

const surfacesOf = (argv: readonly string[]): readonly string[] => {
  const index = argv.indexOf("--surfaces");
  const value = index >= 0 ? argv[index + 1] : undefined;
  if (!value) return allSpaces;
  const surfaces = [...new Set(value.split(",").map((surface) => surface.trim()))].filter(Boolean);
  const unknown = surfaces.filter(
    (surface) => !allSpaces.includes(surface as (typeof allSpaces)[number]),
  );
  if (unknown.length > 0) throw new Error(`Unknown i18n surface(s): ${unknown.join(", ")}`);
  if (surfaces.length === 0) throw new Error("--surfaces matched no i18n surfaces");
  return surfaces;
};

const readFindings = (path: string): Finding[] => {
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(parsed)) throw new Error(`Expected an array of findings in ${path}`);
  return parsed as Finding[];
};

const run = (command: string, args: readonly string[], env: NodeJS.ProcessEnv): number => {
  const result = spawnSync(command, args, { cwd: repoRoot, env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.signal) throw new Error(`${command} terminated by ${result.signal}`);
  return result.status ?? 1;
};

const check = (args: readonly string[], env: NodeJS.ProcessEnv, artifact: string): Finding[] => {
  const status = run(process.execPath, args, env);
  if (status > 1) throw new Error(`Drift check failed with exit code ${status}`);
  if (!existsSync(artifact)) throw new Error(`Drift check did not write ${artifact}`);
  return readFindings(artifact);
};

const providerEnvironment = (provider: Provider): NodeJS.ProcessEnv => {
  const environment: NodeJS.ProcessEnv = { ...process.env, DOCS_TRANSLATION_ADAPTER: "ai" };
  delete environment.DOCS_TRANSLATION_COMMAND;
  delete environment.DOCS_TRANSLATION_COMMAND_ARGS;
  if (provider === "claude") {
    environment.DOCS_TRANSLATION_COMMAND_ARGS =
      "--model claude-haiku-4-5-20251001 --effort low --strict-mcp-config --setting-sources user";
  } else {
    environment.DOCS_TRANSLATION_COMMAND = join(
      repoRoot,
      `tools/translation-adapters/${provider}-wrapper.sh`,
    );
    environment.DOCS_TRANSLATION_COMMAND_ARGS =
      provider === "copilot" ? "--model gpt-5-mini --effort low" : "--model gemini-3.6-flash-low";
  }
  return environment;
};

const localesFor = (findings: readonly Finding[]): string[] =>
  [...new Set(findings.map((finding) => finding.locale))].sort();

const filesFor = (findings: readonly Finding[]): string[] =>
  [
    ...new Set(
      findings
        .map((finding) => finding.file.replace(/^docs\//u, ""))
        .map((file) => file.split("#")[0]),
    ),
  ].sort();

const runGenericFix = (space: string, provider: Provider, artifact: string): void => {
  const findings = check(
    [i18nCli, "--config", "i18n.config.json", "check", space, "--json", artifact],
    process.env,
    artifact,
  );
  const locales = localesFor(findings);
  if (locales.length === 0) {
    console.log(`${space}: no drift, skipping`);
    return;
  }
  console.log(`${space}: fixing ${locales.join(", ")}`);
  for (const locale of locales) {
    const status = run(
      process.execPath,
      [
        i18nCli,
        "--config",
        "i18n.config.json",
        "translate",
        space,
        "--locale",
        locale,
        "--provider",
        provider,
      ],
      process.env,
    );
    if (status !== 0) throw new Error(`${space} translation failed for ${locale}`);
  }
};

const runDocsFix = (surface: string, provider: Provider, allFindings: readonly Finding[]): void => {
  const findings = allFindings.filter((finding) => finding.surface === surface);
  const locales = localesFor(findings);
  if (locales.length === 0) {
    console.log(`${surface}: no drift, skipping`);
    return;
  }
  const environment = providerEnvironment(provider);
  if (surface === "docs.api") {
    for (const locale of locales) {
      const status = run(process.execPath, [join(repoRoot, "docs/scripts/translate-api-po.ts")], {
        ...environment,
        DOCS_TRANSLATION_LOCALE: locale,
      });
      if (status !== 0) throw new Error(`${surface} translation failed for ${locale}`);
    }
    return;
  }
  const script = {
    "docs.guides": "translate-guide-po.ts",
    "docs.home": "sync-home-locales.ts",
    "docs.chrome": "translate-chrome-po.ts",
    "docs.demos": "translate-demo-po.ts",
  }[surface];
  if (!script) throw new Error(`No docs fixer configured for ${surface}`);
  const scopedEnvironment: NodeJS.ProcessEnv = {
    ...environment,
    DOCS_TRANSLATION_LOCALE: locales.join(","),
  };
  if (surface === "docs.guides")
    scopedEnvironment.DOCS_TRANSLATION_FILE = filesFor(findings).join(",");
  const status = run(process.execPath, [join(repoRoot, "docs/scripts", script)], scopedEnvironment);
  if (status !== 0) throw new Error(`${surface} translation failed`);
};

const main = (): void => {
  const provider = providerOf(process.argv.slice(2));
  const surfaces = surfacesOf(process.argv.slice(2));
  mkdirSync(i18nDir, { recursive: true });
  const artifacts = surfaces.map((surface) =>
    join(i18nDir, `drift-fix.${process.pid}.${surface.replaceAll(".", "-")}.json`),
  );
  try {
    for (const [index, surface] of surfaces.entries()) {
      if (messageSpaces.has(surface) || contentSpaces.has(surface)) {
        runGenericFix(surface, provider, artifacts[index]);
      }
    }
    const selectedDocs = surfaces.filter((surface) => docsSpaces.has(surface));
    if (selectedDocs.length > 0) {
      const docsArtifact = artifacts[surfaces.indexOf(selectedDocs[0])];
      const docsFindings = check(
        [docsDriftCheck],
        { ...process.env, DRIFT_JSON_OUT: docsArtifact },
        docsArtifact,
      );
      for (const surface of selectedDocs) runDocsFix(surface, provider, docsFindings);
    }
  } finally {
    for (const artifact of artifacts) rmSync(artifact, { force: true });
  }
};

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
