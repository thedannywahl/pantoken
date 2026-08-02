/**
 * Content-addressed translation memory for i18n bundle strings.
 *
 * Format mirrors `docs/i18n-cache/*.json`: `{ "version": 1, "entries": { sha256key: value } }`.
 * Key: sha256("wc" + NUL + stringKey + NUL + englishValue) — locale-scoped via file path.
 */
import { join } from "node:path";
import {
  TranslationMemory as SharedTranslationMemory,
  sha256,
} from "@pantoken/translation-adapters";

/** Derive the cache key for an English source string + its field name. */
export function keyFor(stringKey: string, englishValue: string): string {
  return sha256(`wc\0${stringKey}\0${englishValue}`);
}

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
