/**
 * Commander-based CLI for \@pantoken/scaffold.
 *
 * Exports granular, independently reusable pieces for composition by other CLIs (notably
 * `@pantoken/ai`), not one opaque function.
 *
 * @module
 * @alpha
 */

import { cancel, isCancel, select, spinner, text } from "@clack/prompts";
import { Argument, Command, InvalidArgumentError, CommanderError } from "commander";
import tab from "@bomb.sh/tab/commander";
import { homedir } from "node:os";
import { join, basename } from "node:path";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

export { SCAFFOLD_PLATFORMS, isScaffoldPlatform, resolveScaffoldPlatform } from "./index.ts";
export {
  detectLocale,
  createLocaleLookup,
  validateLocaleTag,
  SUPPORTED_LOCALES,
  type LocaleLookup,
} from "./locale.ts";
export { scaffoldProject } from "./index.ts";
export { MESSAGES } from "../generated/locales/index.ts";

import {
  SCAFFOLD_PLATFORMS,
  isScaffoldPlatform as checkScaffoldPlatform,
  resolveScaffoldPlatform,
} from "./index.ts";
import { scaffoldProject } from "./index.ts";
import {
  detectLocale,
  createLocaleLookup,
  validateLocaleTag,
  type LocaleLookup,
} from "./locale.ts";
import { MESSAGES } from "../generated/locales/index.ts";
import { SCAFFOLD_METADATA } from "../generated/scaffold-metadata.ts";
import { CDN_PROVIDERS } from "@pantoken/canvas-theme-editor";
import {
  validateThemeMode,
  validateThemeVariant,
  type ThemeMode,
  type ThemeVariant,
} from "./theme.ts";

/**
 * Thrown for user-facing CLI errors (e.g., missing platform under --yes);
 * carries an exit code for process.exit or CommanderError handling.
 */
export class ScaffoldCliError extends Error {
  constructor(
    message: string,
    public readonly exitCode = 1,
  ) {
    super(message);
    this.name = "ScaffoldCliError";
  }
}

/**
 * Whether a value should be interactively prompted for:
 * no value given, not --yes, and (optionally injected) TTY check passes.
 *
 * @param value - The provided value (or undefined)
 * @param opts - Options: `yes` flag forces non-interactive, `isTTY` injectable for testing
 * @returns True if interactive prompt should proceed
 */
export function shouldPrompt(
  value: string | undefined,
  opts: { yes?: boolean; isTTY?: boolean },
): boolean {
  if (value) return false; // Already provided
  if (opts.yes) return false; // --yes forces non-interactive
  // Check TTY status; default to process.stdin.isTTY
  const isTTY = opts.isTTY ?? process.stdin?.isTTY ?? false;
  return isTTY;
}

/**
 * Expands a tilde (`~`) in a file path to the user's home directory.
 * On interactive prompts, shells don't expand `~`, so this handles it explicitly.
 * Uses `node:path.join()` for cross-platform robustness (Windows, macOS, Linux).
 *
 * @param dir - The directory path (may start with `~`)
 * @returns The expanded path
 */
export function expandHome(dir: string): string {
  if (!dir.startsWith("~")) {
    return dir;
  }
  // `~` or `~/something` → `/home/user` or `/home/user/something`
  const home = homedir();
  return dir === "~" ? home : join(home, dir.slice(2));
}

/** Options for {@link resolveScaffoldTarget}. */
export interface ResolveScaffoldTargetOptions {
  platformArg?: string;
  dirOption?: string;
  yes?: boolean;
  isTTY?: boolean; // injectable for tests; defaults to process.stdin.isTTY
  t: LocaleLookup["t"];
}

/**
 * Human-readable labels for the interactive platform picker — canonical `SCAFFOLD_PLATFORMS` keys
 * are lowercase/hyphenated for CLI-arg use, not meant for display as-is.
 */
const PLATFORM_DISPLAY_LABELS: Record<string, string> = {
  components: "HTML",
  "web-components": "Web components",
  react: "React",
  vue: "Vue",
  angular: "Angular",
  svelte: "Svelte",
  "canvas-theme-editor": "Canvas theme editor",
};

/** Display label for a platform key, falling back to the raw key if unmapped. */
function platformDisplayLabel(platform: string): string {
  return PLATFORM_DISPLAY_LABELS[platform] ?? platform;
}

/**
 * Resolves the platform: uses `platformArg` when given, otherwise prompts via clack `select()`
 * on a TTY (not --yes), otherwise throws a localized `ScaffoldCliError`.
 *
 * @throws ScaffoldCliError when missing non-interactively, cancelled, or invalid
 */
async function resolvePlatform(
  platformArg: string | undefined,
  opts: { yes?: boolean; isTTY: boolean; t: LocaleLookup["t"] },
): Promise<string> {
  const { yes, isTTY, t } = opts;
  let platform = platformArg ?? "";

  if (!platform) {
    if (!shouldPrompt(platform, { yes, isTTY })) {
      throw new ScaffoldCliError(
        t("errorMissingPlatform", { platforms: SCAFFOLD_PLATFORMS.join(", ") }),
      );
    }

    const result = await select({
      message: t("promptPlatform"),
      options: [...SCAFFOLD_PLATFORMS]
        .map((p) => ({ value: p, label: platformDisplayLabel(p) }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    });

    if (isCancel(result)) {
      cancel(t("cancelled"));
      throw new ScaffoldCliError(t("cancelled"), 1);
    }

    platform = result as string;
  }

  if (!checkScaffoldPlatform(platform)) {
    throw new ScaffoldCliError(
      t("errorMissingPlatform", { platforms: SCAFFOLD_PLATFORMS.join(", ") }),
    );
  }

  return platform;
}

/**
 * Resolves the target directory: uses `dirOption` when given, otherwise prompts via clack
 * `text()` on a TTY (not --yes), otherwise defaults to `"."`.
 *
 * @throws ScaffoldCliError when the prompt is cancelled
 */
async function resolveDir(
  dirOption: string | undefined,
  opts: { yes?: boolean; isTTY: boolean; t: LocaleLookup["t"] },
): Promise<string> {
  const { yes, isTTY, t } = opts;
  const dir = dirOption ?? "";
  if (dir) return dir;

  if (!shouldPrompt(dir, { yes, isTTY })) {
    return "."; // Non-interactive default
  }

  const result = await text({
    message: t("promptDir"),
    placeholder: ".",
    defaultValue: ".",
  });

  if (isCancel(result)) {
    cancel(t("cancelled"));
    throw new ScaffoldCliError(t("cancelled"), 1);
  }

  return (result as string) || ".";
}

/**
 * Resolves platform + directory: prompts via clack select()/text() when omitted on a TTY
 * (not --yes); throws ScaffoldCliError with a clear, localized message when a required
 * value is missing non-interactively.
 *
 * All prompt copy (message/placeholder/option labels) is looked up via `t`.
 *
 * @param options - Resolution options
 * @returns Promise resolving to \{ platform, dir \}
 * @throws ScaffoldCliError when required values are missing non-interactively
 */
export async function resolveScaffoldTarget(
  options: ResolveScaffoldTargetOptions,
): Promise<{ platform: string; dir: string }> {
  const { platformArg, dirOption, yes, t } = options;
  const isTTY = options.isTTY ?? process.stdin?.isTTY ?? false;

  const platform = await resolvePlatform(platformArg, { yes, isTTY, t });
  const dir = await resolveDir(dirOption, { yes, isTTY, t });

  return { platform, dir };
}

/**
 * Runs scaffoldProject() wrapped in a clack spinner() whose start/stop text comes from `t`.
 *
 * @param platform - The scaffold platform
 * @param dir - The target directory
 * @param t - Localized string lookup
 * @param options - `theme`/`mode`/`cdn`/`locale` forwarded to {@link scaffoldProject}
 * @returns The paths written by scaffoldProject
 */
export async function scaffoldWithSpinner(
  platform: string,
  dir: string,
  t: LocaleLookup["t"],
  options?: { theme?: ThemeVariant; mode?: ThemeMode; cdn?: string; locale?: string },
): Promise<string[]> {
  const s = spinner();
  s.start(t("spinnerStart"));

  try {
    const written = await scaffoldProject(platform, dir, options);
    s.stop(t("spinnerStop"));
    return written;
  } catch (err) {
    s.stop(`Error: ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}

/** Package managers `detectPackageManager` can identify. */
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun" | "deno" | "vp";

/**
 * Detects the invoking package manager: first from `npm_config_user_agent` (the technique
 * create-vite and create-vue use), then — since `vp`/`vpx` set no such env var — falling back to
 * whether the running Node binary itself is Vite+-managed (`execPath` resolves under a
 * `vite-plus` directory).
 *
 * @param env - Environment variables (defaults to process.env)
 * @param execPath - The running Node binary's path (defaults to process.execPath)
 * @returns Detected package manager, or undefined
 */
export function detectPackageManager(
  env?: NodeJS.ProcessEnv,
  execPath?: string,
): PackageManager | undefined {
  const userAgent = (env ?? process.env).npm_config_user_agent ?? "";
  if (userAgent.includes("pnpm")) return "pnpm";
  if (userAgent.includes("yarn")) return "yarn";
  if (userAgent.includes("bun")) return "bun";
  if (userAgent.includes("deno")) return "deno";
  if (userAgent.includes("npm")) return "npm";
  if ((execPath ?? process.execPath).includes("vite-plus")) return "vp";
  return undefined;
}

/** Fully-composed command fragments per package manager, so callers never hand-compose them. */
const PM_COMMANDS: Record<PackageManager, { install: string; run: string; execute: string }> = {
  npm: { install: "npm install", run: "npm run", execute: "npx" },
  pnpm: { install: "pnpm install", run: "pnpm run", execute: "pnpm dlx" },
  yarn: { install: "yarn install", run: "yarn run", execute: "yarn dlx" },
  bun: { install: "bun install", run: "bun run", execute: "bunx" },
  deno: { install: "deno install", run: "deno task", execute: "deno run -A npm:" },
  vp: { install: "vp install", run: "vp run", execute: "vpx" },
};

function pmCommands(pm: PackageManager | undefined): {
  install: string;
  run: string;
  execute: string;
} {
  return PM_COMMANDS[pm ?? "npm"];
}

/** Per-package-manager invocation for `create-pantoken-app`'s own usage/help text. */
const CREATE_USAGE_COMMANDS: Record<PackageManager, string> = {
  npm: "npm create pantoken-app --",
  pnpm: "pnpm create pantoken-app --",
  yarn: "yarn create pantoken-app --",
  bun: "bunx create-pantoken-app --",
  deno: "deno run -A npm:create-pantoken-app --",
  vp: "vpx create-pantoken-app --",
};

/**
 * The invocation string `create-pantoken-app`'s bin shim shows in `--help`/usage, matching
 * whichever package manager actually invoked it (falls back to the npm form when undetected).
 *
 * @param pm - The detected package manager (defaults to `detectPackageManager()`'s result)
 */
export function buildCreateUsageCommand(pm?: PackageManager): string {
  return CREATE_USAGE_COMMANDS[pm ?? detectPackageManager() ?? "npm"];
}

/**
 * Runs the detected package manager's install command in `dir`, wrapped in a clack spinner.
 * Failures are reported but non-fatal — the project is still usable, just not installed — so the
 * caller decides how `printNextSteps` should reflect the outcome via the returned boolean.
 *
 * @param dir - The scaffold directory to install into
 * @param pm - The detected package manager (defaults to npm's command when undefined)
 * @param t - Localized string lookup
 * @returns Whether the install command exited successfully
 */
export function installWithSpinner(
  dir: string,
  pm: PackageManager | undefined,
  t: LocaleLookup["t"],
): boolean {
  const npmExecPath = pm === "npm" ? process.env.npm_execpath : undefined;
  const [command, ...args] = npmExecPath
    ? [process.execPath, npmExecPath, "install"]
    : pmCommands(pm).install.split(" ");
  const s = spinner();
  s.start(t("installSpinnerStart"));

  try {
    execFileSync(command!, args, { cwd: dir, stdio: "ignore" });
    s.stop(t("installSpinnerStop"));
    return true;
  } catch (err) {
    s.stop(`${t("installSpinnerFailed")} ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

/**
 * Finds the scaffolded `package.json` among `written` and returns its preferred run script name
 * (`dev`, else `preview`), or `undefined` if no such file/script exists (or can't be read).
 */
function detectRunScript(written: string[]): string | undefined {
  const pkgPath = written.find((p) => basename(p) === "package.json");
  if (!pkgPath) return undefined;

  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { scripts?: Record<string, string> };
    if (pkg.scripts?.dev) return "dev";
    if (pkg.scripts?.preview) return "preview";
    return undefined;
  } catch {
    return undefined;
  }
}

/** Substitutes `{{var}}` placeholders in `text` from `vars`, leaving unknown placeholders as-is. */
function substituteVars(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, name: string) => vars[name] ?? match);
}

/** The one remaining manual step after an automatic install: `cd <dir> && <dev>`, or just `<dev>` when `dir` is `.`. */
function buildDevStep(dir: string, dev: string): string {
  return dir === "." ? dev : `cd ${dir} && ${dev}`;
}

/**
 * Prints the post-scaffold "Next steps" block (plus any template-authored notes/caveats).
 *
 * When `installed` is true (dependencies were already installed automatically), the block collapses
 * to the single remaining manual action — starting the dev server, prefixed with `cd <dir>` when
 * needed — regardless of platform. Otherwise, when `platform` has a `scaffold.json`-derived entry in
 * `SCAFFOLD_METADATA`, next steps/notes/caveats are rendered from its (localized, `{{var}}`-
 * substituted) authored strings; failing that, a generic cd/install/run-script fallback is used,
 * with the run script itself detected from the scaffolded `package.json` (`dev`, else `preview`)
 * or defaulted to `dev` for scaffolded app templates.
 *
 * @param dir - The scaffold directory
 * @param written - The paths written by scaffoldProject
 * @param t - Localized string lookup
 * @param platform - The resolved (alias-free) scaffold platform, used to look up `scaffold.json` metadata
 * @param installed - Whether dependencies were already installed automatically
 */
export function printNextSteps(
  dir: string,
  written: string[],
  t: LocaleLookup["t"],
  platform?: string,
  installed?: boolean,
): void {
  const pm = detectPackageManager();
  const { install, run } = pmCommands(pm);
  const script = detectRunScript(written);
  const dev = `${run} ${script ?? "dev"}`;
  const vars: Record<string, string> = {
    dir,
    pm: pm ?? "npm",
    install,
    run,
    execute: pmCommands(pm).execute,
    dev,
  };

  const meta = platform ? SCAFFOLD_METADATA[platform] : undefined;
  const steps = installed
    ? [buildDevStep(dir, dev)]
    : meta?.nextStepsKeys.length
      ? meta.nextStepsKeys.map((key) => substituteVars(t(key), vars))
      : [t("nextStepsNav", { dir }), t("nextStepsInstall", { command: install }), dev];

  console.log();
  console.log(installed ? t("getStartedHeading") : t("nextStepsHeading"));
  steps.forEach((step, i) => console.log(`${i + 1}. ${step}`));

  if (meta?.notesKey)
    console.log(`\n${t("notesHeading")} ${substituteVars(t(meta.notesKey), vars)}`);
  if (meta?.caveatsKey)
    console.log(`${t("caveatsHeading")} ${substituteVars(t(meta.caveatsKey), vars)}`);
}

/**
 * Shared commander Argument validator for the platform positional.
 * Used by all three CLIs (scaffold, create-pantoken-app, pantoken-ai scaffold)
 * so error wording has one source of truth.
 *
 * @param value - The provided platform argument
 * @returns The validated platform value
 * @throws InvalidArgumentError if the platform is not valid
 */
export function validateScaffoldPlatform(value: string): string {
  if (checkScaffoldPlatform(value)) return value;
  throw new InvalidArgumentError(
    `Platform "${value}" is not valid. Expected one of: ${SCAFFOLD_PLATFORMS.join(", ")}.`,
  );
}

/**
 * Commander Argument validator for `--cdn`.
 *
 * @throws InvalidArgumentError if the value isn't a known CDN provider id
 */
export function validateCdnProviderId(value: string): string {
  if (value in CDN_PROVIDERS) return value;
  throw new InvalidArgumentError(
    `CDN provider "${value}" is not valid. Expected one of: ${Object.keys(CDN_PROVIDERS).join(", ")}.`,
  );
}

/** Options for {@link createScaffoldCommand}. */
export interface ScaffoldCommandOptions {
  name?: string; // program name shown in help/usage; default "pantoken-scaffold"
  usageCommand?: string; // exact invocation string for help examples; defaults to `name`
  version?: string; // no default — callers pass their own package.json version
  enableCompletions?: boolean; // default true
}

/**
 * Builds the full, ready-to-parse commander Command for pantoken-scaffold/create-pantoken-app.
 *
 * @param options - Configuration for the command
 * @returns A configured commander Command
 */
export function createScaffoldCommand(options?: ScaffoldCommandOptions): Command {
  const programName = options?.name ?? "pantoken-scaffold";

  const program = new Command(programName)
    .exitOverride() // throw CommanderError instead of calling process.exit
    .configureOutput({
      writeOut: (s: string) => process.stdout.write(s),
      writeErr: (s: string) => process.stderr.write(s),
    })
    .addArgument(
      new Argument(
        "[platform]",
        `Platform to scaffold (${SCAFFOLD_PLATFORMS.join("|")}; "html" is an alias for "components")`,
      ).argParser(validateScaffoldPlatform),
    )
    .option("-d, --dir <path>", "Target directory (prompts interactively on a TTY if omitted)")
    .option(
      "-y, --yes",
      "Never prompt; error instead of prompting for a missing platform/directory",
      false,
    )
    .option(
      "-l, --lang <tag>",
      'Language for the CLI and the scaffolded project (e.g. "hu"); auto-detected by default',
      validateLocaleTag,
    )
    .option(
      "--theme <name>",
      "Token theme: rebrand (default), canvas, canvasHighContrast",
      validateThemeVariant,
    )
    .option(
      "--theme-mode <mode>",
      "Rebrand token mode: light (default) or adaptive; ignored outside the rebrand theme",
      validateThemeMode,
    )
    .option(
      "--cdn <provider>",
      "CDN provider for canvas-theme-editor's theme.css/theme.js: jsdelivr (default), unpkg, esmsh",
      validateCdnProviderId,
    )
    .option("--no-install", "Skip automatically installing dependencies after scaffolding");

  if (options?.version) {
    program.version(options.version, "-v, --version");
  }

  program.action(async (platformArg: string | undefined, opts: Record<string, unknown>) => {
    const locale = detectLocale({ langFlag: opts.lang as string | undefined });
    const { t } = createLocaleLookup(MESSAGES, locale);

    try {
      const { platform, dir } = await resolveScaffoldTarget({
        platformArg,
        dirOption: opts.dir as string | undefined,
        yes: opts.yes as boolean | undefined,
        t,
      });
      const expandedDir = expandHome(dir);
      const written = await scaffoldWithSpinner(platform, expandedDir, t, {
        theme: opts.theme as ThemeVariant | undefined,
        mode: opts.themeMode as ThemeMode | undefined,
        cdn: opts.cdn as string | undefined,
        locale,
      });
      for (const path of written) {
        console.log(t("wroteFile", { path }));
      }
      const installed =
        (opts.install as boolean | undefined) !== false &&
        installWithSpinner(expandedDir, detectPackageManager(), t);
      // Once dependencies are installed, cwd into the scaffolded dir so the single remaining
      // printed next step can be just the dev command. If install failed or was skipped, keep the
      // original target path visible in the full recovery steps.
      let printDir = expandedDir;
      if (installed && expandedDir !== ".") {
        try {
          process.chdir(expandedDir);
          printDir = ".";
        } catch {
          // Leave printDir as expandedDir; next-steps falls back to an explicit cd.
        }
      }
      printNextSteps(printDir, written, t, resolveScaffoldPlatform(platform), installed);
    } catch (err) {
      if (err instanceof ScaffoldCliError) {
        throw err; // Let runScaffoldCli handle it
      }
      throw err;
    }
  });

  if (options?.enableCompletions ?? true) {
    tab(program, { completionCommandName: "completion" });
  }

  return program;
}

/**
 * Entry point both bin shims call: builds the command and parses argv against it.
 *
 * @param argv - Command-line arguments (typically process.argv.slice(2))
 * @param options - Configuration for the CLI
 * @throws Exits via process.exit on error or successful completion
 */
export async function runScaffoldCli(
  argv: string[],
  options: { usageCommand: string; version?: string },
): Promise<void> {
  const program = createScaffoldCommand({
    name: options.usageCommand,
    usageCommand: options.usageCommand,
    version: options.version,
  });

  try {
    await program.parseAsync(argv, { from: "user" });
  } catch (err) {
    if (err instanceof CommanderError) {
      // Help/version displays, or normal commander errors
      if (
        (err as CommanderError).code === "commander.helpDisplayed" ||
        (err as CommanderError).code === "commander.version"
      ) {
        return;
      }
      process.exit((err as CommanderError).exitCode);
    }

    if (err instanceof ScaffoldCliError) {
      console.error((err as ScaffoldCliError).message);
      process.exit((err as ScaffoldCliError).exitCode);
    }

    console.error("Error scaffolding project:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
