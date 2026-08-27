/**
 * Commander-based CLI for @pantoken/ai.
 *
 * Provides `init` (write agent assets) and `scaffold` (scaffold + install assets) subcommands.
 * Reuses locale detection and scaffold logic from `@pantoken/scaffold/cli`.
 *
 * @module
 * @alpha
 */

import { Argument, Command, Option, CommanderError } from "commander";
import tab from "@bomb.sh/tab/commander";

import {
  detectLocale,
  createLocaleLookup,
  validateScaffoldPlatform,
  resolveScaffoldTarget,
  scaffoldWithSpinner,
  printNextSteps,
  SCAFFOLD_PLATFORMS,
  LOCALES as SCAFFOLD_LOCALES,
} from "@pantoken/scaffold/cli";

import { installAgentAssets, AGENT_TOOLS } from "./index.ts";
import { LOCALES } from "../generated/locales/index.ts";

export { installAgentAssets, type AgentTool } from "./index.ts";
export { detectLocale, createLocaleLookup, type LocaleLookup } from "@pantoken/scaffold/cli";
export { LOCALES } from "../generated/locales/index.ts";

export interface AiCommandOptions {
  name?: string; // program name shown in help/usage; default "pantoken-ai"
  version?: string; // no default — callers pass their own package.json version
}

/**
 * Builds the full, ready-to-parse commander Command for pantoken-ai.
 *
 * @param options - Configuration for the command
 * @returns A configured commander Command
 */
export function createAiCommand(options?: AiCommandOptions): Command {
  const programName = options?.name ?? "pantoken-ai";

  const program = new Command(programName)
    .exitOverride() // throw CommanderError instead of calling process.exit
    .configureOutput({
      writeOut: (s) => process.stdout.write(s),
      writeErr: (s) => process.stderr.write(s),
    })
    .option("-l, --lang <tag>", 'Override the auto-detected display language (e.g. "hu")');

  if (options?.version) {
    program.version(options.version, "-v, --version");
  }

  // `init` subcommand
  program
    .command("init")
    .description("Write pantoken's agent assets into a repo")
    .addOption(
      new Option("-t, --tool <tool>", "Agent tool to install")
        .choices(["all", ...AGENT_TOOLS])
        .default("all"),
    )
    .option("-d, --dir <path>", "Target directory", ".")
    .action((opts) => {
      const rootOpts = program.opts();
      const locale = detectLocale({ langFlag: rootOpts.lang });
      const { t } = createLocaleLookup(LOCALES, locale);

      try {
        const written = installAgentAssets(opts.tool, opts.dir);
        for (const p of written) {
          console.log(t("wroteFile", { path: p }));
        }
      } catch (err) {
        console.error("Error installing agent assets:", err instanceof Error ? err.message : err);
        process.exit(1);
      }
    });

  // `scaffold` subcommand
  program
    .command("scaffold")
    .addArgument(
      new Argument(
        "[platform]",
        `Platform to scaffold (${SCAFFOLD_PLATFORMS.join("|")}; "html" is an alias for "components")`,
      ).argParser(validateScaffoldPlatform),
    )
    .description(
      "Scaffold a starter project (via @pantoken/scaffold) and install agent assets into it",
    )
    .addOption(
      new Option("-t, --tool <tool>", "Agent tool to install")
        .choices(["all", ...AGENT_TOOLS])
        .default("all"),
    )
    .option("-d, --dir <path>", "Target directory (prompts interactively on a TTY if omitted)")
    .option("-y, --yes", "Never prompt", false)
    .action(async (platformArg, opts) => {
      const rootOpts = program.opts();
      const locale = detectLocale({ langFlag: rootOpts.lang });
      const { t: aiT } = createLocaleLookup(LOCALES, locale); // ai/pantoken-ai's own bundle
      const { t: scaffoldT } = createLocaleLookup(SCAFFOLD_LOCALES, locale); // @pantoken/scaffold's bundle

      // Resolve platform and directory using scaffold's logic
      const { platform, dir } = await resolveScaffoldTarget({
        platformArg,
        dirOption: opts.dir,
        yes: opts.yes,
        t: scaffoldT,
      });

      // Scaffold the project
      const scaffoldFiles = await scaffoldWithSpinner(platform, dir, scaffoldT);

      // Install agent assets
      const assetFiles = installAgentAssets(opts.tool, dir);

      // Print all written files
      for (const p of [...scaffoldFiles, ...assetFiles]) {
        console.log(aiT("wroteFile", { path: p }));
      }

      // Print next steps (using scaffold's shared formatting, but with ai's locale lookup)
      printNextSteps(dir, scaffoldFiles, scaffoldT);
    });

  // Enable completions
  tab(program, { completionCommandName: "completion" });

  return program;
}

/**
 * Entry point for ai/pantoken-ai's bin: builds the command and parses argv against it.
 *
 * @param argv - Command-line arguments (typically process.argv.slice(2))
 * @param options - Configuration for the CLI
 * @throws Exits via process.exit on error or successful completion
 */
export async function runAiCli(argv: string[], options?: AiCommandOptions): Promise<void> {
  const program = createAiCommand(options);

  try {
    await program.parseAsync(argv, { from: "user" });
  } catch (err) {
    if (err instanceof CommanderError) {
      // Help/version displays, or normal commander errors
      if (err.code === "commander.helpDisplayed" || err.code === "commander.version") {
        return;
      }
      process.exit(err.exitCode);
    }

    console.error("Error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
