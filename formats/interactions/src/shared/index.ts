/**
 * `@pantoken/interactions` shared helpers - browser interaction utilities.
 *
 * Exposes spacing-attribute parsing/application and Invoker Commands routing helpers that are safe
 * for browser runtimes. Depends only on `@pantoken/utils`' shared spacing scale (plain data, no
 * `node:*` imports), so this still bundles cleanly for the browser.
 */
import { SPACING_STEPS } from "@pantoken/utils";

/** The `command`/`source` shape of an Invoker Commands `CommandEvent` (not yet in DOM lib types). */
export interface CommandEventish extends Event {
  command: string;
  source: Element | null;
}

/** Callback invoked when a `command` event (or fallback click) resolves to a target. */
export type CommandHandler = (command: string, source: Element | null) => void;

/**
 * Command-event wiring function: bind one target to a handler, with click fallback when needed.
 */
export type OnCommand = (target: HTMLElement, handler: CommandHandler) => void;

/**
 * Build the `command`-event router: forward a target's `command` events to a handler, and where the
 * Invoker Commands API is missing, delegate matching `commandfor` clicks across the target's tree.
 */
export function makeOnCommand(invokerSupported: boolean): OnCommand {
  // Elements may re-wire handlers after repaint; we keep one listener per target and one delegated
  // click listener per scope, while always dispatching to the latest handler.
  const handlerByTarget = new WeakMap<Element, CommandHandler>();
  const wiredTargets = new WeakSet<EventTarget>();
  const delegatedScopes = new WeakSet<EventTarget>();

  return (target, handler) => {
    handlerByTarget.set(target, handler);
    if (!wiredTargets.has(target)) {
      wiredTargets.add(target);
      target.addEventListener("command", (event) => {
        const ce = event as CommandEventish;
        handlerByTarget.get(target)?.(ce.command, ce.source);
      });
    }

    if (invokerSupported) return;

    const scope = target.getRootNode() as Document | ShadowRoot;
    if (delegatedScopes.has(scope)) return;
    delegatedScopes.add(scope);

    scope.addEventListener("click", (event) => {
      const el = event.target instanceof Element ? event.target : null;
      const button = el?.closest<HTMLButtonElement>("button[command][commandfor]");
      const forId = button?.getAttribute("commandfor");
      const routedTarget = forId ? scope.getElementById(forId) : null;
      const routed = routedTarget ? handlerByTarget.get(routedTarget) : undefined;
      if (button && routed) routed(button.getAttribute("command") ?? "", button);
    });
  };
}

/** An inner `<button>` exposing the invoker/popover IDL properties the host mirrors onto it. */
type InvokerButton = HTMLButtonElement & {
  popoverTargetElement?: Element | null;
  popoverTargetAction?: string;
  commandForElement?: Element | null;
  command?: string;
};

/**
 * Mirror the host's invoker attributes onto its inner `<button>`'s IDL properties, resolving ids
 * against the host's root so a shadow-DOM button can drive a light-DOM `[popover]`/command target.
 */
export function syncInvoker(host: HTMLElement): void {
  const btn = host.shadowRoot?.querySelector("button") as InvokerButton | null;
  if (!btn) return;
  const root = host.getRootNode() as Document | ShadowRoot;
  const byId = (id: string): Element | null =>
    /* c8 ignore next */ typeof root.getElementById === "function" ? root.getElementById(id) : null;
  const popoverTarget = host.getAttribute("popovertarget");
  if (popoverTarget !== null) {
    btn.popoverTargetElement = byId(popoverTarget);
    btn.popoverTargetAction = host.getAttribute("popovertargetaction") ?? "toggle";
  }
  const commandFor = host.getAttribute("commandfor");
  const command = host.getAttribute("command");
  if (commandFor !== null && command !== null) {
    btn.commandForElement = byId(commandFor);
    btn.command = command;
  }
}

/**
 * InstUI spacing keywords (and short pantoken aliases) to matching CSS lengths/tokens — built from
 * the shared {@link SPACING_STEPS} scale (`@pantoken/utils`) so it can't drift from the components
 * package's spacing utilities. The zero step resolves to a plain `"0"` here (an inline style has no
 * use for the indirection of a custom property), unlike the components package's utility classes.
 * `"xxx-small"` is an extra legacy alias for the zero step, kept for back-compat.
 */
const SPACE_KEYWORDS: Record<string, string> = Object.fromEntries(
  SPACING_STEPS.flatMap((step) => [
    [step.short, step.short === "0" ? "0" : step.value],
    [step.long, step.short === "0" ? "0" : step.value],
  ]),
);
SPACE_KEYWORDS["xxx-small"] = SPACE_KEYWORDS["2xs"];

/** Resolve one spacing value: keyword alias to token, otherwise pass through unchanged. */
export function resolveSpace(value: string): string {
  const v = value.trim();
  return SPACE_KEYWORDS[v] ?? v;
}

/** Resolve a 1-4 value InstUI spacing shorthand (`margin`/`padding`) to its CSS value. */
export function spacingValue(attr: string | null): string {
  if (!attr?.trim()) return "";
  return attr.trim().split(/\s+/u).map(resolveSpace).join(" ");
}

/** The logical + physical side suffixes a `margin-<side>`/`padding-<side>` attribute may target. */
const SPACING_SIDES = [
  "top",
  "right",
  "bottom",
  "left",
  "inline",
  "block",
  "inline-start",
  "inline-end",
  "block-start",
  "block-end",
];

/** All spacing attributes observed/applied by {@link applySpacing}. */
export const SPACING_ATTRS: readonly string[] = [
  "margin",
  "padding",
  ...SPACING_SIDES.flatMap((side) => [`margin-${side}`, `padding-${side}`]),
];

/**
 * Apply InstUI/CSS spacing attributes on `host` to inline style.
 *
 * Managed properties are cleared first, so removing an attribute removes its style.
 */
export function applySpacing(host: HTMLElement): void {
  for (const box of ["margin", "padding"] as const) {
    host.style.removeProperty(box);
    for (const side of SPACING_SIDES) host.style.removeProperty(`${box}-${side}`);
    const shorthand = host.getAttribute(box);
    if (shorthand) host.style.setProperty(box, spacingValue(shorthand));
  }
  for (const name of host.getAttributeNames()) {
    const match = /^(margin|padding)-(.+)$/u.exec(name);
    if (match && SPACING_SIDES.includes(match[2])) {
      host.style.setProperty(name, resolveSpace(host.getAttribute(name) ?? ""));
    }
  }
}
