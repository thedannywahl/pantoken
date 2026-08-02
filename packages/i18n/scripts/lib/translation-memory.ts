/**
 * Content-addressed translation memory for i18n bundle strings.
 *
 * Format mirrors `docs/i18n-cache/*.json`: `{ "version": 1, "entries": { sha256key: value } }`.
 * Key: sha256("wc" + NUL + stringKey + NUL + englishValue) — locale-scoped via file path.
 */
import { join } from "node:path";
import { TranslationMemory as SharedTranslationMemory } from "@pantoken/translation-adapters";

// keyFor lives in keys.ts (no external deps) so check-bundle-drift can import it without a build.
export { keyFor } from "./keys.ts";

/** i18n facade: pre-computed key API, no pruning, per-locale path. */
export class TranslationMemory {
  private readonly _mem: SharedTranslationMemory;
  get hits(): number {
    return this._mem.hits;
  }
  misses = 0;

  private constructor(mem: SharedTranslationMemory) {
    this._mem = mem;
  }

  static load(cacheDir: string, locale: string): TranslationMemory {
    return new TranslationMemory(SharedTranslationMemory.open(join(cacheDir, `${locale}.json`)));
  }

  get(key: string): string | undefined {
    const val = this._mem.get(key);
    if (val === undefined) this.misses++;
    return val;
  }

  set(key: string, value: string): void {
    this._mem.set(key, value);
  }

  save(): void {
    this._mem.save();
  }
}
