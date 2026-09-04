import { DEFINITIONS } from "./elements/index.ts";
import type { ElementRegistry } from "./lib/context.ts";
import { NESTED_DEPS } from "./lib/elements-meta.ts";
import {
  buildRegisterContext,
  iconSvg,
  type RegisterContextOptions,
} from "./lib/register-context.ts";

function withNestedDeps(only: readonly string[]): Set<string> {
  const wanted = new Set<string>();
  const add = (name: string): void => {
    if (wanted.has(name)) return;
    wanted.add(name);
    for (const dep of NESTED_DEPS[name] ?? []) add(dep);
  };
  for (const name of only) add(name);
  return wanted;
}

/**
 * Register the pantoken custom elements. No-op when there is no DOM (SSR / build), so this module
 * is safe to import anywhere.
 */
export function register(
  target: ElementRegistry | undefined = globalThis.customElements,
  options: RegisterContextOptions & { only?: readonly string[] } = {},
): void {
  if (!target || typeof HTMLElement === "undefined") return;

  const wanted = options.only ? withNestedDeps(options.only) : null;
  const ctx = buildRegisterContext(options, target, iconSvg);

  for (const def of DEFINITIONS) {
    if (wanted && !wanted.has(def.name)) continue;
    def.define(ctx);
  }
}
