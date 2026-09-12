/**
 * AI-backed fill-in for untranslated entries in a PO catalog — Phase 3 of the localization-engine
 * plan. Runs only when a provider resolves (an explicit profile or `I18N_TRANSLATION_COMMAND`, the
 * convention `tools/translation-adapters/README.md` documents); otherwise every entry stays
 * untranslated, exactly as before this module existed.
 *
 * Short keyed strings go through a batched JSON prompt. Whole-file units (a content space with
 * `segment: "file"`) are too large for that and would lose their Markdown structure, so they get a
 * document-at-a-time prompt with code, package names, and `{{template}}` tokens masked out.
 *
 * @module
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildBatchTranslationPrompt,
  buildMarkdownTranslationPrompt,
  extractJsonObject,
  preserveMarkdown,
  restoreMarkdown,
  spawnPrompt,
  stripMarkdownEnvelope,
} from "@pantoken/translation-adapters";
import type { ProviderConfig, ProviderProfileConfig } from "./config.ts";
import { parsePo, serializePo, writeCatalog, type PoEntry } from "./po.ts";

/** True when an AI translation command is configured via `I18N_TRANSLATION_COMMAND`. */
export function aiProviderConfigured(): boolean {
  return (process.env.I18N_TRANSLATION_COMMAND ?? "").trim().length > 0;
}

/** How to invoke a translation provider for one run. */
export interface ProviderInvocation {
  command: string;
  args: string[];
  concurrency: number;
}

/** Caller-supplied overrides for one `fillUntranslatedEntries` run. */
export interface FillOptions {
  /** Root the profile's relative `command` path resolves against. */
  configDir?: string;
  /** Profile name from `provider.profiles`, e.g. `"copilot"`. */
  profile?: string;
  concurrency?: number;
  /** Retranslate entries that already have a `msgstr`. */
  force?: boolean;
  /** Restrict provider input to these collision-safe catalog unit keys. */
  unitKeys?: readonly string[];
}

/**
 * Resolve the command to spawn. An explicitly requested `profile` supplies the command, model, and
 * effort; `I18N_TRANSLATION_COMMAND`/`_ARGS` always win when set, so existing package scripts keep
 * working. Returns `undefined` when neither is available — the historical no-op.
 */
export function resolveProviderInvocation(
  provider: ProviderConfig,
  options: FillOptions = {},
): ProviderInvocation | undefined {
  const profile = options.profile ? provider.profiles[options.profile] : undefined;
  if (options.profile && !profile) {
    throw new Error(
      `Unknown provider profile "${options.profile}" — known: ${Object.keys(provider.profiles).join(", ")}`,
    );
  }
  const concurrency = Math.max(1, options.concurrency ?? profile?.concurrency ?? 1);
  const envCommand = (process.env.I18N_TRANSLATION_COMMAND ?? "").trim();
  if (envCommand) return { command: envCommand, args: commandArgs(), concurrency };
  if (!profile) return undefined;
  return {
    command: resolveProfileCommand(profile, options.configDir),
    args: profileArgs(profile),
    concurrency,
  };
}

/** A profile command containing a separator is a repo-relative script path, not a bare binary. */
function resolveProfileCommand(profile: ProviderProfileConfig, configDir?: string): string {
  return profile.command.includes("/") && configDir
    ? join(configDir, profile.command)
    : profile.command;
}

function profileArgs(profile: ProviderProfileConfig): string[] {
  return ["--model", profile.model, ...(profile.effort ? ["--effort", profile.effort] : [])];
}

/** English display name for a BCP-47 locale tag, e.g. `"hu"` → `"Hungarian"` (falls back to the
 *  raw tag when `Intl` doesn't recognize it). */
export function targetLanguageLabel(locale: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(locale) ?? locale;
  } catch {
    return locale;
  }
}

function commandArgs(): string[] {
  return (process.env.I18N_TRANSLATION_COMMAND_ARGS ?? "")
    .split(" ")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

/** Split `entries` into batches whose combined `msgid` length stays under `budget` characters. */
function chunkEntries(entries: readonly PoEntry[], budget: number): PoEntry[][] {
  const chunks: PoEntry[][] = [];
  let current: PoEntry[] = [];
  let size = 0;
  for (const entry of entries) {
    if (current.length > 0 && size + entry.msgid.length > budget) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(entry);
    size += entry.msgid.length;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

/**
 * Fill empty, non-obsolete `msgstr`s in `poPath` using the resolved translation provider — every
 * non-obsolete entry instead when `options.force` is set. No-ops when no provider resolves,
 * leaving every entry untranslated, same as before this pipeline existed.
 */
export async function fillUntranslatedEntries(
  poPath: string,
  locale: string,
  provider: ProviderConfig,
  options: FillOptions = {},
): Promise<void> {
  const invocation = resolveProviderInvocation(provider, options);
  if (!invocation) return;
  const entries = parsePo(readFileSync(poPath, "utf8"));
  const selected = options.unitKeys ? new Set(options.unitKeys) : undefined;
  const pending = entries.filter(
    (entry) =>
      !entry.obsolete &&
      (selected === undefined || selected.has(`${entry.msgctxt ?? ""}\u0000${entry.msgid}`)) &&
      (options.force === true || entry.msgstr === ""),
  );
  if (pending.length === 0) return;

  const targetLanguage = targetLanguageLabel(locale);
  const chunks = chunkEntries(pending, provider.batchBudget);

  const translateChunk = async (chunk: PoEntry[]): Promise<void> => {
    const payload = Object.fromEntries(chunk.map((entry, index) => [String(index), entry.msgid]));
    const prompt = buildBatchTranslationPrompt(targetLanguage, payload);
    const response = await spawnPrompt(
      invocation.command,
      [...invocation.args, "-p"],
      prompt,
      `locale '${locale}'`,
      { timeoutMs: provider.timeoutMs },
    );
    const parsed = extractJsonObject(response);
    if (!parsed) return;
    chunk.forEach((entry, index) => {
      const translated = parsed[String(index)];
      if (typeof translated === "string" && translated.trim().length > 0) {
        entry.msgstr = translated;
        entry.fuzzy = false;
        entry.flags = entry.flags.filter((flag) => flag !== "fuzzy");
      }
    });
  };

  await runWithConcurrency(chunks, invocation.concurrency, translateChunk);
  writeCatalog(poPath, serializePo(entries));
}

/**
 * Fill empty, non-obsolete `msgstr`s in `poPath` where each `msgid` is a whole Markdown document,
 * translating one document per request. Writes the catalog after each completed document so a long
 * multi-locale run keeps its progress if it's interrupted. No-ops when no provider resolves.
 *
 * A document that fails or times out is reported and left untranslated rather than aborting the
 * run — the next pass retries only what's still empty.
 */
export async function fillUntranslatedMarkdownEntries(
  poPath: string,
  locale: string,
  provider: ProviderConfig,
  options: FillOptions = {},
): Promise<void> {
  const invocation = resolveProviderInvocation(provider, options);
  if (!invocation) return;
  const entries = parsePo(readFileSync(poPath, "utf8"));
  const selected = options.unitKeys ? new Set(options.unitKeys) : undefined;
  const pending = entries.filter(
    (entry) =>
      !entry.obsolete &&
      (selected === undefined || selected.has(`${entry.msgctxt ?? ""}\u0000${entry.msgid}`)) &&
      (options.force === true || entry.msgstr === ""),
  );
  if (pending.length === 0) return;

  const targetLanguage = targetLanguageLabel(locale);

  const translateEntry = async (entry: PoEntry): Promise<void> => {
    const reference = entry.references[0] ?? "document";
    const preserved = preserveMarkdown(entry.msgid);
    const prompt = buildMarkdownTranslationPrompt(preserved.text, targetLanguage, reference);
    try {
      const response = await spawnPrompt(
        invocation.command,
        [...invocation.args, "-p"],
        prompt,
        `locale '${locale}' (${reference})`,
        { timeoutMs: provider.documentTimeoutMs },
      );
      const translated = restoreMarkdown(stripMarkdownEnvelope(response), preserved);
      if (translated.trim().length === 0) return;
      entry.msgstr = `${translated.trimEnd()}\n`;
      entry.fuzzy = false;
      entry.flags = entry.flags.filter((flag) => flag !== "fuzzy");
      writeCatalog(poPath, serializePo(entries));
    } catch (error) {
      console.warn(
        `  ! ${locale} ${reference}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  await runWithConcurrency(pending, invocation.concurrency, translateEntry);
  writeCatalog(poPath, serializePo(entries));
}

/** Run `task` over `items`, keeping at most `limit` calls in flight. */
async function runWithConcurrency<T>(
  items: readonly T[],
  limit: number,
  task: (item: T) => Promise<void>,
): Promise<void> {
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const item = items[next++];
      await task(item);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}
