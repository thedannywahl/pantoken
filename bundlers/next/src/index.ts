/**
 * `@pantoken/next` — a Next.js config adapter.
 *
 * Instructure UI ships ESM packages that Next must transpile (`transpilePackages`), the #1 papercut
 * when running InstUI on Next. `withPantoken` merges the InstUI packages into that list. Wrap your
 * `next.config`, then import `@pantoken/css` in your root layout for the tokens.
 *
 * @module
 */

/**
 * The Instructure UI packages Next needs to transpile. Extend via {@link WithPantokenOptions}.
 *
 * @example Feed the list into a manual transpilePackages
 * ```ts
 * import { INSTUI_TRANSPILE_PACKAGES } from "@pantoken/next";
 *
 * export default {
 *   transpilePackages: [...INSTUI_TRANSPILE_PACKAGES, "@instructure/ui-modal"],
 * };
 * ```
 */
export const INSTUI_TRANSPILE_PACKAGES: readonly string[] = [
  "@instructure/emotion",
  "@instructure/shared-types",
  "@instructure/ui-a11y-utils",
  "@instructure/ui-alerts",
  "@instructure/ui-buttons",
  "@instructure/ui-color-utils",
  "@instructure/ui-dom-utils",
  "@instructure/ui-heading",
  "@instructure/ui-icons",
  "@instructure/ui-img",
  "@instructure/ui-link",
  "@instructure/ui-list",
  "@instructure/ui-react-utils",
  "@instructure/ui-svg-images",
  "@instructure/ui-table",
  "@instructure/ui-text",
  "@instructure/ui-themes",
  "@instructure/ui-utils",
  "@instructure/ui-view",
];

/** A minimal Next config shape (only the field this adapter touches). */
export interface NextConfigLike {
  transpilePackages?: string[];
  [key: string]: unknown;
}

/** Options for {@link withPantoken}. */
export interface WithPantokenOptions {
  /** Extra package names to add to `transpilePackages`. */
  transpile?: string[];
}

/**
 * Wrap a Next.js config so the Instructure UI packages are transpiled.
 *
 * @param nextConfig - The existing Next config (default `{}`).
 * @param options - {@link WithPantokenOptions}.
 * @returns The augmented config.
 *
 * @example Wrap your next.config.mjs
 * ```js
 * import { withPantoken } from "@pantoken/next";
 *
 * export default withPantoken({ reactStrictMode: true });
 * ```
 *
 * @example Transpile extra InstUI packages
 * ```js
 * import { withPantoken } from "@pantoken/next";
 *
 * export default withPantoken(
 *   { reactStrictMode: true },
 *   { transpile: ["@instructure/ui-modal"] },
 * );
 * ```
 */
export function withPantoken(
  nextConfig: NextConfigLike = {},
  options: WithPantokenOptions = {},
): NextConfigLike {
  const merged = new Set([
    ...(nextConfig.transpilePackages ?? []),
    ...INSTUI_TRANSPILE_PACKAGES,
    ...(options.transpile ?? []),
  ]);
  return { ...nextConfig, transpilePackages: [...merged] };
}

export default withPantoken;
