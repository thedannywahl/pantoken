/**
 * `@pantoken/web-components` — framework-agnostic custom elements for Instructure UI.
 *
 * Registers `<instui-icon>` (glyphs from `@pantoken/icons`) plus a set of token-styled elements that
 * wrap the `@pantoken/components` CSS: `<instui-button>`, `<instui-alert>`, `<instui-badge>`,
 * `<instui-pill>`, `<instui-tag>`, `<instui-avatar>`, `<instui-spinner>`, `<instui-progress>`,
 * `<instui-progress-circle>`, `<instui-metric>`, `<instui-rating>`, `<instui-icon-button>`,
 * `<instui-toggle-button>`, `<instui-truncate>`, `<instui-img>`, `<instui-side-nav-bar>`,
 * `<instui-tree-browser>`, and `<instui-tooltip>`, plus the behavioral elements
 * `<instui-modal>` (a real `<dialog>` driven by its `open` attribute), the native popovers
 * `<instui-context-view>`, `<instui-popover>`, and `<instui-tray>`, `<instui-in-place-edit>` (a
 * click-to-edit field that commits on Enter/blur and reverts on Escape), `<instui-drilldown>` (a
 * stateful multi-level menu), `<instui-pages>` (one-panel-at-a-time nav via the View Transitions API),
 * `<instui-drawer-layout>` (a collapsible, drag-resizable side panel), the interactive
 * `<instui-calendar>` (a month grid navigated with the Invoker Commands API), and the pickers
 * `<instui-date-input>` and `<instui-date-time-input>` (a field plus a calendar-dropdown popover).
 * Each renders the matching `.instui-*` markup into its shadow root with the component stylesheet
 * inlined, so the look is exactly `@pantoken/components`
 * with nothing to import but this module. Tokens are inherited custom properties, so they pierce the
 * shadow boundary — load `@pantoken/css` (or any pantoken token sheet) in the document to color them.
 * The elevation scale (`--instui-elevation-*`) and focus-outline (`--instui-focus-outline-*`) custom
 * properties ship in the token sheet too, so shadows and focus rings resolve from the same sheet the
 * colors do — nothing extra to inject. (Elements that render icons, e.g. `<instui-alert>`, read
 * `--instui-icon-*` glyph tokens the same way; the lean token sheet omits the full icon set, so pair it
 * with `@pantoken/components/component-icons.css`, or load the full token sheet.)
 *
 * The module is Node-safe: element classes are defined inside {@link register}, a no-op when there
 * is no DOM, so importing this package during SSR or a build never touches `HTMLElement`.
 *
 * Each element lives in its own documented file under `elements/`, exporting an
 * {@link ElementDefinition}; `elements/index.ts` lists them in registration order as `DEFINITIONS`.
 * {@link register} builds one prefix-aware {@link RegisterContext} and hands it to each definition.
 *
 * @module
 * @alpha
 */
import { resolve as pantokenResolve } from "@pantoken/icons";
import type { IconResolver } from "@pantoken/model";
import { DEFINITIONS } from "./elements/index.ts";
import type { CommandEventish, ElementRegistry, RegisterContext } from "./lib/context.ts";
import { applySpacing, frag, SPACING_ATTRS } from "./lib/helpers.ts";
import {
  ENGLISH_STRINGS,
  makeStrings,
  resolveFirstDay,
  type WebComponentStrings,
} from "./lib/strings.ts";

// ── Public types ──────────────────────────────────────────────────────────────
export type {
  CommandEventish,
  ElementDefinition,
  ElementRegistry,
  RegisterContext,
} from "./lib/context.ts";
export type { WebComponentStrings } from "./lib/strings.ts";
export { ENGLISH_STRINGS, makeStrings, resolveFirstDay } from "./lib/strings.ts";

// ── Element definitions ─────────────────────────────────────────────────────────
export { DEFINITIONS } from "./elements/index.ts";
export { alert } from "./elements/alert.ts";
export { avatar } from "./elements/avatar.ts";
export { badge } from "./elements/badge.ts";
export { button } from "./elements/button.ts";
export { calendar } from "./elements/calendar.ts";
export { contextView } from "./elements/context-view.ts";
export { dateInput } from "./elements/date-input.ts";
export { dateTimeInput } from "./elements/date-time-input.ts";
export { drawerLayout } from "./elements/drawer-layout.ts";
export { drilldown } from "./elements/drilldown.ts";
export { icon } from "./elements/icon.ts";
export { iconButton } from "./elements/icon-button.ts";
export { img } from "./elements/img.ts";
export { inPlaceEdit } from "./elements/in-place-edit.ts";
export { metric } from "./elements/metric.ts";
export { modal } from "./elements/modal.ts";
export { pages } from "./elements/pages.ts";
export { pill } from "./elements/pill.ts";
export { popover } from "./elements/popover.ts";
export { progress } from "./elements/progress.ts";
export { progressCircle } from "./elements/progress-circle.ts";
export { rating } from "./elements/rating.ts";
export { sideNavBar } from "./elements/side-nav-bar.ts";
export { spinner } from "./elements/spinner.ts";
export { tag } from "./elements/tag.ts";
export { toggleButton } from "./elements/toggle-button.ts";
export { tooltip } from "./elements/tooltip.ts";
export { tray } from "./elements/tray.ts";
export { treeBrowser } from "./elements/tree-browser.ts";
export { truncate } from "./elements/truncate.ts";

/** The default tag prefix, mirroring the CSS layer — `<instui-icon>`, `.instui-button`, etc. */
export const DEFAULT_PREFIX = "instui";

/**
 * The base (unprefixed) element names this package registers. {@link register} mints a tag per name
 * under its `prefix` option — `icon` → `<instui-icon>` by default, or `<x-icon>` for `{ prefix: "x" }`.
 * A prefix is always applied (a custom-element name must contain a hyphen), so an empty or nullish prefix
 * falls back to the default `instui`.
 */
export const ELEMENTS = [
  "icon",
  "button",
  "alert",
  "badge",
  "pill",
  "tag",
  "avatar",
  "spinner",
  "progress",
  "metric",
  "rating",
  "progress-circle",
  "icon-button",
  "toggle-button",
  "truncate",
  "img",
  "side-nav-bar",
  "tree-browser",
  "calendar",
  "tooltip",
  "modal",
  "context-view",
  "popover",
  "tray",
  "in-place-edit",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
] as const;

/**
 * Resolve an icon name to inline SVG (empty string when unknown). Pure — the element renders it.
 *
 * @param name - The icon name (e.g. `arrow-left`).
 * @param resolve - The resolver (defaults to the built-in pantoken icon set).
 *
 * @example
 * ```ts
 * import { iconSvg } from "@pantoken/web-components";
 *
 * const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
 * ```
 */
export function iconSvg(name: string, resolve: IconResolver = pantokenResolve): string {
  return resolve(name)?.svg ?? "";
}

/** An element ctor with the optional custom-element lifecycle hooks the spacing mixin composes over. */
type LifecycleElementCtor = new (...args: never[]) => HTMLElement & {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
};

/**
 * Compose the universal spacing behaviour over an element constructor: after the element's own
 * `connectedCallback`, and on any later attribute change, apply the `margin`/`padding` shorthands and
 * per-side `margin-<side>`/`padding-<side>` attributes to the host ({@link applySpacing}). {@link register}
 * wraps every element with this, so InstUI-/CSS-style spacing works on all of them with no per-element code.
 *
 * @param Ctor - The element constructor to wrap.
 * @returns A subclass that adds the spacing behaviour.
 */
function withSpacing(Ctor: LifecycleElementCtor): CustomElementConstructor {
  const Spaced = class extends Ctor {
    #spacingObserver: MutationObserver | undefined;
    connectedCallback(): void {
      super.connectedCallback?.();
      applySpacing(this);
      this.#spacingObserver = new MutationObserver(() => {
        applySpacing(this);
      });
      // Watch only the spacing attributes, never `style` — applySpacing writes `style`, so observing
      // all attributes would make the observer re-trigger itself on its own writes.
      this.#spacingObserver.observe(this, {
        attributes: true,
        attributeFilter: [...SPACING_ATTRS],
      });
    }
    disconnectedCallback(): void {
      super.disconnectedCallback?.();
      this.#spacingObserver?.disconnect();
    }
  };
  return Spaced as unknown as CustomElementConstructor;
}

/**
 * Elements whose shadow markup renders another element, so registering one requires its dependencies
 * too: `<instui-date-time-input>` renders a `<instui-date-input>`, which renders a `<instui-calendar>`.
 * {@link register}'s `only` filter expands through this (transitively) so a cherry-picked subset still
 * works. Keyed by base name; values are direct dependencies.
 */
const NESTED_DEPS: Readonly<Record<string, readonly string[]>> = {
  "date-input": ["calendar"],
  "date-time-input": ["date-input"],
};

/** Expand a requested base-name set to include its transitive {@link NESTED_DEPS}. */
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
function syncInvoker(host: HTMLElement): void {
  const btn = host.shadowRoot?.querySelector("button") as InvokerButton | null;
  if (!btn) return;
  const root = host.getRootNode() as Document | ShadowRoot;
  const byId = (id: string): Element | null =>
    typeof root.getElementById === "function" ? root.getElementById(id) : null;
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

/** Build a `.instui-<name>` class with an optional `-color-<variant>` key-value modifier from `variant`. */
function variantClass(name: string, host: HTMLElement): string {
  const variant = frag(host.getAttribute("variant"));
  return variant ? `instui-${name} -color-${variant}` : `instui-${name}`;
}

/** Resolve the tag prefix: a non-empty string wins; anything empty/nullish falls back to `instui`. */
function resolvePrefix(prefix: string | null | undefined): string {
  return typeof prefix === "string" && prefix.trim() !== "" ? prefix : DEFAULT_PREFIX;
}

/** Build the prefix-aware registry: rewrite every internal `instui-<base>` name to the active-prefix tag. */
function makeRegistry(host: ElementRegistry, tag: (base: string) => string): ElementRegistry {
  return {
    get: (name) => host.get(tag(name.replace(/^instui-/u, ""))),
    define: (name, ctor) => {
      const resolved = tag(name.replace(/^instui-/u, ""));
      // Wrap every element with the shared spacing mixin, so `margin`/`padding` (+ per-side) work
      // universally — no per-element code needed.
      if (!host.get(resolved)) host.define(resolved, withSpacing(ctor));
    },
  };
}

/**
 * Build the `command`-event router: forward a target's `command` events to a handler, and where the
 * Invoker Commands API is missing, delegate matching `commandfor` clicks across the target's tree.
 */
function makeOnCommand(invokerSupported: boolean): RegisterContext["onCommand"] {
  // Elements call onCommand from paint()/connectedCallback and may re-run it (calendar re-wires its
  // recreated internal grid on every paint). Adding a fresh listener each time would accumulate, so one
  // click fires N times. Wire each target's `command` listener once (keyed on the target object — a
  // recreated target is a new object, its predecessor GC'd), and register ONE click-fallback delegate
  // per (root, id) that dispatches to the LATEST handler for that id. That fixes calendar's repeated
  // re-wire (stable id `cal`) and a same-id host recreated later, without the stale-handler capture a
  // plain skip-after-first would cause; distinct ids on a shared document each get their own routing.
  type CommandHandler = (command: string, source: Element | null) => void;
  // Latest handler per target object (WeakMap → recreated targets GC away); command listener wired once
  // per target; one click-fallback delegate per root. The delegate resolves `commandfor` to the LIVE
  // element and its current handler at click time, so it survives a target whose id is set after wiring
  // (drilldown) and a repainted grid that swaps its element (calendar) — without accumulating listeners.
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
    // Fallback for browsers without the API: delegate clicks across the target's tree — its shadow root
    // for an internal grid, or the document for a light-DOM host — matching on `commandfor`, so
    // `command` buttons keep working wherever they live.
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

/**
 * Build the shadow-DOM element factory: define `<style>:host{display}css</style>` + `render(host)`
 * markup, wiring invoker forwarding when `invoker` is set. The `:host` display is explicit because a
 * custom element defaults to `display: inline`, which would collapse internal `width: 100%`.
 */
function makeWrapper(registry: ElementRegistry): RegisterContext["wrapper"] {
  return (tag, css, render, { display = "inline-block", invoker = false } = {}) => {
    if (registry.get(tag)) return;
    registry.define(
      tag,
      class extends HTMLElement {
        static observedAttributes = [
          "variant",
          "size",
          "shape",
          "value",
          "max",
          "label",
          "pressed",
          "lines",
          "placement",
          "minimized",
          "constrain",
          "src",
          "alt",
          "tip",
          "has-shadow",
          "popovertarget",
          "popovertargetaction",
          "command",
          "commandfor",
        ];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          this.paint();
          if (invoker) {
            // Re-resolve the target on each interaction: an id can point forward to an element parsed
            // after this button, and the target may be swapped at runtime. `requestAnimationFrame`
            // catches the initial forward reference once the document has finished parsing.
            const sync = (): void => syncInvoker(this);
            this.addEventListener("pointerdown", sync);
            this.addEventListener("keydown", sync);
            if (typeof requestAnimationFrame === "function") requestAnimationFrame(sync);
          }
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        paint(): void {
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `<style>:host{display:${display}}${css}</style>${render(this)}`;
            if (invoker) syncInvoker(this);
          }
        }
      },
    );
  };
}

/**
 * Register the pantoken custom elements. No-op when there is no DOM (SSR / build), so this module
 * is safe to import anywhere.
 *
 * @param target - The registry to define into (defaults to `globalThis.customElements`).
 * @param options - `prefix` sets the tag prefix, mirroring the CSS layer: pass a non-empty string like
 *   `x` for `<x-icon>`. A prefix is always applied (a custom-element name must contain a hyphen), so an
 *   omitted, empty, or nullish prefix falls back to the default `instui` (`<instui-icon>`). `only` limits
 *   registration to a subset of the `ELEMENTS` base names — its nested render dependencies are pulled in
 *   automatically, so `{ only: ["date-time-input"] }` also defines `date-input` and `calendar`. Omit
 *   `only` to register every element (the default).
 *
 * @example
 * ```ts
 * import { register } from "@pantoken/web-components";
 * import "@pantoken/css"; // defines the --instui-* custom properties the elements read
 *
 * register(); // <instui-button>, <instui-icon>, …
 * register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
 * register(customElements, { only: ["button", "alert"] }); // just those two
 * register(customElements, { locale: "hu", strings: { back: "Vissza" } }); // localized
 * ```
 */
export function register(
  target: ElementRegistry | undefined = globalThis.customElements,
  options: {
    prefix?: string | null;
    only?: readonly string[];
    locale?: string;
    strings?: Partial<WebComponentStrings>;
    dir?: "ltr" | "rtl";
  } = {},
): void {
  if (!target || typeof HTMLElement === "undefined") return;

  // When `only` is given, expand it through the nested-render dependencies and define just that set;
  // otherwise define every element. The canonical `DEFINITIONS` order is preserved either way, so a
  // nested dependency is always defined before the element that renders it.
  const wanted = options.only ? withNestedDeps(options.only) : null;

  // Tag prefix: a valid non-empty string overrides the default; anything else (empty, whitespace, null,
  // omitted) falls back to `instui`. A prefix is always applied because a custom-element name MUST contain
  // a hyphen — `<icon>` is invalid, `<instui-icon>`/`<x-icon>` are not. The inlined `.instui-*` CSS classes
  // are an internal detail and are NOT affected by this — only the custom-element tag name.
  const prefix = resolvePrefix(options.prefix);
  const tag = (base: string): string => `${prefix}-${base}`;
  // Route every internal `registry.get`/`define` (all keyed on the canonical `instui-<base>` names)
  // through the active prefix.
  const registry = makeRegistry(target, tag);

  // The shadow-DOM CSS is built with the default `instui` prefix so it matches the `instui-*` markup
  // in each element (the builders drop the prefix on a falsy value).
  const I = { prefix: "instui" } as const;

  // The calendar and date picker drive navigation with the Invoker Commands API. `onCommand` routes a
  // target's `command` events to a handler; where the API is unavailable it delegates clicks on the
  // target's own `command`/`commandfor` buttons instead, so the buttons keep working everywhere.
  const INVOKER_SUPPORTED =
    typeof HTMLButtonElement !== "undefined" && "command" in HTMLButtonElement.prototype;
  const onCommand = makeOnCommand(INVOKER_SUPPORTED);
  const wrapper = makeWrapper(registry);

  const locale = options.locale ?? "en";
  const dir = options.dir ?? "ltr";
  const strings = options.strings
    ? makeStrings(locale, options.strings)
    : locale === "en"
      ? ENGLISH_STRINGS
      : makeStrings(locale);
  const firstDay = resolveFirstDay(locale);

  const ctx: RegisterContext = {
    registry,
    tag,
    I,
    invokerSupported: INVOKER_SUPPORTED,
    onCommand,
    wrapper,
    variantClass,
    iconSvg,
    locale,
    dir,
    firstDay,
    strings,
  };

  for (const def of DEFINITIONS) {
    if (wanted && !wanted.has(def.name)) continue;
    def.define(ctx);
  }
}

// Auto-register in the browser; a no-op everywhere else.
register();
