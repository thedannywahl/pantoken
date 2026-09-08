/**
 * MF2 (MessageFormat 2) validation — Phase 3 of the localization-engine plan. Wraps `messageformat`
 * (the reference MF2 implementation) rather than re-implementing parsing/validation.
 *
 * @module
 */
import { isSelectMessage, parseMessage, validate, type Model } from "messageformat";

/** Validation result containing diagnostics and the MF2 features used by a message. */
export interface Mf2ValidationResult {
  valid: boolean;
  /** Syntax errors and data-model errors (e.g. `missing-fallback`, `duplicate-variant`). */
  errors: string[];
  /** Runtime function names the message actually uses (e.g. `"number"`), when it parses. */
  functions: Set<string>;
  /** `$variable` names the message actually uses, when it parses. */
  variables: Set<string>;
}

/** Parse and validate `source` as an MF2 message. Never throws — errors are collected instead. */
export function validateMf2(source: string): Mf2ValidationResult {
  const errors: string[] = [];
  try {
    const msg = parseMessage(source);
    const { functions, variables } = validate(msg, (type) => errors.push(type));
    return { valid: errors.length === 0, errors, functions, variables };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    return { valid: false, errors, functions: new Set(), variables: new Set() };
  }
}

/** Every literal (non-catch-all) key across a select message's variants, e.g. `{"one", "other"}`. */
function literalKeys(msg: Model.SelectMessage): Set<string> {
  const keys = new Set<string>();
  for (const variant of msg.variants) {
    for (const key of variant.keys) if (key.type === "literal") keys.add(key.value);
  }
  return keys;
}

/** True when at least one variant is the catch-all (every key is the `*` wildcard). */
function hasCatchAllVariant(msg: Model.SelectMessage): boolean {
  return msg.variants.some((variant) => variant.keys.every((key) => key.type === "*"));
}

/**
 * For a `.match`-based select message, the target `locale`'s CLDR plural categories NOT covered by
 * any variant — `[]` when the message isn't a select message. A catch-all (`*`) variant only ever
 * satisfies the `"other"` category (its conventional meaning in a single-parameter plural message);
 * every other category needs its own literal variant, or that plural form silently renders using
 * whichever text the catch-all happens to hold instead of a linguistically correct one.
 */
export function missingPluralCategories(source: string, locale: string): string[] {
  let msg: Model.Message;
  try {
    msg = parseMessage(source);
  } catch {
    return [];
  }
  if (!isSelectMessage(msg)) return [];
  const required = new Intl.PluralRules(locale).resolvedOptions().pluralCategories;
  const present = literalKeys(msg);
  const catchAllCoversOther = hasCatchAllVariant(msg);
  return required.filter((category) => {
    if (present.has(category)) return false;
    return !(category === "other" && catchAllCoversOther);
  });
}
