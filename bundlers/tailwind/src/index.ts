/**
 * `@pantoken/tailwind` — a Tailwind CSS preset that maps Instructure design tokens into the theme.
 *
 * Every token is exposed as a `var(--instui-*)` reference (not a concrete value), so Tailwind
 * utilities like `bg-color-background-base` theme through the same CSS custom properties that
 * `@pantoken/css` emits — light/dark and high-contrast all keep working.
 *
 * @module
 * @experimental
 */
import { tokens } from "@pantoken/tokens";
import type { Token } from "@pantoken/model";

/** A minimal shape for the slice of Tailwind config this preset contributes. */
export interface TailwindPreset {
  theme: {
    extend: {
      colors: Record<string, string>;
      spacing: Record<string, string>;
      fontFamily: Record<string, string>;
    };
  };
}

/** Options for {@link pantokenPreset}. */
export interface PantokenPresetOptions {
  /** Also expose the primitive colour palette under a `primitive-` prefix (default: false). */
  includePrimitives?: boolean;
}

function ref(name: string): string {
  return `var(${name})`;
}

function collect(
  source: readonly Token[],
  prefix: string,
  keyFrom: (name: string) => string,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const token of source) {
    if (token.meta?.kind === "icon") continue;
    if (!token.name.startsWith(prefix)) continue;
    out[keyFrom(token.name)] = ref(token.name);
  }
  return out;
}

/**
 * Build the pantoken Tailwind preset.
 *
 * @param options - {@link PantokenPresetOptions}.
 * @returns A Tailwind preset contributing `colors`, `spacing`, and `fontFamily`.
 *
 * @example Register the preset in tailwind.config.ts
 * ```ts
 * import { pantokenPreset } from "@pantoken/tailwind";
 *
 * export default {
 *   presets: [pantokenPreset()],
 *   content: ["./src/**\/*.{ts,tsx}"],
 * };
 * // then use utilities like `bg-color-background-base p-space-md`
 * ```
 *
 * @example Also expose the primitive palette under a primitive- prefix
 * ```ts
 * import { pantokenPreset } from "@pantoken/tailwind";
 *
 * export default {
 *   presets: [pantokenPreset({ includePrimitives: true })],
 * };
 * ```
 */
export function pantokenPreset(options: PantokenPresetOptions = {}): TailwindPreset {
  const colors = collect(tokens, "--instui-color-", (n) => n.slice("--instui-color-".length));
  if (options.includePrimitives) {
    for (const token of tokens) {
      if (token.name.startsWith("--instui-primitive-color-")) {
        colors[`primitive-${token.name.slice("--instui-primitive-color-".length)}`] = ref(
          token.name,
        );
      }
    }
  }
  const spacing = collect(tokens, "--instui-spacing-", (n) => n.slice("--instui-spacing-".length));
  const fontFamily: Record<string, string> = {};
  for (const token of tokens) {
    const marker = "font-family-";
    const idx = token.name.indexOf(marker);
    if (idx !== -1) fontFamily[token.name.slice(idx + marker.length)] = ref(token.name);
  }

  return { theme: { extend: { colors, spacing, fontFamily } } };
}

export default pantokenPreset;
