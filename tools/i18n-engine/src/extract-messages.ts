/**
 * Extraction for `"messages"` kind spaces — Phase 3 of the localization-engine plan. Reads a
 * `src/i18n.json`-shaped source (a flat key → message map) and produces `msgctxt`-keyed units, one
 * per key, for the POT/PO catalog.
 *
 * @module
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { TranslateIntent, TranslatePolicy } from "./config.ts";
import type { CatalogUnit } from "./units.ts";

/** One entry in an `i18n.json` source: a bare string (always translated), or an object with an
 *  explicit `translate` intent. */
export type MessageSourceEntry = {
  message: string;
  translate: TranslateIntent | Readonly<Record<string, TranslateIntent>>;
};

/** Flat keyed message source as represented by an `i18n.json` file. */
export type MessageSource = Record<string, MessageSourceEntry>;

/** One extracted message: its stable key, MF2 (or plain — a valid subset of MF2) source text, and
 *  translate intent. */
export interface MessageUnit extends CatalogUnit {
  key: string;
  msgctxt: string;
  msgid: string;
  reference: string;
  translate: TranslatePolicy;
}

/** Parse an already-loaded source into keyed units, optionally qualifying contexts by space. */
export function parseMessageSource(
  raw: MessageSource,
  contextPrefix?: string,
  referencePrefix?: string,
): MessageUnit[] {
  return Object.entries(raw)
    .filter(([key]) => key !== "$schema")
    .map(([key, entry]) => {
      const msgctxt = contextPrefix ? `${contextPrefix}:${key}` : key;
      return {
        key,
        msgctxt,
        msgid: entry.message,
        reference: `${referencePrefix ?? ""}${key}`,
        translate: entry.translate ?? "always",
      };
    });
}

/** Read and parse a `src/i18n.json` file at `sourcePath`. */
export function extractMessagesSpace(sourcePath: string, contextPrefix?: string): MessageUnit[] {
  if (statSync(sourcePath).isDirectory()) {
    return readdirSync(sourcePath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((entry) => {
        const file = join(sourcePath, entry.name, "i18n.json");
        return parseMessageSource(
          JSON.parse(readFileSync(file, "utf8")) as MessageSource,
          contextPrefix ? `${contextPrefix}:${entry.name}` : entry.name,
          `${entry.name}/i18n.json#`,
        );
      });
  }
  const raw = JSON.parse(readFileSync(sourcePath, "utf8")) as MessageSource;
  return parseMessageSource(raw, contextPrefix);
}
