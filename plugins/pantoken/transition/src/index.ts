/**
 * `@pantoken/plugin-transition` — the `--instui-transition-duration`/`--instui-transition-timing`
 * tokens behind InstUI's `Transition` utility.
 *
 * The CSS itself (the `.instui-transition` base rule plus the `fade`/`scale`/`slide-*` state classes)
 * lives in `@pantoken/components`' own `transition` utility now; this plugin only bakes the two
 * duration/timing tokens into a token IR for consumers using the lower-level `@pantoken/css` +
 * `@pantoken/tokens` pipeline directly.
 *
 * @example
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 * import { transition } from "@pantoken/plugin-transition";
 *
 * const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
 * // → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
 * ```
 *
 * @module
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import { defineToken } from "@pantoken/model";
import type { PantokenPlugin } from "@pantoken/model";

const DEFAULT_DURATION = "300ms";
const DEFAULT_TIMING = "ease-in-out";

/** Options for the {@link transition} plugin. */
export interface TransitionOptions {
  /** Animation duration (default: InstUI's `300ms`). */
  duration?: string;
  /** Timing function (default: InstUI's `ease-in-out`). */
  timing?: string;
}

/**
 * Create the transition tokens plugin.
 *
 * @param options - {@link TransitionOptions}.
 * @returns A {@link PantokenPlugin} with a `tokens` hook.
 */
export function transition(options: TransitionOptions = {}): PantokenPlugin {
  const duration = options.duration ?? DEFAULT_DURATION;
  const timing = options.timing ?? DEFAULT_TIMING;

  return definePlugin({
    name: "@pantoken/plugin-transition",
    tokens: ({ tokens }) => [
      ...tokens,
      defineToken({ name: "--instui-transition-duration", value: duration }),
      defineToken({ name: "--instui-transition-timing", value: timing }),
    ],
  });
}

export default transition;
