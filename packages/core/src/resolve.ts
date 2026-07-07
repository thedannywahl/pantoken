/**
 * Walk the Tokens Studio JSON graph and resolve `{path.to.token}` references into `var(...)`
 * pointers, preserving the token graph. Ported and generalized from
 * `@instructure/instui-generate-css-tokens`'s `extract.ts`.
 *
 * @module
 */
import { toKebab } from "./utils.ts";
import type { TokenModify } from "./model.ts";

const METADATA_KEYS = new Set(["value", "type", "description", "$extensions"]);
const REFERENCE = /^\{([^}]+)\}$/;

/** A resolved leaf of the token tree: a path, a raw value, and an optional colour modifier. */
export interface Leaf {
  path: string[];
  value: string;
  modify?: TokenModify;
}

function readModify(node: Record<string, unknown>): TokenModify | undefined {
  const ext = node.$extensions as Record<string, unknown> | undefined;
  const studio = ext?.["studio.tokens"] as Record<string, unknown> | undefined;
  const modify = studio?.modify as Record<string, unknown> | undefined;
  if (!modify || typeof modify.type !== "string") return undefined;
  return {
    type: modify.type as TokenModify["type"],
    value: Number(modify.value),
    space: typeof modify.space === "string" ? modify.space : undefined,
    color: typeof modify.color === "string" ? modify.color : undefined,
  };
}

/**
 * Collect every leaf of a Tokens Studio tree. A leaf is a node with a `.value`:
 * a string value yields one leaf; a composite object value (typography) yields one leaf per
 * sub-property named `<token>-<subProperty>`; array values (box-shadow lists) are skipped.
 *
 * @example
 * ```ts
 * import { collectLeaves } from "@pantoken/core";
 *
 * const tree = {
 *   color: {
 *     white: { value: "#ffffff", type: "color" },
 *     hover: { value: "{color.white}", type: "color" },
 *   },
 *   typography: { body: { value: { fontFamily: "Lato", fontSize: "1rem", type: "typography" } } },
 * };
 *
 * collectLeaves(tree).map((l) => [l.path.join("."), l.value]);
 * // → [
 * //   ["color.white", "#ffffff"],
 * //   ["color.hover", "{color.white}"],
 * //   ["typography.body.fontFamily", "Lato"],
 * //   ["typography.body.fontSize", "1rem"],
 * // ]
 * ```
 */
export function collectLeaves(obj: unknown, path: string[] = [], out: Leaf[] = []): Leaf[] {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return out;

  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    if (METADATA_KEYS.has(key)) continue;
    if (!val || typeof val !== "object" || Array.isArray(val)) continue;

    const record = val as Record<string, unknown>;
    if ("value" in record) {
      const modify = readModify(record);
      const value = record.value;
      if (typeof value === "string") {
        out.push({ path: [...path, key], value, modify });
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (subKey === "type") continue;
          if (typeof subValue === "string") {
            out.push({ path: [...path, key, subKey], value: subValue, modify });
          }
        }
      }
      continue;
    }

    collectLeaves(val, [...path, key], out);
  }

  return out;
}

/**
 * Map a Tokens Studio reference body (the text inside `{…}`) to the CSS custom-property name of
 * the token it points at. A leading `semantic.` discriminates the semantic layer from primitives.
 *
 * @example
 * ```ts
 * import { referenceToVarName } from "@pantoken/core";
 *
 * referenceToVarName("color.white");                  // → "--instui-primitive-color-white"
 * referenceToVarName("semantic.color.background.base"); // → "--instui-color-background-base"
 * ```
 */
export function referenceToVarName(reference: string): string {
  const parts = reference.split(".");
  if (parts[0] === "semantic") {
    return `--instui-${parts.slice(1).map(toKebab).join("-")}`;
  }
  return `--instui-primitive-${parts.map(toKebab).join("-")}`;
}

/**
 * Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.
 *
 * @example
 * ```ts
 * import { resolveValue } from "@pantoken/core";
 *
 * resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
 * resolveValue("#ffffff");                          // → "#ffffff"
 * ```
 */
export function resolveValue(raw: string): string {
  const match = raw.match(REFERENCE);
  return match ? `var(${referenceToVarName(match[1])})` : raw.trim();
}

/**
 * Build a `--instui-[prefix-]<kebab path>` custom-property name.
 *
 * @example
 * ```ts
 * import { varName } from "@pantoken/core";
 *
 * varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
 * varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
 * varName("component", ["baseButton", "primaryBackground"]);
 * // → "--instui-component-base-button-primary-background"
 * ```
 */
export function varName(prefix: string, path: string[]): string {
  const body = path.map(toKebab).join("-");
  return prefix ? `--instui-${prefix}-${body}` : `--instui-${body}`;
}
