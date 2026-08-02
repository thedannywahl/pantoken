/**
 * Translation adapter primitives for the i18n bundle pipeline.
 *
 * Mirrors the interface from `docs/scripts/api-translation.ts` but scoped to short key-value
 * strings rather than prose Markdown. The glossary adapter is a CI-safe passthrough (returns the
 * source unchanged); the AI adapter shells out to the configured CLI tool.
 */
import { extractJsonObject, spawnPrompt } from "@pantoken/translation-adapters";

// ── Adapter interface ─────────────────────────────────────────────────────────

/** A pluggable translation engine for i18n bundle strings. */
export interface TranslationAdapter {
  readonly name: string;
  /**
   * Whether this adapter produces real translations. The glossary sets this `false`; its output
   * must never be committed as a translated string.
   */
  readonly translatesProse?: boolean;
  /**
   * Translate many short strings in one request. Returns a map keyed by each item's `id`.
   * `onChunk` is called with partial results as each concurrent batch completes.
   */
  translateBatch(
    items: readonly { id: string; text: string }[],
    locale: string,
    localeLabel: string,
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>>;
}

// ── Glossary adapter (CI-safe, no network) ────────────────────────────────────

/** Passthrough adapter — returns source strings unchanged. Safe for CI. */
export class GlossaryTranslationAdapter implements TranslationAdapter {
  readonly name = "glossary";
  readonly translatesProse = false;

  translateBatch(
    items: readonly { id: string; text: string }[],
    _locale: string,
    _localeLabel: string,
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>> {
    const out = Object.fromEntries(items.map((item) => [item.id, item.text]));
    onChunk?.(out);
    return Promise.resolve(out);
  }
}

// ── AI adapter ────────────────────────────────────────────────────────────────

/**
 * AI adapter — shells out to the configured CLI tool to produce real translations.
 *
 * Activated by `I18N_TRANSLATION_ADAPTER=ai`. The command defaults to `claude` and is overridden
 * via `I18N_TRANSLATION_COMMAND`; extra flags via `I18N_TRANSLATION_COMMAND_ARGS`.
 */
export class AiTranslationAdapter implements TranslationAdapter {
  readonly name = "ai";

  private readonly command: string;
  private readonly args: string[];

  constructor() {
    this.command = process.env.I18N_TRANSLATION_COMMAND ?? "claude";
    this.args = (process.env.I18N_TRANSLATION_COMMAND_ARGS ?? "")
      .split(" ")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }

  async translateBatch(
    items: readonly { id: string; text: string }[],
    locale: string,
    localeLabel: string,
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>> {
    const itemsJson = JSON.stringify(Object.fromEntries(items.map((i) => [i.id, i.text])));
    const prompt = [
      `Translate these UI strings from English into ${localeLabel} (locale: ${locale}).`,
      "Return ONLY a JSON object with the same keys and translated string values.",
      "Keep strings short and natural for a UI context. Do not translate identifiers or placeholders.",
      "Source strings:",
      itemsJson,
    ].join("\n");

    const result = await this.run(prompt);
    const parsed = extractJsonObject(result);
    if (!parsed) throw new Error(`AI response could not be parsed as JSON for locale "${locale}".`);

    const out: Record<string, string> = {};
    for (const item of items) {
      const val = parsed[item.id];
      if (typeof val === "string") out[item.id] = val;
    }
    onChunk?.(out);
    return out;
  }

  private run(prompt: string): Promise<string> {
    return spawnPrompt(this.command, [...this.args, "-p"], prompt);
  }
}

// ── Factory ───────────────────────────────────────────────────────────────────

/**
 * Build the adapter named by `I18N_TRANSLATION_ADAPTER` (default `glossary`).
 * Supported values: `glossary`, `ai`.
 */
export function createTranslationAdapter(): TranslationAdapter {
  const selected = (process.env.I18N_TRANSLATION_ADAPTER ?? "glossary").toLowerCase();
  if (selected === "glossary") return new GlossaryTranslationAdapter();
  if (selected === "ai") return new AiTranslationAdapter();
  throw new Error(
    `Unsupported I18N_TRANSLATION_ADAPTER: ${selected}. Supported adapters: glossary, ai`,
  );
}
