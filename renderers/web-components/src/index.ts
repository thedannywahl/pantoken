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
 * The elevation scale and focus-outline system live in the components/base layer rather than the token
 * sheet, so {@link register} injects them at `:root` ({@link foundationCss}) — shadows inherit them, and
 * elevation/focus work with only the token sheet loaded.
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
import { elevationDeclarations, focusOutlineDeclarations } from "@pantoken/components";
import { resolve as pantokenResolve } from "@pantoken/icons";
import type { IconResolver } from "@pantoken/model";
import { DEFINITIONS } from "./elements/index.ts";
import type { CommandEventish, ElementRegistry, RegisterContext } from "./lib/context.ts";
import { applySpacing, frag } from "./lib/helpers.ts";

// ── Public types ──────────────────────────────────────────────────────────────
export type {
  CommandEventish,
  ElementDefinition,
  ElementRegistry,
  RegisterContext,
} from "./lib/context.ts";

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

/** The id of the `<style>` {@link register} injects, so the foundation is added at most once. */
const FOUNDATION_STYLE_ID = "pantoken-foundation";

/**
 * The `:root` custom-property block that bundles the elevation scale (`--instui-elevation-*`) and the
 * focus-outline system (`--instui-focus-outline-*`). The component CSS references these, but the token
 * sheet (`@pantoken/css`) doesn't carry them — they live in the components/base layer. Because custom
 * properties pierce the shadow boundary, declaring them once at `:root` makes every element's shadow
 * inherit them, so shadows, focus rings, etc. work with nothing loaded but this module + a token sheet.
 * {@link register} injects it client-side; export it too so SSR can inline it up front.
 *
 * @returns A `:root { … }` CSS string.
 *
 * @example
 * ```ts
 * import { foundationCss } from "@pantoken/web-components";
 * // SSR: `<style>${foundationCss()}</style>` in <head>.
 * ```
 */
export function foundationCss(): string {
  const decls = [...elevationDeclarations(), ...focusOutlineDeclarations()]
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  return `:root {\n${decls}\n}`;
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
      this.#spacingObserver.observe(this, { attributes: true });
    }
    disconnectedCallback(): void {
      super.disconnectedCallback?.();
      this.#spacingObserver?.disconnect();
    }
  };
  return Spaced as unknown as CustomElementConstructor;
}

/**
 * Register the pantoken custom elements. No-op when there is no DOM (SSR / build), so this module
 * is safe to import anywhere.
 *
 * @param target - The registry to define into (defaults to `globalThis.customElements`).
 * @param options - `prefix` sets the tag prefix, mirroring the CSS layer: pass a non-empty string like
 *   `x` for `<x-icon>`. A prefix is always applied (a custom-element name must contain a hyphen), so an
 *   omitted, empty, or nullish prefix falls back to the default `instui` (`<instui-icon>`).
 *
 * @example
 * ```ts
 * import { register } from "@pantoken/web-components";
 * import "@pantoken/css"; // defines the --instui-* custom properties the elements read
 *
 * register(); // <instui-button>, <instui-icon>, …
 * register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
 * ```
 */
export function register(
  target: ElementRegistry | undefined = globalThis.customElements,
  options: { prefix?: string | null } = {},
): void {
  if (!target || typeof HTMLElement === "undefined") return;

  // Bundle the elevation + focus-outline custom properties at `:root` once, so every shadow inherits
  // them (they aren't in the token sheet). Skipped without a DOM (e.g. the registry-only test path).
  if (
    typeof document !== "undefined" &&
    document.head &&
    !document.getElementById(FOUNDATION_STYLE_ID)
  ) {
    const style = document.createElement("style");
    style.id = FOUNDATION_STYLE_ID;
    style.textContent = foundationCss();
    document.head.append(style);
  }

  // Tag prefix: a valid non-empty string overrides the default; anything else (empty, whitespace, null,
  // omitted) falls back to `instui`. A prefix is always applied because a custom-element name MUST contain
  // a hyphen — `<icon>` is invalid, `<instui-icon>`/`<x-icon>` are not. The inlined `.instui-*` CSS classes
  // are an internal detail and are NOT affected by this — only the custom-element tag name.
  const prefix =
    typeof options.prefix === "string" && options.prefix.trim() !== ""
      ? options.prefix
      : DEFAULT_PREFIX;
  const tag = (base: string): string => `${prefix}-${base}`;
  // Route every internal `registry.get`/`define` (all keyed on the canonical `instui-<base>` names)
  // through the active prefix.
  const host = target;
  const registry: ElementRegistry = {
    get: (name) => host.get(tag(name.replace(/^instui-/u, ""))),
    define: (name, ctor) => {
      const resolved = tag(name.replace(/^instui-/u, ""));
      // Wrap every element with the shared spacing mixin, so `margin`/`padding` (+ per-side) work
      // universally — no per-element code needed.
      if (!host.get(resolved)) host.define(resolved, withSpacing(ctor));
    },
  };

  // A shadow-DOM `<button>` can invoke a light-DOM `[popover]` (or dispatch a command) only through the
  // IDL properties — the `popovertarget`/`commandfor` *attributes* resolve their id in the button's own
  // tree scope (the shadow root), so they never find a light-DOM target. `syncInvoker` mirrors the host's
  // invoker attributes onto the inner button's IDL properties, resolving the id against the host's root.
  type InvokerButton = HTMLButtonElement & {
    popoverTargetElement?: Element | null;
    popoverTargetAction?: string;
    commandForElement?: Element | null;
    command?: string;
  };
  const syncInvoker = (host: HTMLElement): void => {
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
  };

  /**
   * Define a shadow-DOM element: `<style>:host{display}css</style>` + markup from `render(host)`.
   * The `:host` display is explicit because a custom element defaults to `display: inline`, which
   * would collapse internal `width: 100%` (e.g. the progress bar). Pass `invoker: true` when the
   * rendered markup is a `<button>` that should drive native `popovertarget`/`command` targets.
   */
  const wrapper = (
    tag: string,
    css: string,
    render: (host: HTMLElement) => string,
    { display = "inline-block", invoker = false }: { display?: string; invoker?: boolean } = {},
  ): void => {
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

  // The shadow-DOM CSS is built with the default `instui` prefix so it matches the `instui-*` markup
  // in each element (the builders drop the prefix on a falsy value).
  const I = { prefix: "instui" } as const;

  /** A `.instui-<name>` class with a single `-color-<variant>` key-value modifier from `variant`. */
  const variantClass = (name: string, host: HTMLElement): string => {
    const variant = frag(host.getAttribute("variant"));
    return variant ? `instui-${name} -color-${variant}` : `instui-${name}`;
  };

  // The calendar and date picker drive navigation with the Invoker Commands API. `onCommand` routes a
  // target's `command` events to a handler; where the API is unavailable it delegates clicks on the
  // target's own `command`/`commandfor` buttons instead, so the buttons keep working everywhere.
  const INVOKER_SUPPORTED =
    typeof HTMLButtonElement !== "undefined" && "command" in HTMLButtonElement.prototype;
  const onCommand = (
    target: HTMLElement,
    handler: (command: string, source: Element | null) => void,
  ): void => {
    target.addEventListener("command", (event) => {
      const ce = event as CommandEventish;
      handler(ce.command, ce.source);
    });
    if (!INVOKER_SUPPORTED) {
      // Fallback for browsers without the API: delegate clicks across the target's tree — its shadow root
      // for an internal grid, or the document for a light-DOM host — to the same handler, matching on
      // `commandfor`, so `command` buttons keep working wherever they live.
      const scope = target.getRootNode() as Document | ShadowRoot;
      scope.addEventListener("click", (event) => {
        const el = event.target instanceof Element ? event.target : null;
        const button = el?.closest<HTMLButtonElement>("button[command][commandfor]");
        if (button?.getAttribute("commandfor") === target.id) {
          handler(button.getAttribute("command") ?? "", button);
        }
      });
    }
  };

  const ctx: RegisterContext = {
    registry,
    tag,
    I,
    invokerSupported: INVOKER_SUPPORTED,
    onCommand,
    wrapper,
    variantClass,
    iconSvg,
  };

  for (const def of DEFINITIONS) def.define(ctx);
}

// Auto-register in the browser; a no-op everywhere else.
register();
