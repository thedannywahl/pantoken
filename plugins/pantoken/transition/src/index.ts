/**
 * `@pantoken/plugin-transition` — the CSS behind InstUI's `Transition` utility.
 *
 * InstUI's `Transition` drives enter/exit animations by toggling per-state class names
 * (`…-entering`, `…-entered`, `…-exiting`, `…-exited`) on an element as it mounts and unmounts. This
 * plugin emits those rules — a base `.instui-transition` (the animated `transition` property) plus the
 * `fade`, `scale`, and `slide-{up,down,left,right}` type/state classes — and defines the
 * `--instui-transition-duration` / `--instui-transition-timing` tokens they read. Toggle the state
 * class from your own JS (or a framework's transition group); the CSS does the animation.
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { transition } from "@pantoken/plugin-transition";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [transition()] });
 * // <div class="instui-transition -fade-entered">…</div>
 * ```
 *
 * @module
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { PantokenPlugin } from "@pantoken/model";

/** Options for the {@link transition} plugin. */
export interface TransitionOptions {
  /** Animation duration (default: InstUI's `300ms`). */
  duration?: string;
  /** Timing function (default: InstUI's `ease-in-out`). */
  timing?: string;
  /** Class prefix (default `instui`). */
  prefix?: string;
  /** Where the rules land relative to the stylesheet: `"append"` (default) or `"prepend"`. */
  position?: "append" | "prepend";
}

/**
 * Create the transition plugin.
 *
 * @param options - {@link TransitionOptions}.
 * @returns A {@link PantokenPlugin} with `tokens` and `css` hooks.
 */
export function transition(options: TransitionOptions = {}): PantokenPlugin {
  const duration = options.duration ?? "300ms";
  const timing = options.timing ?? "ease-in-out";
  const p = options.prefix ?? "instui";
  const position = options.position ?? "append";

  const dur = "var(--instui-transition-duration)";
  const tim = "var(--instui-transition-timing)";
  const t = `.${p}-transition`;

  const rules = [
    `${t} { transition: opacity ${dur} ${tim}, transform ${dur} ${tim}; }`,
    ``,
    `${t}.-fade-exiting, ${t}.-fade-exited { opacity: 0.01; }`,
    `${t}.-fade-entering, ${t}.-fade-entered { opacity: 1; }`,
    ``,
    `${t}.-scale-exiting, ${t}.-scale-exited { transform: scale(0.01) translate3d(0, 0, 0); opacity: 0.01; }`,
    `${t}.-scale-entering, ${t}.-scale-entered { transform: scale(1) translate3d(0, 0, 0); opacity: 1; }`,
    ``,
    `${t}.-slide-right-exited, ${t}.-slide-left-exited, ${t}.-slide-up-exited, ${t}.-slide-down-exited { opacity: 0.01; }`,
    `${t}.-slide-right-exiting, ${t}.-slide-right-exited { transform: translate3d(100%, 0, 0); }`,
    `${t}.-slide-left-exiting, ${t}.-slide-left-exited { transform: translate3d(-100%, 0, 0); }`,
    `${t}.-slide-up-exiting, ${t}.-slide-up-exited { transform: translate3d(0, -100%, 0); }`,
    `${t}.-slide-down-exiting, ${t}.-slide-down-exited { transform: translate3d(0, 100%, 0); }`,
    `${t}.-slide-right-entering, ${t}.-slide-left-entering, ${t}.-slide-up-entering, ${t}.-slide-down-entering,`,
    `${t}.-slide-right-entered, ${t}.-slide-left-entered, ${t}.-slide-up-entered, ${t}.-slide-down-entered { transform: translate3d(0, 0, 0); opacity: 1; }`,
  ].join("\n");

  const declarations: [string, string][] = [
    ["--instui-transition-duration", duration],
    ["--instui-transition-timing", timing],
  ];

  return definePlugin({
    name: "@pantoken/plugin-transition",
    tokens: ({ tokens, define }) => [
      ...tokens,
      ...declarations.map(([name, value]) => define({ name, value })),
    ],
    css: ({ tokens }) => {
      const present = new Set(tokens.map((tk) => tk.name));
      const decls = declarations.filter(([name]) => !present.has(name));
      return {
        marker: "pantoken:transition",
        ...(decls.length ? { declarations: decls } : {}),
        [position]: rules,
      };
    },
  });
}

export default transition;
