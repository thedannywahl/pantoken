/**
 * The `i18n` CLI skeleton — Phase 1/2 of the localization-engine plan.
 *
 * `locale promote/demote/exclude/include` are real (read-modify-write `i18n.config.json`'s
 * `locales` block). `extract`/`translate`/`render`/`check` are real for the `docs.guides` space only
 * (see `pipeline.ts`) — every other space, and `lint`/`stats`, still just parse their selector
 * surface and report not-yet-implemented.
 *
 * @module
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { Argument, Command, CommanderError, Option } from "commander";
import { loadConfig, parseConfig, type I18nConfig } from "./config.ts";
import { excludeLocale, includeLocale, moveLocaleToTier } from "./locales.ts";
import {
  DOCS_GUIDES,
  guidesLocales,
  runCheckGuides,
  runExtractGuides,
  runRenderGuides,
  runTranslateGuides,
} from "./pipeline.ts";

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

  const configDirOf = (): string => dirname(program.opts<{ config: string }>().config);

  /** Runs `fn` for `docs.guides` (or an omitted space); any other space falls back to `command`'s
   *  stub message instead. */
  function withDocsGuidesSpace(
    command: string,
    space: string | undefined,
    fn: (config: I18nConfig) => void | Promise<void>,
  ): void | Promise<void> {
    if (space !== undefined && space !== DOCS_GUIDES) {
      stubAction(command)();
      return;
    }
    const configPath = program.opts<{ config: string }>().config;
    const loaded = loadConfigOrExit(configPath);
    if (!loaded) return;
    return fn(loaded.config);
  }

  program
    .command("extract")
    .addArgument(new Argument("[space]", "space id").argOptional())
    .action((space?: string) =>
      withDocsGuidesSpace("extract", space, (config) => {
        const result = runExtractGuides(config, configDirOf());
        console.log(
          `Extracted ${String(result.unitCount)} unit(s) from ${DOCS_GUIDES} to ${result.potPath}.`,
        );
      }),
    );

  program
    .command("translate")
    .addArgument(new Argument("[space]", "space id, e.g. docs.guides").argOptional())
    .option("--locale <locale>", "one locale")
    .option("--tier <tier>", "every locale in a tier")
    .option("--provider <provider>", "override the default provider profile")
    .option("--concurrency <n>", "override provider concurrency", Number)
    .option("--force", "retranslate even when the cache/PO entry is up to date", false)
    .action((space: string | undefined, opts: { locale?: string }) =>
      withDocsGuidesSpace("translate", space, async (config) => {
        const locales = opts.locale ? [opts.locale] : guidesLocales(config);
        for (const locale of locales) {
          const result = await runTranslateGuides(config, configDirOf(), locale);
          console.log(
            `${DOCS_GUIDES} (${locale}): ${String(result.translated)} translated, ` +
              `${String(result.untranslated)} untranslated (no AI provider authorized yet) — ${result.poPath}`,
          );
        }
      }),
    );

  program
    .command("render")
    .addArgument(new Argument("[space]", "space id").argOptional())
    .option("--locale <locale>", "one locale")
    .action((space: string | undefined, opts: { locale?: string }) =>
      withDocsGuidesSpace("render", space, (config) => {
        const locales = opts.locale ? [opts.locale] : guidesLocales(config);
        for (const locale of locales) {
          const result = runRenderGuides(config, configDirOf(), locale);
          console.log(
            `${DOCS_GUIDES} (${locale}): wrote ${String(result.filesWritten.length)} file(s).`,
          );
        }
      }),
    );

  program
    .command("check")
    .addArgument(new Argument("[space]", "space id").argOptional())
    .option("--strict", "treat every warn-level finding as blocking", false)
    .action((space: string | undefined, opts: { strict: boolean }) =>
      withDocsGuidesSpace("check", space, (config) => {
        if (opts.strict) process.env.I18N_DRIFT_STRICT = "1";
        const { exitCode } = runCheckGuides(config, configDirOf());
        process.exitCode = exitCode;
      }),
    );

  for (const name of ["lint", "stats"] as const) {
    const cmd = program.command(name);
    if (name === "stats") cmd.addArgument(new Argument("[space]", "space id").argOptional());
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
