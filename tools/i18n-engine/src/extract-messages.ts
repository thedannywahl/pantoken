/**
 * Extraction for `"messages"` kind spaces — Phase 3 of the localization-engine plan. Reads a
 * `src/i18n.json`-shaped source (a flat key → message map) and produces `msgctxt`-keyed units, one
 * per key, for the POT/PO catalog.
 *
 * @module
 */
import { readFileSync } from "node:fs";
import type { TranslateIntent } from "./config.ts";

/** One entry in an `i18n.json` source: a bare string (always translated), or an object with an
 *  explicit `translate` intent. */
export type MessageSourceEntry = string | { message: string; translate?: TranslateIntent };

/** Flat keyed message source as represented by an `i18n.json` file. */
export type MessageSource = Record<string, MessageSourceEntry>;

/** One extracted message: its stable key, MF2 (or plain — a valid subset of MF2) source text, and
 *  translate intent. */
export interface MessageUnit {
  key: string;
  msgid: string;
  translate: TranslateIntent;
}

/** Parse an already-loaded `i18n.json`-shaped object into {@link MessageUnit}s, in key order. */
export function parseMessageSource(raw: MessageSource): MessageUnit[] {
  return Object.entries(raw).map(([key, entry]) => {
    if (typeof entry === "string") return { key, msgid: entry, translate: "always" as const };
    return { key, msgid: entry.message, translate: entry.translate ?? "always" };
  });
}

/** Read and parse a `src/i18n.json` file at `sourcePath`. */
export function extractMessagesSpace(sourcePath: string): MessageUnit[] {
  const raw = JSON.parse(readFileSync(sourcePath, "utf8")) as MessageSource;
  return parseMessageSource(raw);
}
