/**
 * `@pantoken/react` — thin React helpers over `@pantoken/web-components` and the token CSS.
 *
 * - `<Icon>` renders the `<instui-icon>` custom element (React 19 passes props to custom elements).
 * - `useToken` reads a resolved `--instui-*` value at runtime (SSR-safe: returns the fallback on
 *   the server).
 * - `<TokenProvider>` registers the elements and is where an app can inject the stylesheet.
 *
 * @module
 * @experimental
 */
import { register } from "@pantoken/web-components";
import { createElement, useEffect, useState } from "react";
import type { ReactNode } from "react";

export { register } from "@pantoken/web-components";

/**
 * Read a resolved token value from the document. Returns `fallback` on the server.
 *
 * @example
 * ```tsx
 * import { readToken } from "@pantoken/react";
 *
 * const brand = readToken("--instui-color-background-brand", "#0374B5");
 * ```
 */
export function readToken(name: string, fallback = ""): string {
  if (typeof window === "undefined" || typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * React hook returning a resolved `--instui-*` token value (re-reads on `name` change).
 *
 * @example
 * ```tsx
 * import { useToken } from "@pantoken/react";
 *
 * function Banner() {
 *   const brand = useToken("--instui-color-background-brand", "#0374B5");
 *   return <div style={{ background: brand }}>Saved</div>;
 * }
 * ```
 */
export function useToken(name: string, fallback = ""): string {
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    setValue(readToken(name, fallback));
  }, [name, fallback]);
  return value;
}

/** Props for {@link Icon}. */
export interface IconProps {
  name: string;
  size?: string;
  color?: string;
}

/**
 * Render an Instructure icon as the `<instui-icon>` custom element.
 *
 * @example
 * ```tsx
 * import { Icon } from "@pantoken/react";
 *
 * <Icon name="check-mark" size="1.25rem" color="var(--instui-color-text-success)" />;
 * ```
 */
export function Icon({ name, size, color }: IconProps): ReactNode {
  return createElement("instui-icon", { name, size, color });
}

/** Props for {@link TokenProvider}. */
export interface TokenProviderProps {
  children?: ReactNode;
}

/**
 * Register the pantoken custom elements (client-side) and render children.
 *
 * @example
 * ```tsx
 * import { TokenProvider, Icon } from "@pantoken/react";
 * import "@pantoken/css";
 *
 * function App() {
 *   return (
 *     <TokenProvider>
 *       <Icon name="check-mark" size="1.25rem" /> Saved
 *     </TokenProvider>
 *   );
 * }
 * ```
 */
export function TokenProvider({ children }: TokenProviderProps): ReactNode {
  useEffect(() => {
    register();
  }, []);
  return children ?? null;
}
