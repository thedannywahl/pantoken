/**
 * `@pantoken/plugin-prune-custom-props` — tree-shake unused custom properties from a composed
 * stylesheet.
 *
 * pantoken's `@pantoken/css` emits the whole `--instui-*` token set (≈1,800 icon data-URIs
 * included). A renderer that builds on that layer but only styles a slice of the system would
 * otherwise ship the entire set — so any such renderer wants this. Starting from the `var()`
 * references in real (non-custom-property) declarations, it transitively keeps only the custom
 * properties actually reachable, and drops the matching unused `@property` registrations.
 *
 * It's a standalone PostCSS plugin (run it in your own PostCSS pipeline). The factory returns a
 * plain plugin object, so importing this module pulls in no runtime dependency — `postcss` is only
 * a type.
 *
 * @example
 * ```ts
 * import postcss from "postcss";
 * import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
 * const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
 * ```
 *
 * @module
 * @beta
 */
import type { Plugin } from "postcss";

const VAR_RE = /var\(\s*(--[\w-]+)/g;

/** Transitively add any custom property referenced by an already-used custom property. */
function expandTransitiveDeps(used: Set<string>, defs: Map<string, string[]>): void {
  const queue = [...used];
  while (queue.length > 0) {
    const name = queue.shift()!;
    for (const value of defs.get(name) ?? []) {
      for (const m of value.matchAll(VAR_RE)) {
        if (!used.has(m[1])) {
          used.add(m[1]);
          queue.push(m[1]);
        }
      }
    }
  }
}

/**
 * Create the prune-unused-custom-properties PostCSS plugin.
 *
 * @returns A PostCSS {@link Plugin}.
 *
 * @example Run it as a standalone PostCSS pass
 * ```ts
 * import postcss from "postcss";
 * import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
 *
 * const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
 * // only the --instui-* custom properties reachable from real declarations survive
 * ```
 */
export const pruneCustomProps: {
  (): Plugin;
  /** Required PostCSS plugin marker. */
  postcss: true;
} = Object.assign(
  function pruneCustomProps(): Plugin {
    return {
      postcssPlugin: "pantoken-prune-custom-props",
      OnceExit(root) {
        // Every custom-property definition and its value(s).
        const defs = new Map<string, string[]>();
        root.walkDecls((decl) => {
          if (!decl.prop.startsWith("--")) return;
          const values = defs.get(decl.prop) ?? [];
          values.push(decl.value);
          defs.set(decl.prop, values);
        });

        // Seed the used set from references in real declarations (the roots that actually render).
        const used = new Set<string>();
        root.walkDecls((decl) => {
          if (decl.prop.startsWith("--")) return;
          for (const m of decl.value.matchAll(VAR_RE)) used.add(m[1]);
        });

        expandTransitiveDeps(used, defs);

        root.walkDecls((decl) => {
          if (decl.prop.startsWith("--") && !used.has(decl.prop)) decl.remove();
        });
        root.walkAtRules("property", (rule) => {
          if (!used.has(rule.params.trim())) rule.remove();
        });
        // Drop rules left empty after pruning.
        root.walkRules((rule) => {
          if (rule.nodes?.length === 0) rule.remove();
        });
      },
    };
  },
  { postcss: true as const },
);

export default pruneCustomProps;
