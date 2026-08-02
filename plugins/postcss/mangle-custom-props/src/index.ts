/**
 * `@pantoken/plugin-mangle-custom-props` — rename long custom property names to minimal sequential
 * identifiers.
 *
 * Token names like `--instui-component-alert-border-top-style` are human-readable but expensive in
 * minified bundles: the name itself is 40+ bytes, repeated in the definition, every `var()` call,
 * and every `@property` registration. This plugin replaces every matching name — across definitions,
 * `var()` references, and `@property` params — with a minimal identifier (`--a`, `--b`, …, `--aa`,
 * …), cutting name overhead by ~90%.
 *
 * Names are collected from the full stylesheet, sorted alphabetically for a deterministic mapping,
 * then assigned sequentially. A {@link MangleCustomPropsOptions.sharedManifest} option lets multiple
 * separate PostCSS passes share one consistent mapping, so separately processed CSS files that will
 * be loaded together can safely be mangled with the same names.
 *
 * @example
 * ```ts
 * import postcss from "postcss";
 * import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
 * const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
 * ```
 *
 * @module
 * @beta
 */
import type { Plugin, Result } from "postcss";

/** Short-name generation strategy for {@link mangleCustomProps}. */
export type MangleMethod = "base26" | "base36" | "numeric";

/** Options for {@link mangleCustomProps}. */
export interface MangleCustomPropsOptions {
  /**
   * Only custom property names that start with this string are mangled.
   *
   * @defaultValue `"--instui-"`
   */
  prefix?: string;
  /**
   * The algorithm used to generate short replacement names.
   *
   * - `"base26"` — `--a`, `--b`, …, `--z`, `--aa`, `--ab`, … (default; shortest for large sets)
   * - `"base36"` — `--0`, `--1`, …, `--9`, `--a`, …, `--z`, `--10`, … (alphanumeric)
   * - `"numeric"` — `--0`, `--1`, `--2`, …
   *
   * @defaultValue `"base26"`
   */
  method?: MangleMethod;
  /**
   * When `true`, appends a `mangle-map` entry to PostCSS `result.messages` after processing.
   * The message has shape `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }`.
   *
   * @defaultValue `false`
   */
  propertyMap?: boolean;
  /**
   * A mutable `Map` shared across multiple PostCSS passes.
   *
   * On each pass the plugin reads existing entries (reusing their short names) and writes new
   * ones (continuing the counter from `sharedManifest.size`). Pass the same `Map` instance to
   * every `mangleCustomProps` or {@link applyMinify} call that processes CSS files which will be
   * loaded together in the browser — this guarantees all files use an identical name mapping.
   *
   * Process the token sheet first so its names are seeded into the manifest before the component
   * sheets add their (typically overlapping) references.
   */
  sharedManifest?: Map<string, string>;
}

const VAR_RE = /var\(\s*(--[\w-]+)/gu;

/** Generate the short name at index `n` using the chosen method. */
function shortName(n: number, method: MangleMethod): string {
  if (method === "numeric") return `--${n}`;
  if (method === "base36") return `--${n.toString(36)}`;
  // base26: a-z, then aa-az, ba-bz, …
  let result = "";
  let i = n;
  do {
    result = String.fromCharCode(97 + (i % 26)) + result;
    i = Math.floor(i / 26) - 1;
  } while (i >= 0);
  return `--${result}`;
}

/**
 * Create the mangle-custom-properties PostCSS plugin.
 *
 * Collects all custom property names matching `prefix` from declaration props, `var()` references,
 * and `@property` params. Sorts them alphabetically for a stable, deterministic mapping, then
 * assigns short names using the chosen `method`. Replaces every occurrence throughout the stylesheet.
 *
 * @param options - {@link MangleCustomPropsOptions}.
 * @returns A PostCSS {@link Plugin}.
 *
 * @example Mangle with defaults (`--instui-*`, base26)
 * ```ts
 * import postcss from "postcss";
 * import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
 *
 * const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
 * ```
 *
 * @example Share the mapping across two files loaded together
 * ```ts
 * import postcss from "postcss";
 * import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
 *
 * const manifest = new Map<string, string>();
 * const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, { from: undefined }).css;
 * const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(components, { from: undefined }).css;
 * // both files use the same --instui-* → --a mapping
 * ```
 *
 * @example Use base36 names and emit the mapping via result.messages
 * ```ts
 * import postcss from "postcss";
 * import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
 *
 * const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, { from: undefined });
 * const msg = result.messages.find((m) => m.type === "mangle-map");
 * ```
 */
export const mangleCustomProps: {
  (options?: MangleCustomPropsOptions): Plugin;
  /** Required PostCSS plugin marker. */
  postcss: true;
} = Object.assign(
  function mangleCustomProps(options: MangleCustomPropsOptions = {}): Plugin {
    const {
      prefix = "--instui-",
      method = "base26",
      propertyMap = false,
      sharedManifest,
    } = options;

    // Use the shared manifest as the working map, or a fresh local one.
    const manifest: Map<string, string> = sharedManifest ?? new Map();

    return {
      postcssPlugin: "pantoken-mangle-custom-props",
      OnceExit(root, { result }: { result: Result }) {
        const collected = new Set<string>();

        root.walkAtRules("property", (rule) => {
          const name = rule.params.trim();
          if (name.startsWith(prefix)) collected.add(name);
        });

        root.walkDecls((decl) => {
          if (decl.prop.startsWith(prefix)) collected.add(decl.prop);
          for (const m of decl.value.matchAll(VAR_RE)) {
            if (m[1].startsWith(prefix)) collected.add(m[1]);
          }
        });

        // Sort for determinism, then assign indices continuing from manifest.size.
        const sorted = [...collected].filter((n) => !manifest.has(n)).sort();
        for (const name of sorted) {
          manifest.set(name, shortName(manifest.size, method));
        }

        if (manifest.size === 0) return;

        // Replace @property params.
        root.walkAtRules("property", (rule) => {
          const mapped = manifest.get(rule.params.trim());
          if (mapped) rule.params = mapped;
        });

        // Replace declaration props and var() references.
        root.walkDecls((decl) => {
          const mappedProp = manifest.get(decl.prop);
          if (mappedProp) decl.prop = mappedProp;

          if (decl.value.includes(prefix)) {
            decl.value = decl.value.replace(VAR_RE, (match, name: string) => {
              const mapped = manifest.get(name);
              return mapped ? match.replace(name, mapped) : match;
            });
          }
        });

        if (propertyMap) {
          result.messages.push({
            type: "mangle-map",
            plugin: "pantoken-mangle-custom-props",
            map: new Map(manifest),
          });
        }
      },
    };
  },
  { postcss: true as const },
);
