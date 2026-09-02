/**
 * The `i18n` CLI skeleton — Phase 1 of the localization-engine plan.
 *
 * `locale promote/demote/exclude/include` are real (read-modify-write `i18n.config.json`'s
 * `locales` block). `extract`/`translate`/`render`/`check`/`lint`/`stats` parse their full selector
 * surface (space, `--locale`, `--tier`, `--provider`, `--concurrency`, `--force`, `--strict`) but are
 * not yet implemented — that's Phase 2+ (per-space extraction, the shim-backed translate pipeline,
 * and reusing `DriftReporter` for `check`).
 *
 * @module
 */
import { readFileSync, writeFileSync } from "node:fs";
import { Argument, Command, CommanderError, Option } from "commander";
import { loadConfig, parseConfig, type I18nConfig } from "./config.ts";
import { excludeLocale, includeLocale, moveLocaleToTier } from "./locales.ts";

/** Commands that select work by space/locale/tier but aren't implemented past selector parsing yet. */
const NOT_YET_IMPLEMENTED = ["extract", "translate", "render", "check", "lint", "stats"] as const;

/** `undefined` when loading failed — the caller must bail without crashing (`process.exit` is
 *  mocked to a no-op in tests, so callers can't assume it truly terminates execution). */
function loadConfigOrExit(configPath: string): { config: I18nConfig } | undefined {
  try {
    const raw: unknown = JSON.parse(readFileSync(configPath, "utf8"));
    return { config: parseConfig(raw) };
  } catch (error) {
    console.error(
      `Error: could not load ${configPath}: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exit(1);
    return undefined;
  }
}

/** Persist `config` back to `configPath`, pretty-printed. */
function saveConfig(configPath: string, config: I18nConfig): void {
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
}

/** Load `configPath`, run `fn`, then save — bails silently if loading failed (already reported). */
function withLoadedConfig(configPath: string, fn: (config: I18nConfig) => void): void {
  const loaded = loadConfigOrExit(configPath);
  if (!loaded) return;
  fn(loaded.config);
  saveConfig(configPath, loaded.config);
}

function stubAction(command: string): () => void {
  return () => {
    console.log(`"${command}" is not implemented yet — see .claude/plans/localization-engine.md.`);
    process.exit(1);
  };
}

/** Build the `i18n` commander program (exported for tests; `runI18nCli` is the process entry point). */
export function createI18nCommand(options: { configPath?: string } = {}): Command {
  const program = new Command("i18n")
    .description("The pantoken localization engine CLI.")
    .exitOverride()
    .configureOutput({
      writeOut: (str) => process.stdout.write(str),
      writeErr: (str) => process.stderr.write(str),
    });

  program.option(
    "--config <path>",
    "path to i18n.config.json",
    options.configPath ?? "i18n.config.json",
  );

  for (const name of NOT_YET_IMPLEMENTED) {
    const cmd = program.command(name);
    if (name === "translate") {
      cmd
        .addArgument(new Argument("[space]", "space id, e.g. docs.guides").argOptional())
        .option("--locale <locale>", "one locale")
        .option("--tier <tier>", "every locale in a tier")
        .option("--provider <provider>", "override the default provider profile")
        .option("--concurrency <n>", "override provider concurrency", Number)
        .option("--force", "retranslate even when the cache/PO entry is up to date", false);
    } else if (name === "extract" || name === "render" || name === "stats") {
      cmd.addArgument(new Argument("[space]", "space id").argOptional());
    } else if (name === "check") {
      cmd.option("--strict", "treat every warn-level finding as blocking", false);
    }
    cmd.action(stubAction(name));
  }

  const locale = program
    .command("locale")
    .description("Move a locale between tiers, or in/out of the pipeline.");

  locale
    .command("promote")
    .addArgument(new Argument("<locale>", "BCP47 locale tag"))
    .addOption(new Option("--to <tier>", 'target tier (default: "primary")'))
    .action((localeTag: string, opts: { to?: string }) => {
      const configPath = program.opts<{ config: string }>().config;
      withLoadedConfig(configPath, (config) => {
        const toTier = opts.to ?? (config.locales.tiers.primary ? "primary" : "source");
        config.locales.tiers = moveLocaleToTier(config.locales.tiers, localeTag, toTier);
        console.log(`Promoted "${localeTag}" to tier "${toTier}".`);
      });
    });

  locale
    .command("demote")
    .addArgument(new Argument("<locale>", "BCP47 locale tag"))
    .addOption(new Option("--to <tier>", "target tier").default("secondary"))
    .action((localeTag: string, opts: { to: string }) => {
      const configPath = program.opts<{ config: string }>().config;
      withLoadedConfig(configPath, (config) => {
        config.locales.tiers = moveLocaleToTier(config.locales.tiers, localeTag, opts.to);
        console.log(`Demoted "${localeTag}" to tier "${opts.to}".`);
      });
    });

  locale
    .command("exclude")
    .addArgument(new Argument("<locale>", "BCP47 locale tag"))
    .action((localeTag: string) => {
      const configPath = program.opts<{ config: string }>().config;
      withLoadedConfig(configPath, (config) => {
        config.locales = excludeLocale(config.locales, localeTag);
        console.log(`Excluded "${localeTag}" from the pipeline.`);
      });
    });

  locale
    .command("include")
    .addArgument(new Argument("<locale>", "BCP47 locale tag"))
    .action((localeTag: string) => {
      const configPath = program.opts<{ config: string }>().config;
      withLoadedConfig(configPath, (config) => {
        config.locales = includeLocale(config.locales, localeTag);
        console.log(`Included "${localeTag}" in the pipeline.`);
      });
    });

  return program;
}

/** Process entry point: parse `argv`, print a friendly error, and exit non-zero on failure. */
export async function runI18nCli(argv: string[]): Promise<void> {
  const program = createI18nCommand();
  try {
    await program.parseAsync(argv, { from: "user" });
  } catch (error) {
    if (error instanceof CommanderError) {
      process.exitCode = error.exitCode;
      return;
    }
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

export { loadConfig };
