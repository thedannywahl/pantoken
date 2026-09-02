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
  messagesLocales,
  runCheckGuides,
  runCheckMessages,
  runExtractGuides,
  runExtractMessages,
  runRenderGuides,
  runTranslateMessages,
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

  /** Runs `guidesFn` for `docs.guides` (or an omitted space, which defaults to it), `messagesFn`
   *  for any space configured with `kind: "messages"`, or falls back to `command`'s stub message
   *  for anything else (e.g. an unconfigured or `"content"`/`"structural"` space with no handler). */
  function withSpace(
    command: string,
    space: string | undefined,
    guidesFn: (config: I18nConfig) => void | Promise<void>,
    messagesFn: (config: I18nConfig, spaceId: string) => void | Promise<void>,
  ): void | Promise<void> {
    const configPath = program.opts<{ config: string }>().config;
    const loaded = loadConfigOrExit(configPath);
    if (!loaded) return;
    const spaceId = space ?? DOCS_GUIDES;
    if (spaceId === DOCS_GUIDES) return guidesFn(loaded.config);
    if (loaded.config.spaces[spaceId]?.kind === "messages") {
      return messagesFn(loaded.config, spaceId);
    }
    stubAction(command)();
    return undefined;
  }

  program
    .command("extract")
    .addArgument(new Argument("[space]", "space id").argOptional())
    .action((space?: string) =>
      withSpace(
        "extract",
        space,
        (config) => {
          const result = runExtractGuides(config, configDirOf());
          console.log(
            `Extracted ${String(result.unitCount)} unit(s) from ${DOCS_GUIDES} to ${result.potPath}.`,
          );
        },
        (config, spaceId) => {
          const result = runExtractMessages(config, configDirOf(), spaceId);
          console.log(
            `Extracted ${String(result.unitCount)} unit(s) from ${spaceId} to ${result.potPath}.`,
          );
        },
      ),
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
      withSpace(
        "translate",
        space,
        async (config) => {
          const locales = opts.locale ? [opts.locale] : guidesLocales(config);
          for (const locale of locales) {
            const result = await runTranslateGuides(config, configDirOf(), locale);
            console.log(
              `${DOCS_GUIDES} (${locale}): ${String(result.translated)} translated, ` +
                `${String(result.untranslated)} untranslated (no AI provider authorized yet) — ${result.poPath}`,
            );
          }
        },
        async (config, spaceId) => {
          const locales = opts.locale ? [opts.locale] : messagesLocales(config, spaceId);
          for (const locale of locales) {
            const result = await runTranslateMessages(config, configDirOf(), spaceId, locale);
            console.log(
              `${spaceId} (${locale}): ${String(result.translated)} translated, ` +
                `${String(result.untranslated)} untranslated (no AI provider authorized yet) — ${result.poPath}`,
            );
          }
        },
      ),
    );

  program
    .command("render")
    .addArgument(new Argument("[space]", "space id").argOptional())
    .option("--locale <locale>", "one locale")
    .action((space: string | undefined, opts: { locale?: string }) =>
      withSpace(
        "render",
        space,
        (config) => {
          const locales = opts.locale ? [opts.locale] : guidesLocales(config);
          for (const locale of locales) {
            const result = runRenderGuides(config, configDirOf(), locale);
            console.log(
              `${DOCS_GUIDES} (${locale}): wrote ${String(result.filesWritten.length)} file(s).`,
            );
          }
        },
        () => {
          // Messages spaces don't have a generic file-render step — a space's own codegen
          // (e.g. `packages/i18n/scripts/build-bundles.ts`) reads its PO catalogs directly via
          // `resolveMessagesForLocale`. Nothing to do here.
          console.log(`"render" for a messages space is a no-op — its package owns codegen.`);
        },
      ),
    );

  program
    .command("check")
    .addArgument(new Argument("[space]", "space id").argOptional())
    .option("--strict", "treat every warn-level finding as blocking", false)
    .action((space: string | undefined, opts: { strict: boolean }) =>
      withSpace(
        "check",
        space,
        (config) => {
          if (opts.strict) process.env.I18N_DRIFT_STRICT = "1";
          const { exitCode } = runCheckGuides(config, configDirOf());
          process.exitCode = exitCode;
        },
        (config, spaceId) => {
          if (opts.strict) process.env.I18N_DRIFT_STRICT = "1";
          const { exitCode } = runCheckMessages(config, configDirOf(), spaceId);
          process.exitCode = exitCode;
        },
      ),
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

  const membershipCommands = [
    { name: "exclude", verb: "Excluded", preposition: "from", apply: excludeLocale },
    { name: "include", verb: "Included", preposition: "in", apply: includeLocale },
  ] as const;
  for (const { name, verb, preposition, apply } of membershipCommands) {
    locale
      .command(name)
      .addArgument(new Argument("<locale>", "BCP47 locale tag"))
      .action((localeTag: string) => {
        const configPath = program.opts<{ config: string }>().config;
        withLoadedConfig(configPath, (config) => {
          config.locales = apply(config.locales, localeTag);
          console.log(`${verb} "${localeTag}" ${preposition} the pipeline.`);
        });
      });
  }

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
