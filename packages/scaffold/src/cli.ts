/**
 * Commander-based CLI for @pantoken/scaffold.
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

export { SCAFFOLD_PLATFORMS, isScaffoldPlatform } from "./index.ts";
export { detectLocale, createLocaleLookup, type LocaleLookup } from "./locale.ts";
export { scaffoldProject } from "./index.ts";
export { LOCALES } from "../generated/locales/index.ts";

import { SCAFFOLD_PLATFORMS, isScaffoldPlatform as checkScaffoldPlatform } from "./index.ts";
import { scaffoldProject } from "./index.ts";
import { detectLocale, createLocaleLookup, type LocaleLookup } from "./locale.ts";
import { LOCALES } from "../generated/locales/index.ts";

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

export interface ResolveScaffoldTargetOptions {
  platformArg?: string;
  dirOption?: string;
  yes?: boolean;
  isTTY?: boolean; // injectable for tests; defaults to process.stdin.isTTY
  t: LocaleLookup["t"];
}

/**
 * Resolves platform + directory: prompts via clack select()/text() when omitted on a TTY
 * (not --yes); throws ScaffoldCliError with a clear, localized message when a required
 * value is missing non-interactively.
 *
 * All prompt copy (message/placeholder/option labels) is looked up via `t`.
 *
 * @param options - Resolution options
 * @returns Promise resolving to { platform, dir }
 * @throws ScaffoldCliError when required values are missing non-interactively
 */
export async function resolveScaffoldTarget(
  options: ResolveScaffoldTargetOptions,
): Promise<{ platform: string; dir: string }> {
  const { platformArg, dirOption, yes, t } = options;
  const isTTY = options.isTTY ?? process.stdin?.isTTY ?? false;

  // Resolve platform
  let platform = platformArg ?? "";
  if (!platform) {
    if (!shouldPrompt(platform, { yes, isTTY })) {
      throw new ScaffoldCliError(
        t("errorMissingPlatform", { platforms: SCAFFOLD_PLATFORMS.join(", ") }),
      );
    }

    // Prompt for platform
    const result = await select({
      message: t("promptPlatform"),
      options: SCAFFOLD_PLATFORMS.map((p) => ({ value: p, label: p })),
    });

    if (isCancel(result)) {
      cancel(t("cancelled"));
      throw new ScaffoldCliError(t("cancelled"), 1);
    }

    platform = result as string;
  }

  // Validate the platform
  if (!checkScaffoldPlatform(platform)) {
    throw new ScaffoldCliError(
      t("errorMissingPlatform", { platforms: SCAFFOLD_PLATFORMS.join(", ") }),
    );
  }

  // Resolve directory
  let dir = dirOption ?? "";
  if (!dir) {
    if (!shouldPrompt(dir, { yes, isTTY })) {
      dir = "."; // Non-interactive default
    } else {
      // Prompt for directory
      const result = await text({
        message: t("promptDir"),
        placeholder: ".",
        defaultValue: ".",
      });

      if (isCancel(result)) {
        cancel(t("cancelled"));
        throw new ScaffoldCliError(t("cancelled"), 1);
      }

      dir = result as string;
    }
  }

  return { platform, dir: dir || "." };
}

/**
 * Runs scaffoldProject() wrapped in a clack spinner() whose start/stop text comes from `t`.
 *
 * @param platform - The scaffold platform
 * @param dir - The target directory
 * @param t - Localized string lookup
 * @returns The paths written by scaffoldProject
 */
export async function scaffoldWithSpinner(
  platform: string,
  dir: string,
  t: LocaleLookup["t"],
): Promise<string[]> {
  const s = spinner();
  s.start(t("spinnerStart"));

  try {
    const written = await scaffoldProject(platform, dir);
    s.stop(t("spinnerStop"));
    return written;
  } catch (err) {
    s.stop(`Error: ${err instanceof Error ? err.message : String(err)}`);
    throw err;
  }
}

/**
 * Detects the invoking package manager from npm_config_user_agent
 * (the technique create-vite and create-vue use).
 *
 * @param env - Environment variables (defaults to process.env)
 * @returns Detected package manager, or undefined
 */
export function detectPackageManager(
  env?: NodeJS.ProcessEnv,
): "npm" | "pnpm" | "yarn" | "bun" | undefined {
  const userAgent = (env ?? process.env).npm_config_user_agent ?? "";
  if (userAgent.includes("pnpm")) return "pnpm";
  if (userAgent.includes("yarn")) return "yarn";
  if (userAgent.includes("bun")) return "bun";
  if (userAgent.includes("npm")) return "npm";
  return undefined;
}

/**
 * Prints the post-scaffold "Next steps" block, leading with the detected package
 * manager's install command (falling back to a generic localized line when detection fails).
 *
 * All copy comes from `t`.
 *
 * @param dir - The scaffold directory
 * @param written - The paths written by scaffoldProject
 * @param t - Localized string lookup
 */
export function printNextSteps(dir: string, written: string[], t: LocaleLookup["t"]): void {
  const pm = detectPackageManager();
  const installCmd = pm ? `${pm} install` : "npm install";

  console.log();
  console.log("Next steps:");
  console.log(`1. ${t("nextStepsInstall", { command: installCmd })}`);
  console.log(`${t("nextStepsNav", { dir })}`);
  console.log(t("nextStepsDevServer"));
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
    .option("-l, --lang <tag>", 'Override the auto-detected display language (e.g. "hu")');

  if (options?.version) {
    program.version(options.version, "-v, --version");
  }

  program.action(async (platformArg: string | undefined, opts: Record<string, unknown>) => {
    const locale = detectLocale({ langFlag: opts.lang as string | undefined });
    const { t } = createLocaleLookup(LOCALES, locale);

    try {
      const { platform, dir } = await resolveScaffoldTarget({
        platformArg,
        dirOption: opts.dir as string | undefined,
        yes: opts.yes as boolean | undefined,
        t,
      });
      const written = await scaffoldWithSpinner(platform, dir, t);
      for (const path of written) {
        console.log(t("wroteFile", { path }));
      }
      printNextSteps(dir, written, t);
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
