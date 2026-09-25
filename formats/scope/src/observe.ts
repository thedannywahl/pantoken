/**
 * Reacting to scope changes made outside this instance — an ancestor retheming, or another
 * instance's scope element changing above ours.
 *
 * @module
 */
import { SCOPE_ATTRS } from "./contract.ts";
import { resolveScope } from "./resolve.ts";
import type { ResolvedScope } from "./contract.ts";

/**
 * Call `listener` whenever the scope resolved for `target` changes, including when an ancestor's
 * attributes change.
 *
 * @returns A stop function.
 *
 * @example
 * ```ts
 * import { observeScope } from "@pantoken/scope";
 *
 * const stop = observeScope(el, (scope) => render(scope.theme, scope.scheme));
 * ```
 */
export function observeScope(
  target: Element,
  listener: (scope: ResolvedScope) => void,
): () => void {
  const view = target.ownerDocument.defaultView;
  if (!view?.MutationObserver) return () => {};

  let previous = resolveScope(target);
  const observer = new view.MutationObserver(() => {
    const next = resolveScope(target);
    if (
      next.theme === previous.theme &&
      next.scheme === previous.scheme &&
      next.color === previous.color &&
      next.instanceId === previous.instanceId
    ) {
      return;
    }
    previous = next;
    listener(next);
  });

  // Observing the root subtree rather than the ancestor chain keeps this correct when the target is
  // moved, and when a scope element is inserted between it and an existing ancestor. `class` is in
  // the filter because a scope can be declared by class as well as by attribute.
  observer.observe(target.ownerDocument.documentElement, {
    attributes: true,
    attributeFilter: [...SCOPE_ATTRS, "class"],
    subtree: true,
  });

  return () => {
    observer.disconnect();
  };
}
