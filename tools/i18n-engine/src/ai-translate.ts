/**
 * AI-backed fill-in for untranslated entries in a "messages"-kind space's PO catalog — Phase 3 of
 * the localization-engine plan. Runs only when `I18N_TRANSLATION_COMMAND` is configured (same
 * convention `tools/translation-adapters/README.md` documents for the legacy pipelines); otherwise
 * every entry stays untranslated, exactly as before this module existed.
 *
 * `docs.guides` is deliberately not wired through here — it already has its own dedicated,
 * markdown-aware AI pipeline (`docs/scripts/translate-guide-po.ts`), and its `msgid`s are whole
 * files, too large for this module's short-string batch prompt.
 *
 * @module
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildBatchTranslationPrompt,
  extractJsonObject,
  spawnPrompt,
} from "@pantoken/translation-adapters";
import type { ProviderConfig, ProviderProfileConfig } from "./config.ts";
import { parsePo, serializePo, type PoEntry } from "./po.ts";

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
  const pending = entries.filter(
    (entry) => !entry.obsolete && (options.force === true || entry.msgstr === ""),
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
  writeFileSync(poPath, serializePo(entries));
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
