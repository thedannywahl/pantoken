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
import {
  buildBatchTranslationPrompt,
  extractJsonObject,
  spawnPrompt,
} from "@pantoken/translation-adapters";
import type { ProviderConfig } from "./config.ts";
import { parsePo, serializePo, type PoEntry } from "./po.ts";

/** True when an AI translation command is configured via `I18N_TRANSLATION_COMMAND`. */
export function aiProviderConfigured(): boolean {
  return (process.env.I18N_TRANSLATION_COMMAND ?? "").trim().length > 0;
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
 * Fill every empty, non-obsolete `msgstr` in `poPath` using the AI command configured via
 * `I18N_TRANSLATION_COMMAND`/`I18N_TRANSLATION_COMMAND_ARGS`. No-ops when unconfigured — leaves
 * every entry untranslated, same as before this pipeline existed.
 */
export async function fillUntranslatedEntries(
  poPath: string,
  locale: string,
  provider: ProviderConfig,
): Promise<void> {
  if (!aiProviderConfigured()) return;
  const entries = parsePo(readFileSync(poPath, "utf8"));
  const untranslated = entries.filter((entry) => !entry.obsolete && entry.msgstr === "");
  if (untranslated.length === 0) return;

  const command = process.env.I18N_TRANSLATION_COMMAND ?? "claude";
  const args = commandArgs();
  const targetLanguage = targetLanguageLabel(locale);

  for (const chunk of chunkEntries(untranslated, provider.batchBudget)) {
    const payload = Object.fromEntries(chunk.map((entry, index) => [String(index), entry.msgid]));
    const prompt = buildBatchTranslationPrompt(targetLanguage, payload);
    const response = await spawnPrompt(command, [...args, "-p"], prompt, `locale '${locale}'`, {
      timeoutMs: provider.timeoutMs,
    });
    const parsed = extractJsonObject(response);
    if (!parsed) continue;
    chunk.forEach((entry, index) => {
      const translated = parsed[String(index)];
      if (typeof translated === "string" && translated.trim().length > 0) {
        entry.msgstr = translated;
        entry.fuzzy = false;
        entry.flags = entry.flags.filter((flag) => flag !== "fuzzy");
      }
    });
  }
  writeFileSync(poPath, serializePo(entries));
}
